import { type ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  className?: string;
};

export default function Form({
  children,
  className = 'flex-col my-10',
}: FormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={`${className} flex`}>
      {children}
    </form>
  );
}
