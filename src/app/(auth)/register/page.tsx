import RegisterForm from './Register';
import { FormContainer } from '../../../components/ui/form/FormContainer';

export default async function SignUp() {
  return (
    <FormContainer>
      <RegisterForm title="Create your account" />
    </FormContainer>
  );
}
