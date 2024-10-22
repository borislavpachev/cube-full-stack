import { type ReactNode } from 'react';

type ProductElementProps = {
  children: ReactNode;
};

export default function ProductElement({ children }: ProductElementProps) {
  return <p className="text-2xl font-semibold">{children}</p>;
}
