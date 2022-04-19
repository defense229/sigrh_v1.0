import { useState } from 'react';
import { ITableRow } from '../../components/Tables/table.types';
import { usePagination } from './usePagination';
import { useQueryParams } from './useQueryParams';
import { useSearch } from './useSearch';

export function useTable(data: any) {
  const { handleNext, handlePrevious } = usePagination(data);
  const { params, reload } = useQueryParams();
  const { isSearching, handleSearch } = useSearch();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [hovered, setHovered] = useState<any>({ id: '' });

  const handleSelection = (selected: any[]) => {
    setSelectedItems(selected);
  };

  const handleHover = (row: ITableRow) => setHovered(row as any);

  return {
    onNext: handleNext,
    onPrevious: handlePrevious,
    onSearch: handleSearch,
    total: data.total,
    limit: params.limit,
    skip: params.skip,
    onSelectionChange: handleSelection,
    selectedItems,
    setSelectedItems,
    hovered,
    onRowHover: handleHover,
    reload,
    isSearching,
  };
}
