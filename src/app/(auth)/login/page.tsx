import LoginForm from "./login";
import { FormContainer } from "../../../components/ui/form/formContainer";

export default async function Login() {
  return (
    <FormContainer>
        <LoginForm  title="Log in"/>
    </FormContainer>
  );
}
