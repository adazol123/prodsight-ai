import { create } from 'zustand'

interface ProjectModalState {
  open: boolean
  setOpen: (open: boolean) => void
  openModal: () => void
  closeModal: () => void
}

export const useProjectModalStore = create<ProjectModalState>(set => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false })
}))
