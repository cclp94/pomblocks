import styles from './MenuHeader.module.css';

export default function MenuHeader() {
  return <div className={styles.container}>
    <h1 className={styles.title}>Pom<span className="block-style">blocks</span></h1>
  </div>
} 