import LoginForm from './Login';
import { FormContainer } from '../../../components/ui/form/FormContainer';

export default async function Login() {
  return (
    <FormContainer>
      <LoginForm title="Log in" />
    </FormContainer>
  );
}
