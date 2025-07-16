'use client'
import { useTurnstileStore } from '@/store/turnstile-widget-store'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import Captcha from '../login/_components/captcha'
import { Session } from '@supabase/supabase-js'

const ANONYMOUS_UID_KEY = 'tmp_uid'
const AnonymousAuthStatus = () => {
  const supabase = createClient()
  const captchaToken = useTurnstileStore()._captcha_token
  const [, setSession] = React.useState<Session | null>()
  React.useEffect(() => {

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      const storedUid = localStorage.getItem(ANONYMOUS_UID_KEY)

      if (session) {
        if (session.user.is_anonymous) {
          // Anonymous session: persist the UID if not already present
          if (!storedUid) {
            localStorage.setItem(ANONYMOUS_UID_KEY, session.user.id)
          }
        } else {
          // User is logged in with a non-anonymous account: remove the anonymous UID
          if (storedUid) {
            localStorage.removeItem(ANONYMOUS_UID_KEY)
          }
        }
        setSession(session)
      } else {
        // No active session: attempt to sign in anonymously if we have a captcha token
        if (!!captchaToken) {
          const { data, error } = await supabase.auth.signInAnonymously({
            options: { captchaToken }
          })
          if (error) {
            console.error('[auth]: ', error)
          } else if (data.session) {
            console.log('[auth] generating/restoring anonymous account... \n', data)
            // Store the UID in localStorage upon successful anonymous sign-in
            localStorage.setItem(ANONYMOUS_UID_KEY, data.session.user.id)
            setSession(data.session)
          }
        } else if (storedUid) {
          // No captcha token, but we have a stored UID: attempt to restore the anonymous session
          //  This case might need adjustments based on how Supabase handles persistent anonymous sessions without a token.
          //  If Supabase doesn't support this, you might need to implement a different mechanism
          //  (e.g., using a server-side function to validate and refresh the session based on the UID).
          console.log(
            '[auth] Attempting to restore anonymous session from stored UID:',
            storedUid
          )
          //  Further implementation might be needed here depending on Supabase's capabilities.
          //  For now, we'll just log the attempt.
        }
      }

    })
    return () => data.subscription.unsubscribe()
  }, [supabase.auth, captchaToken])

  return (
    <>
      <Captcha
        options={{
          size: 'invisible'
        }}
      />
    </>
  )
}

export default AnonymousAuthStatus
