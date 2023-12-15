import { useEffect, useState } from 'react';
import { TResults } from '../types';

const filterData = (dataItem: TResults[], text: string) => {
  return dataItem.filter((item) => item?.name.toLowerCase().includes(text));
};

export const useData = (data: TResults[], text: string) => {
  const [searchQuery, setSearchQuery] = useState<TResults[]>([]);

  useEffect(() => {
    const searchQuery = filterData(data, text);
    setSearchQuery([...searchQuery]);
  }, [setSearchQuery, text, data]);

  return searchQuery;
};
