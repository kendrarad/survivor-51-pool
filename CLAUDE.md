# Survivor 51 Pool — scoring workflow

This repo is a static scoreboard (`data.js` + `index.html`/`app.js`/`style.css`)
for the Outwit/Outplay/Outlast pool, deployed from the `main` branch. See
`README.md` for the full point rules and file layout before scoring anything.

## When the user asks to "score the next episode"

Follow this sequence without asking which episode — figure it out yourself:

1. **Determine the next episode to score.** Read `episodeCount` in
   `data.js` (it's the number of episodes already scored, where index 0 of
   each array = episode 2). Episode 1 is never scored, so the total number
   of scored episodes is always `episode# - 1`: the most recently scored
   episode is `episodeCount + 1`, and the next episode to score is
   `episodeCount + 2`.

2. **Find the recap.** Look up that episode's recap on insidesurvivor.com
   (Survivor 51). I don't have a search tool — only direct-URL fetching —
   so try fetching the likely insidesurvivor.com recap URL for that episode
   number directly. If I can't locate or confidently identify the right
   page, ask the user for the URL rather than guessing further or scoring
   off memory.

3. **Draft the scoring.** From the recap, work out each active
   contestant's outwit/outplay/outlast points per the rules in `README.md`
   (challenge wins, zero-vote/nullified-vote tribals, idol plays,
   eliminations, journeys/advantages that affect credit). Write a short
   episode-summary comment (matching the style of the existing episode
   comments above the `contestants` array in `data.js`) plus the proposed
   per-contestant point additions.

4. **Review with the user before editing anything.** Present the proposed
   scoring and wait for confirmation or corrections. Do not edit `data.js`
   until the user confirms. This step exists because recaps can be
   ambiguous (vote nullification, tiebreak mechanics, journey effects) —
   the user has final say.

5. **Apply the changes.** Once confirmed, append one number per category to
   every active contestant's `outwit`/`outplay`/`outlast` arrays, update any
   `status`/`eliminatedEpisode` for who was voted out, bump `episodeCount`,
   update `lastUpdated`, and add the episode-summary comment.

6. **Commit and push to finalize.** Commit the `data.js` change and push to
   `origin main` (this is what publishes the update to the live site) —
   no separate confirmation needed for this push specifically, since
   confirming the scoring in step 4 is the approval gate for the whole
   episode update.
