"use client"

import { useEffect} from 'react'
import { getUser } from "@/utils/supabase/auth"
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const checkAuth = async () => {
        const user = await getUser()
        console.log(user)
        if (!user) {
            router.push('/login')
        }
    }

    useEffect(() => {
        console.log("Checking authentication")
        checkAuth()
    }, []) 

    return (



        <div>
            {children}
        </div>
    )
}
