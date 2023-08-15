type FormProps = {
  children: React.ReactNode;
};

export const FormContainer = ({ children }: FormProps) => {
  return (
    <div className="h-full w-screen flex justify-center items-center flex-col">
      <div className="w-4/5 sm:w-3/5 lg:w-1/3 p-10 my-10 border-2 border-black duration-500 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0)] ">
        {children}
      </div>
    </div>
  );
};
