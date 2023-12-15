import { Action, State } from './types';

const dataReduce = (state: State, action: Action): State => {
  switch (action.type) {
    case 'request':
      return { status: 'loading', data: [], error: null };
    case 'success':
      return {
        status: 'success',
        data: action.payload,
        error: null,
      };
    case 'failure':
      return { status: 'error', error: action.error, data: [] };

    default:
      return state;
  }
};

export default dataReduce;
