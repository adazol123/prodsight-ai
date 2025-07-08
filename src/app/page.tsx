import Image from 'next/image'
import Logo from '../assets/prodsight-logo-sm.svg'
import Link from 'next/link'
import { Button } from '@/components/shared/button'
import { cn } from '@/lib/utils'
import { layoutVariants } from '@/styles/variants/layout.variant'
import HeroSection from './_components/hero-section'
import FeaturesSection from './_components/features-section'
import ProblemSolutionSection from './_components/problem-solution-section'
export default function Home () {
  return (
    <main
      className='min-h-screen font-[family-name:var(--font-outfit)] backdrop-opacity-50'
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/assets/bg-pattern.png')`,
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top',
        height: '110%',
        width: '100%'
        // filter: 'contrast(1.2) brightness(1.1) saturate(1.3)'
      }}
    >
      <header className={cn(layoutVariants({ className: 'min-h-16 py-3' }))}>
        <nav className='flex justify-between items-center gap-4'>
          <Link href='/' className='flex items-center gap-2' replace>
            <Image src={Logo} alt='ProdSight Logo' />
            <span className='hidden sm:inline'>Adazolhub | ProdSight AI</span>
          </Link>
          <div className='flex gap-2'>
            <Button>New Project</Button>
            <Button variant='ghost'>Login</Button>
          </div>
        </nav>
      </header>
      <HeroSection />
      <FeaturesSection />
      <ProblemSolutionSection />
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/file.svg'
            alt='File icon'
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/window.svg'
            alt='Window icon'
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </main>
  )
}
