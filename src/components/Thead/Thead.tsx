import styles from './Thead.module.css';
interface Thead {
  item: React.ReactNode;
}

const Thead = ({ item }: Thead) => {
  return (
    <thead className={styles.thead}>
      <tr className={styles.content}>{item}</tr>
    </thead>
  );
};

export default Thead;
