type PhoneInputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PhoneInput({
  id = '',
  name = '',
  placeholder = '',
  autoComplete = 'off',
  value = '',
  onChange,
  ...props
}: PhoneInputProps) {
  return (
    <div className="flex rounded w-full mb-3 items-center justify-center">
      <div className="bg-slate-100 p-3 rounded-l border border-blue-200">+359</div>
      <input
        className="w-full border p-3 rounded-r focus:outline-blue-200"
        id={id}
        name={name}
        type="tel"
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
