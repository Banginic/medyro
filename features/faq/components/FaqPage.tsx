"use client";

import { useState } from "react";
import FAQCard from "./FAQCard";
import { faqData } from "../constants";
import { Title } from "@/components/index";
import PageHeading from "@/components/share/PageHeading";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl min-h-screen mx-auto p-4 py-16 2xl:py-24">
      <PageHeading title="Frequently Asked Questions" />
      <ul className="space-y-4 mt-12">
        {faqData.map((item, index) => (
          <FAQCard key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}
