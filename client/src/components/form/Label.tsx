import { type ReactNode } from 'react';

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export default function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-1">
      {children}
    </label>
  );
}
