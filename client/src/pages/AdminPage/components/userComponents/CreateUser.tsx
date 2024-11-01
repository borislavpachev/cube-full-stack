import { CustomDialogTrigger } from '@/components/buttons';
import {
  Form,
  FormInnerWrapper,
  Input,
  Label,
  PhoneInput,
} from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { User } from '@/contexts/types';
import { useForm } from '@/hooks';
import { createUser } from '@/services/adminService';
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateText,
} from '@/utils/validations';
import { DialogTitle } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { CreateUserForm } from '../types';

type CreateUserProps = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function CreateUser({ setUsers }: CreateUserProps) {
  const { form, updateForm, clearForm } = useForm<CreateUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'User',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  });

  const createNewUser = async () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      passwordConfirm,
    } = form;

    if (!validateText(firstName)) {
      toast.error('User must have a first name!');
      return;
    }
    if (!validateText(lastName)) {
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
      const result = await createUser(form);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      const newUser = result.data.user;
      setUsers((prevUsers) => [...prevUsers, newUser]);

      toast.success('User created successfully !');
      clearForm();
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return (
    <div>
      <Dialog>
        <CustomDialogTrigger>
          <span>Create User</span>
        </CustomDialogTrigger>
        <DialogContent className="h-screen max-w-lg overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold mb-1">
              Create New Account
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter details
            </DialogDescription>
          </DialogHeader>
          <FormInnerWrapper>
            <Form>
              <Label htmlFor="new-user-first-name">First name:</Label>
              <Input
                id="new-user-first-name"
                name="new-user-first-name"
                placeholder="First name"
                value={form.firstName}
                onChange={updateForm('firstName')}
              />
              <Label htmlFor="new-user-last-name">Last name:</Label>
              <Input
                id="new-user-last-name"
                name="new-user-last-name"
                placeholder="Last name"
                value={form.lastName}
                onChange={updateForm('lastName')}
              />
              <Label htmlFor="new-user-email">Email:</Label>
              <Input
                id="new-user-email"
                name="new-user-email"
                placeholder="cube@cube.com"
                value={form.email}
                onChange={updateForm('email')}
              />
              <Label htmlFor="new-user-role">User role:</Label>
              <select
                id="new-user-role"
                name="new-user-role"
                className="text-lg border border-black mb-5 rounded focus:outline-black p-3"
                onChange={updateForm('role')}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <Label htmlFor="new-user-phone">Phone number:</Label>
              <PhoneInput
                id="new-user-phone"
                name="new-user-phone"
                placeholder="+359 123 456 789"
                value={form.phoneNumber}
                onChange={updateForm('phoneNumber')}
              />
              <Label htmlFor="new-user-password">Password: </Label>
              <Input
                id="new-user-password"
                name="new-user-password"
                placeholder="********"
                type="password"
                value={form.password}
                onChange={updateForm('password')}
              />
              <Label htmlFor="new-user-passwordConfirm">
                Confirm password:{' '}
              </Label>
              <Input
                id="new-user-passwordConfirm"
                name="new-user-passwordConfirm"
                placeholder="********"
                type="password"
                value={form.passwordConfirm}
                onChange={updateForm('passwordConfirm')}
              />
              <CustomDialogTrigger type="submit" onClick={createNewUser}>
                Create User
              </CustomDialogTrigger>
            </Form>
          </FormInnerWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
