import { type ReactNode } from 'react';

type FormTitleProps = {
  children: ReactNode;
};

export default function FormTitle({ children }: FormTitleProps) {
  return (
    <h1 className="mt-14 mx-10 p-5 font-semibold shadow-md tracking-widest text-center text-3xl text-black bg-white/30 rounded">
      {children}
    </h1>
  );
}
