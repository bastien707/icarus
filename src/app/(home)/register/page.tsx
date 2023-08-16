import RegisterForm from './register';
import { FormContainer } from '../formContainer';

export default async function SignUp() {
  return (
    <FormContainer>
      <RegisterForm title="Create your account" />
    </FormContainer>
  );
}
