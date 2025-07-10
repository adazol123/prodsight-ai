import { useLoginModalStore } from './login-modal-store'

export function useLoginModal () {
  const open = useLoginModalStore(state => state.open)
  const setOpen = useLoginModalStore(state => state.setOpen)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  return { open, setOpen, openModal, closeModal }
}
