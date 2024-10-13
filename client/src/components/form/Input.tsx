import { useState } from 'react';
import { ClosedEyeIcon, OpenEyeIcon } from '../icons';

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id = '',
  name = '',
  type,
  placeholder = '',
  autoComplete = 'off',
  value = '',
  onChange,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <input
          className="w-full text-lg border p-3 mb-5 rounded border-black focus:outline-black"
          id={id}
          name={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-7 right-1 p-1"
          >
            {showPassword ? (
              <OpenEyeIcon size={30} />
            ) : (
              <ClosedEyeIcon size={30} />
            )}
          </button>
        )}
      </div>
    </>
  );
}
