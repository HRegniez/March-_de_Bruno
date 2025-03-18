"use server"

import { createClient } from './server'

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
  console.log(data)
  return data
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}


