type BigTitleProps = {
  title: string;
};

export default function MidTitle({ title }: BigTitleProps) {
  return <h2 className="sm:text-2xl font-bold sm:px-4 px-2">{title}</h2>;
}
