'use client';

import Link from 'next/link';
import React, {  useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarButton } from "@/components/ui/resizable-navbar";

const navItems = [
    { name: 'Home', link: '/home-content' },
    { name: 'Companions', link: '/companions' },
    { name: 'My Journey', link: '/my-journey' },
];

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
  
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Check if we're on the home page (root path)
    const isHomePage = pathname === '/';

    return (
        <Navbar className={`top-0 ${isHomePage ? 'bg-black' : 'bg-transparent'}`}>
            <NavBody>
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 relative z-20">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 md:gap-3 lg:gap-2 cursor-pointer"
                    >
                        <div className="flex items-center">
                            <GraduationCap className="w-10 h-10 text-gray-800 dark:text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-800 leading-none pt-1 dark:text-white">EduNova</span>
                    </motion.div>
                </Link>

                <NavItems 
                    items={navItems} 
                    className="flex-1" 
                    onItemClick={handleLinkClick}
                />

                {/* Right Side - Auth Buttons */}
                <div className="relative z-20 flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <NavbarButton variant="secondary">
                                Sign In
                            </NavbarButton>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <UserButton afterSignOutUrl="/" />
                        </motion.div>
                    </SignedIn>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <Link href="/" className="flex-shrink-0 relative z-20">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className="flex items-center">
                                <GraduationCap className="w-10 h-10 text-gray-800 dark:text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-800 leading-none pt-1 dark:text-white">EduNova</span>
                        </motion.div>
                    </Link>
                    <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
                </MobileNavHeader>

                <MobileNavMenu isOpen={isMobileMenuOpen} onClose={handleLinkClick}>
                    {navItems.map((item) => (
                        <a
                            key={item.link}
                            href={item.link}
                            onClick={(e) => {
                                handleLinkClick();
                              
                            }}
                            className={`
                                block w-full px-4 py-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 
                                font-medium transition-colors duration-200
                            `}
                        >
                            {item.name}
                        </a>
                    ))}

                    <div className="w-full border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <NavbarButton variant="secondary" className="w-full justify-center">
                                    Sign In
                                </NavbarButton>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex justify-center">
                                <UserButton afterSignOutUrl="/" />
                            </motion.div>
                        </SignedIn>
                    </div>
                </MobileNavMenu>
            </MobileNav>

            {/* Global Navigation Loader Overlay - Centered */}
            {/* {isNavigating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-[100] flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30 
                        }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 border border-gray-100 dark:border-gray-700"
                    >
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                            <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                Loading...
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Please wait while we navigate to your page
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )} */}
        </Navbar>
    );
};

export default Navigation;