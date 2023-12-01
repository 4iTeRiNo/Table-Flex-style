import React, { Dispatch, SetStateAction } from 'react';
import style from './RowsInputButton.module.css';

interface RowsInputButtonProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

function RowsInputButton({ setOpen }: RowsInputButtonProps) {
  const rows = [5, 10, 15, 20, 30, 40, 50];
  return (
    <div className={style.wrapper}>
      <ul className={style.input}>
        {rows.map((item, index) => (
          <li key={index} className={style.value}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RowsInputButton;
