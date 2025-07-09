'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/shared/dialog'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Separator } from '@/components/shared/separator'
import { AnimatePresence } from 'motion/react'
import React from 'react'
import { useLoginModal } from './login-modal-context'

const LoginModal = () => {
  const { open, setOpen } = useLoginModal()
  return (
    <AnimatePresence>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-sm w-full'>
          <DialogHeader>
            <DialogTitle>Sign in to your account</DialogTitle>
            <DialogDescription>
              Access your dashboard and projects.
            </DialogDescription>
          </DialogHeader>
          <form className='flex flex-col gap-4'>
            <Button
              type='button'
              variant='outline'
              className='w-full flex items-center justify-center gap-2'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none'>
                <g>
                  <path
                    d='M21.805 10.023h-9.765v3.977h5.627c-.242 1.242-1.38 3.648-5.627 3.648-3.384 0-6.141-2.805-6.141-6.273s2.757-6.273 6.141-6.273c1.927 0 3.221.82 3.963 1.523l2.707-2.633c-1.707-1.57-3.91-2.539-6.67-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.77 0 9.594-4.047 9.594-9.766 0-.656-.07-1.156-.156-1.563z'
                    fill='#FFC107'
                  />
                  <path
                    d='M3.153 7.345l3.285 2.409c.891-1.742 2.594-2.859 4.602-2.859 1.178 0 2.242.406 3.078 1.078l2.707-2.633c-1.707-1.57-3.91-2.539-6.67-2.539-3.242 0-6.012 1.867-7.406 4.584z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M12.04 22c2.73 0 5.016-.898 6.688-2.445l-3.094-2.523c-.844.594-1.977.953-3.594.953-2.742 0-5.07-1.844-5.906-4.336l-3.242 2.5c1.375 2.742 4.242 5.851 9.148 5.851z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M21.805 10.023h-9.765v3.977h5.627c-.242 1.242-1.38 3.648-5.627 3.648-3.384 0-6.141-2.805-6.141-6.273s2.757-6.273 6.141-6.273c1.927 0 3.221.82 3.963 1.523l2.707-2.633c-1.707-1.57-3.91-2.539-6.67-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.77 0 9.594-4.047 9.594-9.766 0-.656-.07-1.156-.156-1.563z'
                    fill='#FFC107'
                    fillOpacity='.2'
                  />
                  <path
                    d='M21.805 10.023h-9.765v3.977h5.627c-.242 1.242-1.38 3.648-5.627 3.648-3.384 0-6.141-2.805-6.141-6.273s2.757-6.273 6.141-6.273c1.927 0 3.221.82 3.963 1.523l2.707-2.633c-1.707-1.57-3.91-2.539-6.67-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.77 0 9.594-4.047 9.594-9.766 0-.656-.07-1.156-.156-1.563z'
                    fill='#1976D2'
                  />
                </g>
              </svg>
              Continue with Google
            </Button>
            <div className='flex items-center gap-2 my-2'>
              <Separator className='flex-1' />
              <span className='text-xs text-muted-foreground'>or</span>
              <Separator className='flex-1' />
            </div>
            <Input
              type='email'
              placeholder='Email'
              required
              autoComplete='email'
            />
            <Input
              type='password'
              placeholder='Password'
              required
              autoComplete='current-password'
            />
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </form>
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
