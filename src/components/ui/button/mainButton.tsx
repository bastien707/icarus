import type { MainButtonProps } from '@/app/types/Button';

export default function MainButton({
  text,
  clickHandler,
  disabled,
  color = 'bg-icarus-yellow',
  margin = '',
}: MainButtonProps) {
  const buttonClass = `
      ${color} font-semibold py-2 px-5 border-2 duration-200 border-black 
      hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] 
      hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
      active:translate-x-[0.05em] active:translate-y-[0.05em] 
      active:shadow-[3px_3px_0px_0px_rgba(0,0,0)]
    `;

  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={`${buttonClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${margin}`}
    >
      {disabled ? 'Loading...' : text}
    </button>
  );
}
