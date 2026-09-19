---
name: Project progress
about: Your GameShelf checklist. Open this once, pin it, and tick things off as you go.
title: GameShelf progress
---

Tick a box by clicking it — GitHub saves it straight away, no commit needed.

Leave a comment on this issue when you get stuck on something for more than an hour.
Writing the problem down is often enough to solve it, and if it isn't, it means the
question is ready to ask at the next call instead of losing you an evening.

## The steps

- [X] **1. One card on the screen** — built in JavaScript from `GAMES[0]`, not typed into the HTML
- [x] **2. All forty-two on the screen** — one ugly column is the correct result here
- [ ] **3. Live on GitHub Pages** — paste the URL in a comment below, and put it in the repo description
- [ ] **4. It matches the design** — grid, cards, colours and spacing, all from `tokens.css`
- [ ] **5. Search box** — case-insensitive, matches anywhere in the title
- [ ] **6. Sorting** — six options, and `GAMES` is never mutated
- [ ] **7. Genre filters** — the list is built from the data, not typed out
- [ ] **8. Platform filters** — same again
- [ ] **9. Everything works together** — search + both filters + sort, all at once
- [ ] **10. The count and the empty state**
- [ ] **11. Checked at phone width** — on a real phone, no sideways scrolling
- [ ] **12. Finished** — your own README, screenshot, live link, no dead code

## Before you call it done

- [ ] Nothing hard-coded in the HTML — all 42 cards come from the array
- [ ] Every colour and spacing value comes from `tokens.css`, no raw hex codes in my CSS
- [ ] Sorting never mutates `GAMES` (check `GAMES[0].title` before and after)
- [ ] Both filter lists are derived from the data
- [ ] A live "showing X of Y" count
- [ ] The empty state, with a way to clear the filters
- [ ] Keyboard focus is visible everywhere I can tab to
- [ ] No libraries, no `fetch`, no Grid, no media queries
- [ ] Pushed as I went — a dozen or so meaningful commits, not one called "done"
- [ ] No leftover `console.log` calls, no commented-out dead code

## Notes to self

<!-- Anything you want to remember: a bug you hit, something you want to come back to,
     a thing you don't understand yet. This is yours — use it however is useful. -->
