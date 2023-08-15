import RegisterForm from "./register";

export default async function SignUp() {
  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="sm:w-1/2 lg:w-1/3 p-10 gap-4 border-2 border-black duration-500 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0)] ">
        <RegisterForm title='Create your account'/>
      </div>
    </div>
  );
}
