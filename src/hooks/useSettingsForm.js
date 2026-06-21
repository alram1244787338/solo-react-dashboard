import { useState, useCallback } from 'react';

const defaultValues = {
  theme: 'light',
  displayName: '管理员',
};

export function createSettingsForm(initialOverrides = {}) {
  const initialValues = { ...defaultValues, ...initialOverrides };
  return {
    getInitialValues: () => ({ ...initialValues }),
    getDefaultValues: () => ({ ...defaultValues }),
    handleChange: (formData, key, value) => ({
      ...formData,
      [key]: value,
    }),
  };
}

export function useSettingsForm(initialOverrides = {}) {
  const form = createSettingsForm(initialOverrides);
  const [formData, setFormData] = useState(form.getInitialValues);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((key, value) => {
    setFormData((prev) => form.handleChange(prev, key, value));
    setSaved(false);
  }, [form]);

  const handleSave = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaved(true);
  }, []);

  const handleReset = useCallback(() => {
    setFormData(form.getDefaultValues());
    setSaved(false);
  }, [form]);

  return {
    formData,
    saved,
    handleChange,
    handleSave,
    handleReset,
  };
}

export default useSettingsForm;
