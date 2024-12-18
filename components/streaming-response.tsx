import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Copy, ThumbsUp, ThumbsDown, Logo } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useStreamingStore } from '@/lib/stores/streaming-store'
import { useChatStore } from '@/lib/stores/chat'

interface StreamingResponseProps {
  content: string
  isMobile?: boolean
}

export function StreamingResponse({
  content,
  isMobile,
}: StreamingResponseProps) {
  const { status } = useChatStore()
  const {
    displayedContent,
    currentLineIndex,
    currentCharIndex,
    setDisplayedContent,
    setCurrentLineIndex,
    setCurrentCharIndex,
  } = useStreamingStore()

  useEffect(() => {
    if (status !== 'complete') {
      const contentLines = content.split('\n')

      const interval = setInterval(() => {
        if (status === 'paused') return

        if (currentLineIndex < contentLines.length) {
          const currentLine = contentLines[currentLineIndex]

          if (currentCharIndex < currentLine.length) {
            setDisplayedContent((prev) => {
              const newContent = [...prev]
              if (!newContent[currentLineIndex]) {
                newContent[currentLineIndex] = ''
              }
              newContent[currentLineIndex] += currentLine[currentCharIndex]
              return newContent
            })
            setCurrentCharIndex(currentCharIndex + 1)
          } else {
            setCurrentLineIndex(currentLineIndex + 1)
            setCurrentCharIndex(0)
          }
        } else {
          clearInterval(interval)
        }
      }, 30)

      return () => clearInterval(interval)
    } else {
      setDisplayedContent(content.split('\n'))
    }
  }, [
    content,
    currentLineIndex,
    currentCharIndex,
    status,
    setDisplayedContent,
    setCurrentLineIndex,
    setCurrentCharIndex,
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div
        className={cn('grid', !isMobile ? 'grid-cols-[40px_auto]' : 'gap-2')}
      >
        <div className={cn('flex gap-2 mb-4', isMobile && 'items-center')}>
          <Logo className="w-6 h-6" />
          {isMobile && (
            <span className="font-semibold text-xl text-[#212222]">
              Search for it
            </span>
          )}
        </div>

        <div>
          <div
            className="prose max-w-none text-[#212222]"
            data-testid="streaming-response"
          >
            {displayedContent.map((line, index) => (
              <div key={index}>{line || <div className="h-4" />}</div>
            ))}
          </div>

          {status === 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center gap-4 mt-4 mr-6"
            >
              <button className="font-medium text-[#A9A9A9] flex gap-2 items-center">
                <Copy />
                Copy
              </button>

              <div className="flex items-center gap-3">
                <button>
                  <ThumbsUp />
                </button>
                <button>
                  <ThumbsDown />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
