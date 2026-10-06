function sum(arr) {
  return (arr || []).reduce((a, b) => a + (Number(b) || 0), 0);
}

function contestantByName(name) {
  return SURVIVOR_DATA.contestants.find((c) => c.name === name);
}

function categoryTotal(name, category) {
  const c = contestantByName(name);
  if (!c) return 0;
  return sum(c[category]);
}

function pickScore(pick) {
  return (
    categoryTotal(pick.outwit, "outwit") +
    categoryTotal(pick.outplay, "outplay") +
    categoryTotal(pick.outlast, "outlast")
  );
}

function statusBadge(c) {
  if (c.status === "eliminated") {
    return `<span class="badge badge-out">Out — Ep ${c.eliminatedEpisode ?? "?"}</span>`;
  }
  return `<span class="badge badge-active">Active</span>`;
}

function pickChip(name) {
  const c = contestantByName(name);
  const dead = c && c.status === "eliminated";
  return `<span class="chip ${dead ? "chip-dead" : ""}">${name}${dead ? " ☠" : ""}</span>`;
}

function renderMeta() {
  document.getElementById("season-label").textContent = `Season ${SURVIVOR_DATA.season}`;
  document.getElementById("last-updated").textContent = `Last updated: ${SURVIVOR_DATA.lastUpdated}`;
  document.getElementById("episode-count").textContent = SURVIVOR_DATA.episodeCount;
}

function renderLeaderboard() {
  const rows = SURVIVOR_DATA.picks
    .map((p) => ({ ...p, score: pickScore(p) }))
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
          ${pickChip(p.outwit)}
          ${pickChip(p.outplay)}
          ${pickChip(p.outlast)}
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
      const outwitPts = categoryTotal(p.outwit, "outwit");
      const outplayPts = categoryTotal(p.outplay, "outplay");
      const outlastPts = categoryTotal(p.outlast, "outlast");
      const total = outwitPts + outplayPts + outlastPts;
      const row = (label, name, pts) => {
        const c = contestantByName(name);
        return `<div class="breakdown-row">
          <span class="breakdown-label">${label}</span>
          <span class="breakdown-name">${name} ${c ? statusBadge(c) : ""}</span>
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
      if (a.status !== b.status) return a.status === "active" ? -1 : 1;
      const totalA = sum(a.outwit) + sum(a.outplay) + sum(a.outlast);
      const totalB = sum(b.outwit) + sum(b.outplay) + sum(b.outlast);
      return totalB - totalA;
    })
    .map((c) => {
      const outwitPts = sum(c.outwit);
      const outplayPts = sum(c.outplay);
      const outlastPts = sum(c.outlast);
      const total = outwitPts + outplayPts + outlastPts;
      const pickedBy = SURVIVOR_DATA.picks
        .filter((p) => p.outwit === c.name || p.outplay === c.name || p.outlast === c.name)
        .map((p) => p.player);
      return `
      <tr>
        <td class="player-name">${c.name}</td>
        <td>${statusBadge(c)}</td>
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

function init() {
  renderMeta();
  renderLeaderboard();
  renderPicksBreakdown();
  renderRoster();
}

document.addEventListener("DOMContentLoaded", init);
