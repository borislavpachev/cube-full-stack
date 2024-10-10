import { type ReactNode } from 'react';

type FormInnerWrapperProps = {
  children: ReactNode;
};

export default function FormInnerWrapper({ children }: FormInnerWrapperProps) {
  return <div className="max-w-md w-full">{children}</div>;
}
