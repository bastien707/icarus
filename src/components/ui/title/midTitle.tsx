import { PropsWithChildren } from 'react';

export default function MidTitle({ children }: PropsWithChildren) {
  return <h2 className="text-2xl tracking-tight font-medium sm:px-4 px-2">{children}</h2>;
}
