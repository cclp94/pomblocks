import { useEffect, useRef, useState } from "react";
import { Cycles, Settings, Timer } from "../features/pomodoro";
import styles from "./Pomodoro.module.css";

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import { useSettings } from "../hooks/useSettings";

export default function Pomodoro() {
  const MIN_TO_MS = 60 * 1000
  const FPS = 60;

  const [settings, setSettings] = useSettings();
  const [timeMs, setTimeMs] = useState(settings.workMin * MIN_TO_MS);
  const [isRest, setIsRest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const activeTimer = useRef<NodeJS.Timeout>();

  const currentTimerSec = (isRest ? settings.shortRestMin : settings.workMin) * MIN_TO_MS;
  const percentage = timeMs / currentTimerSec;
  const renderFrequencyMs = 1000 / FPS;

  useEffect(() => {
    resetTimer();
  }, [settings])

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
      const nextTimerSec = (nextIsRest ? settings.shortRestMin : settings.workMin) * MIN_TO_MS;
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
      <Cycles cycles={settings.cycles} cycleCount={cycleCount} isRunning={isRunning} isRest={isRest} />
      <RestartAltIcon onClick={() => resetTimer()} />
      <TuneSharpIcon  onClick={() => setIsSettingsOpen(value => !value)} />
      <Settings show={isSettingsOpen} settings={settings} onSettingsChange={setSettings}/>
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