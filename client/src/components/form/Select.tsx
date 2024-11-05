type SelectProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  className?: string;
};

export default function Select({
  id = '',
  name = '',
  value = '',
  onChange,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      className={`${
        className
          ? className
          : 'text-lg border border-black rounded focus:outline-black p-3'
      }`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
