'use client'
import { Button } from '@/components/shared/button'
import { useLoginModal } from '../../store/login-modal-context'

export default function LoginButton(props: React.ComponentProps<typeof Button>) {
  const { openModal } = useLoginModal()
  return (
    <Button variant='ghost' onClick={openModal} {...props}>
      Login
    </Button>
  )
}
