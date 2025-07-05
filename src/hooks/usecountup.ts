import { useEffect, useState } from 'react';

const useCountUp = (end: number, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(handle);
  }, [end, duration]);

  return count;
};

export default useCountUp;
