import { Button } from '@/components/buttons';
import {
  Form,
  FormTitle,
  FormInnerWrapper,
  Input,
  Label,
} from '@/components/form';
import { Section } from '@/components/layout';
import { useForm } from '@/hooks';
import { updateCurrentUserPassword } from '@/services/userService';
import { validatePassword } from '@/utils/validations';
import toast from 'react-hot-toast';
import DeleteMe from './DeleteMe';

type NewPasswordForm = {
  newPassword: string;
  passwordConfirm: string;
};

export default function Security() {
  const [form, updateForm, clearForm] = useForm<NewPasswordForm>({
    newPassword: '',
    passwordConfirm: '',
  });

  const updatePassword = async () => {
    const { newPassword, passwordConfirm } = form;

    if (!validatePassword(newPassword) || !validatePassword(passwordConfirm)) {
      toast.error('Password / Password confirm must be at least 8 characters');
      return;
    }
    try {
      const result = await updateCurrentUserPassword(
        newPassword,
        passwordConfirm
      );

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Your password has been updated successfully!');
      clearForm();
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
          title="Update password"
          description="The new password must be at least 8 characters"
        />
        <Form>
          <Label htmlFor="new-password">New Password:</Label>
          <Input
            id="new-password"
            name="new-password"
            placeholder="********"
            type="password"
            value={form.newPassword}
            onChange={updateForm('newPassword')}
          />
          <Label htmlFor="new-password">Confirm New Password:</Label>
          <Input
            id="confirm-new-password"
            name="confirm-new-password"
            placeholder="********"
            type="password"
            value={form.passwordConfirm}
            onChange={updateForm('passwordConfirm')}
          />
          <Button
            disabled={(!form.newPassword || !form.passwordConfirm) && true}
            type="submit"
            onClick={updatePassword}
          >
            Update Password
          </Button>
        </Form>
      </FormInnerWrapper>
      <DeleteMe />
    </Section>
  );
}
