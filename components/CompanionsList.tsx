"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
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

  const rowVariants = {
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
      className={cn("w-full", classNames)}
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6"
      >
        {title}
      </motion.h2>

      <Table>
        <TableCaption>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500"
          >
            {companions?.length === 0 ? "No companions found" : "List of available companions"}
          </motion.p>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Companion</TableHead>
            <TableHead>Subject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {companions?.map(({id, subject, name, topic, duration}, index) => (
              <motion.tr
                key={id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div 
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                        whileHover={{ 
                          rotate: 5, 
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                      >
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                          className="transition-transform duration-300"
                        />
                      </motion.div>
                      <div className="flex flex-col gap-2">
                        <motion.p 
                          className="font-bold text-2xl group-hover:text-blue-600 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          {name}
                        </motion.p>
                        <motion.p 
                          className="text-lg text-gray-600"
                          whileHover={{ x: 5 }}
                        >
                          {topic}
                        </motion.p>
                      </div>
                    </motion.div>
                  </Link>
                </TableCell>
                <TableCell>
                  <motion.div 
                    className="subject-badge w-fit max-md:hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {subject}
                  </motion.div>
                  <motion.div 
                    className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                    style={{ backgroundColor: getSubjectColor(subject) }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={18}
                      height={18}
                    />
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default CompanionsList;