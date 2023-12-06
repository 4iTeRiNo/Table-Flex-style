import { isValidDate } from '../../hooks/IsValidDate';
import { options } from '../../types';
import styles from './Tbody.module.css';

interface CheckValueStringProps {
  value: string | number;
}

const CheckValueString = ({ value }: CheckValueStringProps) => {
  const date = new Date(value);

  if (Array.isArray(value)) {
    return <span className={styles.content}>{value.join(' ')}</span>;
  }
  if (typeof value === 'object') {
    return <span>dfg</span>;
  }
  if (
    isValidDate(value) &&
    !isNaN(date.getTime()) &&
    typeof value !== 'number'
  ) {
    return (
      <span className={styles.content}>
        {new Intl.DateTimeFormat('en-US', options).format(date)}
      </span>
    );
  }

  return <span className={styles.content}>{value}</span>;
};

export default CheckValueString;
