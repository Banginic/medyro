import RecentMessages from "@/features/contact/components/admin/RecentMessages";
import AdminCount from "@/features/dashboard/components/AdminCount";
import BlogCount from "@/features/dashboard/components/BlogCount";
import EmployeeCount from "@/features/dashboard/components/EmployeeCount";
import GalleryCount from "@/features/dashboard/components/GalleryCount";
import JobApplicationCount from "@/features/dashboard/components/JobApplicationCounts";
import JobCount from "@/features/dashboard/components/JobCount";
import MessageCount from "@/features/dashboard/components/MessageCount";
import ProductCount from "@/features/dashboard/components/ProductCount";

function AdmminHomepage() {
  return (
    <div className="max-w-5xl px-2 mx-auto py-16">
      <div className="px-8">
        <h1 className=" text-xl lg:text-2xl font-mano font-semibold">
          Welcome Geena Pharmacy
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6    gap-4 mt-12 justify-center lg:justify-start ">
        <MessageCount />

        <BlogCount />
        <EmployeeCount />
        <ProductCount />
        <AdminCount />
        <GalleryCount />
        <JobCount />
        <JobApplicationCount />
      </div>
      <RecentMessages />
    </div>
  );
}

export default AdmminHomepage;
