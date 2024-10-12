import { Button } from '@/components/buttons';
import {
  Form,
  FormTitle,
  FormInnerWrapper,
  Input,
  Label,
  PhoneInput,
} from '@/components/form';
import { Section } from '@/components/layout';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { useForm } from '@/hooks';
import { updateCurrentUserData } from '@/services/userService';
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
} from '@/utils/validations';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export type UpdateForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};

export default function ProfileDetails() {
  const { user, setUser } = useContext(AuthContext) as AuthContextType;
  const [form, updateForm] = useForm<UpdateForm>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  });

  const updateMe = async () => {
    const {
      firstName = '',
      lastName = '',
      email = '',
      phoneNumber = '',
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
    try {
      const result = await updateCurrentUserData(form);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Profile updated successfully');
      setUser(result.data.user);
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  return (
    <Section>
      <FormInnerWrapper>
        <FormTitle
          title="Personal Information"
          description="Keep it up-to-date"
        />
        <Form>
          <Label htmlFor="update-first-name">First name</Label>
          <Input
            id="update-first-name"
            name="update-first-name"
            placeholder="First name"
            value={form.firstName || ''}
            onChange={updateForm('firstName')}
          />
          <Label htmlFor="update-last-name">Last name</Label>
          <Input
            id="update-last-name"
            name="update-last-name"
            placeholder="Last name"
            value={form.lastName || ''}
            onChange={updateForm('lastName')}
          />
          <Label htmlFor="update-user-email">Email address</Label>
          <Input
            id="update-user-email"
            name="update-user-email"
            placeholder="cube@cube.com"
            type="text"
            value={form.email || ''}
            onChange={updateForm('email')}
          />
          <Label htmlFor="update-user-phone">Phone number:</Label>
          <PhoneInput
            id="update-user-phone"
            name="update-user-phone"
            placeholder="+359 123 456 789"
            value={form.phoneNumber || ''}
            onChange={updateForm('phoneNumber')}
          />
          <Button type="submit" onClick={updateMe}>
            Update User
          </Button>
        </Form>
      </FormInnerWrapper>
    </Section>
  );
}
