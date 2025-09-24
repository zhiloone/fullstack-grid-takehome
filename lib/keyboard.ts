import { CellAddress } from "@/types";
import { formatAddress, getColsCount, getRowsCount, parseAddress } from "./grid";

export type MovementKey = string & { __brand: 'MovementKey' }

export function isMovementKey(key: string): key is MovementKey {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Tab", "Home", "End"].includes(key)
}

export function getNextCell(
  current: CellAddress,
  key: MovementKey,
  sheetColsCount: number,
  sheetRowsCount: number,
  opts: { shift?: boolean } = {}
) {
  const { row, col } = parseAddress(current);
  const { shift } = opts;

  const maxCols = getColsCount(sheetColsCount);
  const maxRows = getRowsCount(sheetRowsCount)

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  let nextRow = row;
  let nextCol = col;

  switch (key) {
    case "ArrowUp":
      nextRow = row - 1;
      break;
    case "ArrowDown":
      nextRow = row + 1;
      break;
    case "ArrowLeft":
      nextCol = col - 1;
      break;
    case "ArrowRight":
      nextCol = col + 1;
      break;
    case "Tab":
      nextCol = shift ? col - 1 : col + 1;
      break;
    case "Enter":
      nextRow = shift ? row - 1 : row + 1;
      break;
    case "Home":
      nextCol = 0;
      break;
    case "End":
      nextCol = maxCols - 1;
      break;
  }

  nextCol = clamp(nextCol, 0, maxCols - 1);
  nextRow = clamp(nextRow, 0, maxRows - 1);

  return formatAddress(nextCol, nextRow);
}

export function isPrintableKey(e: React.KeyboardEvent) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}

export function shouldStartCellEdit(e: React.KeyboardEvent): boolean {
  return (
    e.key === "Enter" ||
    e.key === "F2" ||
    isPrintableKey(e)
  );
}