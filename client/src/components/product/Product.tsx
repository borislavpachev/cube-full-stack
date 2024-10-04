import { Button } from '../buttons';

export default function Product() {
  return (
    <div
      className="flex flex-col space-y-10 md:p-10 md:space-y-0 md:space-x-10 md:flex-row bg-white 
      shadow-xl rounded p-8 m-6"
    >
      <div>
        <img
          src="/images/Front.png"
          alt="product"
          className="mx-auto w-64 hover:scale-110 duration-300 rounded"
        />
      </div>

      <div className="w-[300px] text-center md:text-left text-black">
        <div className="flex items-center justify-between">
          <h1 className="mt-3 text-5xl font-bold">Cube #1</h1>
          <div className="mr-1 mt-auto">
            <img
              src="/images/heart.svg"
              alt="favorite-button"
              width={45}
              height={45}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Cube #1 description text here
        </p>
        <p className="mt-6 text-3xl font-bold">$25</p>

        <div className="flex items-center justify-between mt-8 mb-2">
          <select name="sizes" id="select-sizes">
            <option value="extra-small">XS</option>
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="extra-large">XL</option>
            <option value="double-extra-large">XXL</option>
          </select>

          <div className="flex items-center text-sm mr-1">
            <div className="inline-block mr-1 rounded-full bg-green-400 w-2 h-2 hover:animate-ping"></div>
            <span className="font-semibold">50+ pcs left in stock.</span>
          </div>
        </div>

        <Button onClick={() => {}} disabled={false}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
