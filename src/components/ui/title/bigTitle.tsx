type BigTitleProps = {
  title: string;
};

export default function BigTitle({ title }: BigTitleProps) {
  return (
    <h1 className="uppercase text-3xl sm:text-7xl hover:font-semibold duration-500 border-b-2 border-black">{title}</h1>
  );
}
