import { useState } from 'react';

type FormValues = { [key: string]: string };

export default function useForm<T extends FormValues>(initialValues: T) {
  const [form, setForm] = useState(initialValues);

  const updateForm =
    (prop: keyof T) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm({ ...form, [prop]: e.target.value });
    };

  const clearForm = () => setForm(initialValues);

  return [form, updateForm, clearForm] as const;
}
