import { LoaderIcon } from 'react-hot-toast';

type LoadingProps = {
  top?: boolean;
};

export default function Loading({ top = true }: LoadingProps) {
  return (
    <div
      className={`w-full h-screen flex ${
        top ? 'items-start' : 'items-center'
      } justify-center`}
    >
      <LoaderIcon className="h-32 w-32" />
    </div>
  );
}
