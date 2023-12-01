// import React from 'react';
import { options } from '../../types';
import { isValidDate } from '../../util/IsValidDate';
import styles from './Tbody.module.css';
// import cn from 'class'

interface TbodyProps {
  value: string | number;
}

const Tbody = ({ value }: TbodyProps) => {
  const date = new Date(value);
  if (Array.isArray(value)) {
    return <td className={styles.links}>{value.join(' ')}</td>;
  }
  if (typeof value === 'object') {
    return <td>dfg</td>;
  }
  if (
    isValidDate(value) &&
    !isNaN(date.getTime()) &&
    typeof value !== 'number'
  ) {
    return (
      <td className={styles.content}>
        {new Intl.DateTimeFormat('en-US', options).format(date)}
      </td>
    );
  }
  return <td className={styles.content}>{value}</td>;
};

export default Tbody;
