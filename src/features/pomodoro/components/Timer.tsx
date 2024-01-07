import styles from './Timer.module.css';
import NotStartedIcon from '@mui/icons-material/NotStarted';

export type TimerProps = {
  time: number;
  percentage: number;
  isRest: boolean;
  toggleTimer: () => void
}

export default function Timer(props: TimerProps ) {
  const color = props.isRest ? '--rest-timer-color' : '--active-timer-color';
  const formatTime = (timeMs: number): string => {
    const d = new Date();
    d.setTime(timeMs);
    const min = d.getMinutes();
    const sec = d.getSeconds();
    return `${d.getMinutes()}min ${d.getSeconds()}sec`
  }
  return <div onClick={() => {console.log('here', props.toggleTimer); props.toggleTimer()}} className={styles.timer} style={{background: `conic-gradient(var(${color}) ${ (1 - props.percentage) * 100}%, 0, rgb(237, 235, 233) )`}}>
    <span className={styles.counter}>{formatTime(props.time)} <NotStartedIcon className={styles.icon} /></span>
    
  </div>
}