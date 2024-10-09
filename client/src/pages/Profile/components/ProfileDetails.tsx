import {
  Form,
  FormTitle,
  FormWrapper,
  Input,
  Label,
  PhoneInput,
} from '@/components/form';
import { Section, SectionTitle } from '@/components/layout';

export default function ProfileDetails() {
  return (
    <>
      <SectionTitle>Profile Details</SectionTitle>
      <Section>
        <FormWrapper>
          <FormTitle>Update user</FormTitle>
          <Form>
            <Label htmlFor="update-first-name">Update first name:</Label>
            <Input
              id="update-first-name"
              name="update-first-name"
              placeholder="First name"
              value=""
              onChange={() => {}}
            />
            <Label htmlFor="update-last-name">Update last name:</Label>
            <Input
              id="update-last-name"
              name="update-last-name"
              placeholder="Last name"
              value=""
              onChange={() => {}}
            />
            <Label htmlFor="update-user-email">Update email:</Label>
            <Input
              id="update-user-email"
              name="update-user-email"
              placeholder="cube@cube.com"
              type="text"
              value=""
              onChange={() => {}}
            />
            <Label htmlFor="update-user-phone">Phone number:</Label>
            <PhoneInput
              id="update-user-phone"
              name="update-user-phone"
              placeholder="+359 123 456 789"
              value=""
              onChange={() => {}}
            />
          </Form>
        </FormWrapper>
      </Section>
    </>
  );
}
