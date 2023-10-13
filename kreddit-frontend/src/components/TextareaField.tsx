import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  StylesProvider,
} from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

// type InputFieldProps = FieldHookConfig<any> & {
type TextAreaProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  cols: string;
};

export const TextareaField: React.FC<TextAreaProps> = ({ label, size: _, ...props }) => {
  // useField is a hook provided by formik that gives us access to the formik state and helpers
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>

      <Field
        style={{ width: '100%', height: '40vh', border: '1px solid #ccc' }}
        as='textarea'
        {...field}
        {...props}
        id={field.name}
      />

      {/* render error if error exists */}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
