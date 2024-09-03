import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface CustomDropdownProps<T> {
  label?: string;
  items: { id: T; title: string }[];
  selectedItem: T | null;
  onChange: (id: T | null) => void;
  maxWidth?: string;
  size?: string;
  allowUnselect?: boolean;
}

const CustomDropdown = <T extends number | string>({
  label,
  items,
  selectedItem,
  onChange,
  maxWidth = "200px",
  size = "sm",
  allowUnselect = false,
}: CustomDropdownProps<T>) => {
  const handleItemClick = (id: T) => {
    if (allowUnselect && selectedItem === id) {
      onChange(null); // unselecting if the same item is clicked
    } else {
      onChange(id);
    }
  };

  const hoverBg = useColorModeValue("teal.100", "teal.400");
  const colorBg = useColorModeValue("teal.200", "teal.600");

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            variant="outline"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: "md", borderColor: "teal.500" }}
            size={size}
            maxWidth={maxWidth}
            padding="15px"
          >
            {label ? `${label}: ` : ""}
            {selectedItem !== null
              ? items.find((item) => item.id === selectedItem)?.title
              : "All"}
          </MenuButton>
          <MenuList boxShadow="md" p={2}>
            {items.map((item, index) => (
              <MenuItem
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                _hover={{ bg: hoverBg }}
                bg={selectedItem === item.id ? colorBg : ""}
                borderRadius="md"
                transition="background-color 0.2s"
                mb={index !== items.length - 1 ? 1 : 0}
              >
                {item.title}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default CustomDropdown;
