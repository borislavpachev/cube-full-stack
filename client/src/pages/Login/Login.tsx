import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label } from '../../components/form';
import { Button } from '../../components/buttons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (user) {
  //     navigate(location.state?.from.pathname || '/main');
  //   }
  // }, [user]);

  // const login = async () => {
  //   if (form.email.length === 0) {
  //     toast.error('Email cannot be empty');
  //   } else if (form.password.length < 8) {
  //     toast.error('Password must be at least 8 characters');
  //   } else {
  //     try {
  //       const userCredentials = await loginUser(form.email, form.password);
  //       setAppState({ user: userCredentials.user, userData: null });
  //     } catch (error) {
  //       if (error.message.includes('auth/')) {
  //         toast.error('Username or password do not match.');
  //       } else {
  //         toast.error('Something went wrong! Please try again.');
  //       }
  //     }
  //   }
  // };

  const login = () => {
    console.log(1);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-200 to-blue-950">
      <div className="flex mb-[340px] ml-[80px]">
        <img
          src="/images/no-bg-cube.png"
          alt="cube"
          className="rotate-90 w-2/3"
        />
      </div>
      <div className="absolute max-w-md w-full border-2 rounded m-5 backdrop-blur-sm">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col m-10"
        >
          {' '}
          <h1 className="mb-10 p-5 font-semibold shadow-md text-center text-3xl text-white bg-white/10 rounded">
            Login
          </h1>
          <Label htmlFor="login-email">Email:</Label>
          <Input
            id="login-email"
            name="email"
            placeholder="cube@cube.com"
            type="e-mail"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <Label htmlFor="login-password">Password: </Label>
          <Input
            id="login-password"
            name="password"
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e)}
          />
        </form>

        <div className="flex flex-col mb-5 px-10 space-y-5">
          <Button onClick={login} disabled={!email && true}>
            Login
          </Button>

          <div className="text-center">
            <p>
              Don`t have an account ?
              <span>
                <Link
                  to="/sign-up"
                  className="text-blue-500 font-bold ml-1 hover: underline-offset-2 hover:underline"
                >
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
