import { IconArchiveOff } from '@tabler/icons-react'

const EmptySection = () => {
  return (
    <div className='grid place-content-center p-12 rounded-2xl bg-white shadow-xs text-center'>
        <IconArchiveOff stroke={1} className='size-14 mx-auto text-neutral-400 mb-4' />
        <h3 className='font-bold text-xl'>No projects created yet</h3>
        <p className='text-foreground/50 text-sm'>Add a project to start your journey</p>
    </div>
  )
}

export default EmptySection