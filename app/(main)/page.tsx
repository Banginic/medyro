import { Hero } from "@/components/index";
import RecentBlogs from "@/features/blogs/components/RecentBlogs";

function MainPage() {
  return (
    <div className="  mt-24 2xl:mt-32 relative  ">
      <div className=" -translate-y-10">
        <Hero />
      </div>
       <RecentBlogs/>
    </div>
  );
}

export default MainPage;
