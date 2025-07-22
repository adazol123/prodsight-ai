'use client'
import { Button } from '@/components/shared/button'
import { useTurnstileStore } from '@/store/turnstile-widget-store'
import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

const getURL = () => {  
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.    
  process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.    
  'http://localhost:3000/'  // Make sure to include `https://` when not localhost.  
  url = url.startsWith('http') ? url : `https://${url}`  // Make sure to include a trailing `/`.  
  url = url.endsWith('/') ? url : `${url}/`  
  return url + "/dashboard"
}
const GoogleOauthButton = () => {
  const captcha = useTurnstileStore()._captcha_token
  return (
    <Button
      type='button'
      variant='outline'
      disabled={!captcha}
      className='w-full flex items-center justify-center gap-2'
      onClick={async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
            redirectTo: getURL(),
          },
        })

      }}
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
  )
}

export default GoogleOauthButton
