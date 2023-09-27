'use client';

type LabelProps = {
  labelName: string;
  htmlFor: string;
};

export default function Label({ labelName, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-lg py-3">
      {labelName}
    </label>
  );
}
