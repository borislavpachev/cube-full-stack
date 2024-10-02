import { useState } from 'react';

type FormValues = { [key: string]: string };

export default function useForm<T extends FormValues>(initialValues: T) {
  const [form, setForm] = useState(initialValues);

  const updateForm =
    (prop: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: e.target.value });
    };

  return [form, updateForm] as const;
}
