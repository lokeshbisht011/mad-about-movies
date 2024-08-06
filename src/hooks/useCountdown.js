import { useEffect, useState } from "react";

export const useCountdown = (initialTime, callback) => {
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    if (time === 0) {
      callback();
    }

    return () => clearInterval(interval);
  }, []);

  return time;
};
