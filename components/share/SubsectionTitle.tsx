'use client'

import { motion } from "framer-motion";

function SubsectionTitle({ text }: { text: string }) {
  return (
    <motion.h4
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      className="section-title  text-center"
    >
      {text}
    </motion.h4>
  );
}

export default SubsectionTitle;
