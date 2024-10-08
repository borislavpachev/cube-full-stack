import { type ReactNode } from 'react';

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h1 className="text-2xl uppercase border-2 border-t-blue-200 text-center bg-white/30 rounded-t p-6 -mb-2">
      {children}
    </h1>
  );
}
