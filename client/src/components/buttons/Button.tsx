import { type ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
};

export default function Button({
  onClick,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className="w-full py-3 px-3 tracking-wider border-black border-2 rounded transition-colors ease-in duration-300
          hover:border-transparent hover:bg-black hover:text-white
          disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}