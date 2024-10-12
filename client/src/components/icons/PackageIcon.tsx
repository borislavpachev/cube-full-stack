import { IconProps } from './types';

export default function PackageIcon({
  size = 30,
  fillColor = 'none',
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 13V22M12.5 13L4.5 8M12.5 13L20.5 8M8.5 5.5L16.5 10.5M4.5 8L12.5 3L20.5 8V17L12.5 22L4.5 17V8Z"
        stroke="#121923"
        strokeWidth="1.2"
      />
    </svg>
  );
}
