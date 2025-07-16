import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!)


export const getAccessToken = async () => {
  const supabase = createClient()

  const { error, data} = await supabase.auth.getSession()
  if(error) return null

  return data.session?.access_token
}
