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
  categoryId: number | null
) => {
  const category = categories.find((category) => category.id === categoryId);
  return category ? category.title : "-";
};

export const getPriorityLabel = (priority: string | number): string => {
  switch (priority) {
    case 1:
    case "1":
      return "H";
    case 2:
    case "2":
      return "M";
    case 3:
    case "3":
      return "L";
    default:
      return "";
  }
};

export const getPriorityColorScheme = (priority: string | number): string => {
  switch (priority) {
    case 1:
    case "1":
      return "red";
    case 2:
    case "2":
      return "yellow";
    case 3:
    case "3":
      return "green";
    default:
      return "gray";
  }
};
