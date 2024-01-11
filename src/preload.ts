// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('settings', {
  getPomSettings: () => ipcRenderer.invoke('settings/pom/get'),
  setPomSettings: (settings: any) => ipcRenderer.invoke('settings/pom/set', settings)
})