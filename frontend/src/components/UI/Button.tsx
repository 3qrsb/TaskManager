import React from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactElement;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  text,
  colorScheme = "teal",
  size = "md",
  variant = "solid",
  ...props
}) => {
  return (
    <ChakraButton
      leftIcon={icon}
      colorScheme={colorScheme}
      size={size}
      variant={variant}
      {...props}
    >
      {text}
    </ChakraButton>
  );
};

export default CustomButton;
