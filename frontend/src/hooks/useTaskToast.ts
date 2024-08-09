import { useToast } from "@chakra-ui/react";

interface ToastOptions {
  title: string;
  description: string;
  status: "success" | "error";
}

const useTaskToast = () => {
  const toast = useToast();

  const showToast = ({ title, description, status }: ToastOptions) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return { showToast };
};

export default useTaskToast;
