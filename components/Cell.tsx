import { getCellContent } from "@/lib/cell";
import { Cell as CellType } from "@/types";
import { ChangeEvent, useEffect, useRef } from "react";

interface CellProps {
  cell?: CellType;
  isSelected?: boolean;
  isEditing?: boolean;
  editValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onDoubleClick?: () => void;
  onClick?: () => void;
}

export function Cell({
  cell,
  isSelected,
  isEditing,
  editValue = "",
  onChange,
  onDoubleClick,
  onClick,
}: CellProps) {
  const value = getCellContent(cell);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (isSelected && isEditing) {
    return (
      <td className="sheet-cell sheet-cell-selected px-2">
        <input
          ref={inputRef}
          className="sheet-cell-input"
          value={editValue}
          onChange={onChange}
        />
      </td>
    );
  }

  return (
    <td
      className={isSelected ? "sheet-cell sheet-cell-selected" : "sheet-cell"}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {value}
    </td>
  );
}
