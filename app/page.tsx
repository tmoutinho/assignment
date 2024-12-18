'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { MobileNavigation } from '@/components/mobile-nav'
import { ChatContainer } from '@/components/chat-container'
import { useChatStore } from '@/lib/stores/chat'
import { Plus, Currency } from '@/lib/icons'
import { WelcomeScreen } from '@/components/welcome-screen'
import { useMobileStore } from '@/lib/stores/mobile'

export default function ChatInterface() {
  const { isMobile, setIsMobile } = useMobileStore()
  const { hasSearched } = useChatStore()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setIsMobile])

  return (
    <div className="flex h-screen bg-white">
      {isMobile ? (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white border-b border-[#E5E5E5] z-20 h-[65px]">
          <Plus className="w-6 h-6" fill="black" />
          <Currency className="w-9 h-9" />
        </div>
      ) : (
        <Sidebar />
      )}

      <div className="container mx-auto h-screen relative">
        {hasSearched ? (
          <ChatContainer isMobile={isMobile} />
        ) : (
          <WelcomeScreen isMobile={isMobile} />
        )}

        {isMobile && <MobileNavigation />}
      </div>
    </div>
  )
}
