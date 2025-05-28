"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);
    const [isOpen, setIsOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        })
    };

    // useEffect(() => {
    //     let newUrl = "";
    //     if (subject === "all") {
    //         newUrl = removeKeysFromUrlQuery({
    //             params: searchParams.toString(),
    //             keysToRemove: ["subject"],
    //         });
    //     } else {
    //         newUrl = formUrlQuery({
    //             params: searchParams.toString(),
    //             key: "subject",
    //             value: subject,
    //         });
    //     }
    //     router.push(newUrl, { scroll: false });
    // }, [subject]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
        >
            <Select 
                onValueChange={setSubject} 
                value={subject}
                onOpenChange={setIsOpen}
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                </motion.div>
                <SelectContent>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <SelectItem value="all">All subjects</SelectItem>
                        </motion.div>
                        {subjects.map((subject, index) => (
                            <motion.div
                                key={subject}
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <SelectItem 
                                    value={subject} 
                                    className="capitalize"
                                >
                                    {subject}
                                </SelectItem>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </SelectContent>
            </Select>
        </motion.div>
    );
};

export default SubjectFilter;
