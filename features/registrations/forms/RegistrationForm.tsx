import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingBTN } from "@/components/index";
import { CircleOff, Save, X } from "lucide-react";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { QUERY_KEYS } from "@/features/query-keys";
import { PharmacyTypes } from "@/features/pharmacy/types";
import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "../schemas/registrationSchema";
import { createRegistration } from "../actions/createRegistration";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CAMEROON_REGIONS } from "../contants";

function RegistrationForm() {
  const router = useRouter();
  function handleSubmitSuccess() {
    reset();
    router.push("/pharmacy");
  }

  const { mutate, isPending } = useMutate<
    PharmacyTypes,
    RegistrationSchemaType
  >({
    mutationFn: createRegistration,
    queriesToInvalidate: [[QUERY_KEYS.registration]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(RegistrationSchema),
  });

  const selectedRegion = watch("region");
  let selectedCities = undefined;

  if (selectedRegion) {
    selectedCities = CAMEROON_REGIONS.find(
      (item) => item.name === selectedRegion,
    );
  }

  const onSubmit = async (data: RegistrationSchemaType) => {
    mutate(data);
  };
  return (
    <Card className="p-4 lg:p-8 w-[98%] max-w-xl mx-auto relative">
      <CardHeader>
        <CardTitle>Registration Form</CardTitle>
        <CardDescription className="text-muted-foreground">
          Register your pharmacy using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground ">
                Pharmacy Name
              </Label>
              <Input
                {...register("name", { required: true })}
                placeholder="Ascos Pharmacy"
              />
              {errors.name && (
                <p className="text-red-500  text-xs ">{errors.name.message}</p>
              )}
            </div>
          </div>
          {/* PHONE NUMBER AND WHATSAPP=================================== */}
          <div className="flex justify-between gap-2 lg:gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">
                Phone number
              </Label>
              <Input
                {...register("phone", { required: true })}
                placeholder="672640914"
              />
              {errors.phone && (
                <p className="text-red-500  text-xs ">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">
                WhatsApp
              </Label>
              <Input
                {...register("whatsApp", { required: true })}
                placeholder="672640914"
              />
              {errors.whatsApp && (
                <p className="text-red-500  text-xs ">
                  {errors.whatsApp.message}
                </p>
              )}
            </div>
          </div>
          {/* REGION AND CITY =================================== */}
          <div className="flex justify-between gap-2 lg:gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">Region</Label>
              <select
                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-xs lg:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                {...register("region")}
              >
                <option value="">Select your region</option>
                {CAMEROON_REGIONS.map((item) => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}{" "}
              </select>
              {errors.region && (
                <p className="text-red-500  text-xs ">
                  {errors.region.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">
                City / Town
              </Label>
              <select
                disabled={!selectedRegion}
                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-xs lg:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                {...register("city")}
              >
                <option value="">Select your city</option>
                {selectedCities &&
                  selectedCities.towns.map((item) => (
                    <option value={item}>{item}</option>
                  ))}{" "}
              </select>
              {errors.city && (
                <p className="text-red-500  text-xs ">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* EMAIL AND ADDRESS=================================== */}
          <div className="flex justify-between gap-2 lg:gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">Email</Label>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-500  text-xs ">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">Address</Label>
              <Input
                {...register("address", { required: true })}
                placeholder="123, King street"
              />
              {errors.address && (
                <p className="text-red-500  text-xs ">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
              onClick={() => reset()}
              type="reset"
              title="Clear form"
              variant="secondary"
              size={"sm"}
            >
              <CircleOff />
              Clear
            </Button>
            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <div>
                  <LoadingBTN message="Saving..." />
                </div>
              ) : (
                <>
                  <Save />
                  Register
                </>
              )}
            </Button>
          </div>
        </form>
      </>
    </Card>
  );
}

export default RegistrationForm;
