import React, { memo, useEffect, useRef } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Toast from '../Modals/Toast';
import SvgTrash from '../Svgs/SvgTrash';
import Flex from '../Utils/Flex/Flex';
import { ITable, ITableCol, ITableRow } from './table.types';

function Table({
  cols = [],
  rows = [],
  selection = false,
  onSelectionChange = () => {},
  onRowHover = (row) => row,
  selectedItems = [],
  onToastClosed = () => {},
  onRemoved = () => {},
}: ITable) {
  const _selectedItems = useRef<ITableRow[]>(selectedItems);

  useEffect(() => {
    _selectedItems.current = selectedItems;
  }, [selectedItems]);

  const toggleAll = (value: boolean) => {
    const result = value ? [...rows] : [];
    _selectedItems.current = result;
    onSelectionChange(result);
  };

  const toggle = (value: boolean, row: ITableRow) => {
    let result;
    if (!value) {
      result = selectedItems.filter((item: ITableRow) => item.id !== row.id);
      _selectedItems.current = result;
    } else {
      result = [...selectedItems, row];
      _selectedItems.current = result;
    }
    onSelectionChange(result);
  };

  return (
    <div className="dt-box">
      <table>
        <thead>
          <tr>
            {selection && (
              <th className="check">
                <Checkbox
                  checked={_selectedItems.current.length === rows.length}
                  onChange={(value: boolean) => toggleAll(value)}
                />
              </th>
            )}
            {cols.map((col: ITableCol, index: number) => {
              return <th key={index}>{col.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: ITableRow, indexRow: number) => {
            return (
              <tr key={indexRow} onMouseOver={() => onRowHover(row)}>
                {selection && (
                  <td className="check">
                    <Checkbox
                      checked={
                        _selectedItems.current.findIndex(
                          (it) => it.id === row.id
                        ) !== -1
                      }
                      onChange={(value: boolean) => toggle(value, row)}
                    />
                  </td>
                )}
                {cols.map((col: ITableCol, indexCol: number) => {
                  return (
                    <td key={indexCol}>
                      {col.name
                        ? row[col.name]
                        : col.render
                        ? col.render(row)
                        : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Toast
        ypos="bottom"
        duration={3600}
        open={_selectedItems.current.length > 0}
        onClose={onToastClosed}
      >
        <Flex gap="40px">
          <div>
            {_selectedItems.current.length} sélectionné
            {_selectedItems.current.length === 1 ? '' : 's'}:
          </div>
          <Flex
            items="center"
            gap="10px"
            className="cursor-pointer"
            onClick={() => onRemoved(_selectedItems.current)}
          >
            <SvgTrash />
            <div>Archiver</div>
          </Flex>
        </Flex>
      </Toast>
    </div>
  );
}

export default memo(Table);
