type FormTitleProps = {
  title: string;
  description?: string;
};

export default function FormTitle({ title, description }: FormTitleProps) {
  return (
    <div>
      <p className="text-3xl font-semibold mb-1">{title}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
