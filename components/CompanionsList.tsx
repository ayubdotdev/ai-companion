"use client";

import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleClick = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full space-y-8 px-4  md:px-6 bg-rose-50	lg:px-8", classNames)}
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>

      {companions?.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-center py-8"
        >
          No companions found
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 pb-8">
          <AnimatePresence>
            {companions?.map(({id, subject, name, topic, duration}, index) => (
              <motion.div
                key={`${id}-${index}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                className="companion-card bg-emerald-50 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="size-[42px] flex items-center justify-center rounded-lg"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35}
                        className="transition-transform duration-300"
                      />
                    </motion.div>
                    <div className="flex flex-col gap-1">
                      <motion.h3 
                        className=" font-bold"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {name}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {topic}
                      </motion.p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className=" bg-black/90		subject-badge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {subject}
                    </motion.div>
                    <motion.div 
                      className="duration-badge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {duration} min
                    </motion.div>
                  </div>

                  <Link href={`/companions/${id}`} className="w-full mt-2" onClick={() => handleClick(id)}>
                    <motion.button
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`btn-primary w-full justify-center gap-2 bg-black hover:bg-black/90 flex items-center ${loadingStates[id] ? 'animate-pulse' : ''}`}
                      disabled={loadingStates[id]}
                    >
                      {loadingStates[id] && <Loader2 className="w-5 h-5 animate-spin" />}
                      {loadingStates[id] ? "Launching..." : "Launch Session"}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default CompanionsList;