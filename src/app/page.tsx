import HeroSection from './_components/hero-section'
import FeaturesSection from './_components/features-section'
import ProblemSolutionSection from './_components/problem-solution-section'
import FooterSection from './_components/footer-section'
import CtaSection from './_components/cta-section'
import { ElegantShape } from '@/components/custom/elegant-shape'

export default function Home () {
  return (
    <>
      <main
        className='min-h-screen font-[family-name:var(--font-outfit)] backdrop-opacity-50'
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/assets/bg-pattern.png')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top',
          height: '110%',
          width: '100%',
          mixBlendMode: 'multiply'

          // filter: 'contrast(1.2) brightness(1.1) saturate(1.3)'
        }}
      >
        <HeroSection />
        <FeaturesSection />
        <ProblemSolutionSection />
        <CtaSection />
        <FooterSection />
        <div className='absolute inset-0 overflow-hidden -z-[1] pointer-events-none'>
          <ElegantShape
            delay={0.1}
            width={800}
            height={180}
            rotate={26}
            gradient='from-indigo-500/[0.15]'
            className='left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]'
          />

          <ElegantShape
            delay={0.5}
            width={600}
            height={90}
            rotate={-15}
            gradient='from-rose-500/[0.15]'
            className='right-[-5%] md:right-[0%] top-[70%] md:top-[75%]'
          />

          <ElegantShape
            delay={0.3}
            width={400}
            height={180}
            rotate={-8}
            gradient='from-violet-500/[0.15]'
            className='left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]'
          />

          <ElegantShape
            delay={0.7}
            width={300}
            height={120}
            rotate={20}
            gradient='from-amber-500/[0.15]'
            className='right-[15%] md:right-[20%] top-[10%] md:top-[15%]'
          />

          <ElegantShape
            delay={0.9}
            width={250}
            height={80}
            rotate={-25}
            gradient='from-cyan-500/[0.15]'
            className='left-[20%] md:left-[25%] top-[5%] md:top-[10%]'
          />
        </div>
      </main>
    </>
  )
}
