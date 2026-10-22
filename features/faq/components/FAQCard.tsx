"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function FAQCard({ item, index }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <li
      className={`border ${openIndex === index ? "border-2 " : " border"}  hover:border-primary/30 rounded-lg p-4`}
    >
      <button
        onClick={() => toggle(index)}
        className="w-full text-left page-text  flex justify-between items-center text-foreground"
      >
        {item.question}
        <span>
          {openIndex === index ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>
      {openIndex === index && (
        <p className="mt-2 page-text border-t border-primary/30">{item.answer}</p>
      )}
    </li>
  );
}

export default FAQCard;
