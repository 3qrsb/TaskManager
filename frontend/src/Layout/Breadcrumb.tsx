import React from "react";
import { Breadcrumb } from "semantic-ui-react";

const BreadcrumbUI: React.FC = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Section link>Home</Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link>Tasks</Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section active>Task Details</Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default BreadcrumbUI;
