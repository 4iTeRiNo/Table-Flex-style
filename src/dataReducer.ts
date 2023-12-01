import { Action, State } from './types';

const dataReduce = (state: State, action: Action): State => {
  switch (action.type) {
    case 'request':
      return { status: 'loading' };
    case 'success':
      return {
        status: 'success',
        data: action.results,
        columns: Object.keys(
          Array.isArray(action.results.results)
            ? action.results.results[0]
            : [],
        ),
      };
    case 'failure':
      return { status: 'error', error: action.error };
  }
};

export default dataReduce;
