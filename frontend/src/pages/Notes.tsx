import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchNotes } from "../redux/notesSlice";
import { RootState, AppDispatch } from "../redux/store";

const Notes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes, status, error } = useSelector(
    (state: RootState) => state.notesSlice
  );

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (status === "loading") return <Text>Loading...</Text>;
  if (status === "failed") return <Text>Error: {error}</Text>;

  return (
    <VStack spacing={4} align="stretch">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {notes.map((note) => (
          <Box
            key={note.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            shadow="md"
            _hover={{ shadow: "lg" }}
            transition="all 0.3s"
          >
            <Text fontSize="xl" fontWeight="bold">
              {note.title}
            </Text>
            <Text mt={2}>{note.text}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Notes;
