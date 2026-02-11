# Common React Frontend Interview Drills

Timed, hands-on practice for the **UI/machine-coding round** of frontend interviews at FAANG-level companies. Each drill lives in its own folder; a swap script hot-loads any drill into the Vite dev server so you can focus on building, not on boilerplate.

---

## Why this repo

The machine-coding round is the make-or-break stage of most frontend loops. Interviewers hand you a component spec and 30–45 minutes on the clock. What they evaluate:

- **Correctness** — does it work?
- **Component design** — sensible props/state split, reusable abstractions.
- **Edge cases** — empty states, rapid clicks, race conditions, error handling.
- **Accessibility** — keyboard navigation, ARIA roles, focus management.
- **CSS competency** — layout, responsiveness, no visual jank.

This repo gives you a repeatable environment to drill those skills under realistic time pressure.

---

## Drill inventory

### Current drills (in repo)

| Priority | Drill | What it tests |
|----------|-------|---------------|
| **P0 — Must-know** | `todo-list` | CRUD, list rendering, controlled inputs, local state |
| **P0 — Must-know** | `autocomplete` | Debounce, controlled inputs, keyboard nav, filtering |
| **P0 — Must-know** | `autocomplete-api` | Async data fetching, race conditions, loading/error states |
| **P0 — Must-know** | `tabs` | Conditional rendering, active-state management, a11y roles |
| **P0 — Must-know** | `modal` | Portals, focus trapping, overlay click, Escape key handling |
| **P0 — Must-know** | `sortable-table` | Data transformation, sort-direction toggling, table semantics |
| **P0 — Must-know** | `pagination` | Derived state, page math, boundary conditions |
| **P0 — Must-know** | `accordion` | Show/hide, multi-panel state, aria-expanded |
| **P0 — Must-know** | `tic-tac-toe` | Game state machine, win detection, reset logic |
| **P1 — Important** | `timer` | `setInterval`/`useEffect` cleanup, time formatting |
| **P1 — Important** | `fetch-demo` | `useEffect` data fetching, loading/error/success states |
| **P1 — Important** | `grid-toggle` | Grid layout, cell-state toggling, CSS Grid |
| **P1 — Important** | `wordle` | Complex game logic, keyboard handling, feedback states |

### Must-add drills (high interview frequency)

These show up constantly in FAANG screens. Add these next:

| Drill | What it tests | Source |
|-------|---------------|--------|
| **Star Rating** | Hover preview, click-to-set, half-star support, controlled/uncontrolled | GFE, Meta |
| **Image Carousel** | Prev/next, auto-play, infinite loop, smooth transitions | GFE, Google |
| **Progress Bar** | Animated fill, percentage label, sequential/concurrent variants | GFE, Meta |
| **Traffic Light** | State machine, timed transitions, configurable durations | GFE, multiple |
| **Transfer List** | Dual-list selection, bulk move, checkbox state management | GFE, Google |
| **Stopwatch** | Start/stop/reset, lap tracking, precise timing with `useRef` | GFE, multiple |
| **File Explorer** | Recursive tree rendering, expand/collapse, lazy loading | GFE, Google |
| **Data Table (full)** | Sort + filter + paginate, column-level controls, large datasets | GFE, Meta |
| **Nested Checkboxes** | Parent-child selection, indeterminate state, tree traversal | GFE, multiple |
| **Undoable Counter** | Undo/redo stack, command pattern, history management | GFE |
| **Connect Four** | 2D board state, gravity, diagonal win check | GFE |
| **Memory Game** | Card-flip logic, match detection, preventing triple-flip | GFE, Amazon |

### Additional drills to consider later

These are less frequently asked but valuable for depth and breadth:

