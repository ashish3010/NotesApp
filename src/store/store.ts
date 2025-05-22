import { create } from "zustand";

export interface NoteState {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface SavedNoteState {
  noteDetails: NoteState[];
  setNoteDetails: (data: NoteState) => void;
}

export interface CreateNoteState {
  isCreateModeOn: boolean;
  inputData: NoteState;
  setInputData: (data: NoteState) => void;
  setCreateModeOn: (flag: boolean) => void;
}

export interface PreviewNoteState {
  isPreviewModeOn: boolean;
  noteData: NoteState;
  setNoteData: (data: NoteState) => void;
  setPreviewModeOn: (flag: boolean) => void;
}

export const useCreateNote = create<CreateNoteState>((set) => ({
  isCreateModeOn: false,
  inputData: {},
  setInputData: (data: NoteState) => set({ inputData: data }),
  setCreateModeOn: (flag: boolean) => set(() => ({ isCreateModeOn: flag })),
}));

export const usePreviewNote = create<PreviewNoteState>((set) => ({
  isPreviewModeOn: false,
  noteData: {},
  setNoteData: (data: NoteState) => set({ noteData: data }),
  setPreviewModeOn: (flag: boolean) => set(() => ({ isPreviewModeOn: flag })),
}));

export const useSavedNote = create<SavedNoteState>((set) => ({
  noteDetails: [],
  setNoteDetails: (data: NoteState) =>
    set((state) => ({ noteDetails: [...state.noteDetails, data] })),
}));
