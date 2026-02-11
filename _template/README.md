# [Drill Name]

> **Time limit:** 30 minutes (P0) · 45 minutes (P1)
> **Difficulty:** Easy / Medium / Hard
> **Asked at:** [Companies where this is commonly asked]

Build a [component/widget/app] that [one-sentence spec].

---

## Requirements

_List every functional requirement the interviewer would give you. Be specific — these are your acceptance criteria._

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

---

## Data

_Provide the fixture data or API contract here. In an interview, this is what the interviewer hands you or you ask for._

```typescript
// Example:
interface Item {
  id: number
  label: string
}

const ITEMS: Item[] = [
  { id: 1, label: 'First' },
  { id: 2, label: 'Second' },
]
```

---

## The first 3 minutes: before you write any code

This is what separates senior from junior candidates. Do this out loud:

### 1. Clarify the spec

Ask yourself (or your interviewer):

- What are the **inputs** (props, data, user actions)?
- What are the **outputs** (rendered UI, callbacks, side effects)?
- What are the **edge cases** (empty data, error states, rapid clicks, very long text)?
- Any **accessibility requirements** (keyboard nav, screen readers)?
- Is there a **design spec** or should I choose reasonable defaults?

### 2. Identify your state

Before writing `useState`, answer:

- What is the **minimal state** this component needs? (If you can derive it, don't store it.)
- Which values are **truly independent**? (Each one might be a separate `useState`.)
- Is there **shared state** that needs to be lifted or managed with `useReducer`?
- Do I need a **ref** for anything? (DOM measurement, timer IDs, previous values.)

### 3. Sketch the component tree

Think about decomposition:

- What is the **top-level** container?
- What are the **repeating elements** (map over data)?
- What is **interactive** (buttons, inputs, selectable items)?
- Where does **state live** relative to the components that read it?

---

## Implementation phases

Work in these phases. Each one should produce working, testable output.

### Phase 1 — Static markup (5 min)

- Render the data as static HTML/JSX. No interactivity.
- Get the structure and semantics right: use `<button>` for clickable things, `<ul>/<li>` for lists, `<table>` for tabular data.
- **Verify:** the page renders correctly with your data.

### Phase 2 — Core interactivity (10 min)

- Add state and event handlers for the primary feature.
- Wire up the main user flow end-to-end.
- **Verify:** the happy path works.

### Phase 3 — Edge cases + polish (10 min)

- Handle empty states, error states, loading states.
- Handle rapid interaction (debounce, disable buttons during async ops).
- Add boundary checks (first/last page, max length, etc.).
- **Verify:** intentionally try to break it.

### Phase 4 — Accessibility + styling (5 min)

- Add keyboard support (Tab, Enter, Escape, Arrow keys as appropriate).
- Add ARIA attributes (`role`, `aria-label`, `aria-expanded`, `aria-selected`, etc.).
- Add minimal, clean CSS. No frameworks — just enough to show you understand layout.
- **Verify:** navigate the entire component with keyboard only.

---

## Senior-level signals to demonstrate

These are the things that make an interviewer write "strong hire":

| Signal | What to do |
|--------|-----------|
| **Minimal state** | Derive computed values instead of storing them. Use one `useState` for active index, not separate booleans for each item. |
| **Semantic HTML** | Use `<button>`, not `<div onClick>`. Use `<table>` for tabular data. Use `<form>` with `onSubmit`, not `<div>` with button `onClick`. |
| **Controlled components** | Inputs should be controlled (`value` + `onChange`). Avoid uncontrolled unless you explain why. |
| **No unnecessary effects** | `useEffect` is for syncing with external systems (APIs, timers, DOM measurement). It is NOT for transforming state or computing derived values. |
| **Immutable updates** | Never mutate state. Use spread, `.map()`, `.filter()`. |
| **Keyboard accessibility** | Arrow keys for lists, Escape to close, Enter to confirm. Manage focus after state changes. |
| **ARIA attributes** | `role="tablist"`, `aria-selected`, `aria-expanded`, `aria-controls`, `aria-labelledby`. |
| **Clean event handling** | `stopPropagation` only when you explain why. Prefer event delegation when it simplifies code. |
| **TypeScript types** | Define interfaces for your data model. Type your event handlers. Avoid `any`. |
| **Talk while you code** | Narrate your decisions: "I'm storing only the active index because I can derive the active content from it." |

---

## Common mistakes to avoid

| Mistake | Fix |
|---------|-----|
| Storing derived data in state | Compute it inline or with `useMemo` |
| Using `useEffect` to sync state with state | Remove the effect; compute during render |
| `<div onClick>` instead of `<button>` | Buttons are focusable and handle Enter/Space for free |
| Forgetting cleanup in `useEffect` | Return a cleanup function for timers, listeners, abort controllers |
| Index as key on a mutable list | Use a stable `id` field |
| Inline styles everywhere | Use a class; keeps JSX readable |
| Over-engineering early | Get it working first, then refactor if time permits |
| Silent coding | Interviewers cannot give hints if they don't know what you're thinking |

---

## Things to ask yourself after every drill

_Review checklist — be honest with yourself._

- [ ] Did I **clarify requirements** before coding?
- [ ] Is my state **minimal**? Could I remove any `useState` call?
- [ ] Did I use **semantic HTML** elements?
- [ ] Does it work with **keyboard only**?
- [ ] Did I handle **edge cases** (empty, error, overflow)?
- [ ] Are my **TypeScript types** clean and accurate?
- [ ] Did I **avoid unnecessary `useEffect`** calls?
- [ ] Would I be comfortable explaining every line to an interviewer?
- [ ] Did I finish within the time limit?

---

## How to use this template

1. Copy this folder: `cp -r _template/ <your-drill-name>/`
2. Rename the heading above to your drill name.
3. Fill in the Requirements and Data sections.
4. Delete or keep the guidance sections — they're here as training wheels.
5. Set your timer and build.
