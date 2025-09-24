import { CellAddress, formatCellAddress, Sheet } from "@/types";
import { Cell } from "./Cell";
import { colToLetter, getColsCount, getRowsCount } from "@/lib/grid";
import { KeyboardEventHandler, RefObject } from "react";

interface GridProps {
  ref?: RefObject<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  sheet?: Sheet | null;
  editingCell?: CellAddress | null;
  selected?: CellAddress | null;
  editValues?: Record<CellAddress, string>;
  onCellChange?: (address: CellAddress, value: string) => void;
  onCellClick?: (address: CellAddress) => void;
  onCellDoubleClick?: (address: CellAddress) => void;
}

export const Grid = ({
  ref,
  onKeyDown,
  sheet,
  editingCell,
  selected,
  editValues,
  onCellChange,
  onCellClick,
  onCellDoubleClick,
}: GridProps) => {
  if (!sheet) return <></>;

  return (
    <div
      ref={ref}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="overflow-auto border border-gray-300 rounded-md bg-white outline-none"
    >
      <table className="sheet-table">
        <thead>
          <tr>
            <th className="sheet-header"></th>
            {Array.from({ length: getColsCount(sheet.cols) }, (_, col) => (
              <th key={col} className="sheet-header">
                {colToLetter(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: getRowsCount(sheet.rows) }, (_, row) => (
            <tr key={row}>
              <td className="sheet-row-header">{row + 1}</td>
              {Array.from({ length: getColsCount(sheet.cols) }, (_, col) => {
                const address = formatCellAddress(col, row);
                const isSelected = address === selected
                return <Cell
                  key={col}
                  cell={sheet.cells[address]}
                  isSelected={isSelected}
                  isEditing={editingCell === address}
                  editValue={editValues?.[address]}
                  onChange={(e) => onCellChange?.(address, e.target.value)}
                  onClick={() => onCellClick?.(address)}
                  onDoubleClick={() => onCellDoubleClick?.(address)}
                />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};