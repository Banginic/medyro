import { EmployeeType } from "@/features/employees/types";


export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function fetchEmployees(): Promise<EmployeeType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "https://banginic.vercel.app"}/api/employees/list-all-employees?limit=12`,
    {
      cache: "force-cache", // or "force-cache" if you want caching
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}