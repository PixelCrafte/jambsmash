'use client';

import { useProgress } from '@react-three/drei';
import { useState, useEffect } from 'react';

export function SceneLoader() {
  const { progress, loaded, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);

  // Smooth progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress(current => {
        const target = progress;
        const diff = target - current;
        const increment = diff * 0.1;
        
        if (Math.abs(diff) < 0.5) {
          return target;
        }
        
        return current + increment;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [progress]);

  // Loading stages
  useEffect(() => {
    if (displayProgress < 20) {
      setLoadingStage('Initializing 3D Environment...');
    } else if (displayProgress < 40) {
      setLoadingStage('Loading Engineering Models...');
    } else if (displayProgress < 60) {
      setLoadingStage('Setting up Animations...');
    } else if (displayProgress < 80) {
      setLoadingStage('Optimizing Performance...');
    } else if (displayProgress < 95) {
      setLoadingStage('Final Preparations...');
    } else {
      setLoadingStage('Ready to Launch!');
      
      // Delay completion to ensure smooth transition
      setTimeout(() => {
        setIsComplete(true);
      }, 500);
    }
  }, [displayProgress]);

  if (isComplete && progress >= 100) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-brand-dark via-[#0a0a0a] to-brand-dark z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(220, 113, 62, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(255, 167, 38, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(26, 59, 68, 0.2) 0%, transparent 50%)`,
            backgroundSize: '800px 800px, 600px 600px, 1000px 1000px',
            animation: 'backgroundFloat 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: i % 3 === 0 ? '#DC713E' : i % 3 === 1 ? '#FFA726' : '#F3F4F6',
              animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-lg mx-auto px-6">
        {/* Animated Logo */}
        <div className="mb-12">
          <div className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            <span 
              className="inline-block bg-gradient-to-r from-brand-orange via-brand-accent to-brand-orange bg-clip-text text-transparent"
              style={{ 
                backgroundSize: '200% 100%', 
                animation: 'gradientShift 3s ease-in-out infinite' 
              }}
            >
              JAMB
            </span>
            <span className="inline-block text-brand-light animate-bounce delay-300 ml-4">
              SMASH
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-brand-accent tracking-widest uppercase relative">
            <span className="relative z-10">Electronics</span>
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-orange/20 to-brand-accent/20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          {/* Circular Progress Ring */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(107, 114, 128, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - displayProgress / 100)}`}
                className="transition-all duration-300 ease-out"
                style={{ filter: 'drop-shadow(0 0 8px rgba(220, 113, 62, 0.5))' }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DC713E" />
                  <stop offset="50%" stopColor="#FFA726" />
                  <stop offset="100%" stopColor="#DC713E" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Progress Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-black text-brand-light">
                {Math.round(displayProgress)}%
              </span>
            </div>
            
            {/* Spinning Ring Effect */}
            <div 
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-accent/50 animate-spin"
              style={{ animationDuration: '2s' }}
            />
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-4">
            <div className="bg-brand-gray/20 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-brand-gray/10">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ 
                  width: `${displayProgress}%`,
                  background: 'linear-gradient(90deg, #DC713E 0%, #FFA726 50%, #DC713E 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'progressShine 2s ease-in-out infinite'
                }}
              >
                {/* Shimmer Effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* Loading Stage Text */}
          <div className="text-brand-light text-lg font-semibold mb-2 h-6">
            {loadingStage}
          </div>
          
          {/* Detailed Progress Info */}
          <div className="text-brand-gray text-sm">
            Loading {loaded} of {total} resources
          </div>
        </div>

        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-brand-orange"
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.4
              }}
            />
          ))}
        </div>

        {/* Loading Tips */}
        <div className="text-brand-light/60 text-sm max-w-sm mx-auto leading-relaxed">
          {displayProgress < 25 && (
            <div className="animate-fadeIn">
              🚀 Preparing an immersive 3D experience showcasing our engineering excellence
            </div>
          )}
          {displayProgress >= 25 && displayProgress < 50 && (
            <div className="animate-fadeIn">
              ⚙️ Loading interactive models of our automation and security solutions
            </div>
          )}
          {displayProgress >= 50 && displayProgress < 75 && (
            <div className="animate-fadeIn">
              ✨ Setting up stunning animations and visual effects
            </div>
          )}
          {displayProgress >= 75 && displayProgress < 95 && (
            <div className="animate-fadeIn">
              🎯 Optimizing performance for the best user experience
            </div>
          )}
          {displayProgress >= 95 && (
            <div className="animate-fadeIn">
              🎉 Welcome to the future of engineering solutions!
            </div>
          )}
        </div>

        {/* Brand Promise */}
        <div className="mt-8 text-brand-accent text-xs uppercase tracking-wider font-semibold">
          Engineering Excellence • Innovation • Quality
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes backgroundFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-20px, -20px) rotate(1deg); }
          50% { transform: translate(20px, -10px) rotate(-1deg); }
          75% { transform: translate(-10px, 20px) rotate(0.5deg); }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes progressShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Glowing effect for progress ring */
        svg circle {
          filter: drop-shadow(0 0 10px rgba(220, 113, 62, 0.3));
        }

        /* Smooth transitions */
        * {
          transition-property: opacity, transform;
          transition-duration: 0.3s;
          transition-timing-function: ease-out;
        }
      `}</style>
    </div>
  );
}
