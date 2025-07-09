'use client'
import React from 'react'
import { LayoutGrid, List } from 'lucide-react'
import Breadcrumbs from '../_components/breadcrumbs'
import { layoutVariants } from '@/styles/variants/layout.variant'
import { cn } from '@/lib/utils'

const dummyStats = [
  { label: 'Projects', value: 6 },
  { label: 'Active Users', value: 24 },
  { label: 'Tasks', value: 42 },
  { label: 'Teams', value: 3 }
]

const dummyProjects = Array.from({ length: 8 }).map((_, i) => ({
  name: `Project ${i + 1}`,
  description: 'Short description if available',
  completion: Math.floor(Math.random() * 100),
  updated: `${Math.floor(Math.random() * 24)} hours ago`
}))

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState('Recent')
  const [projects, setProjects] = React.useState(dummyProjects)
  const [viewMode, setViewMode] = React.useState<'card' | 'list'>('card')

  React.useEffect(() => {
    if (activeTab === 'Recent') {
      setProjects(dummyProjects)
    } else if (activeTab === 'All') {
      setProjects(dummyProjects)
    } else if (activeTab === 'Starred') {
      setProjects(dummyProjects.slice(0, 2))
    }
  }, [activeTab])

  return (
    <>
      <div
        className={cn(
          layoutVariants({
            className:
              'min-h-screen flex flex-col items-center bg-gray-50 dark:bg-[#18181b]',
            mode: 'bleed',
            size: 'none'
          })
        )}
      >
        <main
          className={cn(
            layoutVariants({
              className: 'mx-auto px-4 md:px-8 flex-1 flex flex-col'
            })
          )}
        >
          <Breadcrumbs classes={{ navClassNames: 'mt-6' }} />
          <div className='flex items-center justify-between  mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
              Your Projects
            </h1>
            <button className='rounded-2xl bg-black text-white flex items-center justify-center gap-2 px-6 py-2 text-lg font-semibold hover:bg-gray-900 transition'>
              <span className='inline-flex items-center gap-2'>
                <span className='bg-white/10 rounded-full p-2'>
                  <svg
                    width='20'
                    height='20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12 4v16m8-8H4' />
                  </svg>
                </span>
                <span className='hidden sm:inline'>New Project</span>
              </span>
            </button>
          </div>
          {/* Stats cards */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mb-8'>
            {dummyStats.map((stat, i) => (
              <div
                key={i}
                className='rounded-2xl bg-white dark:bg-[#23232b] p-5 flex flex-col justify-between min-h-[100px] transition-shadow hover:shadow-md hover:scale-[1.01] cursor-pointer duration-200'
              >
                <div className='text-base font-medium text-gray-700 dark:text-gray-200'>
                  {stat.label}
                </div>
                <div className='text-3xl font-bold text-right mt-2'>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          {/* Filter bar */}
          <div className='flex items-center gap-4 mb-4'>
            <div className='flex gap-1 bg-gray-100 dark:bg-[#23232b] rounded-lg p-1'>
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === 'Recent'
                    ? 'bg-white dark:bg-[#18181b] text-black dark:text-white font-medium'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setActiveTab('Recent')}
              >
                Recent
              </button>
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === 'All'
                    ? 'bg-white dark:bg-[#18181b] text-black dark:text-white font-medium'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setActiveTab('All')}
              >
                All
              </button>
              <button
                className={`px-2 py-1 rounded-md transition ${
                  activeTab === 'Starred'
                    ? 'bg-white dark:bg-[#18181b] text-black dark:text-white font-medium'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setActiveTab('Starred')}
              >
                Starred
              </button>
            </div>
            {/* View mode toggle */}
            <div className='flex gap-1 ml-2 bg-gray-100 dark:bg-[#23232b] rounded-lg p-1'>
              <button
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition ${
                  viewMode === 'card'
                    ? 'bg-white dark:bg-[#18181b] text-black dark:text-white font-bold'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setViewMode('card')}
                title='Card View'
                aria-label='Card View'
              >
                <LayoutGrid className='w-5 h-5' />
              </button>
              <button
                className={`px-2 py-1 rounded-md flex items-center gap-1 transition ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#18181b] text-black dark:text-white font-bold'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setViewMode('list')}
                title='List View'
                aria-label='List View'
              >
                <List className='w-5 h-5' />
              </button>
            </div>
            <span className='ml-auto text-xs text-gray-500 dark:text-gray-400'>
              {projects.length}/10
            </span>
          </div>
          {/* Projects grid/list */}
          {viewMode === 'card' ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className='rounded-2xl bg-white border dark:bg-[#23232b] p-5 flex flex-col gap-1 min-h-[240px] transition-[shadow,scale] hover:shadow-md hover:scale-[1.005] cursor-pointer duration-200'
                  tabIndex={0}
                  role='button'
                  aria-label={`Open ${proj.name}`}
                  onClick={() => alert(`Open project: ${proj.name}`)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') alert(`Open project: ${proj.name}`)
                  }}
                >
                  <div className='text-lg font-semibold text-gray-900 dark:text-white'>
                    {proj.name}
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-300 mb-2'>
                    {proj.description}
                  </div>
                  <div className='flex items-end justify-between gap-2 mt-auto'>
                    <div>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {proj.completion}% completion
                      </span>
                      <div className='flex-1 h-2 rounded bg-gray-300 dark:bg-gray-700 overflow-hidden'>
                        <div
                          className='h-2 rounded bg-green-500'
                          style={{ width: `${proj.completion}%` }}
                        />
                      </div>
                    </div>
                    <span className='text-xs text-gray-400 ml-2'>
                      {proj.updated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className='rounded-xl bg-white border dark:bg-[#23232b] px-4 py-3 flex items-center gap-4 min-h-[60px] transition-[shadow,scale] hover:shadow-sm hover:scale-[1.005] cursor-pointer duration-200'
                  tabIndex={0}
                  role='button'
                  aria-label={`Open ${proj.name}`}
                  onClick={() => alert(`Open project: ${proj.name}`)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') alert(`Open project: ${proj.name}`)
                  }}
                >
                  <div className='flex-1'>
                    <div className='font-semibold text-gray-900 dark:text-white'>
                      {proj.name}
                    </div>
                    <div className='text-xs text-gray-500 dark:text-gray-300'>
                      {proj.description}
                    </div>
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {proj.completion}%
                    </span>
                    <span className='text-xs text-gray-400'>
                      {proj.updated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Dashboard
