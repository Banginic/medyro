"use client";
import { use } from "react";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const paramsId = use(params);
  return <div>Page</div>;
}

export default Page;
