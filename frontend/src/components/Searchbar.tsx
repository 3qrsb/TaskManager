import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClearSearch: () => void;
  searchTerm: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClearSearch,
  searchTerm,
  placeholder = "Search...",
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    if (localSearchTerm.trim()) {
      onSearch(localSearchTerm);
    }
  };

  const handleClear = () => {
    if (localSearchTerm.trim()) {
      onClearSearch();
    }
    setLocalSearchTerm("");
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder={placeholder}
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        _hover={{ boxShadow: "md", borderColor: "teal.500" }}
        _focus={{ boxShadow: "md", borderColor: "teal.500" }}
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
