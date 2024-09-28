import { useState } from 'react';

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
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
          className="w-full border p-3 mb-5 rounded focus:outline-blue-200"
          id={id}
          name={name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />

        {type === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-7 right-1 p-1"
          >
            {showPassword ? (
              <img
                src="/images/eye-open.svg"
                alt="eye-open"
                width={25}
                height={25}
                style={{
                  filter: `brightness(0) saturate(100%) invert(56%) sepia(0%) saturate(1%) hue-rotate(158deg) brightness(89%) contrast(90%)`,
                }}
              />
            ) : (
              <img
                src="/images/eye-closed.svg"
                alt="eye-closed"
                width={25}
                height={25}
                style={{
                  filter: `brightness(0) saturate(100%) invert(56%) sepia(0%) saturate(1%) hue-rotate(158deg) brightness(89%) contrast(90%)`,
                }}
              />
            )}
          </button>
        )}
      </div>
    </>
  );
}