import { useCallback, useEffect, useState } from 'react';

export const usePasswordField = (
  validation?: Function,
  extraDeps: any[] = [],
) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (touched && validation) {
        try {
          validation(input);
          setError(undefined);
        } catch (e) {
          setError(e.message);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [input, touched, ...extraDeps]);

  const handleChangeText = useCallback(text => {
    setInput(text);
    setError(undefined);
    setTouched(true);
  }, []);

  return {
    handleChangeText,
    input,
    error,
    touched,
    setError,
  };
};
