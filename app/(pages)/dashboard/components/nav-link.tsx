import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NavLinkProps extends LinkProps {
    children: any;
    className?: string;
}

export default function NavLink({ children, className, ...props }: NavLinkProps) {
    return (
        <Link {...props} className={twMerge('text-sm font-medium transition-colors hover:text-primary rounded p-2 data-[active=true]:bg-zinc-50 data-[active=true]:border data-[active=true]:border-black/10', className)}>
            {children}
        </Link>
    );
}