import React from "react";
import { Container, Segment, List } from "semantic-ui-react";

const FooterUI: React.FC = () => {
  return (
    <Segment inverted vertical style={{ padding: "2em 0em" }}>
      <Container textAlign="center">
        <List horizontal inverted divided link size="small">
          <List.Item as="a" href="#">
            About Us
          </List.Item>
          <List.Item as="a" href="#">
            Contact
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
        <p style={{ marginTop: "1em" }}>
          © 2024 Task Manager, Inc. All rights reserved.
        </p>
      </Container>
    </Segment>
  );
};

export default FooterUI;
