"use client"

import { signOut } from "@/utils/supabase/auth"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export default function LogOut() {
    const router = useRouter()



    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    return (
        <Button className="bg-red-500" onClick={handleSignOut}>
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        </Button>
    )
}
