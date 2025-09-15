import { Sheet } from '@/types';
import { createSeedSheet } from './seed';

// Module-level in-memory state (no database)
class SheetStore {
  private sheets: Map<string, Sheet> = new Map();

  constructor() {
    // Initialize with seed data
    const seedSheet = createSeedSheet();
    this.sheets.set(seedSheet.id, seedSheet);
  }

  getAll(): Sheet[] {
    return Array.from(this.sheets.values());
  }

  get(id: string): Sheet | undefined {
    return this.sheets.get(id);
  }

  create(sheet: Sheet): void {
    this.sheets.set(sheet.id, sheet);
  }

  update(id: string, sheet: Sheet): void {
    this.sheets.set(id, sheet);
  }

  delete(id: string): boolean {
    return this.sheets.delete(id);
  }
}

// Singleton instance
export const sheetStore = new SheetStore();