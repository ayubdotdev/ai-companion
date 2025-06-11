"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      className="companion-card bg-emerald-50	 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <motion.div 
            className="size-[72px] flex items-center justify-center rounded-lg"
            style={{ backgroundColor: color }}
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
              className="text-xl dark:text-black font-bold"
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
            className="subject-badge"
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
      </div>

      <Link href={`/companions/${id}`} className="w-full mt-2" onClick={handleClick}>
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`btn-primary w-full justify-center gap-2 bg-black hover:bg-black/90 flex items-center ${isLoading ? 'animate-pulse' : ''}`}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isLoading ? "Launching..." : "Launch Session"}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default CompanionCard;