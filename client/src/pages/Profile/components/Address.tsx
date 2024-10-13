import { Button } from '@/components/buttons';
import {
  Form,
  FormInnerWrapper,
  FormTitle,
  Input,
  Label,
} from '@/components/form';
import { Section } from '@/components/layout';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { useForm } from '@/hooks';
import { updateCurrentUserData } from '@/services/userService';
import { validateText } from '@/utils/validations';
import { useContext } from 'react';
import toast from 'react-hot-toast';

type AddressForm = {
  street?: string;
  city?: string;
  additionalInfo?: string;
};

export default function Address() {
  const { user, setUser } = useContext(AuthContext) as AuthContextType;
  const [userStreet, userCity, addressAdditionalInfo] = user?.deliveryAddress
    ? user.deliveryAddress.split('###')
    : ['', '', ''];

  const [form, updateForm] = useForm<AddressForm>({
    street: userStreet || '',
    city: userCity || '',
    additionalInfo: addressAdditionalInfo || '',
  });

  const updateAddress = async () => {
    const { street = '', city = '' } = form;

    if (!validateText(street)) {
      toast.error('Delivery address can not be empty!');
      return;
    }
    if (!validateText(city)) {
      toast.error('Address must have city!');
      return;
    }
    const address = Object.values(form).join('###');

    try {
      const result = await updateCurrentUserData({ deliveryAddress: address });

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
