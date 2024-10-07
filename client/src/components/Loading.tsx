export default function Loading() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <div className="flex space-x-10">
        <span className="animate-ping h-32 w-32 rounded-full bg-secondary"></span>
        <span className="animate-ping h-32 w-32 rounded-full bg-secondary"></span>
        <span className="animate-ping h-32 w-32 rounded-full bg-secondary"></span>
      </div>
    </div>
  );
}
