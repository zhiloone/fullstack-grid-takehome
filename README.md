# TinyGrid - Mini Spreadsheet Challenge

Build a **production-ready** minimal spreadsheet application with formulas, ranges, and data operations, inspired by V7 Labs and Paradigm design principles.

> **Important**: This should be customer-ready, not a prototype. Polish matters as much as functionality.

> **Document your decisions**: As you implement features, fill out `DECISIONS.md`. This template has questions to guide your thinking - your answers help us understand your approach and trade-offs.

## Challenge TODO (In Order of Importance)

### 1. Core Spreadsheet Functionality (Must Have)
**Make the spreadsheet work** - This is your first priority:

- [ ] **Cell Selection**
  - Click any cell to select it
  - Visual indicator for selected cell (border highlight)
  - Display selected cell address in formula bar

- [ ] **Cell Editing**
  - Double-click to edit cell content
  - Direct typing to replace cell content
  - Press Enter to commit and move down
  - Press Tab to commit and move right
  - Press Escape to cancel edit
  - Edit via formula bar

- [ ] **Keyboard Navigation**
  - Arrow keys to move between cells
  - Tab/Shift+Tab for horizontal movement
  - Enter for moving down after edit
  - Home/End for row start/end

- [ ] **Basic Data Entry**
  - Support text, numbers, and formulas (starting with =)
  - Display cell values in the grid
  - Sync between cell and formula bar

### 2. Visual Design & Polish (Should Have)
**Make it production-ready** - This should look like a real product you'd ship to customers:

