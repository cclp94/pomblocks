import { useState } from 'react';
import { PomodoroSettings } from '../../../types/PomodoroSettings';
import styles from '../styles/Settings.module.css';

export default function Settings({show, settings, onSettingsChange }: {show: boolean, settings: PomodoroSettings, onSettingsChange: (settings: PomodoroSettings) => void}) {
  const [cycles, setCycles] = useState(settings.cycles.toString());
  const [workMin, setWorkMin] = useState(settings.workMin.toString());
  const [shortRestMin, setShortRestMin] = useState(settings.shortRestMin.toString());
  const [longRestMin, setLongRestMin] = useState(settings.longRestMin.toString());

  function onsubmit(e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault();
    onSettingsChange({
      cycles: Number.parseInt(cycles),
      workMin: Number.parseFloat(workMin),
      shortRestMin: Number.parseFloat(shortRestMin),
      longRestMin: Number.parseFloat(longRestMin)
    })
  }

  const modal = <form className={styles.form} onSubmit={(e) => onsubmit(e)}>
    <label>
      Cycles per block: <br/>
      <input type='text' value={cycles} pattern="\d+" required onChange={(e) => setCycles(e.target.value)}/>
    </label>
    <label>
      Work time: <br/>
      <input type='text' value={workMin} pattern="\d+(\.\d+)?" onChange={(e) => setWorkMin(e.target.value)} />
    </label>
    <label>
      Short rest time: <br/>
      <input type='text' value={shortRestMin} pattern="\d+(\.\d+)?" onChange={(e) => setShortRestMin(e.target.value)} />
    </label>
    <label>
      Long rest time: <br/>
      <input type='text' value={longRestMin} pattern="\d+(\.\d+)?" onChange={(e) => setLongRestMin(e.target.value)} />
    </label>
    <button type='submit'>Save</button>
  </form>
  return <>
    { show && modal}
  </>;
}