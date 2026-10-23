import React, { useEffect, useRef, useState } from 'react';

interface RevealUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealUp: React.FC<RevealUpProps> = ({
  children,
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
            } else {
              setIsVisible(true);
            }
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`reveal-up ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};
