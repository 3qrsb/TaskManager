import { Center, Box } from "@chakra-ui/react";
import "ldrs/metronome";

const Loader = () => {
  return (
    <Center height="200vh">
      <Box as="l-metronome" size="40" speed="1.6" color="red"></Box>
    </Center>
  );
};

export default Loader;
