"use client"

import { signIn } from "@/utils/supabase/auth"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log(email, password)
    try {
      const response = await signIn(email, password)
      console.log("Login successful", response)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 rounded-md border" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" name="password" className="w-full p-2 rounded-md border" />
          </div>
          <button type="submit" className="w-full p-2 rounded-md bg-blue-500 text-white">Login</button>
        </form>
      </div>
    </div>
  )
}