| Drill | Category | Notes |
|-------|----------|-------|
| Kanban Board | App | Drag-and-drop, column management, persistence |
| Signup Form | Form | Multi-field validation, async submission, error display |
| Mortgage Calculator | Widget | Derived calculations, input formatting, edge cases |
| Flight Booker | Widget | Date constraints, conditional fields, form logic |
| Temperature Converter | Widget | Two-way binding, real-time conversion |
| Contact Form | Form | Controlled inputs, validation, submission feedback |
| Pixel Art | App | Canvas/grid drawing, color picker, undo |
| Analog Clock | Widget | CSS transforms, `requestAnimationFrame`, math |
| Birth Year Histogram | Data viz | Fetch + chart rendering, responsive SVG |
| Selectable Grid Cells | Interaction | Mouse drag selection, Shift+click range, state tracking |
| Auth Code Input | Form | Multi-input focus management, paste handling |
| Snake Game | Game | Game loop, collision detection, growing state |
| Tetris | Game | Piece rotation, row clearing, drop timing |
| Whack-a-Mole | Game | Random spawn, click timing, score tracking |
| Dice Roller | Widget | Randomization, animation, multiple dice |
| Grid Lights | Widget | Activation order, reverse deactivation queue |
| Holy Grail Layout | CSS | Classic CSS layout exercise |

---

## How to use

### Quick start — existing drill

```bash
npm install
./swap-drill.sh <drill-name>   # e.g. ./swap-drill.sh pagination
npm run dev
```

### Quick start — new drill from template

```bash
./swap-drill.sh new star-rating   # scaffolds star-rating/ from _template/
# Edit star-rating/README.md — fill in requirements and data
./swap-drill.sh star-rating
npm run dev
```

The `_template/` folder contains a starter `App.tsx`, `main.tsx`, `index.css`, and a comprehensive `README.md` with the full interview playbook: how to clarify the spec, plan your state, phase your implementation, and hit every senior-level signal interviewers look for. Copy it for every new drill.

The swap script copies `main.tsx`, `App.tsx`, and `index.css` (if present) from the drill folder into `src/`, replacing what was there. Your drill folders stay untouched.

### Recommended workflow

1. **Set a timer** — 30 min for P0 drills, 45 min for P1+.
2. **Branch per drill** — `git checkout -b drill/pagination` before swapping.
3. **Read the drill README first** — clarify requirements in your head before writing code, just like in a real interview.
4. **Build from scratch** — don't peek at solutions until the timer runs out.
5. **Review & iterate** — after each attempt, note what tripped you up. Repeat the drill on a later day until you can nail it cold.
6. **Commit your progress** — `git add . && git commit` before swapping to the next drill.

### Keep your work safe

- Always commit or branch before running `swap-drill.sh` again.
- Check `git status` after swapping to confirm you haven't lost uncommitted changes.
- If a drill lacks `index.css`, the script skips it and leaves the existing stylesheet.

---

## What interviewers actually look for

Beyond "does it work," here's the rubric most FAANG interviewers use:

| Signal | Junior | Senior |
|--------|--------|--------|
| **State design** | Works but messy | Minimal, normalized, derived where possible |
| **Component boundaries** | One big component | Logical decomposition, clear data flow |
| **Edge cases** | Happy path only | Empty, error, loading, rapid interaction |
| **Accessibility** | None | Keyboard nav, ARIA, focus management |
| **CSS** | Inline or fragile | Responsive, clean, no layout hacks |
| **Communication** | Silent coding | Talks through tradeoffs, asks clarifying Qs |

---

## Resources

- [GreatFrontEnd — UI Coding Questions](https://www.greatfrontend.com/questions/formats/ui-coding) — 200+ practice problems with solutions by ex-FAANG engineers
- [GreatFrontEnd — Coding Interview Playbook](https://www.greatfrontend.com/front-end-interview-playbook/coding) — Strategy and patterns
- [Front End Interview Handbook](https://www.frontendinterviewhandbook.com/) — Open-source guide by Yangshun (ex-Meta)
- [Front End Interview Handbook — UI Questions](https://www.frontendinterviewhandbook.com/coding/build-front-end-user-interfaces) — Categorized component list
- [Frontend Machine Coding Questions (GitHub)](https://github.com/NarendraKoya999/Frontend-Machine-Coding-Interview-Questions) — Community-maintained list
