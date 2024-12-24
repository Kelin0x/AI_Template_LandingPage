'use client'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
const Featured = () => {
  const features = [
    {
      title: "动效模板",
      rating: "5.0",
      category: "Framer Motion",
      image: "/images/1.png",
      color: "from-blue-500 to-purple-500",
      description: "精心设计的页面过渡和交互动画"
    },
    {
      title: "组件模板",
      rating: "5.0",
      category: "React",
      image: "/images/2.png",
      color: "from-purple-500 to-pink-500",
      description: "可复用的高质量组件库"
    },
    {
      title: "设计模板",
      rating: "5.0",
      category: "UI/UX",
      image: "/images/3.png",
      color: "from-pink-500 to-red-500",
      description: "现代简约的视觉设计系统"
    },
    {
      title: "全栈模板",
      rating: "5.0",
      category: "Next.js",
      image: "/images/4.png",
      color: "from-red-500 to-orange-500",
      description: "整合前后端的完整解决方案"
    }
  ];

  const handleExplore = () => {
    window.location.href = '/marketplace';
  };

  return (
    <section className="relative overflow-hidden py-24">
      <BackgroundGradient />
      
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl lg:text-5xl font-medium leading-tight mb-4">
          <span className="text-gray-900">模板</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">特性</span>
        </h2>
        <p className="text-gray-600 text-lg mt-4">
          基于 Next.js 14 + React + Tailwind CSS 构建的现代化网站模板
        </p>
        <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover rounded-t-xl transform transition-transform group-hover:scale-105 duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${feature.color} text-white hover:shadow-lg transition-shadow`}>
                    {feature.category}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm">{feature.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                
                <div className="flex justify-center">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${feature.color} text-white
                              hover:shadow-lg transition-all duration-300 hover:scale-105 w-full`}
                    onClick={handleExplore}
                  >
                    查看详情
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/5 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Featured
