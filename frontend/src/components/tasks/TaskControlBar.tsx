import React from "react";
import { Box, Heading, Flex, Text, Badge, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CustomDropdown from "../UI/CustomDropdown";
import SearchBar from "../SearchBar";
import Button from "../UI/Button";

interface TaskControlBarProps {
  totalCount: number;
  searchTerm: string;
  categories: { id: number; title: string }[];
  selectedCategory: number | null;
  sortBy: string;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  onCategoryChange: (categoryId: number | null) => void;
  onSortChange: (sortOrder: string | null) => void;
  onCreateTask: () => void;
}

const TaskControlBar: React.FC<TaskControlBarProps> = ({
  totalCount,
  searchTerm,
  categories,
  selectedCategory,
  sortBy,
  onSearch,
  onClearSearch,
  onCategoryChange,
  onSortChange,
  onCreateTask,
}) => {
  return (
    <Box mb={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg">
          Tasks
        </Heading>
        <Box width="50%">
          <SearchBar
            onSearch={onSearch}
            onClearSearch={onClearSearch}
            searchTerm={searchTerm}
            placeholder="Search for tasks..."
          />
        </Box>
        <Button text="Add Task" onClick={onCreateTask} icon={<AddIcon />} />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text color="gray.500">
          {searchTerm ? (
            <>
              <Badge colorScheme="teal" mr={2}>
                {totalCount} {totalCount === 1 ? "task" : "tasks"}
              </Badge>
              found based on your search
            </>
          ) : (
            <>
              <Badge colorScheme="teal">
                {totalCount} {totalCount === 1 ? "task" : "tasks"}
              </Badge>
            </>
          )}
        </Text>
        <Stack direction="row" spacing={4} align="center">
          <CustomDropdown<number>
            label="Category"
            items={categories}
            selectedItem={selectedCategory}
            onChange={onCategoryChange}
            allowUnselect={true}
          />
          <CustomDropdown<string>
            label="Sort by"
            items={[
              { id: "created_at", title: "Old First" },
              { id: "-created_at", title: "New First" },
              { id: "-stage", title: "In Progress" },
              { id: "stage", title: "Completed" },
              { id: "title", title: "Title (a-z)" },
              { id: "-title", title: "Title (z-a)" },
            ]}
            selectedItem={sortBy}
            onChange={onSortChange}
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default TaskControlBar;
