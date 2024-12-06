import {
  Form,
  FormOuterWrapper,
  FormInnerWrapper,
  Input,
  Label,
  FormTitle,
} from '../../components/form';
import { MainLayout } from '../../components/layout';
import { Button } from '../../components/buttons';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validations';
import toast from 'react-hot-toast';
import { useAuth, useForm } from '@/hooks';
import { useEffect } from 'react';
import { Logo } from '@/components';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const { form, updateForm } = useForm<LoginForm>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user, navigate, location]);

  const loginUser = async () => {
    const { email, password } = form;

    if (!validateEmail(email)) {
      toast.error('Please provide a valid email');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    try {
      const result = await login(email, password);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setUser(result.user);
      setIsAuthenticated(true);

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  return (
    <MainLayout>
      <div className="relative">
        <div className="absolute left-2 top-3">
          <Logo />
        </div>
        <img
          src="/images/Front.png"
          alt="Image of Product"
          className="w-full h-full object-cover"
        />
      </div>

      <FormOuterWrapper>
        <FormInnerWrapper>
          <FormTitle title="Welcome 👋" description="Please login here" />
          <Form>
            <Label htmlFor="login-email">Email Address</Label>
            <Input
              id="login-email"
              name="email"
              placeholder="cube@cube.com"
              value={form.email}
              onChange={updateForm('email')}
            />
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="login-password"
              placeholder="********"
              type="password"
              value={form.password}
              onChange={updateForm('password')}
            />
            <Button
              type="submit"
              onClick={loginUser}
              disabled={!form.email && true}
            >
              Login
            </Button>
          </Form>

          <div className="mb-10 -mt-5 px-10 text-center">
            <p>
              Don`t have an account ?
              <span>
                <Link
                  to="/sign-up"
                  className="font-bold ml-1 hover:underline-offset-2 hover:underline"
                >
                  Sign up
                </Link>
              </span>
            </p>
          </div>
        </FormInnerWrapper>
      </FormOuterWrapper>
    </MainLayout>
  );
}
