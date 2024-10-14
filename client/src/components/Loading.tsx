import { LoaderIcon } from 'react-hot-toast';

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderIcon className="h-32 w-32" />
    </div>
  );
}
