import { PropsWithChildren } from 'react';

export default function MidTitle({ children }: PropsWithChildren) {
  return <h2 className="sm:text-2xl font-bold sm:px-4 px-2">{children}</h2>;
}
