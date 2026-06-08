import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Split text into characters
  const chars = text.split('');

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.animate-char');
    
    // Initial state: translated down and invisible
    gsap.set(elements, { y: 50, opacity: 0 });
    
    // Animate in
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.05,
      delay: delay
    });
    
  }, { dependencies: [text], scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, index) => (
        <span 
          key={index} 
          className="animate-char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
