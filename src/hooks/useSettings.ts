import { useEffect, useRef, useState } from "react";
import { Window } from "../types/Window";
import { PomodoroSettings } from "../types/PomodoroSettings";

declare const window: Window;

export function useSettings() {
  const [settings, setSettings] = useState<PomodoroSettings>();
  const [error, setError] = useState<string | null>();
  const prevSettings = useRef<PomodoroSettings>();

  useEffect(() => {
    const getPomSettings = async () => {
      const s = await window.settings.getPomSettings();
      prevSettings.current = s;
      setSettings(s);
    }
    const saveSettings = async (s: PomodoroSettings) => {
      const error: string | null = await window.settings.setPomSettings(s);
      if (!error) {
        prevSettings.current = s;
      }
      setError(error);
    }
    if (!prevSettings.current) {
      getPomSettings()
      // Dumb deep equality to avoid useless resaves. There's definetly a better way
    } else if (!!settings && JSON.stringify(prevSettings.current) !== JSON.stringify(settings)) {
      saveSettings(settings);
    }
  }, [settings])

  return [settings, setSettings, error] as [PomodoroSettings, React.Dispatch<React.SetStateAction<PomodoroSettings>>, string | null];
}