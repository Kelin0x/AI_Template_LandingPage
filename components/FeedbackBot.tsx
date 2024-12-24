import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Message {
  type: 'bot' | 'user'
  content: string
}

interface DialogOption {
  id: string
  text: string
  nextOptions?: DialogOption[]
  response: string
}

const dialogOptions: DialogOption[] = [
  {
    id: '1',
    text: 'What is this template?',
    response: "Welcome! This is a modern website template built with Next.js 14, Tailwind CSS, and Framer Motion. It's perfect for creating stunning landing pages with smooth animations and responsive design! 🎨",
    nextOptions: [
      {
        id: '1-1',
        text: 'How do I get started?',
        response: "Getting started is easy:\n• Clone the repository\n• Install dependencies with 'npm install'\n• Run 'npm run dev'\n• Open http://localhost:3000\n\nYou'll be up and running in minutes! 🚀"
      },
      {
        id: '1-2',
        text: 'What features are included?',
        response: "This template comes packed with:\n• 🎭 Smooth Framer Motion animations\n• 🌙 Dark mode support\n• 📱 Fully responsive design\n• ⚡ Optimized performance\n• 🎯 SEO friendly\n• 🧩 Modular components"
      }
    ]
  },
  {
    id: '2',
    text: 'Tell me about customization',
    response: "Customizing the template is simple:\n• 🎨 Edit colors and typography in tailwind.config.js\n• 💅 Modify global styles in globals.css\n• 🧩 Use modular components\n• 📱 Fully responsive design system",
    nextOptions: [
      {
        id: '2-1',
        text: 'How to modify components?',
        response: "All components are modular and easy to customize:\n• Find components in the /components directory\n• Use Tailwind classes for styling\n• Leverage Framer Motion for animations\n• Add or remove features as needed"
      },
      {
        id: '2-2',
        text: 'Can I change the theme?',
        response: "Absolutely! The template supports:\n• Light/Dark mode switching\n• Custom color schemes\n• Typography customization\n• Layout modifications\n\nJust edit the tailwind.config.js file! 🎨"
      }
    ]
  },
  {
    id: '3',
    text: 'What can I build with it?',
    response: "This template is perfect for:\n• 🏢 Corporate websites\n• 🛍️ Product marketing\n• 💼 Professional services\n• 📱 App landing pages\n• 🎯 Marketing campaigns\n• 🌐 Digital portfolios\n• 🚀 SaaS platforms",
    nextOptions: [
      {
        id: '3-1',
        text: 'Show me examples',
        response: "Check out our showcase examples:\n• Corporate landing pages\n• Product launch sites\n• Portfolio websites\n• Marketing campaigns\n\nAll built with this template! 🎯"
      }
    ]
  },
  {
    id: '4',
    text: 'Back to main menu',
    response: "What else would you like to know about the template? 😊",
  }
]

const FeedbackBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! 👋 I\'m your template guide. Would you like to learn more about this modern website template?' }
  ])
  const [currentOptions, setCurrentOptions] = useState(dialogOptions)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: DialogOption) => {
    setMessages(prev => [...prev, 
      { type: 'user', content: option.text },
      { type: 'bot', content: option.response }
    ])
    setCurrentOptions(option.nextOptions || dialogOptions)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-96 bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 2) }}
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-gray-100/80 backdrop-blur-sm text-gray-800'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="py-0.5">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options */}
            <div className="p-4 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
              <div className="space-y-2">
                {currentOptions.map((option) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/80 
                      border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50
                      transition-all flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-indigo-600">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            rotate: isOpen ? 0 : [-5, 5, -5, 5, 0]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            rotate: { duration: 2, repeat: Infinity }
          }}
          className="relative"
        >
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 right-[calc(100%+8px)] -translate-y-1/2 bg-white px-4 py-2 
                rounded-2xl shadow-md whitespace-nowrap text-sm flex items-center"
            >
              Need help?
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 
                border-8 border-transparent border-l-white"></div>
            </motion.div>
          )}
          <div className="w-20 h-20 bg-white rounded-full shadow-lg p-2 relative">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=happy"
              alt="Assistant"
              className="w-full h-full"
            />
            {isOpen && (
              <div className="absolute -top-1 -right-1">
                <X className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  )
}

export default FeedbackBot