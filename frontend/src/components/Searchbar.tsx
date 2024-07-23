import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Search2Icon color="primary.300" onClick={handleSearch} />
      </InputRightElement>
      <Input
        placeholder="Search for anything"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
