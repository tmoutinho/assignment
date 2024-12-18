'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/lib/stores/chat'
import { mockChatResponse } from '@/lib/services/chat'
import { RoundedPlus, RoundedEnter, RoundedStop } from '@/lib/icons'

interface ChatInputProps {
  isMobile?: boolean
  placeholder?: string
  fixed?: boolean
}

export function ChatInput({
  isMobile,
  placeholder = 'Ask me anything...',
  fixed = false,
}: ChatInputProps) {
  const {
    currentQuery,
    setQuery,
    startSearch,
    startStreaming,
    completeStreaming,
    pauseStreaming,
    status,
    resumeStreaming,
  } = useChatStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentQuery.trim() || status === 'loading') return

    if (status === 'streaming') {
      pauseStreaming()
      return
    }

    if (status === 'paused') {
      resumeStreaming()
      return
    }

    try {
      startSearch()
      const response = await mockChatResponse(currentQuery)
      startStreaming(response)

      await new Promise((resolve) =>
        setTimeout(resolve, response.length * 30 + 500),
      )
      completeStreaming()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (fixed && !isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-white z-10 px-[49.43px]"
      >
        <div className="p-3 bg-[#F1F1F1] rounded-[102.97px]">
          <form
            onSubmit={handleSubmit}
            className="flex px-5 bg-white border-2 border-[#D7D7D7] rounded-[102.97px] justify-between"
            data-testid="form-chat-input"
          >
            <div className="flex items-center gap-2">
              <RoundedPlus className="w-6 h-6" />
              <input
                placeholder="Ask a follow up..."
                className="flex-1 py-2 focus:outline-none bg-transparent placeholder:text-[#808080] text-[#212222] font-medium text-xl leading-[57.08px] tracking-[-0.02em] resize-none"
                value={currentQuery}
                onChange={(e) => setQuery(e.target.value)}
                disabled={status === 'loading'}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#F6F6F6] flex items-center gap-0.5 p-1">
                <div className="text-sm text-[#212222] font-semibold tracking-[-0.02em] rounded-full border-2 border-[#EBEBEB] bg-white px-4">
                  4s - mini
                </div>
                <div className="text-sm text-[#AEAEAE] px-2 hidden md:block">
                  s1 - preview
                </div>
              </div>

              <button type="submit" data-testid="submit-chat-form">
                {status === 'streaming' ? (
                  <RoundedStop className="w-12 h-12" />
                ) : (
                  <RoundedEnter
                    className={cn(
                      'w-12 h-12',
                      currentQuery !== '' && '[&_circle]:fill-[#f1f1f1]',
                    )}
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        !isMobile ? 'bg-[#F1F1F1] p-3 rounded-[40.92px]' : 'border-none',
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex px-5 pb-3 flex-col bg-white border-[#D7D7D7] h-[125.73px]',
          !isMobile ? 'border-2 rounded-[24.55px]' : 'border rounded-[9.54px]',
        )}
        data-testid="form-chat-input"
      >
        <div className="flex items-center gap-2 md:gap-0">
          <RoundedPlus className="w-5 h-5 block md:hidden" />
          <input
            placeholder={!isMobile ? placeholder : 'Ask me anything...'}
            className="flex-1 py-2 focus:outline-none bg-transparent placeholder:text-[#808080] text-[#212222] font-medium text-xl leading-[57.08px] tracking-[-0.02em] resize-none"
            value={currentQuery}
            onChange={(e) => setQuery(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center sm:gap-4">
            <div className="items-center gap-2 hidden md:flex">
              <RoundedPlus className="w-5 h-5" />
              <span className="text-[#9C9C9C]">Attach</span>
            </div>

            <div className="rounded-full bg-[#F6F6F6] flex items-center gap-0.5 p-1">
              <div className="text-sm text-[#212222] font-semibold tracking-[-0.02em] rounded-full border-2 border-[#EBEBEB] bg-white px-4">
                4s - mini
              </div>
              <div className="text-sm text-[#AEAEAE] px-2">s1 - preview</div>
            </div>
          </div>

          <button type="submit" data-testid="submit-chat-form">
            {status === 'streaming' ? (
              <RoundedStop className="w-8 h-8" />
            ) : (
              <RoundedEnter
                className={cn(
                  'w-8 h-8',
                  currentQuery !== '' && '[&_circle]:fill-[#f1f1f1]',
                )}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
