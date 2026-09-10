import { useEffect, useState } from 'react';

export const useCounter = (targetValue, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric part and optional suffix
    const numericStr = String(targetValue).replace(/[^0-9.]/g, '');
    const numericVal = parseFloat(numericStr);

    if (isNaN(numericVal)) {
      setCount(targetValue);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing formula (easeOutExpo)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = numericVal * easedProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, isVisible, duration]);

  return count;
};
