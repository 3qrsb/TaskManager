import {
  Box,
  Flex,
  IconButton,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const footerBg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("text.light", "text.dark");
  const iconHoverBg = useColorModeValue("teal.200", "teal.200");

  return (
    <Box as="footer" bg={footerBg} p={4} color={textColor} textAlign="center">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
        wrap="wrap"
      >
        <Text fontSize="sm" mb={{ base: 2, md: 0 }}>
          &copy; 2024 Noter. All rights reserved.
        </Text>

        <Flex
          gap={4}
          mt={{ base: 2, md: 0 }}
          justify={{ base: "center", md: "flex-end" }}
        >
          <Link href="https://github.com/3qrsb/TaskManager" isExternal>
            <IconButton
              icon={<FaGithub />}
              aria-label="GitHub"
              variant="link"
              _hover={{ color: iconHoverBg }}
              size={{ base: "sm", md: "md" }}
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              icon={<FaInstagram />}
              aria-label="Instagram"
              variant="link"
              _hover={{ color: iconHoverBg }}
              size={{ base: "sm", md: "md" }}
            />
          </Link>
          <Link href="#" isExternal>
            <IconButton
              icon={<FaTelegramPlane />}
              aria-label="Telegram"
              variant="link"
              _hover={{ color: iconHoverBg }}
              size={{ base: "sm", md: "md" }}
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
