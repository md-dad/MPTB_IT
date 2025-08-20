'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// <CHANGE> Simplified authentication to follow Supabase best practices
export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: 'Form data is missing' }
  }

  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      console.log('[v0] Authentication error:', error.message)
      return { error: error.message }
    }

    console.log('[v0] User authenticated successfully:', email.toString())
    
    // <CHANGE> Return success and let client handle redirect
    return { success: true, email: email.toString() }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()
  redirect('/')
}

// <CHANGE> Added function to get user role for client-side redirect logic
export async function getUserRole(email: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { data: profile, error } = await supabase
      .from('users')
      .select('role')
      .eq('email', email)
      .single()

    if (error || !profile) {
      console.log('[v0] Profile not found, using email-based role detection')
      // Email-based fallback
      if (email.includes('admin')) {
        return 'super_admin'
      } else if (email.includes('manager') || email.includes('mngrit')) {
        return 'manager'
      } else {
        return 'super_admin'
      }
    }

    return profile.role
  } catch (error) {
    console.error('Error fetching user role:', error)
    return 'manager' // Default fallback
  }
}
