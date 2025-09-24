'use client';

import { useState, useEffect, KeyboardEventHandler, useRef } from 'react';
import { useParams } from 'next/navigation';
import { CellAddress, Sheet, toCellAddress } from '@/types';
import { FormulaBar } from '@/components/FormulaBar';
import { Grid } from '@/components/Grid';
import { getNextCell, isMovementKey, isPrintableKey, MovementKey, shouldStartCellEdit } from '@/lib/keyboard';
import { getCellContent } from '@/lib/cell';


export default function SheetPage() {
  const params = useParams();
  const sheetId = params.id as string;

  const gridRef = useRef<HTMLDivElement>(null)

  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<CellAddress>(toCellAddress("A1"));

  const [editingCell, setEditingCell] = useState<CellAddress | null>(null);
  const [editValues, setEditValues] = useState<Record<CellAddress, string>>({});

  const handleOnKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!selected || !sheet) return;

    const key = e.key;
    const isEditing = editingCell === selected;

    // --- Editing Mode ---
    if (isEditing) {
      if (key === "Enter" || key === "Tab") {
        e.preventDefault();
        handleCommitEditing(selected, editValues[selected] ?? "");

        // move selection
        setSelected((sel) =>
          getNextCell(sel, key as MovementKey, sheet.cols, sheet.rows, { shift: e.shiftKey })
        );
      } else if (key === "Escape") {
        e.preventDefault();
        handleAbortEditing(selected);
      }
      return;
    }

    // --- Navigation Mode ---
    if (isMovementKey(key)) {
      e.preventDefault();
      gridRef.current?.focus();
      setSelected((sel) =>
        getNextCell(sel, key, sheet.cols, sheet.rows, { shift: e.shiftKey })
      );
      return;
    }

    // --- Start Editing ---
    if (shouldStartCellEdit(e)) {
      e.preventDefault();
      handleBeginEditing(selected, e);
    }
  };

  const focusGrid = () => {
    requestAnimationFrame(() => {
      gridRef.current?.focus();
    });
  };


  const handleBeginEditing = (address: CellAddress, e?: React.KeyboardEvent) => {
    const oldValue = editValues[address] ?? getCellContent(sheet?.cells[address]);
    let initialDraft = oldValue;

    if (e && isPrintableKey(e)) {
      // overwrite mode: start with the pressed character
      initialDraft = e.key;
    }

    setEditingCell(address);
    setEditValues((prev) => ({
      ...prev,
      [address]: initialDraft,
    }));
  };

  const handleCommitEditing = (address: CellAddress, value: string) => {
    setEditValues((prev) => ({ ...prev, [address]: value }));
    setEditingCell(null);
    focusGrid()
    patchSheet([{ addr: address, kind: sheet?.cells[selected]?.kind ?? 'literal', value }])
  };

  const handleAbortEditing = (address: CellAddress) => {
    setEditValues((prev) => {
      const copy = { ...prev };
      delete copy[address];
      return copy;
    });
    setEditingCell(null);
    focusGrid()
  };

  useEffect(() => {
    fetchSheet();
  }, [sheetId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingCell && gridRef.current && !gridRef.current.contains(event.target as Node)) {
        handleCommitEditing(editingCell, editValues[editingCell] ?? "");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingCell, editValues]);

  useEffect(() => {
    if (editingCell && editingCell !== selected) {
      // commit the currently editing cell
      handleCommitEditing(editingCell, editValues[editingCell] ?? "");
    }
  }, [selected]);

  const fetchSheet = async () => {
    try {
      const response = await fetch(`/api/sheets/${sheetId}`);
      if (response.ok) {
        const data = await response.json();
        setSheet(data);
      }
    } catch (error) {
      console.error('Failed to fetch sheet:', error);
    } finally {
      setLoading(false);
    }
  };

  const patchSheet = async (edits: any[]) => {
    try {
      const response = await fetch(`/api/sheets/${sheetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ edits })
      });
      if (response.ok) {
        const data = await response.json();
        setSheet(data);
      }
    } catch (error) {
      console.error('Failed to patch sheet:', error);
    }
  }

  if (loading) return <div className="p-4 text-gray-600">Loading sheet...</div>;
  if (!sheet) return <div className="p-4 text-red-600">Sheet not found</div>;

  return (
    <div className="sheet-page">
      {/* Toolbar */}
      <div className="sheet-toolbar">
        <h1 className="sheet-title">{sheet.name}</h1>
        <div className="sheet-actions">
          <button className="sheet-btn">Sort</button>
          <button className="sheet-btn">Export CSV</button>
        </div>
      </div>

      {/* Formula Bar */}
      <FormulaBar
        selected={selected}
        value={editValues[selected] ?? getCellContent(sheet?.cells[selected])}
        onChange={(value) =>
          setEditValues((prev) => ({ ...prev, [selected]: value }))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleCommitEditing(selected, editValues[selected])
          };
          if (e.key === "Escape") {
            e.preventDefault();
            handleAbortEditing(selected)
          };
        }}
      />

      {/* Grid */}
      <Grid
        ref={gridRef}
        onKeyDown={handleOnKeyDown}
        sheet={sheet}
        editingCell={editingCell}
        selected={selected}
        editValues={editValues}
        onCellChange={(address, value) =>
          setEditValues((prev) => ({ ...prev, [address]: value }))
        }
        onCellClick={setSelected}
        onCellDoubleClick={handleBeginEditing}
      />
    </div>
  );
}
