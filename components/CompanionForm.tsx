"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.' }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
})

const CompanionForm = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const companion = await createCompanion(values);

            if (companion) {
                redirect(`/companions/${companion.id}`);
            } else {
                console.log('Failed to create a companion');
                redirect('/');
            }
        } catch (error) {
            console.error('Error creating companion:', error);
            setIsLoading(false);
        }
    }

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
            className="w-full max-w-2xl mx-auto"
        >
            <Form {...form}>
                <motion.form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Companion name</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Input
                                                placeholder="Enter the companion name"
                                                {...field}
                                                className="input"
                                            />
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="input">
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map((subject, index) => (
                                                        <motion.div
                                                            key={subject}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <SelectItem value={subject}>
                                                                {subject}
                                                            </SelectItem>
                                                        </motion.div>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.subject && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What should the companion help with?</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Textarea
                                                placeholder="Ex. Derivates & Integrals"
                                                {...field}
                                                className="input min-h-[100px]"
                                            />
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.topic && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="voice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Voice</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="input">
                                                    <SelectValue placeholder="Select the voice" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <SelectItem value="male">Male</SelectItem>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <SelectItem value="female">Female</SelectItem>
                                                    </motion.div>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.voice && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Style</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="input">
                                                    <SelectValue placeholder="Select the style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <SelectItem value="formal">Formal</SelectItem>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <SelectItem value="casual">Casual</SelectItem>
                                                    </motion.div>
                                                </SelectContent>
                                            </Select>
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.style && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated session duration in minutes</FormLabel>
                                    <FormControl>
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            <Input
                                                type="number"
                                                placeholder="15"
                                                {...field}
                                                className="input"
                                            />
                                        </motion.div>
                                    </FormControl>
                                    <AnimatePresence>
                                        {form.formState.errors.duration && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <FormMessage />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className={`btn-primary w-full justify-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 flex items-center ${isLoading ? 'animate-pulse' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {isLoading ? "Building..." : "Build Your Companion"}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.form>
            </Form>
        </motion.div>
    )
}

export default CompanionForm;