export default function CartNav() {
  return (
    <div className="w-full">
      <div className="hidden md:flex text-center border-b p-5 space-x-0 md:space-x-10 w-full">
        <p className="w-2/5 text-start">Products</p>
        <p className="w-1/5 text-start">Price</p>
        <p className="w-1/5 text-start">Quantity</p>
        <p className="w-1/5 text-start">Total</p>
      </div>
      <div className="border-b md:hidden"></div>
    </div>
  );
}
