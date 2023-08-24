import { Session } from 'next-auth';

export interface NavbarProps {
  session: Session | null;
  isHome?: boolean;
}
