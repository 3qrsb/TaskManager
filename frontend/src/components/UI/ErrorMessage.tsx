import React from "react";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface ErrorMessageProps {
  title?: string;
  description: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error",
  description,
}) => {
  return (
    <Box my={4}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">{description}</AlertDescription>
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
