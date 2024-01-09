import { useEffect, useState } from "react"
import { PomodoroSettings } from "../types/PomodoroSettings"

const defaultSettings: PomodoroSettings = {
  cycles: 3,
  workMin: 0.05,
  shortRestMin: 0.02,
  longRestMin: 0.02,
}

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    // TODO
    // update settings here
  }, [settings])

  return [settings, setSettings] as [PomodoroSettings, React.Dispatch<React.SetStateAction<PomodoroSettings>>];
}