'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs ({
  classes = { navClassNames: '' }
}: {
  classes?: { navClassNames?: string }
}) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  let href = ''

  return (
    <nav
      className={cn(classes?.navClassNames)}
      aria-label='Breadcrumb'
    >
      <ol className='flex items-center gap-0.5 text-neutral-300 dark:text-neutral-400 text-[0.65rem] font-light'>
        <li>
          <Link
            href='/'
            className='hover:underline underline-offset-2 text-neutral-400 dark:text-neutral-200'
          >
            Home
          </Link>
        </li>
        {segments.map((seg, i) => {
          href += '/' + seg
          const isLast = i === segments.length - 1
          return (
            <li key={href} className='flex items-center gap-0.5'>
              <span className='mx-0.5'>/</span>
              {isLast ? (
                <span className='font-semibold text-neutral-400 dark:text-white capitalize'>
                  {decodeURIComponent(seg)}
                </span>
              ) : (
                <Link
                  href={href}
                  className='hover:underline text-neutral-400 dark:text-neutral-200 capitalize'
                >
                  {decodeURIComponent(seg)}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
