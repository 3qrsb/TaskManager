import {
  Box,
  Flex,
  Image,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "../components/ColorModeSwitch";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerBg = useColorModeValue(
    "headerFooterBg.light",
    "headerFooterBg.dark"
  );
  const buttonHoverBg = useColorModeValue("primary.100", "primary.300");

  return (
    <Box as="header" p={{ base: 3, md: 4 }} bg={headerBg}>
      <Flex justify="space-between" align="center">
        <Image src="logo.webp" alt="Logo" boxSize="45px" />
        <IconButton
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
          aria-label="Open Menu"
          bg={buttonHoverBg}
          _hover={{ bg: buttonHoverBg }}
        />
        <Flex display={{ base: "none", md: "flex" }} align="center" gap={4}>
          <Button variant="ghost" _hover={{ bg: buttonHoverBg }}>
            Home
          </Button>
          <Button variant="ghost" _hover={{ bg: buttonHoverBg }}>
            Tasks
          </Button>
          <Button variant="ghost" _hover={{ bg: buttonHoverBg }}>
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
