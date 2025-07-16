'use client'
import {
  animate,
  motion,
  TargetAndTransition,
  Transition,
  useIsPresent,
  useMotionValue
} from 'motion/react';
import React from 'react';

function GradientOverlay ({
  size
}: {
  size: { width: number; height: number }
}) {
  const breathe = useMotionValue(0)
  const isPresent = useIsPresent()

  React.useEffect(() => {
    if (!isPresent) {
      animate(breathe, 0, { duration: 0.5, ease: 'easeInOut' })
    }

    async function playBreathingAnimation () {
      await animate(breathe, 1, {
        duration: 0.5,
        delay: 0.35,
        ease: [0, 0.55, 0.45, 1]
      })

      animate(breathe, [null, 0.7, 1], {
        duration: 15,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      })
    }

    playBreathingAnimation()
  }, [isPresent, breathe])

  const enterDuration = 0.75
  const exitDuration = 0.5

  const expandingCircleRadius = size.width / 3

  return (
    <div className='gradient-container'>
      <motion.div
        className='expanding-circle'
        initial={{
          scale: 0,
          opacity: 1,
          backgroundColor: 'rgb(233, 167, 160)'
        }}
        animate={{
          scale: 10,
          opacity: 0.2,
          backgroundColor: 'rgb(246, 63, 42)',
          transition: {
            duration: enterDuration,
            opacity: { duration: enterDuration, ease: 'easeInOut' }
          }
        }}
        exit={{
          scale: 0,
          opacity: 1,
          backgroundColor: 'rgb(233, 167, 160)',
          transition: { duration: exitDuration }
        }}
        style={{
          left: `calc(50% - ${expandingCircleRadius / 2}px)`,
          top: '100%',
          width: expandingCircleRadius,
          height: expandingCircleRadius,
          originX: 0.5,
          originY: 1
        }}
      />

      <motion.div
        className='gradient-circle top-left'
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.9,
          transition: { duration: enterDuration }
        }}
        exit={{
          opacity: 0,
          transition: { duration: exitDuration }
        }}
        style={{
          scale: breathe,
          width: size.width * 2,
          height: size.width * 2,
          top: -size.width,
          left: -size.width
        }}
      />

      <motion.div
        className='gradient-circle bottom-right'
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.9,
          transition: { duration: enterDuration }
        }}
        exit={{
          opacity: 0,
          transition: { duration: exitDuration }
        }}
        style={{
          scale: breathe,
          width: size.width * 2,
          height: size.width * 2,
          top: size.height - size.width,
          left: 0
        }}
      />
    </div>
  )
}

export function ImmersiveOverlay ({
  close,
  itemCount,
  size
}: {
  close: () => void
  itemCount: number
  size: { width: number; height: number }
}) {
  const transition: Transition = {
    duration: 0.35,
    ease: [0.59, 0, 0.35, 1]
  }

  const enteringState: TargetAndTransition = {
    rotateX: 0,
    skewY: 0,
    scaleY: 1,
    scaleX: 1,
    y: 0,
    transition: {
      ...transition,
      y: { type: 'spring', visualDuration: 0.7, bounce: 0.2 }
    }
  }

  const exitingState = {
    rotateX: -5,
    skewY: -1.5,
    scaleY: 2,
    scaleX: 0.4,
    y: 100
  }

  return (
    <div className='overlay-root' onClick={close}>
      <GradientOverlay size={size} />
      <motion.div
        className='overlay-content'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
      >
        <motion.div
          className='modal-content'
          onClick={e => e.stopPropagation()}
          initial={exitingState}
          animate={enteringState}
          exit={exitingState}
          transition={transition}
          style={{
            transformPerspective: 1000,
            originX: 0.5,
            originY: 0
          }}
        >
          <header>
            <h2 className='h3'>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </h2>
            <p className='big'>
              Are you sure you want to delete these entries? You can&apos;t undo
              this action.
            </p>
          </header>
          <div className='controls'>
            <button onClick={close} className='delete'>
              Delete
            </button>
            <button onClick={close} className='cancel'>
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
