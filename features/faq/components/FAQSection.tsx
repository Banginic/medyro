"use client";

import { motion } from "framer-motion";
import FAQCard from "./FAQCard";
import { faqData } from "../constants";
import SectionHeading from "@/components/share/SectionHeading";

export default function FAQSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.1, once: true }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="max-w-3xl  mx-auto p-4 py-24 "
    >
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Find quick answers about our services, appointments, consultations, and what to expect when you visit St. Sylvester Medical Foundation."
      />
      <ul className="space-y-4 mt-12">
        {faqData.slice(0, 6).map((item, index) => (
          <FAQCard key={index} item={item} index={index} />
        ))}
      </ul>
    </motion.section>
  );
}
