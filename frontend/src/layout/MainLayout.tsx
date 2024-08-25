import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const bgColor = useColorModeValue("background.light", "background.dark");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Header />
      <Flex
        flex="1"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Sidebar />
        <Box flex="1" p={4}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default MainLayout;
