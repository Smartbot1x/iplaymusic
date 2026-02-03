"use client";

import { motion } from "motion/react";

export default function Template({ children }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
