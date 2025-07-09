'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/shared/dialog'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { useProjectModalStore } from './project-modal-store'

export default function ProjectModal ({
  open,
  onOpenChange
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const storeOpen = useProjectModalStore(state => state.open)
  const setStoreOpen = useProjectModalStore(state => state.setOpen)
  const isControlled = typeof open === 'boolean'
  const modalOpen = isControlled ? open : storeOpen
  const handleOpenChange = isControlled ? onOpenChange : setStoreOpen

  const [form, setForm] = useState({
    title: '',
    about: '',
    timeline: '',
    budget: '',
    headcount: '',
    techstack: ''
  })
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [agreed, setAgreed] = useState(false)
  function handleChange (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }
  function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    // TODO: handle submit
    if (!agreed) return
    if (!!onOpenChange) {
      onOpenChange(false)
    }
  }
  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Fill in the details to create your project.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className='block text-sm font-medium mb-1'>
              Title <span className='text-red-500'>*</span>
            </label>
            <Input
              name='title'
              placeholder='Product name in mind'
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>About</label>
            <textarea
              name='about'
              placeholder="What's your project about? Share a bit about your idea or goals so we can help you get the best results!"
              className='w-full rounded-md border px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none'
              value={form.about}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          {/* Advanced/More Options Collapsible */}
          <div className='border rounded-lg bg-gray-50 dark:bg-[#23232b]'>
            <button
              type='button'
              className='w-full flex items-center justify-between px-4 py-2 text-base font-medium text-primary hover:bg-gray-100 dark:hover:bg-[#222] rounded-t-lg transition group'
              onClick={() => setShowAdvanced(v => !v)}
              aria-expanded={showAdvanced}
            >
              <span className='flex items-center gap-2'>
                <Sparkles className='w-5 h-5 text-amber-500' />
                {showAdvanced
                  ? 'Hide advanced options'
                  : 'Want to add more details? (Optional)'}
              </span>
              {showAdvanced ? (
                <ChevronUp className='w-5 h-5' />
              ) : (
                <ChevronDown className='w-5 h-5' />
              )}
            </button>
            {showAdvanced && (
              <div className='p-4 space-y-4 border-t'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Timeline
                  </label>
                  <Input
                    name='timeline'
                    placeholder='e.g. 1 week, 3 weeks, 1 month'
                    value={form.timeline}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Budget
                  </label>
                  <Input
                    name='budget'
                    placeholder='e.g. $50 per month, PHP5,000.00 per month'
                    value={form.budget}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Headcount
                  </label>
                  <Input
                    name='headcount'
                    placeholder='How many people working on this project?'
                    value={form.headcount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Tech Stack
                  </label>
                  <Input
                    name='techstack'
                    placeholder='e.g. React, Node.js, Python, or any tools you love!'
                    value={form.techstack}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Agreement Disclaimer */}
          <div className='flex items-center md:items-end gap-2 pt-2'>
            <input
              type='checkbox'
              id='agreement'
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className='mt-1 accent-primary w-4 h-4 rounded border-gray-300 dark:border-gray-600'
              required
            />
            <label
              htmlFor='agreement'
              className='text-xs text-gray-600 dark:text-gray-300'
            >
              By submitting, you agree to our{' '}
              <a href='/terms' className='underline hover:text-primary'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='/privacy' className='underline hover:text-primary'>
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit'>Let&apos;s Start Building!</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
