'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <Navbar className="top-0">
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

                {/* Center Navigation */}
                <NavItems items={navItems} className="flex-1" onItemClick={handleLinkClick} />

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
                        <Link key={item.link} href={item.link} onClick={handleLinkClick} className="block w-full px-2 py-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">
                            {item.name}
                        </Link>
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
        </Navbar>
    );
};

export default Navigation;
