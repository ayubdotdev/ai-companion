'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: 'Home', href: '/home-content' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
    >
      {navItems.map(({ label, href }, index) => (
        <motion.div
          key={label}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative"
        >
          <Link
            href={href}
            onClick={onLinkClick}
            className={cn(
              "text-base transition relative group block py-1 px-2 font-medium",
              pathname === href ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
            )}
          >
            {label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NavItems;
