import { type ReactNode } from 'react';

type FormWrapperProps = {
  children: ReactNode;
};

export default function FormWrapper({ children }: FormWrapperProps) {
  return <div className="max-w-md w-full border-2 rounded m-5 backdrop-blur-2xl bg-white/30">{children}</div>;
}
