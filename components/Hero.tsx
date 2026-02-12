import React, { useState, useEffect } from 'react';
import { ImageCarouselHero } from './ui/ai-image-generator-hero';
import { LiquidText } from './ui/liquid-text';

interface HeroProps {
  scrollToDemos: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToDemos }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Architects", "Interior Designers"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 4000); // Increased interval to let the liquid effect breathe
    return () => clearInterval(interval);
  }, []);

  const titleContent = (
    <span className="flex flex-col items-center max-w-full">
      <span className="px-2">We build websites that get clients for</span>
      <span className="relative min-h-[1.4em] w-full flex justify-center items-center mt-2 md:mt-4 px-2">
        <LiquidText 
          key={wordIndex} // Key change forces re-mount to trigger liquid animation
          className="text-3xl sm:text-5xl md:text-9xl font-display font-bold text-accent drop-shadow-[0_0_35px_rgba(16,185,129,0.6)] pb-4 tracking-tight break-words text-center leading-tight"
          text={words[wordIndex]}
        />
      </span>
    </span>
  );
  
  // High-quality architecture and interior design videos
  const demoItems = [
    {
      id: "1",
      src: "https://iframe.mediadelivery.net/play/598061/483047c9-723c-499a-85d4-576d3daa6d12",
      alt: "Modern Interior Video",
      rotation: -10,
      type: 'video' as const,
    },
    {
      id: "2",
      src: "https://iframe.mediadelivery.net/play/598061/fe293d7c-9c9d-4e9a-bbff-35efd9247564",
      alt: "Industrial Loft Video",
      rotation: -5,
      type: 'video' as const,
    },
    {
      id: "3",
      src: "https://iframe.mediadelivery.net/play/598061/9b4103b6-9c16-4a02-b06a-a8b0933b9d1e",
      alt: "Biophilic Design Video",
      rotation: 5,
      type: 'video' as const,
    },
    {
      id: "4",
      src: "https://iframe.mediadelivery.net/play/598061/e90686ba-85ec-4791-829e-94a99f7ee688",
      alt: "Minimalist Studio Video",
      rotation: 10,
      type: 'video' as const,
    },
    {
      id: "5",
      src: "https://iframe.mediadelivery.net/play/598061/cd409b32-5801-4e13-8d59-0360be2f94c2",
      alt: "Luxury Home Video",
      rotation: -8,
      type: 'video' as const,
    },
    {
      id: "6",
      src: "https://iframe.mediadelivery.net/play/598061/5d425812-525b-40fe-9828-222d57870414",
      alt: "Architectural Detail Video",
      rotation: 8,
      type: 'video' as const,
    },
  ];

  const features = [
    {
      title: "Visual Dominance",
      description: "Showcase your portfolio with layouts that command attention.",
    },
    {
      title: "Lightning Fast",
      description: "Instant loading times that keep high-end clients engaged.",
    },
    {
      title: "Conversion Focused",
      description: "Designed psychologically to turn visitors into booked consultations.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
        
      {/* Decorative Elements from original Hero */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-light/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <ImageCarouselHero
        title={titleContent}
        subtitle="Trusted by 50+ Studios"
        description="You're great at design, but nobody knows you exist. We build you a digital showroom that actually gets people to call you."
        ctaText="Get Clients Now"
        onCtaClick={scrollToDemos}
        items={demoItems}
        features={features}
      />
    </section>
  );
};