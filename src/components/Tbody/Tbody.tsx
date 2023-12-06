// import React from 'react';
import { TResults } from '../../types';
import styles from './Tbody.module.css';
import useTable from '../../hooks/useTable';
import CheckValueString from './CheckValueString';

interface TbodyProps {
  rows: number;
  data: TResults[];
  columns: string[];
  page: number;
}

const Tbody = ({ data, rows, columns, page }: TbodyProps) => {
  const { slice } = useTable(data, page, rows);

  return (
    <>
      <div className={styles.tbody}>
        {slice.map((item, index) => {
          return (
            <div key={index} className={styles.rows}>
              {columns.map((column, index) => {
                return (
                  <div className={styles.value} key={index}>
                    <CheckValueString value={item[column]} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tbody;
