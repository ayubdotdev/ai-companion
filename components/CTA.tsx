'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Cta = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
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
        <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="cta-section"
        >
            <motion.div 
                variants={itemVariants}
                className="cta-badge"
            >
                Start learning your way.
            </motion.div>
            
            <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold"
            >
                Build and Personalize Learning Companion
            </motion.h2>
            
            <motion.p 
                variants={itemVariants}
                className="text-gray-600"
            >
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </motion.p>
            
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                <Image 
                    src="images/cta.svg" 
                    alt="cta" 
                    width={362} 
                    height={232}
                    className="mx-auto"
                />
            </motion.div>
            
            <motion.button 
                variants={itemVariants}
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="btn-primary group"
            >
                <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Image 
                        src="/icons/plus.svg" 
                        alt="plus" 
                        width={12} 
                        height={12}
                    />
                </motion.div>
                <Link href="/companions/new">
                    <p>Build a New Companion</p>
                </Link>
            </motion.button>
        </motion.section>
    );
};

export default Cta;
