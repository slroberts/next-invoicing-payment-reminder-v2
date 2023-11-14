import { useCallback, useEffect, useState } from 'react';

type SortDirection = 'asc' | 'desc' | '';

interface SortState<T> {
  sortedData: T[];
  sortDirection: SortDirection;
  sortedColumn: keyof T | null;
}

const useSortTableData = <T extends object>(
  initialData: T[],
  initialDirection: SortDirection = 'asc',
  defaultSortColumn?: keyof T
) => {
  const [sortState, setSortState] = useState<SortState<T>>({
    sortedData: initialData,
    sortDirection: initialDirection,
    sortedColumn: null,
  });

  const sortDataBy = useCallback(
    (property: keyof T, direction: SortDirection) => {
      setSortState((currentState) => {
        const newDirection = direction;

        const sorted = [...currentState.sortedData].sort((a, b) =>
          newDirection === 'asc'
            ? String(a[property]).localeCompare(String(b[property]))
            : String(b[property]).localeCompare(String(a[property]))
        );

        return {
          ...currentState,
          sortedData: sorted,
          sortDirection: newDirection,
          sortedColumn: property,
        };
      });
    },
    []
  );

  const resetSorting = useCallback(() => {
    setSortState((currentState) => ({
      ...currentState,
      sortDirection: initialDirection,
      sortedColumn: null,
    }));
  }, [initialDirection]);

  useEffect(() => {
    if (defaultSortColumn) {
      sortDataBy(defaultSortColumn, initialDirection);
    }
  }, [sortDataBy, defaultSortColumn, initialDirection]);

  const { sortedData, sortDirection, sortedColumn } = sortState;
  return { sortedData, sortDataBy, sortDirection, sortedColumn, resetSorting };
};

export default useSortTableData;
