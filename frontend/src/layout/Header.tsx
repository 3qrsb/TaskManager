import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "../components/ColorModeSwitch";
import SearchBar from "../components/Searchbar";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" bg="#FAF089" p={4} color="dark">
      <Flex justify="space-between" align="center">
        <Image src="logo.webp" alt="Logo" boxSize="45px" />
        <IconButton
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
          aria-label="Open Menu"
        />
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={4}>
          <SearchBar onSearch={(query: string) => console.log(query)} />
          <Button variant="ghost" _hover={{ bg: "secondary.300" }}>
            Home
          </Button>
          <Button variant="ghost" _hover={{ bg: "secondary.300" }}>
            Tasks
          </Button>
          <Button variant="ghost" _hover={{ bg: "secondary.300" }}>
            Profile
          </Button>
          <ColorModeSwitch />
        </Flex>
      </Flex>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
