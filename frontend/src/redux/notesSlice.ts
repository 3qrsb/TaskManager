import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export interface Note {
  id: number;
  title: string;
  text: string;
}

interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async ({
    searchTerm = "",
    sortOrder = "created_at",
  }: {
    searchTerm?: string;
    sortOrder?: string;
  }) => {
    const params = {
      search: searchTerm || undefined,
      ordering: sortOrder,
    };
    return await api.get<Note[]>("/notes/", { params });
  }
);

export const addNote = createAsyncThunk<Note, Omit<Note, "id">>(
  "notes/addNote",
  async (newNote: Omit<Note, "id">) => {
    const response = await api.post<Note, Omit<Note, "id">>("/notes/", newNote);
    return response;
  }
);

export const updateNote = createAsyncThunk<Note, Note>(
  "notes/updateNote",
  async (updatedNote: Note) => {
    const response = await api.put<Note, Note>(
      `/notes/${updatedNote.id}/`,
      updatedNote
    );
    return response;
  }
);

export const deleteNote = createAsyncThunk<number, number>(
  "notes/deleteNote",
  async (noteId: number) => {
    await api.delete(`/notes/${noteId}/`);
    return noteId;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
