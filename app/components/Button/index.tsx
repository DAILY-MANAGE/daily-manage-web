'use client';

import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
  theme?: string;
  className?: string;
}

export default function Button({
  children,
  size = 'md',
  theme = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const getClassesFromSize = (size: string) => {
    const sizeMap: Record<string, string> = {
      sm: 'h-[2.5rem]',
      md: 'h-[3rem]',
      lg: 'h-[6rem]',
      full: 'w-full h-[2.5rem]',
    };
    return sizeMap[size] || sizeMap.md;
  };

  function getClassesFromTheme(theme: string) {
    return `bg-${theme} text-${theme}-text hover:bg-${theme}-hover`;
  }

  const buttonClasses = twMerge(
    'rounded-lg font-medium my-[0.2rem] text-center',
    getClassesFromSize(size),
    getClassesFromTheme(theme),
    className
  );

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
}
