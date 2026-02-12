import React, { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

interface CarouselItem {
  id: string
  src: string
  alt: string
  rotation: number
  type?: 'image' | 'video'
}

interface ImageCarouselHeroProps {
  title: React.ReactNode
  subtitle: string
  description: string
  ctaText: string
  onCtaClick?: () => void
  items: CarouselItem[]
  features?: Array<{
    title: string
    description: string
  }>
}

export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  items,
  features = [],
}: ImageCarouselHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [rotatingCards, setRotatingCards] = useState<number[]>([])

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((_, i) => (prev[i] + 0.1) % 360))
    }, 20) // Slower, smoother rotation

    return () => clearInterval(interval)
  }, [])

  // Initialize rotating cards
  useEffect(() => {
    setRotatingCards(items.map((_, i) => i * (360 / items.length)))
  }, [items.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full min-h-[90vh] bg-transparent overflow-hidden flex flex-col items-center justify-center pt-32 sm:pt-40">
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-secondary/20 bg-white px-4 py-1.5 rounded-full mb-8 shadow-sm animate-fade-in-up mt-8 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide text-secondary uppercase">{subtitle}</span>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-6xl h-80 sm:h-[400px] mb-12 sm:mb-16"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Rotating Cards */}
          <div className="absolute inset-0 flex items-center justify-center perspective">
            {items.map((item, index) => {
              const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
              const radius = 220 // Increased radius for wider cards
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              // 3D perspective effect based on mouse position
              const perspectiveX = (mousePosition.x - 0.5) * 10
              const perspectiveY = (mousePosition.y - 0.5) * 10

              // Calculate scale based on Y position (closer items are bigger)
              const scale = (Math.sin(angle) + 2) / 3; 
              const opacity = (Math.sin(angle) + 1.5) / 2.5;
              const zIndex = Math.floor(Math.sin(angle) * 100);

              // Correct URL for embedding if it's a Bunny Stream play URL
              const videoSrc = item.type === 'video' 
                ? item.src.replace('/play/', '/embed/') 
                : item.src;

              return (
                <div
                  key={item.id}
                  // Changed dimensions to 4:3 aspect ratio (landscape)
                  // Mobile: w-52 (13rem/208px) -> h-[9.75rem] (156px)
                  // Desktop: w-64 (16rem/256px) -> h-48 (12rem/192px)
                  className="absolute w-52 h-[9.75rem] sm:w-64 sm:h-48 transition-transform duration-100 ease-linear"
                  style={{
                    transform: `
                      translate(${x}px, ${y * 0.4}px) 
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${item.rotation}deg)
                      scale(${scale})
                    `,
                    zIndex: zIndex,
                    opacity: opacity,
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white",
                      "transition-all duration-300 hover:scale-105 hover:border-accent",
                      "cursor-pointer group bg-black", // Changed bg-white to bg-black for videos
                    )}
                  >
                    {item.type === 'video' ? (
                       <iframe 
                         src={`${videoSrc}?autoplay=true&loop=true&muted=true&playsinline=true&controls=false`}
                         className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                         allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                         title={item.alt}
                         loading="eager"
                       />
                    ) : (
                        <img
                        src={item.src}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-white"
                        />
                    )}
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-20 text-center max-w-5xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-display font-bold text-4xl md:text-7xl leading-[1.1] tracking-tight text-primary mb-6">
            {title}
          </h1>

          <p className="text-lg sm:text-2xl text-secondary font-light mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>

          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className={cn(
              "inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full",
              "bg-accent text-white font-bold text-lg md:text-xl",
              "hover:bg-emerald-500 hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 uppercase tracking-wide",
              "group",
            )}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Features Section */}
        {features.length > 0 && (
            <div className="relative z-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-4 mb-20">
            {features.map((feature, index) => (
                <div
                key={index}
                className={cn(
                    "text-center p-6 rounded-2xl",
                    "bg-white/50 backdrop-blur-sm border border-secondary/10",
                    "hover:bg-white hover:shadow-lg transition-all duration-300",
                    "group",
                )}
                >
                <h3 className="text-lg sm:text-xl font-bold font-display text-primary mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary">{feature.description}</p>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  )
}