'use client'
import Image from 'next/image'
import { info } from '@/_temp/info'
import {
  useCarousel,
  useCarouselProgress,
  usePlayPause
} from '@/hooks/use-carousel'
import { cn } from '@/lib/utils'
import { backgroundTextColorVariants } from '@/styles/variants/background-color.variant'
import { layoutVariants } from '@/styles/variants/layout.variant'
import React from 'react'
import { AnimatePresence, motion } from 'motion/react'

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
}
const buttonVariants = {
  hover: { scale: 1.01 },
  tap: { scale: 0.95 }
}

const FeaturesSection = () => {
  const TRANSITION_DURATION = 6000
  const { isPlaying, togglePlayPause } = usePlayPause()
  const { currentSlide, goToSlide } = useCarousel(
    info.features.length,
    isPlaying,
    TRANSITION_DURATION
  )
  const progress = useCarouselProgress(
    isPlaying,
    currentSlide,
    TRANSITION_DURATION
  )

  return (
    <div
      className={cn(
        layoutVariants({
          className: 'min-h-16 py-3 bg-foreground text-background',
          mode: 'bleed',
          size: 'none'
        })
      )}
    >
      <section
        className={cn(
          layoutVariants({
            className: 'min-h-dvh py-3 grid place-content-center'
          })
        )}
      >
        <div>
          <h3
            className={cn(
              backgroundTextColorVariants({
                bgText: 'gradient_light',
                className: 'text-2xl font-black text-center mx-auto'
              })
            )}
          >
            {info.features_header}
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8'>
            <div className='space-y-4'>
              {info.features.map((feature, index) => (
                <div
                  key={feature.title + `_${index}`}
                  className={cn(
                    'group rounded-l-2xl pl-[1px] py-[1px] transition-all cursor-pointer',
                    index === currentSlide
                      ? 'bg-gradient-to-r from-white/50 shadow-lg'
                      : ''
                  )}
                  role='tab'
                  onClick={() => goToSlide(index)}
                  onKeyDown={() => goToSlide(index)}
                >
                  <div className='inset-0 bg-foreground rounded-l-2xl overflow-clip'>
                    <div
                      className={cn(
                        'p-4 transition-all',
                        index === currentSlide
                          ? 'bg-gradient-to-r from-[rgba(34,34,34,0.5)] to-[rgba(34,34,34,0)]'
                          : ''
                      )}
                    >
                      <h4
                        className={cn(
                          backgroundTextColorVariants({
                            bgText: 'gradient_light',
                            className: 'text-lg font-semibold'
                          })
                        )}
                      >
                        {feature.title}
                      </h4>
                      <p className='text-background/70'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='relative w-full overflow-clip rounded-3xl'>
              <div className='relative h-full overflow-clip'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentSlide}
                    variants={slideVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className='absolute inset-0 flex items-center justify-center bg-neutral-700/20'
                  >
                    <motion.div
                      className='text-center absolute inset-0 text-white'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Image
                        src={info.features[currentSlide].thumbnail}
                        alt={info.features[currentSlide].title}
                        className='h-full w-full object-cover select-none pointer-events-none'
                        fill
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                {/** Play/Paause Button
                 */}
                <motion.button
                  onClick={togglePlayPause}
                  className='absolute bottom-4 right-4 z-10 rounded-full bg-white/20 p-2 text-white shadow-lg'
                  variants={buttonVariants}
                  whileHover='hover'
                  whileTap='tap'
                >
                  {isPlaying ? (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='6' y='4' width='4' height='16'></rect>
                      <rect x='14' y='4' width='4' height='16'></rect>
                    </svg>
                  ) : (
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polygon points='5 3 19 12 5 21 5 3'></polygon>
                    </svg>
                  )}
                </motion.button>
                {/** progress indicator for individual transition position at top inside card ui */}
                <div className='absolute top-0 left-1/2 -translate-x-1/2 p-4'>
                  <div className='flex items-center gap-1 mx-auto'>
                    {info.features.map((_, index) => (
                      <motion.div
                        key={index}
                        className='flex flex-1 items-center justify-center rounded-full py-1 cursor-pointer'
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'
                        role='button'
                        onClick={() => goToSlide(index)}
                        tabIndex={0}
                      >
                        {/** progress bar for current slide */}
                        <motion.div className='min-w-24 h-1 bg-gray-300/20 rounded-full overflow-hidden '>
                          <motion.div
                            className={cn(
                              'h-full bg-white w-full transition-all',
                              index === currentSlide
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                index === currentSlide
                                  ? `${progress + 8}%`
                                  : '0%'
                            }}
                            transition={{ duration: 0.05, ease: 'linear' }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesSection
