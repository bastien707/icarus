import LoginForm from "./login";
import { FormContainer } from "../formContainer";

export default async function Login() {
  return (
    <FormContainer>
        <LoginForm  title="Log in"/>
    </FormContainer>
  );
}
