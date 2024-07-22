import React from "react";
import { Header, Container, Menu, Input, Icon } from "semantic-ui-react";

const HeaderUI: React.FC = () => {
  return (
    <Container style={{ padding: "1em 0" }}>
      <Menu secondary>
        <Menu.Item>
          <Header as="h1" textAlign="left">
            Task Manager
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="home" />
          <Menu.Item name="tasks" />
          <Menu.Item name="about" />
          <Menu.Item>
            <Icon name="user" /> Profile
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default HeaderUI;
