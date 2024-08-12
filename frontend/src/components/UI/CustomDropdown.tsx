import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface CustomDropdownProps<T> {
  label: string;
  items: { id: T; title: string }[];
  selectedItem: T | null;
  onChange: (id: T | null) => void;
  maxWidth?: string;
  size?: string;
}

const CustomDropdown = <T extends number | string>({
  label,
  items,
  selectedItem,
  onChange,
  maxWidth = "200px",
  size = "sm",
}: CustomDropdownProps<T>) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        borderRadius="md"
        boxShadow="sm"
        _hover={{ boxShadow: "md" }}
        _focus={{ boxShadow: "md", borderColor: "teal.500" }}
        size={size}
        maxWidth={maxWidth}
      >
        {label}:{" "}
        {selectedItem !== null
          ? items.find((item) => item.id === selectedItem)?.title
          : "All"}
      </MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item.id} onClick={() => onChange(item.id)}>
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CustomDropdown;
