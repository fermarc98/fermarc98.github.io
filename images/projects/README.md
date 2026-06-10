# Project media

Drop real project images / GIFs into the matching subfolder. Until then, the
site uses CSS-only placeholders (no broken images).

## Subfolders

- `generativempc/`
- `hapticvla/`
- `safehumanoid/`
- `cartesian-mpc/`
- `dance-imitation/`
- `quadruped/`
- `mecanum/`

## Intended filenames (per project)

| File | Purpose |
|---|---|
| `cover.jpg` | Card thumbnail (16:10, ~1200px wide). Replaces the `.ph` placeholder on the project card. |
| `architecture.png` | System / pipeline diagram. |
| `demo.gif` | Short looping demo of the robot or simulation. |
| `result.png` | Plot, benchmark, or final result figure. |

Keep lighting/background consistent so the cards read as a set. When adding an
image to a card, swap the `<div class="ph …">` for an `<img loading="lazy">`
inside the same aspect-ratio box (e.g. `images/projects/generativempc/cover.jpg`).
