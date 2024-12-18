import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Home, Sunglass, Globe } from '@/lib/icons'

const sidebarItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Sunglass, label: 'History', active: false },
  { icon: Globe, label: 'Discover', active: false },
]

export function MobileNavigation() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2"
    >
      <div className="flex justify-around items-center">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'flex flex-col items-center p-2',
              item.active ? 'text-black' : 'text-gray-400',
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
