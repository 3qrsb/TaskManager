import React from "react";
import { Box, Flex, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const NotesSkeleton = () => {
  return (
    <Flex>
      <Box width="30%" overflowY="auto" height="calc(100vh - 70px)" p={4}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="40px" />
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              shadow="md"
            >
              <Skeleton height="20px" mb={4} />
              <SkeletonText noOfLines={2} spacing="4" />
            </Box>
          ))}
        </VStack>
      </Box>
      <Box width="70%" p={4}>
        <Skeleton height="40px" mb={4} />
        <SkeletonText noOfLines={10} spacing="4" />
      </Box>
    </Flex>
  );
};

export default NotesSkeleton;
