'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Sheet } from '@/types';

export default function SheetPage() {
  const params = useParams();
  const sheetId = params.id as string;
  
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheet();
  }, [sheetId]);

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

  if (loading) return <div>Loading sheet...</div>;
  if (!sheet) return <div>Sheet not found</div>;

  // Simple unstyled display of sheet data
  return (
    <div>
      {/* Toolbar */}
      <div>
        <h1>{sheet.name}</h1>
        <button>Sort</button>
        <button>Export CSV</button>
      </div>

      {/* Formula Bar */}
      <div>
        <span>A1</span>
        <input type="text" readOnly value="" />
      </div>

      {/* Grid - just display cells in a table */}
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: Math.min(sheet.cols, 10) }, (_, i) => (
              <th key={i}>{String.fromCharCode(65 + i)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.min(sheet.rows, 20) }, (_, row) => (
            <tr key={row}>
              <td>{row + 1}</td>
              {Array.from({ length: Math.min(sheet.cols, 10) }, (_, col) => {
                const addr = `${String.fromCharCode(65 + col)}${row + 1}`;
                const cell = sheet.cells[addr as any];
                return (
                  <td key={col}>
                    {cell ? (
                      cell.kind === 'literal' ? String(cell.value) :
                      cell.kind === 'formula' ? cell.src :
                      cell.kind === 'error' ? `#${cell.code}!` : ''
                    ) : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}