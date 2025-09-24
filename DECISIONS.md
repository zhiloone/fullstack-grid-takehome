# Design Decisions

Please fill out this document with your design decisions and rationale as you implement TinyGrid.

## Design Analysis

### V7 Labs Study
After reviewing [v7labs.com](https://v7labs.com):

**What I liked:**
- TODO: What aspects of their design appeal to you?
- TODO: Which specific UI patterns would work well for a spreadsheet?
- TODO: What makes their data presentation effective?

**What I would adapt differently:**
- TODO: What doesn't translate well to spreadsheet UX?
- TODO: What would you change for this use case?

### Paradigm Study  
After reviewing [paradigm.co](https://paradigm.co):

**What I liked:**
- TODO: What design principles stand out?
- TODO: How do they handle information density?
- TODO: What about their typography/spacing system?

**What I would adapt differently:**
- TODO: What's too much for a spreadsheet interface?
- TODO: Where would you simplify?

### My Design Synthesis
**How I'll blend both influences:**
- TODO: What will you take from each?
- TODO: What will be uniquely yours?
- TODO: What's your color palette and why?
- TODO: What's your typography strategy?

## Priority 1: Core Functionality Decisions

### Cell Selection
**How will selection work?**
- Single click behavior: just selects the cell
- Visual feedback: faint background color on hover, strong border color on selection
- The active cell will have its input enabled (blinking caret)

### Cell Editing
**Your editing strategy:**
- Editing starts by either double-click, F2, or direct typing
- When user types directily, the selected cell's content is wiped (draft)?
- Editing ends when the user either presses "Enter" or "Tab" or when the user clicks away. If user presses "Escape", the edition is aborted
- The only visual difference in cells being edited from those just being selected is the presence of a blinking caret (text input)

### Keyboard Navigation  
**Which keys do what?**
- Arrow keys move between cells, no wrapping to next line/column
- Tab and Shift+Tab moves the same way as right and left arrow keys, respectively, and also commits whatever is being edited
- Pressing either Enter or Shift+Enter commits and moves the selected cell down or up, respectively
- End and Home were also added, bringing the selection to the last and first item of the row respectively

### Technical Choices
**How will you implement this?**
- I'll first dump everything into page.tsx and manage states with useState. If I notice there's too much prop drilling after creating the required components, I'll consider using some sort of global state (context, zustand, redux)?
- Focus will be handled at the top level of all components, "globally"
- I'm ngl I've never had to learn what event bubbling was until this test lol. I wish I had before trying to code everything using the individual event handling strategy

## Priority 2: Visual Design Decisions

### Visual Hierarchy
**How will users understand the interface?**
- TODO: How do headers differ from data cells?
- TODO: How does selected cell stand out?
- TODO: How do formulas vs values look different?
- TODO: Error state appearance?

### Spacing System
**Your grid dimensions:**
- TODO: Cell width and height?
- TODO: Padding inside cells?
- TODO: Grid gaps or borders?
- TODO: Why these specific measurements?

### Color Palette
**Your chosen colors:**
```css
/* TODO: Fill in your actual color values */
--bg-primary: ???;      /* Cell background */
--bg-secondary: ???;    /* Page background */
--border-default: ???;  /* Grid lines */
--border-selected: ???; /* Selection */
--text-primary: ???;    /* Main text */
--error: ???;          /* Error states */
/* Add more as needed */
```

### Typography
**Your type choices:**
- TODO: Font for data cells (monospace or proportional)?
- TODO: Font for UI elements?
- TODO: Size scale (how many sizes, what are they)?
- TODO: Weight variations?

### Motion & Transitions
**How will things move?**
- TODO: Will you use transitions? On what?
- TODO: Animation duration if any?
- TODO: Hover states?

## Priority 3: Formula Engine Decisions

### Formula Selection
**Which 3-5 formulas did you choose?**
1. TODO: Formula 1 - Why?
2. TODO: Formula 2 - Why?
3. TODO: Formula 3 - Why?
4. TODO: Formula 4 - Why?
5. TODO: Formula 5 - Why?

### Why These Formulas?
**Your rationale:**
- TODO: What do these formulas demonstrate about your engine?
- TODO: How do they work together?
- TODO: What edge cases do they expose?
- TODO: What did you NOT choose and why?

### Parser Implementation
**Your parsing approach:**
- TODO: Tokenizer/Lexer approach?
- TODO: Parser type (recursive descent, Pratt, etc)?
- TODO: How do you handle precedence?
- TODO: How do you handle errors?

### Evaluation Strategy
**How formulas get calculated:**
- TODO: Dependency tracking method?
- TODO: Recalculation strategy (everything or just affected)?
- TODO: Cycle detection approach?
- TODO: Error propagation?

## Trade-offs & Reflection

### What I Prioritized
1. TODO: Most important aspect?
2. TODO: Second priority?
3. TODO: Third priority?

### What I Sacrificed
1. TODO: What did you skip and why?
2. TODO: What would you add with more time?
3. TODO: What was harder than expected?

### Technical Debt
**Shortcuts taken:**
- TODO: What's not production-ready?
- TODO: What would need refactoring?
- TODO: Performance implications?

### Proud Moments
**What worked well:**
- TODO: Best implementation detail?
- TODO: Clever solution?
- TODO: Clean abstraction?

### Learning Experience
**What you learned:**
- TODO: New technique discovered?
- TODO: What surprised you?
- TODO: What would you do differently?

## Time Breakdown

**How you spent your time:**
- Setup & Planning: ??? minutes
- Core Functionality: ??? minutes  
- Visual Design: ??? minutes
- Formula Engine: ??? minutes
- Testing & Polish: ??? minutes
- Documentation: ??? minutes

**If you had 1 more hour:**
- TODO: What would you add/fix/improve?

## Final Notes

TODO: Any additional thoughts, explanations, or context you want to share?