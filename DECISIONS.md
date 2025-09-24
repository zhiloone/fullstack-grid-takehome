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
1. Navigating between cells and editing them were as close to Excel as I possibly could in the given time
2. Ensuring the commit and abort logic would work as expected and would fire no more than once
3. CSS styles, interface, UI, code structure

### What I Sacrificed
1. I've skiped most of what was non-essential because I had to start from scratch a couple times because of wrong/uninformed decisions I made. First, I was trying to manage focus and selection across multiple components with no global state whatsoever. Then, I made it so that every cell was actually an input, and got lost while trying to effectively control its value. If I had researched what's the approach of the top sheets softwares before I'd have saved a lot of time. 
2. I'd love working with the formulas logic if I had more time!
3. Figuring out how to cycle between "navigation" and "edition" modes was the hardest. Events were being fired more than once accidentally, I was commiting values when they were supposed to only be aborted. Ensuring that stuff like e.g. focusing the grid automatically after commiting something took me way more time than it should aswell - it was a nice polishment, but nowhere as critical as other fundamental, basic requirements that were still pending at that time.

### Technical Debt
**Shortcuts taken:**
- What's not production-ready? Pretty much everything but the sheets edit page.
- What would need refactoring? Sheets edit page would most likely need some sort of global state to improve code quality
- Performance implications? Everytime a cell is edited (commited), a request is made to the backend - even when its value has not changed. Besides just making that "before-after" check, performance could be improved by storing the last editions in memory and, periodically, make a single PATCH request with everything that was changed. Extras: display some sort of "saving" animation for the user, have a "save" button (force), making sure to save whatever's still in memory before closing the application etc.

### Proud Moments
**What worked well:**
- Best implementation detail? Navigating and editing via the grid. Everything seems to be working. Cell's content is commited even when you click outside of the grid!
- Clever solution? Realizing that only a single text input was needed and render it on top of the current cell being editted. Magical!
- Clean abstraction? I liked creating more lib files with helper functions across other components, for example keyboard.ts, cell.ts.

### Learning Experience
**What you learned:**
- New technique discovered? Yes" I've never had to learn about event bubbling before. Also, the whole e.preventDefault() thing was kind of new to me to be honest, I'm not gonna lie. I've had used it before, but it was for really specific scenarios (mostly exceptions to the rule).
- What surprised you? The project's difficulty for me! It made me hit another one of those "lows" that us, developers, often face in our careers. I loved the challenge though! I'm still gonna work on it and improve until I get the hang of it - on my spare time, of course.
- What would you do differently? I would spend more time methodically studying existing solutions and planning ahead. I think I've dived into coding too fast - hence all the drawbacks along the way.

## Time Breakdown

**How you spent your time:**
- Setup & Planning: 30 minutes
- Core Functionality: 90 minutes  
- Visual Design: 15 minutes
- Formula Engine: 0 minutes
- Testing & Polish: 90 minutes
- Documentation: 15 minutes

**If you had 1 more hour:**
- What would you add/fix/improve? I would at least apply the same styles for the home page. That way, it wouldn't give that amateur feeling for the user right in the first page that they see...

## Final Notes

I REALLY enjoyed doing this test. I've liked it so much that I'm still eager to keep working on it, just so I can improve and understand some new concepts better.
I also think that having some sort of "entire-project-aware" IDE AI copilot would have been a HUGE help, since both the README.md and this file (DECISIONS.md) were written very thoroughly.