import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup: clear interval when not running or unmounting
    return () => clearInterval(timerId);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <h2>Stopwatch: {time} seconds</h2>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
