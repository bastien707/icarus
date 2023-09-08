import { PiMagnifyingGlassBold } from 'react-icons/pi';

interface MainButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  disabled?: boolean;
  color?: string;
}

export default function MainButton({
  className,
  onClick,
  children,
  disabled,
  color = 'bg-icarus-yellow',
}: MainButtonProps) {
  const effect = `
      ${color} duration-200
      hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] 
      hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
      active:translate-x-[0.05em] active:translate-y-[0.05em] 
      active:shadow-[3px_3px_0px_0px_rgba(0,0,0)]
    `;

  if (children === 'Search') {
    return (
      <button className={`${effect} ${className}`} onClick={onClick} disabled={disabled}>
        <PiMagnifyingGlassBold className="text-2xl" />
      </button>
    );
  }

  return (
    <button className={`${effect} ${className}`} onClick={onClick} disabled={disabled}>
      {disabled ? 'Loading...' : children}
    </button>
  );
}
