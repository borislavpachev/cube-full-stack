import { TooltipButton, TooltipContent } from '../buttons';

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
      <TooltipButton
        content={
          <TooltipContent>
           <b className='underline mb-1'>Formats:</b>
            <br />
            0123456789
            <br />0 123 456 789
            <br /> +359-882-392-168
            <br />
            +1(123) 456-7890
          </TooltipContent>
        }
      >
        <div className="flex bg-slate-100 p-3 rounded-l border border-blue-200">
          <button>
            <img
              src="/images/info-circle.svg"
              alt="info-circle"
              width={29}
              height={29}
            />
          </button>
        </div>
      </TooltipButton>
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
