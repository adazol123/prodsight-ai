import { cn } from '@/lib/utils'
import { layoutVariants } from '@/styles/variants/layout.variant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginButton from './login-button'
import NewProjectButton from './new-project-button'
import Logo from '../../assets/prodsight-logo-sm.svg'

const HeaderSection = () => {
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
        <div className='flex gap-2'>
          <LoginButton />
          <NewProjectButton />
        </div>
      </nav>
    </header>
  )
}

export default HeaderSection
