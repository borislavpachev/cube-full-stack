import { ROUTES } from '@/constants';
import { useNavigate, useParams } from 'react-router-dom';

type CategoryCardProps = {
  category: { name: string; background: string };
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();
  const {gender} = useParams();
  const categoryName = category.name.toLowerCase();
  
  return (
    <div
      className="max-w-xs shadow-2xl cursor-pointer bg-white group relative overflow-hidden rounded"
      onClick={() => {
        navigate(`${ROUTES.PRODUCTS}/${gender}/${categoryName}`);
      }}
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-75">
        <img
          src={category.background}
          className="bg-white w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black 
            group-hover:from-slate-200 group-hover:to-transparent group-hover:opacity-40"
      ></div>
      <h2
        className="absolute font-gope text-white transition ease-in duration-500 bottom-1 right-1 px-1 text-2xl md:text-4xl
            group-hover:scale-105 group-hover:text-black"
      >
        {category.name}
      </h2>
    </div>
  );
}
