'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Field from '@/components/ui/form/Field';
import { useRouter } from 'next/navigation';
import MainButton from '@/components/ui/button/MainButton';
import Link from 'next/link';
import { route } from '@/lib/constants';

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  ethAddress: string;
  [key: string]: string;
}

export default function RegisterForm({ title }: { title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<RegisterForm>({
    email: '',
    password: '',
    name: '',
    ethAddress: '',
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
    {
      htmlFor: 'name',
      labelName: 'Name',
      type: 'text',
      name: 'name',
      placeholder: 'John Doe',
    },
    {
      htmlFor: 'ethAddress',
      labelName: 'Ethereum Address',
      type: 'text',
      name: 'ethAddress',
      placeholder: '0x...',
    },
  ];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        const errorMessage = (await res.json()).message;
        alert(errorMessage);
        return;
      }

      router.push('/login');
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
        <p className="text-gray-500 text-sm py-2">
          Have an account ?{' '}
          <Link href={route.LOGIN} className="underline underline-offset-2">
            Login
          </Link>
        </p>
        <MainButton disabled={loading} className="my-3 font-semibold py-2 px-5 border-2 border-black">
          Register
        </MainButton>
      </form>
    </>
  );
}
