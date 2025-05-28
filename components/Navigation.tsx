'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavItems from '../components/NavItems';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar flex items-center justify-between px-4 py-2 bg-white shadow-md w-full z-50"
        >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 md:gap-3 lg:gap-2 cursor-pointer"
                >
                    <div className="flex items-center">
                        <GraduationCap className="w-10 h-10 " />
                    </div>
                    <span className="text-xl font-bold text-gray-800 leading-none pt-1">EduNova</span>
                </motion.div>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
                <NavItems />
            </div>

            {/* Right Side - Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
                <SignedOut>
                    <SignInButton mode="modal">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-signin bg-white text-blue-600 rounded-md hover:bg-gray-100 transition p-2"
                            aria-label="Sign In"
                        >
                            <LogIn className="w-6 h-6" />
                        </motion.button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <UserButton />
                    </motion.div>
                </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2"
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-4 py-4 md:hidden z-50"
                    >
                        <NavItems onLinkClick={() => setMenuOpen(false)} />
                        <div className="w-full border-t border-gray-200 pt-4">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-signin bg-white text-blue-600 rounded-md hover:bg-gray-100 transition w-full p-2 flex items-center justify-center gap-2"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        <span>Sign In</span>
                                    </motion.button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <UserButton />
                                </motion.div>
                            </SignedIn>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;
