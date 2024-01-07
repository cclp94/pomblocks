import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

export default function Pomodoro() {
  const ACTIVE_TIME_MIN = 0.2;
  const REST_TIME_MIN = 0.1;
  const [timeSec, setTimeSec] = useState(0.2 * 60);
  const [isProductive, setIsProductive] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const activeTimer = useRef<NodeJS.Timeout>(null);


  function resetTimer(toProductive: boolean = true) {
    console.log('here');
    setIsRunning(false);
    setIsProductive(toProductive);
    setTimeSec((toProductive ? ACTIVE_TIME_MIN : REST_TIME_MIN) * 60);
  }

  useEffect(() => {
    if (!isRunning) {
      return clearInterval(activeTimer.current)
    }
    activeTimer.current = setInterval(() => {
      setTimeSec((time) => {
        if (time - 1 <= 0) {
          resetTimer(false);
        }
        return time - 1
      })
    }, 1000);
  }, [isRunning])


  return <main>
    <button onClick={() => resetTimer()}>Reset Timer</button>
    <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start Timer</button>
    <Timer time={timeSec} />
  </main>
}