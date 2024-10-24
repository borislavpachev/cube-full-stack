type TextareaProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  id = '',
  name = '',
  placeholder = '',
  autoComplete = 'off',
  value = '',
  onChange,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className="w-full text-lg border p-3 mb-5 rounded border-black focus:outline-black"
      id={id}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
