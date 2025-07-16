'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/shared/dialog'
import { AnimatePresence } from 'motion/react'
import React from 'react'
import { useLoginModal } from '../../store/login-modal-context'
import LoginForm from '../login/_components/login-form'
const LoginModal = () => {
  const { open, setOpen } = useLoginModal()
  return (
    <AnimatePresence>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-lg w-full'>
          <DialogHeader>
            <DialogTitle>Sign in to your account</DialogTitle>
            <DialogDescription>
              Access your dashboard and projects.
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
          <DialogFooter className='mt-2 mx-auto'>
            <span className='text-xs text-muted-foreground'>
              By signing in, you agree to our Terms and Privacy Policy.
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  )
}

export default LoginModal
