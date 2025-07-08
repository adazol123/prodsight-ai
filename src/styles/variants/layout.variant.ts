import { cva } from 'class-variance-authority'

export const layoutVariants = cva('w-full', {
  variants: {
    mode: {
      default: 'mx-auto',
      center: 'mx-auto',
      bleed: ''
    },
    size: {
      default: 'max-w-[1200px] px-4 sm:px-6 lg:px-0',
      lg: 'max-w-[1200px] px-4 sm:px-6 lg:px-0',
      base: 'max-w-[920px] px-4 sm:px-0',
      md: 'max-w-[768px] px-4 sm:px-0',
      sm: 'max-w-[640px] px-4 sm:px-0',
      xs: 'max-w-[420px] px-4 sm:px-0',
      none: ''
    }
  },
  defaultVariants: {
    mode: 'default',
    size: 'default'
  }
})
