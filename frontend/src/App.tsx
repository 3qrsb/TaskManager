import "./App.css";
import "semantic-ui-css/semantic.min.css";
import React from "react";
import { Button, Form } from "semantic-ui-react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Button primary>Primary Button</Button>
      <Form>
        <Form.Input label="Username" placeholder="Enter your username" />
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
};

export default App;
