// custom carousel hook for auto-play functionality with return currentSlide and methods: goToSlide, nextSlide, prevSlide
import * as React from 'react'

export function useCarousel (
  totalSlides: number,
  autoPlay = false,
  interval = 3000
) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  const goToSlide = React.useCallback(
    (index: number) => {
      if (index < 0) {
        setCurrentSlide(totalSlides - 1)
      } else if (index >= totalSlides) {
        setCurrentSlide(0)
      } else {
        setCurrentSlide(index)
      }
    },
    [totalSlides]
  )

  const nextSlide = React.useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = React.useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  React.useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoPlay, interval, nextSlide])

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide
  }
}

// associated on useCarousel hook - custom carousel hooks for progress tracking of transition of individual item within carousel accept parameter isPlaying, currentSlide, duration with 8000 default value
export function useCarouselProgress (
  isPlaying: boolean,
  currentSlide: number,
  duration: number = 8000
) {
  const [progress, setProgress] = React.useState(0)
  const animationFrameRef = React.useRef<number | null>(null)
  const startTimeRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setProgress(0)
      startTimeRef.current = null
      return
    }

    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsedTime = currentTime - startTimeRef.current
      const newProgress = Math.min(100, (elapsedTime / duration) * 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setProgress(0)
      startTimeRef.current = null
    }
  }, [isPlaying, currentSlide, duration])

  return progress
}

// custom hook for play/pause controls only have one parameter initialState as boolean, then return isPlaying, togglePlayPause, play and pause
export function usePlayPause (initialState: boolean = true) {
  const [isPlaying, setIsPlaying] = React.useState(initialState)

  const togglePlayPause = React.useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const play = React.useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = React.useCallback(() => {
    setIsPlaying(false)
  }, [])

  return {
    isPlaying,
    togglePlayPause,
    play,
    pause
  }
}
