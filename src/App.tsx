import axios from 'axios';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
// import useDebounce from './hooks/debounce';
import { useData } from './hooks/useData';
import { initialState } from './types';
import { FIRST_API_URL, SET_API_URl, rowsTable } from './constants';
import { stateContext } from './StateContext';

import Thead from './components/Thead/Thead';
import Tbody from './components/Tbody/Tbody';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import dataReducer from './dataReducer';
import SelectApi from './components/SelectApi/SelectApi';
import './App.css';

function App() {
  const [value, setValue] = useState(FIRST_API_URL);
  const [rows, setRows] = useState<number>(15);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const [state, dispatch] = useReducer(dataReducer, initialState);

  // const getRandomQuote = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // };

  useEffect(() => {
    dispatch({ type: 'request', payload: [], error: null });

    dispatch({ type: 'loading', payload: [], error: null });

    setTimeout(() => {
      axios(value).then(
        (responsive) => {
          dispatch({
            type: 'success',
            payload: responsive.data.results,
            error: null,
          });
        },
        (error) => dispatch({ type: 'failure', payload: [], error: error }),
      );
    }, 2000);
  }, [value]);

  const option = SET_API_URl.map((url, index) => (
    <option key={index}>{url}</option>
  ));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  const data = useData(state.data, searchValue);

  return (
    <div className="App">
      <SelectApi option={option} value={value} handleChange={handleChange} />
      {state.status === 'loading' && <Loader />}

      {state.data && (
        <stateContext.Provider value={data}>
          <div className="table">
            <Thead setSearchValue={setSearchValue} />
            <Tbody rows={rows} page={page} />
            <Footer
              page={page}
              rows={rows}
              setPage={setPage}
              setRows={setRows}
              rowsTable={rowsTable}
            />
          </div>
        </stateContext.Provider>
      )}

      {state.status === 'error' && <span>Error: {state.error}</span>}
    </div>
  );
}

export default App;
