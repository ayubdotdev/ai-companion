'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavItems from '../components/NavItems';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <nav className="navbar flex items-center justify-between px-4 py-2 bg-white shadow-md w-full z-50">
            {/* Logo */}
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.png"
                        alt="EduNova Logo"
                        width={46}
                        height={44}
                        priority
                    />
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="btn-signin px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            <button
                className="md:hidden p-2"
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-4 py-4 md:hidden z-50">
                    <NavItems />
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="btn-signin px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
