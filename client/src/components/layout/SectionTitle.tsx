import { type ReactNode } from 'react';

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h1 className="text-2xl uppercase border-2 border-t-blue-200 text-center bg-transparent backdrop-blur-xl rounded-t p-6 -mb-1">
      {children}
    </h1>
  );
}
