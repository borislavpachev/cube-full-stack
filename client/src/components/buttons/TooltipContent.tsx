import { type ReactNode } from 'react';

type TooltipContentProps = {
  children: ReactNode;
};

export default function TooltipContent({ children }: TooltipContentProps) {
  return <>{children}</>;
}
