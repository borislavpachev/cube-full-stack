import { type ReactNode } from 'react';

type FormOuterWrapperProps = {
  children: ReactNode;
};

export default function FormOuterWrapper({ children }: FormOuterWrapperProps) {
  return (
    <div className="flex md:w-2/3 items-center justify-center p-10">
      {children}
    </div>
  );
}
