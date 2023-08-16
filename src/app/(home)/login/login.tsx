'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Field from '@/components/ui/form/Field';
import MainButton from '@/components/ui/button/MainButton';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface FormValues {
  email: string;
  password: string;
  [key: string]: string;
}

export default function LoginForm({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callbackUrl') || '/dashboard/overview';
  const error = searchParams.get('error') ? 'Invalid credentials' : '';
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const fields = [
    {
      htmlFor: 'email',
      labelName: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'test@test.com',
    },
    {
      htmlFor: 'password',
      labelName: 'Password',
      type: 'password',
      name: 'password',
      placeholder: '',
    },
  ];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      signIn('credentials', {
        email: formValues.email,
        password: formValues.password,
        callbackUrl: callBackUrl,
      });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        {fields.map(field => (
          <Field
            key={field.name}
            htmlFor={field.htmlFor}
            labelName={field.labelName}
            type={field.type}
            name={field.name}
            value={formValues[field.name]}
            placeholder={field.placeholder}
            changeHandler={handleChange}
          />
        ))}
        {error && <p className="text-red-500 text-sm py-2">{error}</p>}
        <p className="text-gray-500 text-sm py-2">
          Need to create an account ?{' '}
          <Link href="/register" className="underline underline-offset-2">
            Register
          </Link>
        </p>
        <MainButton text="Log in" disabled={loading} margin="my-3" />
      </form>
    </>
  );
}