- **Design References** (Study these first):
  - [V7 Labs](https://v7labs.com) - Dense data, subtle interactions, professional
  - [Paradigm](https://paradigm.co) - Typography, spacing, refined palette

- [ ] **Production-Quality Visual Design**
  - Professional color palette with proper contrast ratios
  - Pixel-perfect alignment and spacing
  - Consistent design system throughout
  - Polished icons and UI elements
  - Thoughtful empty states
  - Proper loading and transition states
  - Accessible focus indicators

- [ ] **Customer-Ready Polish**
  - No rough edges or unfinished corners
  - Smooth animations (not jarring)
  - Consistent interaction patterns
  - Clear visual hierarchy
  - Professional typography
  - Error states that inform without alarming
  - Details that show craftsmanship

- [ ] **Production Details**
  - Cross-browser compatibility (Chrome, Firefox, Safari)
  - Responsive to different screen sizes
  - No console errors or warnings
  - Smooth performance (no janky scrolling)
  - Proper cursor states (pointer, text, etc.)
  - Keyboard accessibility

### 3. Formula Engine (Nice to Have)
**Pick 3-5 formulas to implement** - Choose wisely and explain why:

#### Basic Math (Pick 2-3)
- [ ] `SUM(A1:A10)` - Adds all values in range
- [ ] `AVERAGE(A1:A10)` - Calculates mean
- [ ] `COUNT(A1:A10)` - Counts non-empty cells
- [ ] `MIN/MAX(A1:A10)` - Finds min/max value

#### Logic (Pick 1)
- [ ] `IF(A1 > 10, "High", "Low")` - Conditional logic
- [ ] `COUNTIF(A1:A10, ">5")` - Conditional counting

#### Text (Pick 1)
- [ ] `CONCAT(A1, B1)` - Combine text
- [ ] `UPPER/LOWER(A1)` - Text transformation

**Document your choices in DECISIONS.md**:
- Fill out the template with your actual decisions
- Explain why you chose these specific formulas
- Share your thought process and trade-offs

### 4. Bonus Features (If Time Allows)
Only attempt after completing 1-3:

- [ ] **CSV Export** - Export sheet values as CSV
- [ ] **Sort Range** - Sort selected cells by column
- [ ] **Cell References** - Absolute ($A$1) vs relative (A1)
- [ ] **Error Handling** - #DIV/0!, #REF!, #CYCLE!
- [ ] **Undo/Redo** - Basic history management

## Setup

This project uses Bun for testing. Make sure you have Bun installed:
```bash
curl -fsSL https://bun.sh/install | bash
```

Then install dependencies and run:
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality (40%)** - Does the spreadsheet work? Can users edit cells and navigate?
2. **Design & Polish (30%)** - Is it production-ready? Would you ship this to customers? Does it feel like V7/Paradigm made it?
3. **Code Quality (20%)** - Is the code clean, typed, and well-organized?
4. **Formula Engine (10%)** - Do your chosen formulas work correctly?

**Production Ready means:**
- You'd be proud to demo this to a customer
- No placeholder UI or "good enough" solutions  
- Attention to detail in every interaction
- Polished from first load to edge cases

## Architecture Overview

### Understanding the `/lib` Directory

The `/lib` folder contains the core business logic. Each file has stub functions with `throw new Error('Not implemented')` that you need to replace with actual implementations:

#### `/lib/parser.ts` - Formula Parser (Priority 3)
**What it does**: Converts formula strings into Abstract Syntax Trees (AST)
```typescript
// Example: "=A1+B2*2" becomes an AST tree structure
// You need to implement:
- Lexer class: Tokenizes input ("=A1+B2*2" → ["=", "A1", "+", "B2", "*", "2"])
- Parser class: Builds AST from tokens (handles precedence, parentheses)
- parseFormula(): Main entry point
```

#### `/lib/engine.ts` - Formula Evaluation Engine (Priority 3)
**What it does**: Evaluates formulas and manages dependencies
```typescript
// You need to implement:
- DependencyGraph: Tracks which cells depend on which
- evaluateCell(): Computes a cell's value
- evaluateAst(): Recursively evaluates AST nodes
- hasCycle(): Detects circular references (A1→B1→A1)
```

#### `/lib/grid.ts` - Grid Helpers (Priority 1 & 3)
**What it does**: Cell address utilities and reference handling
```typescript
// You need to implement:
- colToLetter(0) → "A", colToLetter(26) → "AA"
- letterToCol("A") → 0, letterToCol("AA") → 26
- parseAddress("$A$1") → {col: 0, row: 0, absoluteCol: true, absoluteRow: true}
- getCellsInRange("A1", "B2") → ["A1", "A2", "B1", "B2"]
- adjustReference(): Updates refs when rows/cols change
```

#### `/lib/state.ts` - Data Store (Already Working!)
**What it does**: In-memory storage for sheets
```typescript
// Already implemented! Just use it:
- sheetStore.getAll() - Get all sheets
- sheetStore.get(id) - Get specific sheet
- sheetStore.update(id, sheet) - Update sheet
```

#### `/lib/seed.ts` - Initial Data (Already Working!)
**What it does**: Creates the default sheet with test data
```typescript
// Pre-populated with:
- Revenue/Cost/Profit calculations
- SUM formulas to test
- Absolute reference ($B$3) to test
- Hidden cycle (C6↔C7) to catch
```

#### `/lib/validation.ts` - Input Validation (Already Working!)
**What it does**: Validates API requests using Zod
```typescript
// Already implemented schemas for:
- Sheet creation
- Cell editing  
- Formula evaluation
```

### Files to Create/Implement

**Priority 1 - Core Functionality:**
- `/app/s/[id]/page.tsx` - Main spreadsheet view (currently minimal stub)
- Create `/components/Grid.tsx` - Grid component with cell rendering
- Create `/components/Cell.tsx` - Individual cell component  
- Create `/components/FormulaBar.tsx` - Formula input bar

**Priority 2 - Design:**
- `/styles/globals.css` - Your design system (currently just Tailwind imports)
- Update all components with proper styling

**Priority 3 - Formulas:**
- Implement functions in `/lib/parser.ts`
- Implement functions in `/lib/engine.ts`
- Implement helpers in `/lib/grid.ts`

## What's Already Working

Before you start coding, understand what's already built:

1. **API Routes** - All endpoints work and return data:
   - `GET /api/sheets` returns the seed sheet
   - `POST /api/sheets` creates new sheets
   - `PATCH /api/sheets/[id]` accepts cell updates (but doesn't evaluate formulas yet)

2. **Data Storage** - In-memory store with seed data:
   - One sheet pre-loaded with test data
   - Has formulas in cells (as strings, not evaluated)
   - Includes tricky test cases (cycles, absolute refs)

3. **Basic UI Shell** - Minimal pages that:
   - List sheets on home page
   - Display sheet data in a basic HTML table
   - No styling, no editing, just displays data

4. **Type Definitions** - Complete TypeScript types for:
   - Sheet, Cell, FormulaAst structures
   - All function signatures you need to implement

## Quick Start Guide

1. **Run the app first** - See what's already there:
   ```bash
   npm install
   npm run dev
   ```
   Visit http://localhost:3000 and click on "Budget Calculator"

2. **Start with the UI**: Get cells displaying and editable first
3. **Add navigation**: Implement keyboard and mouse interactions
4. **Polish the design**: Apply V7/Paradigm aesthetics
5. **Then add formulas**: Pick your formulas and implement the engine
6. **Test edge cases**: Use the seed data to verify behavior

## Testing

Tests are provided to verify your implementation. Most are marked with `test.skip` and will be skipped until you remove the `.skip` and implement the features.

The seed data includes test cases for:
- Basic calculations (A3-B3)
- SUM ranges
- Absolute references ($B$3)
- Hidden cycle trap (C6/C7)

Run tests with Bun:
```bash
bun test
# or
npm test
```

To run a specific test file:
```bash
bun test tests/grid.test.ts
```

Remove `.skip` from tests as you implement features to verify they work correctly.

## Tips for Success

1. **Get it working first** - But don't stop there, polish it to production quality
2. **Study the references** - Spend 10-15 minutes on V7 and Paradigm sites, take notes
3. **Details matter** - The difference between good and great is in the details
4. **Keep it simple but refined** - Don't over-engineer, but do polish what you build
5. **Use the types** - TypeScript types are already defined, use them
6. **Test as you go** - Verify each feature works before moving on
7. **Think like a product designer** - Would you be proud to ship this?

Remember: The goal is a production-ready spreadsheet that feels professional and polished. Quality over quantity - better to have fewer features that are perfectly executed than many rough features.# fullstack-grid-takehome
