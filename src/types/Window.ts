import { PomodoroSettings } from "./PomodoroSettings";

export interface Window {
  settings: {
    getPomSettings: () => Promise<PomodoroSettings>,
    setPomSettings: (settings: PomodoroSettings) => Promise<string | null>
  }
}