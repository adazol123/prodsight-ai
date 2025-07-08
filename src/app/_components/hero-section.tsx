'use client'
import { info } from '@/_temp/info'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { cn } from '@/lib/utils'
import { backgroundTextColorVariants } from '@/styles/variants/background-color.variant'
import { layoutVariants } from '@/styles/variants/layout.variant'
import React from 'react'
import { useTypingPlaceholder } from '../_hooks/use-type-animation'

const HeroSection = () => {
  const animatedPlaceholderValue = useTypingPlaceholder(
    info.headline_input_placeholders
  )

  return (
    <section className={cn(layoutVariants({ className: 'min-h-dvh py-8' }))}>
      <div className='max-w-[922px] mx-auto min-h-[60dvh] grid place-items-center'>
        <div className='w-full space-y-4 '>
          <h1
            className={cn(
              backgroundTextColorVariants({
                bgText: 'gradient_dark',
                className:
                  'text-[40px] md:text-[70px] font-black leading-[125%] mx-auto text-center max-w-[16ch]'
              })
            )}
          >
            {info.headline}
          </h1>
          <div className='relative w-full rounded-full animate-border border-[3px]'>
            <div
              className={cn(
                'bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px] text-white transition duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-lg hover:shadow-purple-600/20 hover:transition rounded-full animate-border'
              )}
            >
              <Input
                className={cn(
                  'relative min-h-16 rounded-full w-full bg-white backdrop-blur pl-6 pr-32 border-none shadow-none text-foreground',
                  ''
                )}
                type='text'
                placeholder={animatedPlaceholderValue}
              />
              <Button className='absolute right-2 top-1/2 -translate-y-1/2 min-h-12 rounded-full'>
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='grid place-content-center space-y-10'>
        <div className='space-y-2'>
          <h3
            className={cn(
              backgroundTextColorVariants({
                bgText: 'gradient_dark',
                className: 'text-2xl font-black text-center mx-auto'
              })
            )}
          >
            {info.tagline}
          </h3>
          <p className='max-w-[50ch] text-center text-foreground/80 mx-auto'>
            {info.tagline_description}
          </p>
        </div>

        <div className='flex flex-wrap gap-4'>
          {info.tagline_details.map(details => (
            <div
              key={details}
              className='px-8 py-2 rounded-full border border-dashed border-foreground/30 max-w-[260px] mx-auto'
            >
              <p className='text-center font-light text-foreground/80'>
                {details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
