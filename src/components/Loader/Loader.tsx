import styles from './Loader.module.css';

const Loader = () => {
  return (
    <span>
      Loading...
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </span>
  );
};
export default Loader;
