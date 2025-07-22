'use client'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Separator } from '@/components/shared/separator'
import { useTurnstileStore } from '@/store/turnstile-widget-store'
import { login } from '../_actions'
import Captcha from './captcha'
import GoogleOauthButton from './google-oauth-button'
const LoginForm = () => {
  const captcha = useTurnstileStore()._captcha_token
  return (
    <form className='flex flex-col gap-4 w-full'>
      <GoogleOauthButton />
      <div className='flex items-center gap-2 my-2'>
        <Separator className='flex-1' />
        <span className='text-xs text-muted-foreground'>or</span>
        <Separator className='flex-1' />
      </div>
      <Input type='email' placeholder='Email' required autoComplete='email' />
      <Input
        type='password'
        placeholder='Password'
        required
        autoComplete='current-password'
      />
      <Captcha />
      <Button disabled={!captcha} type='submit' formAction={login} className='w-full'>
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm
