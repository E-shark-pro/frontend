// app/_components/pwa-install-button.tsx
'use client'

import {useEffect, useState} from 'react'

export function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowButton(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleClick = async () => {
        if (!deferredPrompt) return

        // Show the install prompt
        const prompt = deferredPrompt as any
        prompt.prompt()

        // Wait for the user to respond
        const choiceResult = await prompt.userChoice
        if (choiceResult.outcome === 'accepted') {
            console.log('✅ User accepted the install prompt')
        } else {
            console.log('❌ User dismissed the install prompt')
        }

        // Hide the button
        setDeferredPrompt(null)
        setShowButton(false)
    }

    if (!showButton) return null

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg"
        >
            Download App
        </button>
    )
}
