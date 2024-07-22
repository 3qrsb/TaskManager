import React, { ReactNode } from "react";
import { Container } from "semantic-ui-react";
import HeaderUI from "./Header";
import FooterUI from "./Footer";
import Tasks from "../Components/Tasks";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderUI />
      <Container style={{ marginLeft: "150px", paddingTop: "2em" }}>
        {children}
        <Tasks />
      </Container>
      <FooterUI />
    </div>
  );
};

export default MainLayout;
