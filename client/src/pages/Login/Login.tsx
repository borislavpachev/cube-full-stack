import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormTitle,
  FormWrapper,
  Input,
  Label,
} from '../../components/form';
import { MainLayout } from '../../components/layout';
import { Button } from '../../components/buttons';

import { login } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validations';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async () => {
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

      console.log(result);
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
      <FormWrapper>
        <FormTitle>Login</FormTitle>
        <Form>
          <Label htmlFor="login-email">Email:</Label>
          <Input
            id="login-email"
            name="email"
            placeholder="cube@cube.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="login-password">Password: </Label>
          <Input
            id="login-password"
            name="login-password"
            placeholder="********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={loginUser} disabled={!email && true}>
            Login
          </Button>
        </Form>

        <div className="mb-10 -mt-5 px-10 text-center">
          <p>
            Don`t have an account ?
            <span>
              <Link
                to="/sign-up"
                className="text-blue-500 font-bold ml-1 hover:underline-offset-2 hover:underline"
              >
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </FormWrapper>
    </MainLayout>
  );
}
