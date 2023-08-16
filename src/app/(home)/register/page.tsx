import RegisterForm from "./register";
import { FormContainer } from "../../../components/ui/form/formContainer";

export default async function SignUp() {
  return (
    <FormContainer>
      <RegisterForm title="Create your account" />
    </FormContainer>
  );
}
