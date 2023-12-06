import { SetStateAction, Dispatch } from 'react';
import styles from './Footer.module.css';
import RowPerPage from './Pagination/RowPerPage';
import Pagination from './Pagination/Pagination';
import { TResults } from '../../types';
import useTable from '../../hooks/useTable';

interface FooterProps {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  data: TResults[];
  rowsTable: number[];
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
}

const Footer = ({
  setPage,
  page,
  data,
  rowsTable,
  rows,
  setRows,
}: FooterProps) => {
  const { range } = useTable(data, page, rows);

  return (
    <footer className={styles.footer}>
      <div>
        <span>{1}</span>
        {'-'}
        <span>{rows}</span>
        {' of '}
        <span>{data.length}</span>
      </div>
      <div className={styles.pagination}>
        <RowPerPage rows={rows} rowsTable={rowsTable} setRows={setRows} />
        <Pagination page={page} range={range} setPage={setPage} />
      </div>
    </footer>
  );
};

export default Footer;
