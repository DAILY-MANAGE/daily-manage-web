import { ReactNode } from 'react';

interface SubtitleProps {
  children: ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return (
    <p className="font-regular w-full text-zinc-500 text-sm text-left flex gap-2 align-center justify-start">
      {children}
    </p>
  );
}
