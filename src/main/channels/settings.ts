import { ipcMain, app, IpcMainInvokeEvent } from "electron";
import { PomodoroSettings } from "../../types/PomodoroSettings";
import fs from 'node:fs';
import path from 'node:path';

export const SETTINGS_CHANNEL_KEY = 'settings';

const DEFAULT_POM_SETTINGS: PomodoroSettings = {
  cycles: 3,
  workMin: 0.05,
  shortRestMin: 0.02,
  longRestMin: 0.02,
}

/**
 * Get existing settings or creates default settings in case they don't.
 * @param path path of the settings file
 * @returns settings
 */
function getOrCreateSettings(path: string): PomodoroSettings {
  if (!fs.existsSync(path)) {
    setSettings(path, DEFAULT_POM_SETTINGS)
  }
  const settings: PomodoroSettings = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
  return settings;
}

/**
 * Saves a setting file to the path
 * @param path path of the file
 * @param settings json will be stringfied
 * @returns error message or null if correctly saved
 */
function setSettings(path: string, settings: PomodoroSettings): string | null {
  try {
    fs.writeFileSync(path, JSON.stringify(settings), { encoding: 'utf-8' });
    return null;
  } catch (err) {
    return `Unable to save settings: ${err}`
  }
}

export default function setupSettingsChannel() {
  const userDirectory = app.getPath('userData');
  const POM_SETTINGS_FILENAME = 'pomsettings.json'
  const settingsFilePath: string = path.join(userDirectory, POM_SETTINGS_FILENAME)

  ipcMain.handle(`${SETTINGS_CHANNEL_KEY}/pom/get`, () => {
    console.info(`Getting pom settings from ${settingsFilePath}`);
    return getOrCreateSettings(settingsFilePath);
  })

  ipcMain.handle(`${SETTINGS_CHANNEL_KEY}/pom/set`, (event: IpcMainInvokeEvent, settings: PomodoroSettings) => {
    console.info(`Saving pom settings to ${settingsFilePath}: `, JSON.stringify(settings));
    return setSettings(settingsFilePath, settings);
  })
}