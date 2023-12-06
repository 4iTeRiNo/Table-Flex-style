import styles from './Thead.module.css';
interface Thead {
  data: string[];
}

const Thead = ({ data }: Thead) => {
  return (
    <div className={styles.thead}>
      {data.map((value, index) => (
        <span className={styles.content} key={index}>
          {value}
        </span>
      ))}
    </div>
  );
};

export default Thead;
