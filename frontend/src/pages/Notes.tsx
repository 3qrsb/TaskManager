import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  fetchNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../redux/notesSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Note } from "../redux/notesSlice";
import NotesSkeleton from "../components/UI/NotesSkeleton";
import NoteList from "../components/notes/NoteList";
import NoteEditor from "../components/notes/NoteEditor";
import NoteControlBar from "../components/notes/NoteControlBar";

const Notes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { notes, status, error } = useSelector(
    (state: RootState) => state.notesSlice
  );

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, "id">>({
    title: "",
    text: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created_at");

  const noteListBg = useColorModeValue("gray.50", "gray.800");
  const noteEditorBg = useColorModeValue("gray.50", "gray.900");
  const noteCardBg = useColorModeValue("gray.100", "gray.700");
  const selectedNoteBg = useColorModeValue("blue.100", "blue.900");

  useEffect(() => {
    dispatch(fetchNotes({ searchTerm, sortOrder }));
  }, [dispatch, searchTerm, sortOrder]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSortChange = (order: string | null) => {
    setSortOrder(order ?? "created_at");
  };

  const handleNoteChange = (updatedNote: Note) => {
    setSelectedNote(updatedNote);
  };

  const handleBlur = async () => {
    if (selectedNote && selectedNote.id) {
      await dispatch(updateNote(selectedNote));
    }
  };

  const handleDelete = async (noteId: number) => {
    await dispatch(deleteNote(noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const toggleAdding = () => setIsAdding(!isAdding);

  const handleNewNoteChange = (updatedField: Partial<Omit<Note, "id">>) => {
    setNewNote((prev) => ({ ...prev, ...updatedField }));
  };

  const handleSubmitNewNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.title && newNote.text) {
      await dispatch(addNote(newNote));
      setIsAdding(false);
      setNewNote({ title: "", text: "" });
    }
  };

  if (status === "loading") return <NotesSkeleton />;
  if (error) return <Text>Error loading notes: {error}</Text>;

  return (
    <Flex direction="row" height="100%">
      <Box
        width="35%"
        p={4}
        borderRadius="lg"
        bg={noteListBg}
        maxH="calc(100vh - 30px)"
        overflowY="auto"
      >
        <NoteControlBar
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
          searchTerm={searchTerm}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          toggleAdding={toggleAdding}
        />
        <NoteList
          notes={notes}
          selectedNote={selectedNote}
          onSelectNote={setSelectedNote}
          onDeleteNote={handleDelete}
          noteBg={noteCardBg}
          selectedNoteBg={selectedNoteBg}
          isAdding={isAdding}
          toggleAdding={toggleAdding}
          newNote={newNote}
          onNewNoteChange={handleNewNoteChange}
          onSubmitNewNote={handleSubmitNewNote}
        />
      </Box>
      <NoteEditor
        selectedNote={selectedNote}
        onChange={handleNoteChange}
        onBlur={handleBlur}
        noteBg={noteEditorBg}
      />
    </Flex>
  );
};

export default Notes;
