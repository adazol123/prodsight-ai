'use client'
import { useTurnstileStore } from '@/store/turnstile-widget-store'
import { Turnstile, TurnstileProps } from '@marsidev/react-turnstile'
import React from 'react'

const Captcha = ({
  options = {
    theme: 'light',
    size: 'flexible',
    appearance: 'always',
    execution: 'render'
  }
}: {
  options?: TurnstileProps['options']
}) => {
  const setCaptchaToken = useTurnstileStore().setCaptchaToken

  React.useEffect(() => {
    return () => setCaptchaToken(null)
  }, []) 
  return (
    <Turnstile
      options={options}
      siteKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
      onSuccess={token => {
        setCaptchaToken(token)
      }}
    />
  )
}

export default Captcha
