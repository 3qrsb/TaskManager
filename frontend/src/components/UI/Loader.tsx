import React from "react";
import { Center } from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <Center height="50vh">
      <PacmanLoader color="#36D7B7" size={20} />
    </Center>
  );
};

export default Loader;
