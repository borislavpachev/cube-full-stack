import { type ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section
      className="max-w-5xl bg-white rounded flex flex-col 
            items-center justify-center shadow-xl p-14"
    >
      {children}
    </section>
  );
}
