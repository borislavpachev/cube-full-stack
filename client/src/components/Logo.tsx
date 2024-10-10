import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <p
      className="font-gope text-3xl md:text-5xl cursor-pointer"
      onClick={() => {
        navigate('/');
      }}
    >
      CUBE
    </p>
  );
}
