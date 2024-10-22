type ProductQuantityProps = {
  quantity: number;
  fontSize?: string;
  size?: string;
};

export default function ProductQuantity({
  quantity,
  fontSize,
  size,
}: ProductQuantityProps) {
  return (
    <p className={`${fontSize} mb-1`}>
      <span
        className={`inline-block mr-1 rounded-full ${
          quantity ? 'bg-green-400' : 'bg-red-400'
        } ${size==='small' ? 'w-2 h-2' : 'w-3 h-3'}`}></span>
      <span className="font-semibold">{`${quantity} pcs left in stock`}</span>
    </p>
  );
}
