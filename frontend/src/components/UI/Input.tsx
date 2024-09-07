import React from "react";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormHelperText,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  label?: string;
  hint?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, hint, error, ...props }) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput {...props} />
      {hint && <FormHelperText>{hint}</FormHelperText>}
      {error && <FormHelperText color="red.500">{error}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
