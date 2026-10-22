import { projectDetails } from "@/constants/project-details";
import RecentMessages from "@/features/contact/components/admin/RecentMessages";
import AdminCount from "@/features/dashboard/components/AdminCount";
import BlogCount from "@/features/dashboard/components/BlogCount";
import MessageCount from "@/features/dashboard/components/MessageCount";
import PharmacyCount from "@/features/dashboard/components/PharmacyCount";

function AdmminHomepage() {
  return (
    <div className="max-w-5xl px-2 mx-auto py-16">
      <div className="px-8">
        <h1 className=" text-xl lg:text-2xl font-mano font-semibold">
          Welcome {projectDetails.projectName}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  px-6    gap-4 mt-12 justify-center  ">
        <PharmacyCount />
        <MessageCount />
        <BlogCount />
        <AdminCount />
      </div>
      <RecentMessages />
    </div>
  );
}

export default AdmminHomepage;
