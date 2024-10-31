import { useState } from 'react';

type FormValues = { [key: string]: string | number };

export default function useForm<T extends FormValues>(initialValues: T) {
  const [form, setForm] = useState(initialValues);

  const updateForm =
    (prop: keyof T) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm({ ...form, [prop]: e.target.value });
    };

  const clearForm = () => setForm(initialValues);

  return { form, updateForm, setForm, clearForm } as const;
}
