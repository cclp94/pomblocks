import styles from '../styles/Cycles.module.css';

export default function Cycles({ cycleCount, cycles, isRunning, isRest}: {cycles: number, cycleCount: number, isRunning: boolean, isRest: boolean}) {

  const renderBlocks = Array(cycles).fill(0).map((_, i) => {
    let className = styles.cycle;
    if (i < cycleCount) {
      className += ` ${styles.complete}`
    } else if (i === cycleCount) {
      if (isRunning) {
        className += ` ${styles.ongoing}`
      } else if (isRest) {
        className += ` ${styles.halfway}`
      }
    }
    return <li key={i} className={className}></li>
  });

  return <ul className={styles.container}>
    {renderBlocks}
    </ul>
}