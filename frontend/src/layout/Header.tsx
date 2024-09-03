import {
  Box,
  Flex,
  Image,
  Button,
  useColorModeValue,
  IconButton,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "../components/ColorModeSwitch";

const Header = () => {
  const headerBg = useColorModeValue("white", "gray.900");
  const buttonHoverBg = useColorModeValue("teal.300", "teal.200");
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="header" p={{ base: 3, md: 4 }} bg={headerBg}>
      <Flex justify="space-between" align="center">
        <Image
          src="logo.webp"
          alt="Logo"
          boxSize={{ base: "35px", md: "45px" }}
        />

        <Flex display={{ base: "none", md: "flex" }} align="center" gap={10}>
          <Button variant="link" _hover={{ color: buttonHoverBg }}>
            Home
          </Button>
          <Button variant="link" _hover={{ color: buttonHoverBg }}>
            Profile
          </Button>
          <Button variant="link" _hover={{ color: buttonHoverBg }}>
            Settings
          </Button>
          <ColorModeSwitch />
        </Flex>

        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            aria-label="Toggle Navigation"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            variant="link"
            _hover={{ color: buttonHoverBg }}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Flex direction="column" align="center" mt={4} gap={2}>
          <Button
            variant="link"
            _hover={{ color: buttonHoverBg }}
            onClick={onToggle}
          >
            Home
          </Button>
          <Button
            variant="link"
            _hover={{ color: buttonHoverBg }}
            onClick={onToggle}
          >
            Profile
          </Button>
          <Button
            variant="link"
            _hover={{ color: buttonHoverBg }}
            onClick={onToggle}
          >
            Settings
          </Button>
          <ColorModeSwitch />
        </Flex>
      </Collapse>
    </Box>
  );
};

export default Header;
