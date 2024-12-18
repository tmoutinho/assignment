import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Home, Sunglass, Globe, Logo, Plus, Currency } from '@/lib/icons'

const sidebarItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Sunglass, label: 'History', active: false },
  { icon: Globe, label: 'Discover', active: false },
]

export function Sidebar() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex w-16 bg-[#F5F5F5] flex-col items-center py-6 justify-between border-r-[2.05px] border-[#E5E5E5]"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="text-white"
      >
        <Logo className="w-8 h-8" />
      </motion.div>

      <div className="flex flex-col space-y-8">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'p-2 rounded-lg text-[#A9A9A9] transition-colors relative',
              item.active &&
                'text-[#212222] after:absolute after:right-[-13px] after:top-1/2 after:-translate-y-1/2 after:w-[7px] after:h-16 after:bg-[#212222] after:rounded-tl-[11.25px] after:rounded-bl-[11.25px]',
            )}
          >
            <item.icon className="w-6 h-6" />
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col space-y-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-black transition-colors"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-[#212222] transition-colors"
        >
          <Currency className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  )
}
