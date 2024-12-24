"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Sparkles } from "lucide-react"
import { useRouter } from 'next/navigation'
import BackgroundGradient from "./BackgroundGradient"
import floatingElements from "./FloatingElements"


const HeroSection = () => {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.7], [1.1, 0.8])
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    const springConfig = { stiffness: 100, damping: 30, bounce: 0 }
    const scaleSpring = useSpring(scale, springConfig)
    const ySpring = useSpring(y, springConfig)
    const opacitySpring = useSpring(opacity, springConfig)

    const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }

    const CountAnimation = ({ value }: { value: string }) => {
      const [count, setCount] = useState(0)
      const numberValue = parseInt(value.replace(/[^0-9]/g, ''))
      
      useEffect(() => {
        const controls = animate(0, numberValue, {
          duration: 2,
          onUpdate: (value) => setCount(Math.floor(value))
        })
        return () => controls.stop()
      }, [numberValue])
      
      return <span>{count}K+</span>
    }

    const router = useRouter()

    const handleExplore = async () => {
      // 创建过渡容器
      const transition = document.createElement('div')
      transition.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
        z-index: 9999;
        opacity: 0;
        backdrop-filter: blur(8px);
        pointer-events: none;
      `
      document.body.appendChild(transition)

      // 添加动画效果
      requestAnimationFrame(() => {
        transition.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        transition.style.opacity = '1'
      })

      // 等待过渡动画
      await new Promise(resolve => setTimeout(resolve, 300))

      // 执行跳转
      router.push('/marketplace')

      // 在新页面加载后移除过渡效果
      setTimeout(() => {
        transition.style.opacity = '0'
        setTimeout(() => {
          transition.remove()
        }, 600)
      }, 100)
    }

    return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundGradient />
        {/* 浮动装饰元 */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.position} opacity-20`}
            animate={element.animation}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* 添加光晕效果 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          animate={{
            boxShadow: [
              "0 0 100px 50px rgba(59, 130, 246, 0.1)",
              "0 0 150px 80px rgba(139, 92, 246, 0.1)",
              "0 0 100px 50px rgba(236, 72, 153, 0.1)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />



        {/* 主要内容 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ 
            opacity: opacitySpring,
            scale: scaleSpring,
            y: ySpring
          }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              className="mb-4 py-2 px-4 text-base backdrop-blur-sm bg-background/50 hover:bg-background/70 transition-colors tracking-wider font-medium"
              variant="secondary"
            >
              <Sparkles className="w-4 h-4 mr-2 inline-block" />
              现代化网站解决方案
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 relative tracking-wide leading-relaxed font-noto"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block relative tracking-wider"
            >
              打造专属于你的
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/30 to-purple-600/30 transform origin-left"
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative inline-flex items-center gap-4 tracking-wider"
            >
              完美
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500 relative group">
                网站模板
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-yellow-500/10 rounded-lg -z-10 group-hover:bg-yellow-500/20 transition-colors"
                />
              </span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-loose tracking-wide font-noto"
          >
            基于 Next.js 和 Tailwind CSS 构建的现代化网站模板，
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-primary font-medium tracking-wide"
            > 让你的网站开发更快速、更简单</motion.span>。
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mx-auto max-w-xl"
          >
            <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-[200px] group relative overflow-hidden border-purple-500 hover:border-purple-600 text-purple-600 hover:text-purple-700 bg-white hover:bg-purple-50 transition-all duration-300 tracking-wider font-medium"
                onClick={handleExplore}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                />
                <BookOpen className="mr-2 h-4 w-4" />
                浏览模板
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button 
                size="lg"
                className="w-full sm:w-[200px] group relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 tracking-wider font-medium"
                onClick={() => router.push('/contact')}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                />
                <motion.span className="relative z-10 flex items-center">
                    <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        />
                    </svg>
                    联系我们
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
    )
}

export default HeroSection