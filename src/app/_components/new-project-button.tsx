'use client'
import { Button } from '@/components/shared/button'
import { useProjectModalStore } from '../../store/project-modal-store'

export default function NewProjectButton (
  props: React.ComponentProps<typeof Button>
) {
  const { openModal } = useProjectModalStore()
  return <Button variant='default' onClick={openModal} {...props} />
}
