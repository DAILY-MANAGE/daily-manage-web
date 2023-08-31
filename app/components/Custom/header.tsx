import { ReactNode } from 'react';

interface HeaderProps {
  variant: string;
  children: ReactNode;
}

import { tv } from 'tailwind-variants';

const buttonVariants = tv({});

export default function Header({ variant = 'default', children }: HeaderProps) {
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className={buttonVariants({})}>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {children}
          </h2>
        </div>
      </div>
    </div>
  );
}
