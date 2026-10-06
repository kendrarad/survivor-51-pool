# Survivor 51 Pool Tracker

A static scoreboard for the Outwit / Outplay / Outlast pool. No server, no
database — everything lives in `data.js` and the page computes all scores
and standings from it.

## Viewing the site

Open `index.html` directly in a browser (double-click it), or host the
folder anywhere that serves static files (GitHub Pages, Netlify, a shared
drive, etc.). All four files (`index.html`, `style.css`, `app.js`, `data.js`)
need to stay together in the same folder.

## Updating scores after an episode airs

Scoring starts at episode 2 (picks lock before episode 2 airs), so array
index 0 = episode 2, index 1 = episode 3, etc. Episode 1 isn't scored —
it's only reflected in who's already `"eliminated"`.

Open `data.js` in any text editor. For **every contestant still in the
game**, append one number to the end of each of their `outwit`, `outplay`,
and `outlast` arrays for the episode that just aired (use `0` if they
earned nothing that category that week). Then bump `episodeCount` up by
one and update `lastUpdated`.

Point values (full rules are also summarized at the bottom of the live page):

- **Outwit** — +2 attended tribal with zero votes, +3 votes nullified by an idol (stack if both happen: enter 5)
- **Outplay** — +2 won individual immunity, +1 on the challenge-winning team/tribe, +1 won individual reward (add these together for the episode)
- **Outlast** — +1 just for still being in the game after that episode's tribal (every remaining contestant gets this)

When someone is voted out, set their `status` to `"eliminated"` and
`eliminatedEpisode` to the episode number. Their arrays simply stop
growing — their point total freezes automatically, you don't need to do
anything else.

### Finale

In the finale episode's `outlast` entry, add the placement bonus on top of
the normal +1:

- +1 third place → enter `2`
- +2 runner-up → enter `3`
- +3 Sole Survivor → enter `4`

Also set `actualWinner` to the winner's exact name string (copy it from
their `name` field) — the leaderboard will then flag whoever picked them
as the winner, which is the tiebreaker.

## Picks on file

| Player | Outwit | Outplay | Outlast | Winner pick |
|---|---|---|---|---|
| Jason Barrett | Kristin Flickinger | Ori Jean-Charles | Mike Pinsky | Kristin Flickinger |
| Christa Barrett | Mike Pinsky | Ori Jean-Charles | Patt Cannaday | Patt Cannaday |
| Kendra Radtke | Danny "Kilby" Kilby | Ori Jean-Charles | Sharonda Cox | Ana Sani |
| Adam Barrett | Kristin Flickinger | Rob Antonson | Danny "Kilby" Kilby | Rob Antonson |
| Pierre Wallin | Patt Cannaday | Ori Jean-Charles | Jenna Doore | Jenna Doore |
| Karen | Angelica "Jelly" Loblack | Danny "Kilby" Kilby | Ori Jean-Charles | Danny "Kilby" Kilby |
| Jordyn Bucholtz | An "Thien An" Nguyen | Patt Cannaday | Cristian Chavez | Ana Sani |
| Carlye Beyer | Angelica "Jelly" Loblack | Ori Jean-Charles | Mike Pinsky | Mike Pinsky |

If you ever need to correct a pick or add a late entrant, edit the
`picks` array in `data.js` the same way.
