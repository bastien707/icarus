'use client';

export default function Input({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
}: React.ComponentPropsWithoutRef<'input'>) {
  const standardClass =
    'p-2 block w-full focus:outline-none ring-black focus:ring-1 focus:border-black shadow-sm sm:text-sm border-black border-2';
  return (
    <input
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${standardClass} ${className}`}
    />
  );
}
