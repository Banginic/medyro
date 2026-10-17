import { z } from "zod";
import { protectWithArcjet } from "@/lib/protectWithArcjet";
import { ContextType } from "./context";
import { validate as isUuid } from "uuid";


type ProcedureOptions<T> = {
  schema: z.ZodType<T>;
  handler: (options: { context: ContextType; input: T }) => Promise<any>;
  protectClient?: boolean;
  protectAdmin?: boolean;
  protect?: boolean;
};

function formDataToObject(formData: FormData): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of formData.keys()) {
    if (result[key] !== undefined) continue; // already handled this key

    const values = formData.getAll(key);
    result[key] = values.length > 1 ? values : values[0];
  }

  return result;
}

function normalizeFormData(input: Record<string, any>) {
  const stringFields = ["phone", "phoneNumber", "whatsapp"];
  const result: any = {};

  for (const key in input) {
    const value = input[key];

    if (Array.isArray(value) || value instanceof File) {
      result[key] = value; // pass through files/arrays untouched
    } else if (value === "true") result[key] = true;
    else if (value === "false") result[key] = false;
    else if (
      typeof value === "string" &&
      value !== "" &&
      !stringFields.includes(key) &&
      !isNaN(Number(value))
    ) {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function createProcedure<T>({
  schema,
  handler,
  protectClient = false,
  protectAdmin = false,
  protect = false,
}: ProcedureOptions<T>) {
  return async (
    req: Request,
    context: ContextType,
    paramsId?: { id: string },
  ) => {
    try {
      // RATE LIMITING AND BOT PROTECTION......................................................................................................
      protectWithArcjet(req);

      // AUTH
      if (protect && !context.session) {
        return Response.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }

      if (protectAdmin && context.session?.user.role !== "admin") {
        return Response.json(
          { success: false, message: "Admin only" },
          { status: 401 },
        );
      }

      if (protectClient && context.session?.user.role !== "user") {
        return Response.json(
          { success: false, message: "Client only" },
          { status: 401 },
        );
      }

      let input: any = {};

      const contentType = req.headers.get("content-type");
      const method = req.method;

      // FORM DATA
      if (
        (method === "POST" || method === "PATCH") &&
        contentType?.includes("multipart/form-data")
      ) {
        const formData = await req.formData();

       

        input = normalizeFormData(formDataToObject(formData));
      }

      // JSON
      else if (
        (method === "POST" || method === "PATCH") &&
        contentType?.includes("application/json")
      ) {
        try {
          input = await req.json();
        } catch {
          input = {};
        }
      }

      // GET (ONLY THIS SHOULD HANDLE QUERY PARAMS)
      else if (method === "GET" || method === "DELETE") {
        const url = new URL(req.url, process.env.BASE_URL!);

        input = normalizeFormData(
          Object.fromEntries(url.searchParams.entries()),
        );
      }

          // Include ID sent E.g.  /api/programs/id
      if (paramsId) {
        input = {
          ...input,
          ...paramsId,
        };
      }

      // VALIDATION
      const result = schema.safeParse(input);

      if (!result.success) {
        console.log(result.error.message);
        const firstError = result.error.issues[0];
        return Response.json(
          {
            success: false,
            message: firstError.message,
            error: result.error.flatten(),
          },
          { status: 400 },
        );
      }

      const data = await handler({ context, input: result.data });

      // IF POST ITEM ALREADY EXIST
      if (data === "Exist") {
        return Response.json(
          { success: false, message: "Data already exist. Thank you!", data },
          { status: 400 },
        );
      }

      // IF ITEM DOES NOT EXIST
      if (data === "NotFound") {
        
        return Response.json(
          { success: false, message: "Item Not Found", data: [], status: 404 },
          { status: 404 },
        );
      }

      // IF INPUT IS SPAM
      if (data === "Spam") {
        return Response.json(
          { success: false, message: "Spam detected! Keep trying", data: [] },
          { status: 404 },
        );
      }

      // IF HAS ITEM DEPENDENTS
      if (data === "HasItem") {
        return Response.json(
          { success: false, message: "Has dependents!", data },
          { status: 400 },
        );
      }

      // IF EMPTY
      if (data === "Empty") {
        return Response.json(
          { success: true, message: "Not data found.", data: [] },
          { status: 200 },
        );
      }

      const responseData = data?.data ?? data;

      return Response.json(
        {
          success: true,
          message: "success",
          data: responseData,
          pagination: data.pagination || {},
        },
        { status: data.status ?? 200 },
      );
    } catch (ex) {
      console.log(ex);
      return Response.json(
        {
          success: false,
          message: ex instanceof Error ? ex.message : "Server Error",
        },
        { status: 500 },
      );
    }
  };
}
