'use client'
import { Back } from "@/components/index";
import SignUpForm from "@/features/auth/forms/SignUpForm";

function page() {
  return (
    <div className="h-screen py-24 px-4 relative grid place-items-center">
        <Back link="" name=""/>
      <SignUpForm />;
    </div>
  );
}

export default page;
