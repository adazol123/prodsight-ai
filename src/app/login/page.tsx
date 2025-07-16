import { cn } from '@/lib/utils'
import LoginForm from './_components/login-form'
import { layoutVariants } from '@/styles/variants/layout.variant'

export default function LoginPage () {
  return (
    <section
      className={cn(
        layoutVariants({ className: 'grid place-content-center min-h-dvh' })
      )}
    >
      <div className='max-w-lg mx-auto p-4 rounded-2xl bg-white shadow-md'>
        <LoginForm />
      </div>
    </section>
  )
}
