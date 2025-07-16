'use client'
import { cn } from '@/lib/utils'
import { layoutVariants } from '@/styles/variants/layout.variant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginButton from './login-button'
import NewProjectButton from './new-project-button'
import Logo from '../../assets/prodsight-logo-sm.svg'
import { createClient } from '@/utils/supabase/client'
import SignOutButton from '../login/_components/signout-button'
import { Session } from '@supabase/supabase-js'

const HeaderSection = () => {
  const supabase = createClient()
  const [session, setSession] = React.useState<Session | null>(null)

  // call unsubscribe to remove the callback
  React.useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      setSession(session)
    })
    return () => data.subscription.unsubscribe()
  }, [supabase.auth])

  const isAnonymous = session?.user?.is_anonymous
  const isDev = process.env.NODE_ENV !== 'production'
  const isLoggedIn = !!session && !isAnonymous
  // const userProfile = seson?.user?.user_metadata

  return (
    <header className={cn(layoutVariants({ className: 'min-h-16 py-3' }))}>
      <nav className='flex justify-between items-center gap-4'>
        <Link
          href='/'
          className='flex items-center gap-2 select-none'
          tabIndex={0}
          replace
        >
          <Image src={Logo} alt='ProdSight Logo' />
          <span className='hidden sm:inline'>Adazolhub | ProdSight AI</span>
        </Link>
        <div className='flex gap-2 items-center'>
         {isDev && !!session?.user && <span className='text-xs text-muted-foreground inline-flex px-2 py-0.5 bg-muted rounded-3xl'>{session?.user?.id}</span>}
          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <>
              <LoginButton />
              <NewProjectButton>New Project</NewProjectButton>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default HeaderSection
