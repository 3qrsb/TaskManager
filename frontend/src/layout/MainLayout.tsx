import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex flex="1">
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
