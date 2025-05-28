'use client';
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
  };
export default function AnimatedHeading({ children }:Props) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl font-bold text-center mt-10 mb-6"
    >
      {children}
    </motion.h1>
  );
}
