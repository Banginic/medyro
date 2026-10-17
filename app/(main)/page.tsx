import { Hero } from "@/components/index";

function MainPage() {
  return (
    <div className="  mt-24 2xl:mt-32 relative  ">
      <div className="bg-[url('/images/geena-bg.png')] bg-cover bg-center -translate-y-10">
        <Hero />
      </div>
     
    </div>
  );
}

export default MainPage;
