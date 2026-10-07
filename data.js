/*
 * Survivor Season 51 Pool — data file
 * ------------------------------------------------------------------
 * Edit this file after each episode airs. Nothing else needs to change —
 * index.html recalculates every score from what's here.
 *
 * HOW TO SCORE AN EPISODE
 * ------------------------------------------------------------------
 * Picks lock before episode 2, so scoring starts at episode 2 — episode 1
 * events (including Aaliyah's boot) are NOT scored, just reflected in status.
 * Each contestant has three arrays: outwit, outplay, outlast.
 * Array index 0 = Episode 2 (the first SCORED episode), index 1 = Episode 3, etc.
 * Add a number to the END of each contestant's array for the new episode
 * (use 0 if they earned nothing in that category that week).
 *
 * Point values (per the pool rules):
 *   OUTWIT
 *     +2  attended tribal council and received zero votes
 *     +3  had votes against them nullified by an idol play
 *     (both can happen the same episode -> enter 5)
 *
 *   OUTPLAY
 *     +2  won individual immunity
 *     +1  on the team/tribe that won a challenge (reward OR immunity)
 *     +1  won an individual reward
 *     (these stack -> add them together for that episode's entry)
 *
 *   OUTLAST
 *     +1  simply remained in the game after a tribal council happened
 *         (every contestant still playing gets this, whether or not
 *         they personally attended that tribal)
 *     FINALE BONUS (add on top of the +1 in the finale episode slot):
 *       +1 third place
 *       +2 runner-up (second place)
 *       +3 sole survivor (winner)
 *     Example: the winner's final episode entry should be 1 + 3 = 4
 *
 * STATUS
 *   status: "active"      -> still playing
 *   status: "eliminated"  -> voted out / medically evacuated / quit
 *   eliminatedEpisode: episode number they were voted out (null if active)
 *
 * When the season ends, set actualWinner to the contestant's exact
 * name string (must match a name below) so the site can show who
 * correctly predicted the Sole Survivor for tiebreaker purposes.
 */

const SURVIVOR_DATA = {
  season: 51,
  lastUpdated: "2026-10-06",
  episodeCount: 1, // number of SCORED episodes (episode 2 is scored episode #1)
  actualWinner: null,

  // Episode 1 (unscored): Toka lost immunity, voted out Aaliyah 6-2 (Jenna had the other 2).
  //   Lewis spent episode 1 on Exile Island, then joined Toka for episode 2.
  // Episode 2 (scored): Toka swept reward + immunity. Savu went to tribal,
  //   voted out Ana 6-4 (Eric had the other 4). No idol/advantage nullified any votes.
  contestants: [
    { name: "Aaliyah Puglia",            status: "eliminated", eliminatedEpisode: 1, outwit: [], outplay: [], outlast: [] },
    { name: "Alexis Levine",             status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "An \"Thien An\" Nguyen",    status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Ana Sani",                  status: "eliminated", eliminatedEpisode: 2, outwit: [0], outplay: [0], outlast: [0] },
    { name: "Angelica \"Jelly\" Loblack",status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Brady Booker",              status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Carter Krull",              status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Cristian Chavez",           status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Danny \"Kilby\" Kilby",     status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Devin Way",                 status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Eric Macksoud",             status: "active", eliminatedEpisode: null, outwit: [0], outplay: [0], outlast: [1] },
    { name: "Jenna Doore",               status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Kristin Flickinger",        status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Lewis Kelly",               status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Linnea Capobianco",         status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Maggie Nestor",             status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Mike Pinsky",               status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Ori Jean-Charles",          status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Patt Cannaday",             status: "active", eliminatedEpisode: null, outwit: [0], outplay: [2], outlast: [1] },
    { name: "Rob Antonson",              status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
    { name: "Sharonda Cox",              status: "active", eliminatedEpisode: null, outwit: [2], outplay: [0], outlast: [1] },
  ],

  // Each pool player's 3 picks + their winner/tiebreaker pick.
  picks: [
    { player: "Jason Barrett",  outwit: "Kristin Flickinger",         outplay: "Ori Jean-Charles", outlast: "Mike Pinsky",               winner: "Kristin Flickinger" },
    { player: "Christa Barrett",outwit: "Mike Pinsky",                outplay: "Ori Jean-Charles", outlast: "Patt Cannaday",              winner: "Patt Cannaday" },
    { player: "Kendra Radtke",  outwit: "Danny \"Kilby\" Kilby",      outplay: "Ori Jean-Charles", outlast: "Sharonda Cox",               winner: "Ana Sani" },
    { player: "Adam Barrett",   outwit: "Kristin Flickinger",         outplay: "Rob Antonson",     outlast: "Danny \"Kilby\" Kilby",      winner: "Rob Antonson" },
    { player: "Pierre Wallin",  outwit: "Patt Cannaday",              outplay: "Ori Jean-Charles", outlast: "Jenna Doore",                winner: "Jenna Doore" },
    { player: "Karen",          outwit: "Angelica \"Jelly\" Loblack", outplay: "Danny \"Kilby\" Kilby", outlast: "Ori Jean-Charles",      winner: "Danny \"Kilby\" Kilby" },
    { player: "Jordyn Bucholtz",outwit: "An \"Thien An\" Nguyen",     outplay: "Patt Cannaday",    outlast: "Cristian Chavez",            winner: "Ana Sani" },
    { player: "Carlye Beyer",   outwit: "Angelica \"Jelly\" Loblack", outplay: "Ori Jean-Charles", outlast: "Mike Pinsky",                winner: "Mike Pinsky" },
    { player: "Kate",           outwit: "Lewis Kelly",                outplay: "Ori Jean-Charles", outlast: "Jenna Doore",                winner: "Jenna Doore" },
  ],
};
