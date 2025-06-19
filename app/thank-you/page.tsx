'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function ThankYouPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        
        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-4">
          Thank <span className="text-blue-700">You!</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-8">
          Your message has been received. We'll be in touch with you shortly.
        </p>
        
        <div className="bg-slate-100 rounded-lg p-4 mb-8">
          <p className="text-sm text-slate-600">
            Redirecting to homepage in <span className="font-bold text-slate-900">{countdown}</span> seconds...
          </p>
        </div>
        
        <button
          onClick={() => router.push('/')}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Return to Homepage Now
        </button>
      </div>
    </div>
  )
}
