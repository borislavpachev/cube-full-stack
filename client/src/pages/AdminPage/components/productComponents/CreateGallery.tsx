import { UserIcon } from '@/components/icons';

type CreateGalleryProps = {
  frontCover: string;
  backCover: string;
};

export default function CreateGallery({
  frontCover,
  backCover,
}: CreateGalleryProps) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-2">
      {!frontCover ? (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-10 md:w-1/2 bg-slate-200">
          <UserIcon />
          <p>No Front Image</p>
        </div>
      ) : (
        <img
          className="w-full md:w-1/2 object-cover"
          src={frontCover}
          alt="text"
        />
      )}
      {!backCover ? (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full p-10 md:w-1/2 bg-slate-200">
          <UserIcon />
          <p>No Back Image</p>
        </div>
      ) : (
        <img
          className="w-full md:w-1/2 object-cover"
          src={backCover}
          alt="text"
        />
      )}
    </div>
  );
}
