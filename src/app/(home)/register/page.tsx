import RegisterForm from "./register";

export default async function SignUp() {
  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="sm:w-1/2 lg:w-1/3 p-10 gap-4 shadow-md rounded-md bg-white ">
        <RegisterForm title='Create your account'/>
      </div>
    </div>
  );
}
