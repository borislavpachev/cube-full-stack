type ProductDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <div className="flex flex-col justify-start w-full md:px-20 my-14">
      <p className="text-2xl border-b-2 border-black w-fit">Full Description</p>
      <div className="border-b-2"></div>
      <p className="text-gray-500 text-lg my-3">{description}</p>
    </div>
  );
}
