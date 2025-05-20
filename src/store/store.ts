import { create } from "zustand";

export const useCreateNote = create((set) => ({
  isCreateModeOn: false,
  inputData: {},
  setInputData: (data: any) => set({ inputData: data }),
  setCreateModeOn: (flag: boolean) => set(() => ({ isCreateModeOn: flag })),
}))

export const usePreviewNote = create((set) => ({
  isPreviewModeOn: false,
  noteData: {},
  setNoteData: (data: any) => set({ noteData: data }),
  setPreviewModeOn: (flag: boolean) => set(() => ({ isPreviewModeOn: flag })),
}))

export const useSavedNote = create((set) => ({
  noteDetails: [],
  setNoteDetails: (data) => set((state) => ({ noteDetails: [...state.noteDetails, data] })),
}))