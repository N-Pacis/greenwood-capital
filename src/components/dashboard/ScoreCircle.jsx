import { useEffect, useState, useRef } from 'react';

/**
 * Animated circular score display
 * Shows the Alternative Credit Score with visual feedback
 */
export default function ScoreCircle({ score, tier, maxScore = 850, minScore = 300 }) {
  const [animatedScore, setAnimatedScore] = useState(minScore);
  const previousScoreRef = useRef(minScore);

  // Animate score on mount/change
  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const startScore = previousScoreRef.current;
    const targetScore = score;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.round(startScore + (targetScore - startScore) * easeProgress);
      setAnimatedScore(currentScore);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousScoreRef.current = targetScore;
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Calculate circle progress
  const range = maxScore - minScore;
  const percentage = ((animatedScore - minScore) / range) * 100;
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Score Circle */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={tier.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score display in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{animatedScore}</span>
          <span
            className="text-sm font-medium px-2 py-0.5 rounded-full mt-1"
            style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
          >
            {tier.label}
          </span>
        </div>
      </div>

      {/* Score range indicator */}
      <div className="flex items-center justify-between w-full max-w-[200px] mt-4 px-2">
        <span className="text-xs text-gray-500">{minScore}</span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full mx-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${percentage}%`,
              backgroundColor: tier.color
            }}
          />
        </div>
        <span className="text-xs text-gray-500">{maxScore}</span>
      </div>

      {/* Transparency note */}
      <p className="text-xs text-gray-500 mt-4 text-center max-w-[280px]">
        Your Alternative Credit Score is calculated using transparent, equity-focused criteria.
        <br />
        <span className="text-gray-400">No criminal history, zip codes, or demographics are used.</span>
      </p>
    </div>
  );
}
