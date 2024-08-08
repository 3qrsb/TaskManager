import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import { Category } from "../redux/categoriesSlice";

export const getStageIcon = (stage: string) => {
  switch (stage) {
    case "completed":
      return <CheckCircleIcon color="green.500" />;
    case "in_progress":
      return <InfoIcon color="blue.500" />;
    default:
      return null;
  }
};

export const getStageBadge = (stage: string) => {
  switch (stage) {
    case "completed":
      return <Badge colorScheme="green">Completed</Badge>;
    case "in_progress":
      return <Badge colorScheme="blue">In Progress</Badge>;
    default:
      return null;
  }
};

export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getCategoryTitle = (
  categories: Category[],
  categoryId: string | null
) => {
  const category = categories.find((category) => category.id === categoryId);
  return category ? category.title : "-";
};
