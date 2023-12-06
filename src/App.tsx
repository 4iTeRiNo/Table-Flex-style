import axios from 'axios';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import dataReducer from './dataReducer';
import Tbody from './components/Tbody/Tbody';

import './App.css';
import { TDataList } from './types';
import Thead from './components/Thead/Thead';
import { useDebounce } from './hooks/debounce';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import SelectApi from './components/SelectApi/SelectApi';

function App() {
  const FIRST_API_URL = 'https://rickandmortyapi.com/api/location';
  const SECOND_API_URL = 'https://rickandmortyapi.com/api/character';
  const SET_API_URl = [FIRST_API_URL, SECOND_API_URL];
  const rowsTable = [5, 10, 15, 20, 30, 40, 50];

  const [value, setValue] = useState(FIRST_API_URL);
  const [state, dispatch] = useReducer(dataReducer, { status: 'empty' });
  const debouncedValue = useDebounce<string>(value, 500);

  const [rows, setRows] = useState<number>(15);
  const [page, setPage] = useState(1);

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
      <SelectApi option={option} value={value} handleChange={handleChange} />
      {state.status === 'loading' && <Loader />}

      {state.status === 'success' && state.data.results && (
        <>
          <div className="table">
            <Thead data={state.columns} />
            <Tbody
              data={state.data.results}
              rows={rows}
              columns={state.columns}
              page={page}
            />
            <Footer
              page={page}
              data={state.data.results}
              rows={rows}
              setPage={setPage}
              setRows={setRows}
              rowsTable={rowsTable}
            />
          </div>
        </>
      )}

      {state.status === 'error' && <span>Error: {state.error}</span>}
    </div>
  );
}

export default App;
