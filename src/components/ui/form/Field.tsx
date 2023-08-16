'use client';

import Label from './Label';
import Input from './Input';
import { ChangeEvent } from 'react';

interface FieldProps {
  labelName: string;
  htmlFor: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Field({ labelName, htmlFor, type, name, value, placeholder, changeHandler }: FieldProps) {
  return (
    <div className="mt-4">
      <Label labelName={labelName} htmlFor={htmlFor} />
      <Input type={type} name={name} value={value} placeholder={placeholder} changeHandler={changeHandler} />
    </div>
  );
}
