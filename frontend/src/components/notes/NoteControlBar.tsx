import React from "react";
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import CustomDropdown from "../UI/CustomDropdown";
import SearchBar from "../SearchBar";
import { AddIcon } from "@chakra-ui/icons";

interface NoteControlBarProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  searchTerm: string;
  onSortChange: (order: string | null) => void;
  sortOrder: string;
  toggleAdding: () => void;
}

const NoteControlBar: React.FC<NoteControlBarProps> = ({
  onSearch,
  onClearSearch,
  searchTerm,
  onSortChange,
  sortOrder,
  toggleAdding,
}) => {
  const sortOptions = [
    { id: "created_at", title: "Date Created" },
    { id: "title", title: "Title" },
  ];

  return (
    <VStack align="stretch" spacing={4} mb={4}>
      <Box>
        <SearchBar
          onSearch={onSearch}
          onClearSearch={onClearSearch}
          searchTerm={searchTerm}
          placeholder="Search notes..."
        />
      </Box>
      <Flex justifyContent="space-between">
        <CustomDropdown
          label="Sort By"
          items={sortOptions}
          selectedItem={sortOrder}
          onChange={onSortChange}
          maxWidth="200px"
          size="sm"
        />
        <Button
          onClick={toggleAdding}
          colorScheme="teal"
          leftIcon={<AddIcon />}
          size="sm"
        >
          Add Note
        </Button>
      </Flex>
    </VStack>
  );
};

export default NoteControlBar;
