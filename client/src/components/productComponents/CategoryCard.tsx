type CategoryCardProps = {
  category: { name: string; background: string };
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="w-[300px] bg-white group relative overflow-hidden rounded">
      <div className="transition-transform duration-500 ease-out group-hover:scale-75">
        <img
          src={category.background}
          className="bg-white w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black 
            group-hover:from-black group-hover:to-transparent group-hover:opacity-40"
      ></div>
      <h2
        className="absolute font-gope text-white transition ease-in duration-500 bottom-1 right-1 px-1 text-4xl
            group-hover:scale-105 group-hover:text-black"
      >
        {category.name}
      </h2>
    </div>
  );
}
