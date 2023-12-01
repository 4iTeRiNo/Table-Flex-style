export type State =
  | { status: 'empty' }
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: TDataList; columns: string[] };

export type Action =
  | { type: 'request' }
  | { type: 'success'; results: TDataList }
  | { type: 'failure'; error: string };

export type TDataList = {
  info: TInfo;
  results: TResults[];
};

type TInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

export type TResults =
  | {
      created: string;
      episode: string[];
      gender: string;
      id: number;
      image: string;
      location: {
        name: string;
        url: string;
      };
      name: string;
      origin: {
        name: string;
        url: string;
      };
      species: string;
      status: string;
      type: string;
      url: string;
    }
  | {
      id: number;
      name: string;
      created: string;
      type: string;
      dimension: string;
      residents: string[];
      url: string;
    };
