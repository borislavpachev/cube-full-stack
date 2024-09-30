import { type ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
};

export default function Form({ children }: FormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col m-10">
      {children}
    </form>
  );
}
