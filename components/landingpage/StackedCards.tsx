import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Fingerprint, BookOpenCheck, Coins, Shield, Users } from 'lucide-react'

interface CardData {
    title: string
    description: string
    gradient: string
    icon: React.ReactNode
    animation?: {
        hover: any
        tap: any
    }
}

const StackedCards: React.FC = () => {
    const stackAreaRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(-1)

    const cards: CardData[] = [
        {
            title: "响应式设计",
            description: "完美适配各种设备尺寸，从手机到桌面端无缝切换，提供最佳浏览体验",
            gradient: "from-blue-500 to-purple-500",
            icon: <Code2 className="w-8 h-8 text-white" />
        },
        {
            title: "流畅动效",
            description: "精心设计的交互动画，让页面充满生命力，提升用户体验和产品质感",
            gradient: "from-green-500 to-teal-500",
            icon: <Fingerprint className="w-8 h-8 text-white" />
        },
        {
            title: "性能优化",
            description: "基于 Next.js 构建，支持 SSR/SSG，快速加载，SEO 友好",
            gradient: "from-yellow-500 to-orange-500",
            icon: <Coins className="w-8 h-8 text-white" />
        },
        {
            title: "组件化开发",
            description: "模块化设计，组件复用，方便维护和扩展，快速构建页面",
            gradient: "from-purple-500 to-pink-500",
            icon: <BookOpenCheck className="w-8 h-8 text-white" />
        },
        {
            title: "现代技术栈",
            description: "TypeScript + Tailwind CSS + Framer Motion，代码类型安全，样式灵活",
            gradient: "from-red-500 to-rose-500",
            icon: <Shield className="w-8 h-8 text-white" />
        },
        {
            title: "一键部署",
            description: "支持 Vercel 一键部署，简单配置即可快速上线，轻松管理更新",
            gradient: "from-red-500 to-violet-500",
            icon: <Users className="w-8 h-8 text-white" />
        }
    ]

    const handleScroll = () => {
        if (!stackAreaRef.current) return
        const proportion = stackAreaRef.current.getBoundingClientRect().top / window.innerHeight
        if (proportion <= 0) {
            const n = cards.length
            const index = Math.abs(Math.ceil((proportion * n) / 2)) - 1
            setActiveIndex(index)
        }
    }

    const handleResize = () => {
        if (!leftRef.current || !stackAreaRef.current) return
        const windowWidth = window.innerWidth
        const left = leftRef.current
        left.remove()
        if (windowWidth < 1000) {
            stackAreaRef.current.insertAdjacentElement("beforebegin", left)
        } else {
            stackAreaRef.current.insertAdjacentElement("afterbegin", left)
        }
    }

    const handleExplore = () => {
        window.location.href = '/marketplace';
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center font-poppins bg-gradient-to-b from-[#EEF2FF] to-[#E8F1FF]">
            <div ref={stackAreaRef} className="container mx-auto h-[300vh] relative flex flex-col lg:flex-row items-start justify-center">
                <div ref={leftRef} className="h-screen flex items-center justify-center sticky top-0 w-full lg:w-[50%] px-6 pl-12 lg:pl-24 lg:pr-0 -mr-16">
                    <motion.div
                        className="w-full max-w-[1100px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >

                        <div className="mb-6">
                            <motion.h2
                                className="text-[80px] font-bold leading-[130px] pl-8"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%_auto]"
                                    animate={{
                                        backgroundPosition: ['0%', '100%', '0%']
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    现代设计
                                </motion.span>
                                <br />
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 bg-[length:200%_auto]"
                                    animate={{
                                        backgroundPosition: ['0%', '100%', '0%']
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    完美动效
                                </motion.span>
                            </motion.h2>
                        </div>

                        <motion.div
                            className="text-2xl mt-12 leading-relaxed tracking-wide pl-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.p
                                animate={{
                                    y: [0, -2, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                打造 <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">专业级</span> 产品展示
                                <br />
                                基于 <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">Next.js</span> 开发
                                <br />
                                内置 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">Tailwind CSS</span> 样式
                                <br />
                                丰富的 <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">动画效果</span> 和
                                <br />
                                精美的 <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-red-500">视觉设计</span>
                            </motion.p>
                        </motion.div>

                        <motion.button
                            className="font-bold text-lg px-10 py-5 rounded-xl mt-10 cursor-pointer relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleExplore}
                        >
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                立即体验
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    backgroundSize: '200% 100%'
                                }}
                            />
                        </motion.button>
                    </motion.div>
                </div>

                <div className="h-screen flex items-center justify-start sticky top-0 w-full lg:w-[45%] px-2 -ml-20">
                    <div className="relative w-full max-w-[600px] flex justify-center">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                className={`w-[350px] h-[350px] p-[35px] rounded-[6mm] flex justify-between flex-col absolute top-1/2 left-1/2 transition-transform duration-500 ease-in-out ${
                                    index <= activeIndex ? 'active' : ''
                                } text-white backdrop-blur-sm bg-gradient-to-r ${card.gradient}`}
                                style={{
                                    zIndex: cards.length - index,
                                    transform: index <= activeIndex
                                        ? 'translate(-50%, -120vh) rotate(-48deg)'
                                        : index === activeIndex + 1
                                            ? 'translate(-50%, -50%) rotate(0deg)'
                                            : `translate(-50%, -50%) rotate(${-10 * (index - activeIndex - 1)}deg)`,
                                    transformOrigin: 'center center'
                                }}
                            >
                                <div className="text-xl font-bold flex items-center gap-3">
                                    {card.icon}
                                    {card.title}
                                </div>
                                <div className="text-[32px] font-bold leading-[42px]">
                                    {card.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackedCards