import { PropsWithChildren } from 'react';

export default function BigTitle({ children }: PropsWithChildren) {
  return (
    <h1 className="uppercase text-3xl tracking-tighter sm:leading-tight sm:text-7xl hover:font-semibold duration-500 border-b-2 border-black">
      {children}
    </h1>
  );
}
