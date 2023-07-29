'use client'

import { ButtonHTMLAttributes } from 'react';

import { tv } from "tailwind-variants";
import { twMerge } from 'tailwind-merge';

const button = tv({
  base: 'rounded-lg font-medium my-[0.2rem] text-center',
  variants: {
    size: {
      sm: 'h-[2.5rem]',
      md: 'h-[3rem]',
      lg: 'h-[6rem]',
      full: 'w-full h-[2.5rem]',
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  }
})

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
  ...props
}: ButtonProps) {

  function getClassesFromTheme(theme: string) {
    return `bg-${theme} text-${theme}-text hover:bg-${theme}-hover`;
  }

  return (
    <button className={twMerge(button({size: size}), getClassesFromTheme(theme), className)} {...props}>
      {children}
    </button>
  );
}
