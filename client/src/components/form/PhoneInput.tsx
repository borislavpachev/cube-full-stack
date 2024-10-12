import { TooltipButton, TooltipContent } from '../buttons';
import { InfoIcon } from '../icons';

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
    <div className="flex rounded text-lg border border-black focus-within:border-2 w-full mb-3 items-center justify-center">
      <TooltipButton
        content={
          <TooltipContent>
            <b className="underline">Formats:</b>
            <br />
            0123456789
            <br />0 123 456 789
            <br /> +359-882-392-168
            <br />
            +1(123) 456-7890
          </TooltipContent>
        }
      >
        <div className="flex bg-slate-200 p-3 rounded-l">
          <button>
            <InfoIcon size={29}/>
          </button>
        </div>
      </TooltipButton>
      <input
        className="w-full p-3 rounded focus:outline-none"
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
