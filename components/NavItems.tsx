'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
];

const NavItems = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          onClick={onLinkClick}
          className={cn(
            "text-base hover:text-blue-600 transition",
            pathname === href && "text-blue-600 font-semibold"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
