'use client';

import { ButtonHTMLAttributes, useState } from 'react';

import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { RxReload } from 'react-icons/rx';

const button = tv({
  base: 'rounded-lg font-medium my-[0.2rem] text-center',
  variants: {
    size: {
      sm: 'h-[2.5rem]',
      md: 'h-[3rem]',
      lg: 'h-[6rem]',
      full: 'w-full h-[2.5rem]',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

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
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  const loadAnimation = (callback: any) => {
    if (!callback) return;
    callback(true);
    setTimeout(() => {
      callback(false);
    }, 1000);
  };

  return (
    <button
      data-loadingdelay={loadingAnimation}
      className={twMerge(
        button({ size: size }),
        className,
        'shadow flex align-center justify-center items-center text-center transition-all data-[loadingdelay=true]:opacity-50 gap-2'
      )}
      onClick={() => {
        loadAnimation(setLoadingAnimation);
      }}
      {...props}
    >
      {loadingAnimation && <RxReload className="w-4 h-4 animate-spin" />}{' '}
      {children}
    </button>
  );
}
