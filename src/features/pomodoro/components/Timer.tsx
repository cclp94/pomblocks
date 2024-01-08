import styles from '../styles/Timer.module.css';

export type TimerProps = {
  time: number;
  percentage: number;
  isRest: boolean;
}

export default function Timer(props: TimerProps ) {
  const color = props.isRest ? '--rest-timer-color' : '--active-timer-color';
  const formatTime = (timeMs: number): string => {
    const d = new Date();
    d.setTime(timeMs);
    const min = d.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const sec = d.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return `${min}:${sec}`
  }
  return <div className={styles.timer} style={{background: `conic-gradient(var(${color}) ${ (1 - props.percentage) * 100}%, 0, rgb(237, 235, 233) )`}}>
    <span className={styles.counter + ' block-style'}>{formatTime(props.time)}</span>
  </div>
}