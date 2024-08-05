import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface ErrorMessageProps {
  title?: string;
  description: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error",
  description,
}) => {
  const toast = useToast();

  useEffect(() => {
    if (description) {
      toast({
        title: title,
        description: description,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [description, title, toast]);

  return null;
};

export default ErrorMessage;
