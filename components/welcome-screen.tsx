import { motion } from 'framer-motion'
import { ChatInput } from './chat-input'
import { Logo } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useChatStore } from '@/lib/stores/chat'

interface WelcomeScreenProps {
  isMobile: boolean
}

const suggestedQuestions = [
  "What's the meaning of life?",
  'How do you define love?',
  "What's the meaning of AI?",
]

export function WelcomeScreen({ isMobile }: WelcomeScreenProps) {
  const { setQuery } = useChatStore()

  const handleSuggestionClick = (question: string) => {
    setQuery(question)
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center px-4 overflow-y-auto pb-24 h-screen',
        !isMobile ? 'justify-center' : 'justify-end',
      )}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(!isMobile ? 'mb-12' : 'mb-5')}
      >
        <Logo className={cn(!isMobile ? 'w-12 h-12' : 'w-20 h-20')} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl space-y-4"
      >
        <ChatInput placeholder="What is Sentient?" isMobile={isMobile} />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSuggestionClick(question)}
              className={cn(
                'text-[#808080] border-[#E5E5E5] border-2 bg-[#F4F4F4]',
                isMobile
                  ? 'rounded-[5.38px] h-[40.65px] text-[10.75px] font-semibold'
                  : 'rounded-[20px] h-[70px] text-sm font-medium',
              )}
            >
              {question}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
