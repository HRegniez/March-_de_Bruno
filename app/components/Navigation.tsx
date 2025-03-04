'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for Lenis to be initialized
    const checkLenis = () => {
      if (window.lenis) {
        setIsReady(true)
      } else {
        setTimeout(checkLenis, 100)
      }
    }
    
    checkLenis()
    
    return () => setIsReady(false)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    if (!isReady) return
    
    const target = document.querySelector(id) as HTMLElement
    if (!target) return

    window.lenis.scrollTo(target, {
      immediate: false,
      duration: 1.2,
      lock: true,
    })
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-2xl text-emerald-700">
            Le petit marché de Bruno
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {[
              { href: '#products', label: 'Produits' },
              { href: '#about', label: 'À propos' },
              { href: '#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleScroll(e, href)}
                className="text-gray-700 hover:text-emerald-600 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}