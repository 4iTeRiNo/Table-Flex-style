import axios from 'axios';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import dataReducer from './dataReducer';
import Tbody from './components/Tbody/Tbody';

import './App.css';
import { TDataList } from './types';
import Thead from './components/Thead/Thead';
import { useDebounce } from './util/debounce';
import Footer from './components/Footer/Footer';
import Pagination from './components/Footer/Pagination/Pagination';

function App() {
  const FIRST_API_URL = 'https://rickandmortyapi.com/api/location';
  const SECOND_API_URL = 'https://rickandmortyapi.com/api/character';
  const SET_API_URl = [FIRST_API_URL, SECOND_API_URL];
  const rowsTable = [5, 10, 15, 20, 30, 40, 50];

  const [value, setValue] = useState(FIRST_API_URL);
  const [state, dispatch] = useReducer(dataReducer, { status: 'empty' });
  const debouncedValue = useDebounce<string>(value, 500);

  const [rows, setRows] = useState<number>(5);
  const [page, setPage] = useState(1);
  const [isOpen, setOpen] = useState(false);

  const lastIndex = page * rows;
  const firstIndex = lastIndex - rows;

  // const getTotalPageCount = (rowCount: number): number =>
  //   Math.ceil(rowCount / rows);

  useEffect(() => {
    let ignore = false;
    dispatch({ type: 'request' });

    axios<TDataList>(debouncedValue).then(
      (responsive) => {
        if (!ignore) dispatch({ type: 'success', results: responsive.data });
      },
      (error) => dispatch({ type: 'failure', error }),
    );
    return () => {
      ignore = true;
    };
  }, [debouncedValue]);

  const option = SET_API_URl.map((url, index) => (
    <option key={index}>{url}</option>
  ));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="App">
      <select className="select" value={value} onChange={handleChange}>
        {option}
      </select>
      {state.status === 'loading' && (
        <span>
          Loading...
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </span>
      )}

      {state.status === 'success' && state.data.results && (
        <table className="Table">
          <Thead
            item={state.columns.map((item, index) => (
              <th className="content" key={index}>
                {item}
              </th>
            ))}
          />
          <tbody>
            {state.data.results
              .slice(firstIndex, lastIndex)
              .map((item, index) => {
                return (
                  <tr key={index}>
                    {state.columns.map((column, index) => {
                      return <Tbody key={index} value={item[column]} />;
                    })}
                  </tr>
                );
              })}
          </tbody>
          <Footer totalRows={`${page}-${rows} of ${state.data.results.length}`}>
            <div className="rowsWrap">
              {'Rows per page:'}
              <div className="dropdown">
                <div
                  onClick={() => {
                    setOpen(!isOpen);
                  }}
                  className="dropdown-btn"
                >
                  {rows}
                  <span
                    className={isOpen ? 'fas fa-caret-up' : 'fas fa-caret-down'}
                  />
                </div>
                <div
                  className="dropdown-content"
                  style={{ display: isOpen ? 'block' : 'none' }}
                >
                  {rowsTable.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setRows(item);
                        setOpen(!isOpen);
                      }}
                      className="item"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Footer>
        </table>
      )}

      {state.status === 'error' && <span>Error: {state.error}</span>}
    </div>
  );
}

export default App;
