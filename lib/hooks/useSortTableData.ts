import { useEffect, useState } from 'react';

type SortDirection = 'asc' | 'desc';

const useSortTableData = <T extends object>(
  initialData: T[],
  initialDirection: SortDirection = 'asc',
  defaultSortColumn?: keyof T
) => {
  const [sortedData, setSortedData] = useState<T[]>(initialData);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialDirection);
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(null);

  useEffect(() => {
    if (defaultSortColumn) {
      sortDataBy(defaultSortColumn);
    }
  }, []);

  const sortDataBy = (property: keyof T) => {
    const newDirection =
      sortedColumn === property && sortDirection === 'asc' ? 'desc' : 'asc';

    const sorted = [...sortedData].sort((a, b) =>
      newDirection === 'asc'
        ? String(a[property]).localeCompare(String(b[property]))
        : String(b[property]).localeCompare(String(a[property]))
    );

    setSortDirection(newDirection);
    setSortedColumn(property);
    setSortedData(sorted);
  };

  return { sortedData, sortDataBy, sortDirection, sortedColumn };
};

export default useSortTableData;
