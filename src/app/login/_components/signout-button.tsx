'use client'
import { Button } from '@/components/shared/button'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
const supabase = createClient()
const SignOutButton = () => {
  const navigate = useRouter()
  return (
    <Button
      variant='ghost'
      onClick={async () => {
        await supabase.auth.signOut()
        await supabase.auth.startAutoRefresh()
        navigate.push('/')
      }}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton
