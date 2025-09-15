"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sheet } from "@/types";

export default function HomePage() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [newSheetName, setNewSheetName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    try {
      const response = await fetch("/api/sheets");
      if (response.ok) {
        const data = await response.json();
        setSheets(data);
      }
    } catch (error) {
      console.error("Failed to fetch sheets:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSheet = async () => {
    if (!newSheetName.trim()) return;

    try {
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSheetName,
          rows: 20,
          cols: 10,
        }),
      });

      if (response.ok) {
        const sheet = await response.json();
        setSheets([...sheets, sheet]);
        setNewSheetName("");
      }
    } catch (error) {
      console.error("Failed to create sheet:", error);
    }
  };

  if (loading) return <div>Loading sheets...</div>;

  return (
    <div>
      <h1>TinyGrid</h1>

      <div>
        <h2>Create New Sheet</h2>
        <input
          type="text"
          value={newSheetName}
          onChange={(e) => setNewSheetName(e.target.value)}
          placeholder="Sheet name..."
        />
        <button onClick={createSheet}>Create Sheet</button>
      </div>

      <div>
        <h2>Your Sheets</h2>
        {sheets.length === 0 ? (
          <div>No sheets yet. Create your first sheet above!</div>
        ) : (
          <ul>
            {sheets.map((sheet) => (
              <li key={sheet.id}>
                <Link href={`/s/${sheet.id}`}>
                  {sheet.name} ({sheet.rows} × {sheet.cols})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
