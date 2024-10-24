import { type ReactNode } from 'react';

type FormInnerWrapperProps = {
  size?: string;
  children: ReactNode;
};

export default function FormInnerWrapper({
  size='max-w-md',
  children,
}: FormInnerWrapperProps) {
  return <div className={`${size} w-full`}>{children}</div>;
}
