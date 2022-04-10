import React from 'react';
import DatatableHeader from './DatatableHeader';
import Table from './Table';
import { ITable } from './table.types';

function DataTable({
  cols = [],
  rows = [],
  selection = false,
  limit = 10,
  skip = 0,
  total = 0,
  onNext,
  onPrevious,
  onSelectionChange,
  onSearch = (v) => v,
  onRowHover = (v) => v,
  selectedItems = [],
  onToastClosed = () => {},
  onRemoved = () => {},
}: ITable) {
  return (
    <div className="datatable">
      <DatatableHeader
        limit={limit}
        skip={skip}
        total={total}
        onNext={onNext}
        onPrevious={onPrevious}
        onSearch={onSearch}
      />
      <Table
        onSelectionChange={onSelectionChange}
        cols={cols}
        rows={rows}
        selection={selection}
        onRowHover={onRowHover}
        selectedItems={selectedItems}
        onToastClosed={onToastClosed}
        onRemoved={onRemoved}
      />
    </div>
  );
}

export default DataTable;
