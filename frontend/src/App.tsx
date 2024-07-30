import React from "react";
import MainLayout from "./layout/MainLayout";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
