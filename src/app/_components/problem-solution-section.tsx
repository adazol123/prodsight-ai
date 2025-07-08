//elegant section for problem and solution separated by 2 column, each column has elegant semi-transparent blend hd background, in top layer the context of the problem and solution, left side card for problem, right side card for solution. this section is in full bleed white background
'use client'
import { info } from '@/_temp/info'
import { cn } from '@/lib/utils'
import { backgroundTextColorVariants } from '@/styles/variants/background-color.variant'
import { layoutVariants } from '@/styles/variants/layout.variant'
import { Badge } from '@/components/shared/badge'
import React from 'react'

const ProblemSolutionSection = () => {
  return (
    <div
      className={cn(
        layoutVariants({
          className: 'min-h-16 py-3 bg-background text-foreground',
          mode: 'bleed',
          size: 'none'
        })
      )}
    >
      <section
        className={cn(
          layoutVariants({
            className: 'min-h-dvh py-3 grid place-content-center'
          })
        )}
      >
        <div className='max-w-6xl mx-auto'>
          <h3
            className={cn(
              backgroundTextColorVariants({
                bgText: 'gradient_dark',
                className: 'text-2xl font-black text-center mx-auto'
              })
            )}
          >
            Why it&apos;s Hard - and how we make it Easy
          </h3>
          <div className='grid md:grid-cols-2 gap-6 mt-8 text-background'>
            {/* Problem Card */}
            <div className='relative rounded-[calc(1.5rem+2px)] p-0.5 overflow-hidden'>
              {/* Animated border */}
              <div className='absolute inset-0 z-0 pointer-events-none '>
                <div
                  className='w-full h-full animate-spin-slow'
                  style={{
                    background:
                      'conic-gradient(from 0deg, #a21caf 0%, #e11d48 25%, #f59e42 50%, #facc15 75%, #a21caf 100%)',
                    borderRadius: '100rem',
                    filter: 'blur(1.2px)',
                    opacity: 0.7,
                    position: 'absolute',
                    inset: 0,
                    scale: 1.4,
                    padding: '200px', // wider border
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div className='relative z-10 rounded-3xl bg-[#0C0C0C] p-8'>
                <Badge variant='outline' className='mb-6 text-background'>
                  Problem
                </Badge>
                <h4
                  className={cn(
                    backgroundTextColorVariants({
                      bgText: 'gradient_light',
                      className: 'text-2xl font-semibold mb-4'
                    })
                  )}
                >
                  {info.problem.title}
                </h4>
                <p className='mb-6'>{info.problem.description}</p>
                <ul className='space-y-4'>
                  {info.problem.details.map((detail, index) => (
                    <li key={index} className=''>
                      <span className='font-semibold'>{detail.title}</span> —{' '}
                      {detail.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Solution Card */}
            <div className='relative rounded-[calc(1.5rem+2px)] p-0.5 overflow-hidden'>
              {/* Animated border */}
              <div className='absolute inset-0 z-0 pointer-events-none'>
                <div
                  className='w-full h-full animate-spin-slow'
                  style={{
                    background:
                      'conic-gradient(from 0deg, #a21caf 0%, #e11d48 25%, #f59e42 50%, #facc15 75%, #a21caf 100%)',
                    borderRadius: '100rem',
                    filter: 'blur(1.2px)',
                    opacity: 0.7,
                    position: 'absolute',
                    inset: 0,
                    scale: 1.4,
                    padding: '200px', // wider border
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div className='relative z-10 rounded-3xl bg-[#0C0C0C] p-8 h-full'>
                <Badge variant='outline' className='mb-6 text-background'>
                  Solution
                </Badge>
                <h4
                  className={cn(
                    backgroundTextColorVariants({
                      bgText: 'gradient_light',
                      className: 'text-2xl font-semibold mb-4'
                    })
                  )}
                >
                  {info.solution.title}
                </h4>
                <p className=''>{info.solution.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 9s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ProblemSolutionSection
