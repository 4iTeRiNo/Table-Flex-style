// import { useEffect, useReducer } from 'react';
// import axios from 'axios';
// import dataReducer, {  } from './dataReducer';

// export const useRequest = (url) => {
//   const [state, dispatch] = useReducer(dataReducer, {
//     loading: true,
//     list: null,
//     error: null,
//   });

//   useEffect(() => {
//     axios
//       .get(url)
//       .then((res) => {
//         dispatch({ type: SET_CONTRIBUTORS, list: res.data });
//       })
//       .catch((err) => {
//         dispatch({ type: SET_ERROR, error: 'Error Loading data' });
//       });
//   }, [url]);
//   return {
//     state,
//   };
// };
