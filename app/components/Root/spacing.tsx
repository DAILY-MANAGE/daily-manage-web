import React, { ReactNode } from 'react';

interface SpacingProps {
  children: ReactNode;
}

export default function Spacing({ children }: SpacingProps) {
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-4 pt-3 md:p-8 md:pt-6">{children}</div>
    </div>
  );
}
