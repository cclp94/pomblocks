import { useEffect, useRef, useState } from "react";
import { Timer } from "../features/pomodoro";
import styles from "./Pomodoro.module.css";

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Cycles } from "../features/pomodoro/components/Cycles";

// Represent each pomodoro state. Value is the timer in minutes
enum PomState {
  ACTIVE = 0.2,
  REST = 0.1,
  LONG_REST = 0.1
}

export default function Pomodoro() {
  const ACTIVE_TIMER_MIN = 0.05;
  const REST_TIMER_MIN = 0.02;
  const MIN_TO_MS = 60 * 1000
  const FPS = 120;

  const [timeMs, setTimeMs] = useState(ACTIVE_TIMER_MIN * MIN_TO_MS);
  const [isRest, setIsRest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const activeTimer = useRef<NodeJS.Timeout>();

  const currentTimerSec = (isRest ? REST_TIMER_MIN : ACTIVE_TIMER_MIN) * MIN_TO_MS;
  const percentage = timeMs / currentTimerSec;
  const renderFrequencyMs = 1000 / FPS;

  function incrementCycle() {
    setCycleCount((currentCycle) => currentCycle + 1);
  }


  function resetTimer(isTimerCompleted: boolean = false) {
    setIsRunning(false);
    setIsRest((_isRest) => {
      let nextIsRest = _isRest;
      if (isTimerCompleted) {
        nextIsRest = !_isRest;
        if (!nextIsRest) {
          incrementCycle();
        }
      }
      const nextTimerSec = (nextIsRest ? REST_TIMER_MIN : ACTIVE_TIMER_MIN) * MIN_TO_MS;
      setTimeMs(nextTimerSec);
      return nextIsRest;
    });
  }

  useEffect(() => {
    if (!isRunning) {
      return clearInterval(activeTimer.current)
    }
    activeTimer.current = setInterval(() => {
      setTimeMs((time) => {
        if (time - renderFrequencyMs <= 0) {
          resetTimer(true);
        }
        return time - renderFrequencyMs
      })
    }, renderFrequencyMs);
  }, [isRunning])

  function toggleTimer() {
    setIsRunning(!isRunning)
  }


  return <div className={styles.container}>
    <section className={styles.controls}>
      <Cycles cycles={cycleCount} isRunning={isRunning} isRest={isRest} />
      <RestartAltIcon onClick={() => resetTimer()} />
      {/* <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start Timer</button> */}
    </section>
    <section className={styles.timer}>
      <Timer time={timeMs} percentage={percentage} isRest={isRest} />
      {
      isRunning 
        ? <PauseCircleOutlineIcon fontSize="large" className={styles.icon} onClick={toggleTimer} />
        : <PlayCircleOutlineIcon fontSize="large" className={styles.icon} onClick={toggleTimer} />
      }
    </section>
  </div>
}