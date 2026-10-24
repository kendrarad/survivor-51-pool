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
  lastUpdated: "2026-10-24",
  episodeCount: 4, // number of SCORED episodes (episode 2 is scored episode #1)
  actualWinner: null,

  // Episode 1 (unscored): Toka lost immunity, voted out Aaliyah 6-2 (Jenna had the other 2).
  //   Lewis spent episode 1 on Exile Island, then joined Toka for episode 2.
  // Episode 2 (scored): Toka swept reward + immunity. Savu went to tribal,
  //   voted out Ana 6-4 (Eric had the other 4). No idol/advantage nullified any votes.
  // Episode 3 (scored): combined reward/immunity challenge, Savu won both. A Journey twist
  //   sent Carter (Savu) to Toka's camp; he missed the boat back and was forced to mutiny to
  //   Toka BEFORE the challenge, so he competed (and lost) with Toka, not Savu. Rob (Savu)
  //   quit the game over foot/leg infection fears BEFORE the challenge, so he gets no
  //   challenge credit either. Devin (Toka) visited Savu's camp on the same Journey and
  //   found an Extra Vote advantage with Sharonda, but returned to Toka in time to compete
  //   and vote; the advantage was not played. Toka (now 11 strong with Carter) went to
  //   tribal: voted out Patt 6-5 over Kilby. No idol/advantage was played or nullified any vote.
  // Episode 4 (scored): tribe swap into three new tribes of 17. New Toka: Mike, Carter,
  //   Brady, Maggie, Thien An, Kristin. New Savu: Devin, Ori, Jelly, Alexis, Jenna. New Dina
  //   (red, new beach): Lewis, Kilby, Sharonda, Eric, Linnea, Cristian. Reward/immunity
  //   challenge: top two tribes won immunity, with 1st (Dina) also winning a full coffee kit
  //   and 2nd (Toka) a jar of iced coffee -> Dina gets the full +2 (reward+immunity), Toka
  //   gets +1 (immunity only, by pool-rules convention 2nd place isn't credited for winning
  //   a challenge), Savu placed last and went to tribal. Jelly is still sitting on a
  //   found idol but did not play it. New Savu voted out Jenna 4-1 (Alexis, Devin, Jelly, Ori
  //   voted Jenna; Jenna voted Alexis) -- Devin, Jelly, and Ori received zero votes, but Alexis
  //   took Jenna's lone vote. No idol/advantage was played or nullified any vote.
  // Episode 5 (scored): immunity challenge (with a reward of pastries bundled in) sent two
  //   tribes to a double tribal. Toka swept it (reward+immunity, full +2 to all six: Mike,
  //   Carter, Brady, Maggie, Thien An, Kristin), while Dina and Savu both lost and got no
  //   outplay credit. A journey twist pulled Maggie away after the win and gave her two extra
  //   votes to hand out; she gave both to Lewis and Kilby on Dina. Savu tribal: Devin, Ori,
  //   and Jelly's Helicopter Alliance voted out Alexis 3-1 (Alexis's lone vote went to Devin,
  //   so he doesn't get zero-vote credit; Ori and Jelly do). Dina tribal: Maggie's extra votes
  //   pushed Lewis vs. Linnea to a 4-4 tie; in the four-way tiebreak discussion among Kilby,
  //   Eric, Sharonda, and Cristian, the latter three abandoned Lewis and sent Linnea home by
  //   consensus before any rocks were actually drawn -- Kilby, Eric, Sharonda, and Cristian
  //   all received zero votes (Lewis and Linnea both received votes, no bonus). No idol was
  //   played or nullified any vote at either tribal (Lewis's "Blood Idol" was a bluff, never
  //   real).
  contestants: [
    { name: "Aaliyah Puglia",            status: "eliminated", eliminatedEpisode: 1, outwit: [], outplay: [], outlast: [] },
    { name: "Alexis Levine",             status: "eliminated", eliminatedEpisode: 5, outwit: [2, 0, 0, 0], outplay: [0, 2, 0, 0], outlast: [1, 1, 1, 0] },
    { name: "An \"Thien An\" Nguyen",    status: "active", eliminatedEpisode: null, outwit: [0, 2, 0, 0], outplay: [2, 0, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Ana Sani",                  status: "eliminated", eliminatedEpisode: 2, outwit: [0], outplay: [0], outlast: [0] },
    { name: "Angelica \"Jelly\" Loblack",status: "active", eliminatedEpisode: null, outwit: [0, 2, 2, 2], outplay: [2, 0, 0, 0], outlast: [1, 1, 1, 1] },
    { name: "Brady Booker",              status: "active", eliminatedEpisode: null, outwit: [0, 2, 0, 0], outplay: [2, 0, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Carter Krull",              status: "active", eliminatedEpisode: null, outwit: [2, 2, 0, 0], outplay: [0, 0, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Cristian Chavez",           status: "active", eliminatedEpisode: null, outwit: [2, 0, 0, 2], outplay: [0, 2, 2, 0], outlast: [1, 1, 1, 1] },
    { name: "Danny \"Kilby\" Kilby",     status: "active", eliminatedEpisode: null, outwit: [0, 0, 0, 2], outplay: [2, 0, 2, 0], outlast: [1, 1, 1, 1] },
    { name: "Devin Way",                 status: "active", eliminatedEpisode: null, outwit: [0, 2, 2, 0], outplay: [2, 0, 0, 0], outlast: [1, 1, 1, 1] },
    { name: "Eric Macksoud",             status: "active", eliminatedEpisode: null, outwit: [0, 0, 0, 2], outplay: [0, 2, 2, 0], outlast: [1, 1, 1, 1] },
    { name: "Jenna Doore",               status: "eliminated", eliminatedEpisode: 4, outwit: [0, 2, 0], outplay: [2, 0, 0], outlast: [1, 1, 0] },
    { name: "Kristin Flickinger",        status: "active", eliminatedEpisode: null, outwit: [2, 0, 0, 0], outplay: [0, 2, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Lewis Kelly",               status: "active", eliminatedEpisode: null, outwit: [0, 2, 0, 0], outplay: [2, 0, 2, 0], outlast: [1, 1, 1, 1] },
    { name: "Linnea Capobianco",         status: "eliminated", eliminatedEpisode: 5, outwit: [2, 0, 0, 0], outplay: [0, 2, 2, 0], outlast: [1, 1, 1, 0] },
    { name: "Maggie Nestor",             status: "active", eliminatedEpisode: null, outwit: [0, 2, 0, 0], outplay: [2, 0, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Mike Pinsky",               status: "active", eliminatedEpisode: null, outwit: [0, 2, 0, 0], outplay: [2, 0, 1, 2], outlast: [1, 1, 1, 1] },
    { name: "Ori Jean-Charles",          status: "active", eliminatedEpisode: null, outwit: [2, 0, 2, 2], outplay: [0, 2, 0, 0], outlast: [1, 1, 1, 1] },
    { name: "Patt Cannaday",             status: "eliminated", eliminatedEpisode: 3, outwit: [0, 0], outplay: [2, 0], outlast: [1, 0] },
    { name: "Rob Antonson",              status: "eliminated", eliminatedEpisode: 3, outwit: [2, 0], outplay: [0, 0], outlast: [1, 0] },
    { name: "Sharonda Cox",              status: "active", eliminatedEpisode: null, outwit: [2, 0, 0, 2], outplay: [0, 2, 2, 0], outlast: [1, 1, 1, 1] },
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
