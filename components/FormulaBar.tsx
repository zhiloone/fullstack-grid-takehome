import { CellAddress } from "@/types";

interface FormulaBarProps {
  selected: CellAddress;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormulaBar = ({
  selected,
  value = "",
  onChange,
  onKeyDown,
}: FormulaBarProps) => {
  return (
    <div className="formula-bar">
      {/* Selected cell address */}
      <div className="formula-bar-address">
        {selected}
      </div>

      {/* Formula input */}
      <input
        type="text"
        className="formula-bar-input"
        placeholder="Enter value or formula"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => onKeyDown?.(e)}
      />
    </div>
  );
};
