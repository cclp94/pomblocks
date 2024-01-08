import styles from '../styles/Cycles.module.css';

export default function Cycles({ cycles, isRunning, isRest}: {cycles: number, isRunning: boolean, isRest: boolean}) {
  const BLOCK_COUNT = 4;

  const renderBlocks = Array(BLOCK_COUNT).fill(0).map((_, i) => {
    let className = styles.cycle;
    if (i < cycles) {
      className += ` ${styles.complete}`
    } else if (i === cycles) {
      if (isRunning) {
        className += ` ${styles.ongoing}`
      } else if (isRest) {
        className += ` ${styles.halfway}`
      }
    }
    return <li key={i} className={className}></li>
  })
  return <ul className={styles.container}>
    {renderBlocks}
    </ul>
}