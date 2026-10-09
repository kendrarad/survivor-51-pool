// Array index 0 = episode 2 (the first scored episode), so episode number = index + 2.
const FIRST_SCORED_EPISODE = 2;

// The episode currently selected in the picker (an episode number, e.g. 3).
// Defaults to the latest scored episode once data loads.
let selectedEpisode = FIRST_SCORED_EPISODE + SURVIVOR_DATA.episodeCount - 1;

function sum(arr, uptoEpisode) {
  const full = arr || [];
  const slice =
    uptoEpisode == null ? full : full.slice(0, uptoEpisode - FIRST_SCORED_EPISODE + 1);
  return slice.reduce((a, b) => a + (Number(b) || 0), 0);
}

function contestantByName(name) {
  return SURVIVOR_DATA.contestants.find((c) => c.name === name);
}

function categoryTotal(name, category, uptoEpisode) {
  const c = contestantByName(name);
  if (!c) return 0;
  return sum(c[category], uptoEpisode);
}

function pickScore(pick, uptoEpisode) {
  return (
    categoryTotal(pick.outwit, "outwit", uptoEpisode) +
    categoryTotal(pick.outplay, "outplay", uptoEpisode) +
    categoryTotal(pick.outlast, "outlast", uptoEpisode)
  );
}

// Was this contestant already eliminated as of the given episode?
function eliminatedAsOf(c, uptoEpisode) {
  return c.eliminatedEpisode != null && c.eliminatedEpisode <= uptoEpisode;
}

function statusBadge(c, uptoEpisode) {
  if (eliminatedAsOf(c, uptoEpisode)) {
    return `<span class="badge badge-out">Out — Ep ${c.eliminatedEpisode}</span>`;
  }
  return `<span class="badge badge-active">Active</span>`;
}

function pickChip(name, uptoEpisode) {
  const c = contestantByName(name);
  const dead = c && eliminatedAsOf(c, uptoEpisode);
  return `<span class="chip ${dead ? "chip-dead" : ""}">${name}${dead ? " ☠" : ""}</span>`;
}

function renderMeta() {
  document.getElementById("season-label").textContent = `Season ${SURVIVOR_DATA.season}`;
  document.getElementById("last-updated").textContent = `Last updated: ${SURVIVOR_DATA.lastUpdated}`;
  document.getElementById("episode-count").textContent = SURVIVOR_DATA.episodeCount;
}

function renderEpisodePicker() {
  const select = document.getElementById("episode-select");
  const lastEpisode = FIRST_SCORED_EPISODE + SURVIVOR_DATA.episodeCount - 1;
  const options = [];
  for (let ep = FIRST_SCORED_EPISODE; ep <= lastEpisode; ep++) {
    const label = ep === lastEpisode ? `Episode ${ep} (latest)` : `Episode ${ep}`;
    options.push(`<option value="${ep}" ${ep === selectedEpisode ? "selected" : ""}>${label}</option>`);
  }
  select.innerHTML = options.join("");
  select.onchange = () => {
    selectedEpisode = Number(select.value);
    renderAll();
  };
}

function renderLeaderboard() {
  const rows = SURVIVOR_DATA.picks
    .map((p) => ({ ...p, score: pickScore(p, selectedEpisode) }))
    .sort((a, b) => b.score - a.score);

  const maxScore = rows.length ? rows[0].score : 0;
  const winnerKnown = !!SURVIVOR_DATA.actualWinner;

  const tbody = rows
    .map((p, i) => {
      const isTop = p.score === maxScore && maxScore > 0;
      const gotWinnerRight = winnerKnown && p.winner === SURVIVOR_DATA.actualWinner;
      return `
      <tr class="${isTop ? "leader-row" : ""}">
        <td class="rank">${i + 1}</td>
        <td class="player-name">${p.player}</td>
        <td class="picks-cell">
          ${pickChip(p.outwit, selectedEpisode)}
          ${pickChip(p.outplay, selectedEpisode)}
          ${pickChip(p.outlast, selectedEpisode)}
        </td>
        <td class="tiebreak-cell">
          ${p.winner}${gotWinnerRight ? ' <span class="badge badge-win">✓ Winner pick</span>' : ""}
        </td>
        <td class="score">${p.score}</td>
      </tr>`;
    })
    .join("");

  document.querySelector("#leaderboard tbody").innerHTML = tbody;
}

function renderPicksBreakdown() {
  const container = document.getElementById("picks-breakdown");
  container.innerHTML = SURVIVOR_DATA.picks
    .map((p) => {
      const outwitPts = categoryTotal(p.outwit, "outwit", selectedEpisode);
      const outplayPts = categoryTotal(p.outplay, "outplay", selectedEpisode);
      const outlastPts = categoryTotal(p.outlast, "outlast", selectedEpisode);
      const total = outwitPts + outplayPts + outlastPts;
      const row = (label, name, pts) => {
        const c = contestantByName(name);
        return `<div class="breakdown-row">
          <span class="breakdown-label">${label}</span>
          <span class="breakdown-name">${name} ${c ? statusBadge(c, selectedEpisode) : ""}</span>
          <span class="breakdown-pts">${pts} pts</span>
        </div>`;
      };
      return `
      <div class="player-card">
        <div class="player-card-header">
          <h3>${p.player}</h3>
          <span class="player-card-total">${total} pts</span>
        </div>
        ${row("Outwit", p.outwit, outwitPts)}
        ${row("Outplay", p.outplay, outplayPts)}
        ${row("Outlast", p.outlast, outlastPts)}
        <div class="breakdown-row tiebreak">
          <span class="breakdown-label">Winner pick</span>
          <span class="breakdown-name">${p.winner}</span>
        </div>
      </div>`;
    })
    .join("");
}

function renderRoster() {
  const tbody = SURVIVOR_DATA.contestants
    .slice()
    .sort((a, b) => {
      const aOut = eliminatedAsOf(a, selectedEpisode);
      const bOut = eliminatedAsOf(b, selectedEpisode);
      if (aOut !== bOut) return aOut ? 1 : -1;
      const totalA = sum(a.outwit, selectedEpisode) + sum(a.outplay, selectedEpisode) + sum(a.outlast, selectedEpisode);
      const totalB = sum(b.outwit, selectedEpisode) + sum(b.outplay, selectedEpisode) + sum(b.outlast, selectedEpisode);
      return totalB - totalA;
    })
    .map((c) => {
      const outwitPts = sum(c.outwit, selectedEpisode);
      const outplayPts = sum(c.outplay, selectedEpisode);
      const outlastPts = sum(c.outlast, selectedEpisode);
      const total = outwitPts + outplayPts + outlastPts;
      const pickedBy = SURVIVOR_DATA.picks
        .filter((p) => p.outwit === c.name || p.outplay === c.name || p.outlast === c.name)
        .map((p) => p.player);
      return `
      <tr>
        <td class="player-name">${c.name}</td>
        <td>${statusBadge(c, selectedEpisode)}</td>
        <td>${outwitPts}</td>
        <td>${outplayPts}</td>
        <td>${outlastPts}</td>
        <td class="score">${total}</td>
        <td class="picked-by">${pickedBy.length ? pickedBy.join(", ") : "—"}</td>
      </tr>`;
    })
    .join("");

  document.querySelector("#roster tbody").innerHTML = tbody;
}

function renderAll() {
  renderLeaderboard();
  renderPicksBreakdown();
  renderRoster();
}

function init() {
  renderMeta();
  renderEpisodePicker();
  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
