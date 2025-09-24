import { CellAddress, toCellAddress } from '@/types';

// Convert column index to letter(s) (0 -> A, 25 -> Z, 26 -> AA)
export function colToLetter(col: number): string {
  let result = '';
  let n = col;
  while (n >= 0) {
    const remainder = n % 26;
    result = String.fromCharCode(65 + remainder) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

// Convert letter(s) to column index (A -> 0, Z -> 25, AA -> 26)
export function letterToCol(letters: string): number {
  let result = 0;
  for (let i = 0; i < letters.length; i++) {
    result *= 26;
    result += letters.charCodeAt(i) - 64; // 'A' = 65 → 1
  }
  return result - 1;
}

// Parse a cell address with absolute/relative refs ($A$1, A$1, $A1, A1)
export function parseAddress(addr: string): {
  col: number;
  row: number;
  absoluteCol: boolean;
  absoluteRow: boolean;
} {
  const match = addr.match(/^(\$?)([A-Z]+)(\$?)(\d+)$/);
  if (!match) throw new Error(`Invalid address: ${addr}`);
  const [, colAbs, colLetters, rowAbs, rowNum] = match;
  return {
    col: letterToCol(colLetters),
    row: parseInt(rowNum, 10) - 1,
    absoluteCol: colAbs === '$',
    absoluteRow: rowAbs === '$',
  };
}

// Format a cell address with absolute/relative refs
export function formatAddress(
  col: number,
  row: number,
  absoluteCol: boolean = false,
  absoluteRow: boolean = false
): CellAddress {
  const colLetters = colToLetter(col);
  const rowNum = row + 1;
  const colPart = (absoluteCol ? '$' : '') + colLetters;
  const rowPart = (absoluteRow ? '$' : '') + rowNum;
  return toCellAddress(colPart + rowPart);
}
// Parse a range (A1:B3)
export function parseRange(range: string): {
  start: CellAddress;
  end: CellAddress;
} {
  const [start, end] = range.split(':');
  if (!start || !end) throw new Error(`Invalid range: ${range}`);
  return {
    start: toCellAddress(start),
    end: toCellAddress(end),
  };
}

// Get all cells in a range
export function getCellsInRange(
  startAddr: CellAddress,
  endAddr: CellAddress
): CellAddress[] {
  const start = parseAddress(startAddr);
  const end = parseAddress(endAddr);

  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);
  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);

  const result: CellAddress[] = [];
  for (let c = minCol; c <= maxCol; c++) {
    for (let r = minRow; r <= maxRow; r++) {
      result.push(formatAddress(c, r));
    }
  }
  return result;
}

// Adjust a cell reference when rows/columns are inserted or deleted
export function adjustReference(
  addr: CellAddress,
  insertedAt: { row?: number; col?: number },
  deletedAt: { row?: number; col?: number },
  isAbsolute: { col: boolean; row: boolean }
): CellAddress {
  // TODO: Adjust cell reference based on insert/delete operations
  // Respect absolute references (don't adjust if absolute)
  throw new Error('Not implemented');
}

// Transform a formula when copying/pasting (relative refs change, absolute don't)
export function transformFormula(
  formula: string,
  fromCell: CellAddress,
  toCell: CellAddress
): string {
  // TODO: Transform formula references based on relative offset
  // Parse formula, adjust all relative refs, preserve absolute refs
  throw new Error('Not implemented');
}

// Check if a cell address is valid for given sheet dimensions
export function isValidAddress(
  addr: CellAddress,
  maxRows: number,
  maxCols: number
): boolean {
  // TODO: Validate that address is within sheet bounds
  throw new Error('Not implemented');
}

// Get neighboring cell address (for arrow key navigation)
export function getNeighbor(
  addr: CellAddress,
  direction: 'up' | 'down' | 'left' | 'right',
  maxRows: number,
  maxCols: number
): CellAddress | null {
  // TODO: Return neighboring cell or null if at boundary
  throw new Error('Not implemented');
}

export function getColsCount(sheetCols: number, defaultCols: number = 10): number {
  return Math.min(sheetCols, defaultCols);
}

export function getRowsCount(sheetRows: number, defaultRows: number = 20): number {
  return Math.min(sheetRows, defaultRows);
}