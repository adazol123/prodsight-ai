import { cva } from 'class-variance-authority'

export const backgroundTextColorVariants = cva('text-foreground', {
  variants: {
    bgText: {
      default: '',
      gradient_dark:
        'bg-gradient-to-r from-[#666666] to-[#0C0C0C] text-transparent w-fit bg-clip-text',
      gradient_dark_reverse:
        'bg-gradient-to-l from-[#666666] to-[#0C0C0C] text-transparent w-fit bg-clip-text',
      gradient_light:
        'bg-gradient-to-r from-[#666666] to-[#FFFFFF] text-transparent w-fit bg-clip-text',
      gradient_light_reverse:
        'bg-gradient-to-l from-[#666666] to-[#FFFFFF] text-transparent w-fit bg-clip-text'
    }
  },
  defaultVariants: {
    bgText: 'default'
  }
})
