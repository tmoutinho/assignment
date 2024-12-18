'use client'

import { motion } from 'framer-motion'
import { StreamingResponse } from '@/components/streaming-response'
import { ChatInput } from '@/components/chat-input'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/lib/stores/chat'
import { Logo } from '@/lib/icons'

interface ChatContainerProps {
  isMobile: boolean
}

export function ChatContainer({ isMobile }: ChatContainerProps) {
  const { currentQuery, isLoading, isStreaming, messages } = useChatStore()

  return (
    <div
      className={cn(
        'flex flex-col relative',
        isMobile ? 'h-[calc(100vh-120px)] mt-[65px] p-4 w-full' : 'h-screen',
      )}
    >
      <div
        className={cn(
          'absolute top-0 bg-white z-10 border border-t-0 border-[#E5E5E5] flex items-center',
          !isMobile
            ? 'rounded-br-[41.19px] rounded-bl-[41.19px] left-0 right-0 py-[29.43px] px-[49.43px] text-3xl'
            : 'h-[50px] rounded-br-[20px] rounded-bl-[20px] left-4 right-4 px-5 text-xl',
        )}
      >
        <h2 className="font-semibold text-[#212222]">{currentQuery}</h2>
      </div>

      <div
        className={cn(
          'overflow-y-auto',
          !isMobile
            ? 'mt-[120px] mb-[140px] px-[49.43px]'
            : 'mt-[55px] mb-[140px] px-5',
        )}
      >
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 text-gray-600 mb-4"
          >
            <Logo className="w-6 h-6" />
            <span className="font-semibold animate-shimmer bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 bg-[length:200%_100%] bg-clip-text text-transparent">
              Searching for {currentQuery}...
            </span>
          </motion.div>
        )}

        {(isStreaming || (!isLoading && messages[0])) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg space-y-4"
          >
            <StreamingResponse
              content={messages[0].content}
              isComplete={!isStreaming}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </div>

      <div
        className={cn(
          'absolute left-0 right-0 p-4 bg-white',
          !isMobile ? 'bottom-0' : 'bottom-[20px]',
        )}
      >
        <ChatInput placeholder="What is Sentient?" isMobile={isMobile} fixed />
      </div>
    </div>
  )
}
