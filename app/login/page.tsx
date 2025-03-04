'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions'

function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [rateLimited, setRateLimited] = useState(false)

    useEffect(() => {
        console.log('LoginPage component mounted')
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (rateLimited) {
            return
        }

        setLoading(true)
        setError('')
        
        try {
            const data = await login(email, password)
            console.log(data)
            
            if (data.user) {
                router.push('/dashboard')
                // router.refresh()
            } else {
                setError('Login failed - please check your credentials')
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                
                if (error.message.includes('rate limit')) {
                    setRateLimited(true)
                    setTimeout(() => {
                        setRateLimited(false)
                        setLoading(false)
                    }, 5000)
                    return // Exit early to prevent loading state reset
                }
            } else {
                setError('An unexpected error occurred')
            }
        } finally {
            if (!rateLimited) {
                setLoading(false)
            }
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-8 bg-emerald-50'>
            <h1 className='text-2xl font-bold text-emerald-700'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md w-96'>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <input 
                    type="email" 
                    placeholder='Email' 
                    className='p-2 rounded-md border border-emerald-700' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    suppressHydrationWarning
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    className='p-2 rounded-md border border-emerald-700' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    suppressHydrationWarning
                />
                <button 
                    type='submit' 
                    disabled={loading || rateLimited} 
                    className='bg-emerald-700 text-white p-2 rounded-md disabled:opacity-50'
                >
                    {rateLimited ? 'Please wait...' : loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default LoginPage
