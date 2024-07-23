import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex="1" direction="column" p={4}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
