type ProductQuantityProps = {
  quantity: number;
  fontSize?: string;
  size: number;
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
        } w-${size} h-${size}`}
      ></span>
      <span className="font-semibold">{`${quantity} pcs left in stock`}</span>
    </p>
  );
}
