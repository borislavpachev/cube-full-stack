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

  const updateForm =
    (prop: keyof SignUpFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: e.target.value });
    };

  const signUpUser = async () => {
    try {
      const user = await signUp(form);
      if (!user) return;

      console.log(user);
    } catch (error) {
      console.error(error);
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
            placeholder="123 456 789"
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
