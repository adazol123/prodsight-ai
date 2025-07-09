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
      className={cn('mb-0.5', classes?.navClassNames)}
      aria-label='Breadcrumb'
    >
      <ol className='flex items-center gap-0.5 text-gray-500 dark:text-gray-400 text-xs'>
        <li>
          <Link
            href='/'
            className='hover:underline text-gray-700 dark:text-gray-200'
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
                <span className='font-semibold text-gray-900 dark:text-white capitalize'>
                  {decodeURIComponent(seg)}
                </span>
              ) : (
                <Link
                  href={href}
                  className='hover:underline text-gray-700 dark:text-gray-200'
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
