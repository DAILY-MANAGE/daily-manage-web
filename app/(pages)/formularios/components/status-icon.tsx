import { ReactNode } from 'react';

interface StatusIconProps {
  icon: ReactNode;
}

export default function StatusIcon({ icon: Icon }: StatusIconProps) {
  return <Icon className="w-4 h-4" />;
}
