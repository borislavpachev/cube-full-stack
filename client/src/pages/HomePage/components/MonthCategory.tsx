import { Button } from '@/components/buttons';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

export default function MonthCategory() {
  const navigate = useNavigate();

  const thisMonth = new Date().getMonth() + 1;
  const thisYear = new Date().getFullYear();
  const today = new Date().getDate();

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const offerLastsInDays = daysInMonth(thisYear, thisMonth) - today;

  return (
    <div className="flex flex-col md:flex-row px-20">
      <div className="flex flex-col md:flex-row w-full p-10 text-start md:text-end bg-slate-200">
        <div className="w-full md:w-1/2">
          <img
            src="./categories/Space.png"
            alt="Category of the Month"
            className=" object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col text-4xl md:text-5xl justify-center uppercase">
          <p>Category</p>
          <p>of the</p>
          <p className="font-extrabold">Month</p>

          <div className="text-center mt-10">
            <Button onClick={() => navigate(`${ROUTES.PRODUCTS}`)}>Space</Button>
          </div>

          <div className="mt-10 text-2xl capitalize">
            <p>
              enjoy <span className="font-extrabold">20% OFF</span>
            </p>

            <p className="md:text-3xl">
              Only
              <span className="mx-1 font-extrabold">{offerLastsInDays}</span>
              days left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
