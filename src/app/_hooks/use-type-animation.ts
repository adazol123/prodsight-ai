import { useState, useEffect } from 'react'

export function useTypingPlaceholder (
  placeholders: string[],
  typingSpeed = 80,
  pause = 4000,
  deletingSpeed = 50
) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    const current = placeholders[index % placeholders.length]

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setIndex(i => (i + 1) % placeholders.length)
    }

    return () => clearTimeout(timeout)
  }, [
    displayed,
    isDeleting,
    index,
    placeholders,
    typingSpeed,
    pause,
    deletingSpeed
  ])

  return displayed
}
