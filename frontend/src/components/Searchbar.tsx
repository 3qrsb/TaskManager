import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClearSearch,
  searchTerm,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = () => {
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    onClearSearch();
  };

  return (
    <InputGroup size="md" ml={4} mr={4}>
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Search tasks..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <InputRightElement width="4.5rem">
        {localSearchTerm ? (
          <Button h="1.75rem" size="sm" onClick={handleClear}>
            <CloseIcon />
          </Button>
        ) : (
          <Button h="1.75rem" size="sm" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
