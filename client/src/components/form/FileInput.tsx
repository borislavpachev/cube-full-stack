type FileInputProps = {
  id?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FileInput({
  id = '',
  disabled = false,
  onChange,
  ...props
}: FileInputProps) {
  return (
    <input
      id={id}
      type="file"
      disabled={disabled}
      className="text-lg border p-2 rounded border-black focus:outline-black
                    hover:file:disabled:cursor-not-allowed hover:file:disabled:bg-gray-100 hover:file:disabled:text-gray-500 hover:file:disabled:border-gray-300
                   file:bg-white file:rounded hover:file:bg-black hover:file:text-white hover:file:cursor-pointer"
      onChange={onChange}
      {...props}
    />
  );
}
