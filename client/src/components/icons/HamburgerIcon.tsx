import { IconProps } from './types';

export default function HamburgerIcon({
  size = 30,
  fillColor = '#000000',
}: IconProps) {
  return (
    <svg
      fill="#000000"
      width={size}
      height={size}
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1920 1468.412v112.94H0v-112.94h1920Zm0-564.706v112.941H0V903.706h1920ZM1920 339v112.941H0V339h1920Z"
        fill={fillColor}
      />
    </svg>
  );
}
