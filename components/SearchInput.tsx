'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {motion} from "framer-motion";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-sm"
        >
            <motion.div 
                className="flex items-center gap-2 border border-black rounded-full px-3 h-9 bg-white"
                animate={{
                    boxShadow: isFocused 
                        ? "0 0 0 2px rgba(59, 130, 246, 0.3)" 
                        : "0 0 0 0px rgba(59, 130, 246, 0)"
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    animate={{ scale: isFocused ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Image 
                        src="/icons/search.svg" 
                        alt="search" 
                        width={16} 
                        height={16} 
                    />
                </motion.div>
                <input
                    type="text"
                    placeholder="Search companions..."
                    className="flex-1 bg-transparent text-sm text-black placeholder:text-gray-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {searchQuery && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSearchQuery('')}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    );
};

export default SearchInput;
