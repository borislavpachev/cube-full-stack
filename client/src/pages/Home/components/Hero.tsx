import { Button } from '@/components/buttons';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row px-10">
      <div className="flex flex-col w-full items-start p-10 bg-slate-100">
        <div className="text-3xl md:text-7xl">
          <p>The</p>
          <p className="font-extrabold tracking-widest border-2 border-black p-2">
            Geometry
          </p>
          <p>Of</p>
          <p className="font-thin italic">Style</p>
        </div>

        <div className="mt-8 w-full md:w-1/2 md:mt-16">
          <Button
            onClick={() => {
              navigate('/products');
            }}
          >
            Shop Now
          </Button>
        </div>

        <div className="hidden md:flex w-full mt-10 -mr-10 -mb-10 justify-end">
          <p className="cursor-default font-gope text-9xl text-slate-300">
            CUBE
          </p>
        </div>
      </div>
      <div>
        <img
          src="/images/Front.png"
          alt="Front of Product"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
