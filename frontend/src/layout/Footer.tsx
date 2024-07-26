import { Box, Flex, Image, IconButton, Link, Text } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="headerFooterBg"
      p={4}
      color="text.light"
      textAlign="center"
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        wrap="wrap"
      >
        <Flex align="center" gap={2}>
          <Image src="logo.webp" alt="Logo" boxSize="30px" />
          <Text fontSize="lg" fontWeight="bold">
            Noter
          </Text>
        </Flex>

        <Text fontSize="sm" mt={{ base: 2, md: 0 }}>
          &copy; 2024 Noter. All rights reserved.
        </Text>

        <Flex gap={4} mt={{ base: 2, md: 0 }}>
          <Link href="#" isExternal>
            <IconButton
              icon={<FaGithub />}
              aria-label="GitHub"
              variant="ghost"
              _hover={{ bg: "secondary.300" }}
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              icon={<FaInstagram />}
              aria-label="Instagram"
              variant="ghost"
              _hover={{ bg: "secondary.300" }}
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              icon={<FaTelegramPlane />}
              aria-label="Telegram"
              variant="ghost"
              _hover={{ bg: "secondary.300" }}
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
