import { Button } from '@/components/buttons';
import {
  Form,
  FormInnerWrapper,
  FormTitle,
  Input,
  Label,
} from '@/components/form';
import { Section } from '@/components/layout';
import { useAuth, useForm } from '@/hooks';
import { updateCurrentUserData } from '@/services/userService';
import { validateText } from '@/utils/validations';
import toast from 'react-hot-toast';

type AddressForm = {
  street?: string;
  city?: string;
  additionalInfo?: string;
};

export default function Address() {
  const { user, setUser } = useAuth();
  const {form, updateForm} = useForm<AddressForm>({
    street: user?.deliveryAddress?.street || '',
    city: user?.deliveryAddress?.city || '',
    additionalInfo: user?.deliveryAddress?.additionalInfo || '',
  });

  const updateAddress = async () => {
    const { street = '', city = '', additionalInfo = '' } = form;

    if (!validateText(street)) {
      toast.error('Delivery address can not be empty!');
      return;
    }
    if (!validateText(city)) {
      toast.error('Address must have city!');
      return;
    }

    try {
      const result = await updateCurrentUserData({
        deliveryAddress: {
          street,
          city,
          additionalInfo,
        },
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Address updated successfully');
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
          title="Manage Address"
          description="Where would you like to receive your orders"
        />
        <Form>
          <Label htmlFor="user-street">Street, Area, Building, №</Label>
          <Input
            value={form.street || ''}
            id="user-street"
            name="user-street"
            placeholder="Address"
            onChange={updateForm('street')}
          />
          <Label htmlFor="user-city">City</Label>
          <Input
            value={form.city || ''}
            id="user-city"
            name="user-city"
            placeholder="City"
            onChange={updateForm('city')}
          />
          <Label htmlFor="user-address-info">Additional info</Label>
          <Input
            value={form.additionalInfo || ''}
            id="user-address-info"
            name="user-address-info"
            placeholder="Additional info (Optional)"
            onChange={updateForm('additionalInfo')}
          />
          <Button
            type="submit"
            onClick={updateAddress}
            disabled={!form.street && true}
          >
            Update Address
          </Button>
        </Form>
      </FormInnerWrapper>
    </Section>
  );
}
