import { useState } from 'react';
import { MainLayout } from '../../components/layout';
import { Button } from '../../components/buttons';
import {
  Form,
  FormTitle,
  FormWrapper,
  Input,
  Label,
  PhoneInput,
} from '../../components/form';
import { signUp } from '../../services/authService';
import toast from 'react-hot-toast';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../utils/validations';
import { useNavigate } from 'react-router-dom';

export type SignUpFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const [form, setForm] = useState<SignUpFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  });
  const navigate = useNavigate();

  const updateForm =
    (prop: keyof SignUpFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: e.target.value });
    };

  const signUpUser = async () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      passwordConfirm,
    } = form;

    if (!validateName(firstName)) {
      toast.error('User must have a first name!');
      return;
    }
    if (!validateName(lastName)) {
      toast.error('User must have a last name!');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please provide a valid email');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Please provide a valid phone number');
      return;
    }
    if (!validatePassword(password) || !validatePassword(passwordConfirm)) {
      toast.error('Password / Password confirm must be at least 8 characters');
      return;
    }
    if (password !== passwordConfirm) {
      toast.error('Double-check your passwords fields before Sign up!');
      return;
    }

    try {
      const result = await signUp(form);
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
        <FormTitle>Sign Up</FormTitle>
        <Form>
          <Label htmlFor="first-name">First Name:</Label>
          <Input
            id="first-name"
            name="first-name"
            placeholder="First name"
            value={form.firstName}
            onChange={updateForm('firstName')}
          />
          <Label htmlFor="last-name">Last Name:</Label>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Last name"
            value={form.lastName}
            onChange={updateForm('lastName')}
          />
          <Label htmlFor="sign-up-email">Email:</Label>
          <Input
            id="sign-up-email"
            name="sign-up-email"
            placeholder="cube@cube.com"
            value={form.email}
            onChange={updateForm('email')}
          />

          <Label htmlFor="sign-up-phone">Phone number:</Label>
          <PhoneInput
            id="sign-up-phone"
            name="sign-up-phone"
            placeholder="+359 123 456 789"
            value={form.phoneNumber}
            onChange={updateForm('phoneNumber')}
          />
          <Label htmlFor="sign-up-password">Password: </Label>
          <Input
            id="sign-up-password"
            name="sign-up-password"
            placeholder="********"
            type="password"
            value={form.password}
            onChange={updateForm('password')}
          />
          <Label htmlFor="sign-up-passwordConfirm">Confirm Password: </Label>
          <Input
            id="sign-up-passwordConfirm"
            name="sign-up-passwordConfirm"
            placeholder="********"
            type="password"
            value={form.passwordConfirm}
            onChange={updateForm('passwordConfirm')}
          />
          <Button
            type="submit"
            onClick={signUpUser}
            disabled={(!form.password || !form.passwordConfirm) && true}
          >
            Sign Up
          </Button>
        </Form>
      </FormWrapper>
    </MainLayout>
  );
}
