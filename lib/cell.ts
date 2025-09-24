import { Cell } from "@/types";

export function getCellContent(cell: Cell | undefined): string {
  switch (cell?.kind) {
    case "literal":
      return String(cell.value);
    case "formula":
      return cell.src;
    case "error":
      return `#${cell.code}!`;
    default:
      return "";
  }
} 