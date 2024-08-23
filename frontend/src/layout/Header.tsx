import { Box, Flex, Image, Button, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitch from "../components/ColorModeSwitch";

const Header = () => {
  const headerBg = useColorModeValue(
    "headerFooterBg.light",
    "headerFooterBg.dark"
  );
  const buttonHoverBg = useColorModeValue("primary.100", "primary.300");

  return (
    <Box as="header" p={{ base: 3, md: 4 }} bg={headerBg}>
      <Flex justify="space-between" align="center">
        <Image src="logo.webp" alt="Logo" boxSize="45px" />
        <Flex display={{ base: "flex", md: "flex" }} align="center" gap={4}>
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
    </Box>
  );
};

export default Header;
