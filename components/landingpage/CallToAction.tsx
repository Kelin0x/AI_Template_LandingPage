'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
import { useEffect, useRef } from 'react'

const ParticleSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      const size = Math.min(500, window.innerWidth - 40)
      canvas.width = size
      canvas.height = size
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    class Particle {
      x: number
      y: number
      z: number
      radius: number
      color: string
      initialX: number
      initialY: number
      initialZ: number

      constructor() {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const radius = 150

        this.initialX = radius * Math.sin(phi) * Math.cos(theta)
        this.initialY = radius * Math.sin(phi) * Math.sin(theta)
        this.initialZ = radius * Math.cos(phi)

        this.x = this.initialX
        this.y = this.initialY
        this.z = this.initialZ

        this.radius = Math.random() * 1.5 + 0.5
        this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50 + 100}, 255, 0.6)`
      }

      update(time: number) {
        const rotationSpeed = 0.0003
        const angle = time * rotationSpeed

        this.x = this.initialX * Math.cos(angle) - this.initialZ * Math.sin(angle)
        this.z = this.initialX * Math.sin(angle) + this.initialZ * Math.cos(angle)

        this.y = this.initialY + Math.sin(time * 0.001) * 5

        const colorChange = Math.sin(time * 0.002) * 50
        this.color = `rgba(${150 + colorChange}, ${100 + colorChange}, 255, 0.6)`
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        const perspective = 1000
        const scale = perspective / (perspective + this.z + 200)
        const x = this.x * scale + centerX
        const y = this.y * scale + centerY
        const r = Math.max(0.5, this.radius * scale)

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 1000; i++) {
      particles.push(new Particle())
    }

    let animationId: number
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      particles.forEach(particle => {
        particle.update(time)
        particle.draw(ctx, centerX, centerY)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      
      className="w-full h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
    />
    
  )
}

const CallToAction = () => {
  const handleLearnMore = () => {
    window.location.href = '/templates';
  };

  return (
    <section className="relative overflow-hidden py-24">
      <BackgroundGradient />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 items-center">
          {/* 左侧内容 - 优化布局和字体样式 */}
          <div className="space-y-12">
            {/* 顶部标签 */}
            <div className="inline-block">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                              flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 
                               font-semibold text-lg tracking-wide">
                  现代化落地页模板
                </span>
              </div>
            </div>

            {/* 主标题区域 */}
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                专业级
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
                               animate-gradient-x">
                  产品展示模板
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed font-medium">
                极简设计，突出产品核心价值。
                <span className="block mt-2">动效流畅，提升用户体验。</span>
                <span className="block mt-2 text-gray-500">快速部署，随心定制，打造专属产品落地页。</span>
              </p>
            </div>

            {/* 按钮区域 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                variant="default"
                className="px-8 py-7 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                           hover:from-indigo-400 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-xl
                           transform hover:scale-105 rounded-2xl"
                onClick={handleLearnMore}
              >
                立即使用
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* 右侧粒子球 */}
          <div className="relative aspect-square">
            <ParticleSphere />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction