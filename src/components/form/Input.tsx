import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";

interface FormInputProps extends InputProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
}

const FormInput = ({
  label,
  helperText,
  name,
  control,
  isRequired,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, isTouched } }) => (
        <FormControl isRequired={isRequired}>
          <FormLabel htmlFor="email">{label}</FormLabel>
          <Input {...field} {...props} />
          {error && isTouched ? (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          ) : (
            <FormHelperText>{helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
export default FormInput;
