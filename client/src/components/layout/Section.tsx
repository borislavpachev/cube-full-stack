import { type ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <section
      className="w-full flex flex-col mt-10 md:mt-0
            items-center justify-center px-5 md:px-10"
    >
      {children}
    </section>
  );
}
