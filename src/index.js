import "./styles.css";

async function getRapidRating(username) {
  const res = await fetch(`https://api.chess.com/pub/player/${username.toLowerCase()}/stats`);
  if (!res.ok) throw new Error(`Chess.com returned ${res.status}`);

  const data = await res.json();
  return data.chess_rapid?.last?.rating ?? null; // null if they haven't played rapid
}

function startCountdown(elementId) {
  const el = document.getElementById(elementId);
  const end = new Date(new Date().getFullYear() + 1, 0, 1); // Jan 1 at midnight, local time

  function tick() {
    const diff = end - new Date();
    if (diff <= 0) {
      el.textContent = "Time's up!";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  tick(); // show immediately instead of waiting a second
  const timer = setInterval(tick, 1000);
}

startCountdown("countdown");

getRapidRating("vnoblitt").then(console.log);
getRapidRating("Fishing_rat").then(console.log);
getRapidRating("NipNip103").then(console.log);

const V_STARTING_ELO = 374;
const MYLES_STARTING_ELO = 184;
const DILLYN_STARTING_ELO = 425;

const vStats = document.getElementById("v-stats");
const mylesStats = document.getElementById("myles-stats");
const dillynStats = document.getElementById("dillyn-stats");

const vRating = await getRapidRating("vnoblitt");
const mylesRating = await getRapidRating("Fishing_rat");
const dillynRating = await getRapidRating("NipNip103");

const vPara = document.createElement("span");
vPara.textContent = `V's current rating is: `;
const mylesPara = document.createElement("span");
mylesPara.textContent = `Myles's current rating is: `;
const dillynPara = document.createElement("span");
dillynPara.textContent = `Dillyn's current rating is: `;

const vNum = document.createElement("span");
vNum.textContent = vRating;
vNum.classList.add("rating");
let vDiff = vRating - V_STARTING_ELO;
if (vDiff >= 0) vDiff = ` (+${vDiff})`;
else vDiff = ` (-${vDiff})`;
vNum.textContent += vDiff;

const mylesNum = document.createElement("span");
mylesNum.textContent = mylesRating;
mylesNum.classList.add("rating");
let mylesDiff = mylesRating - MYLES_STARTING_ELO;
if (mylesDiff >= 0) mylesDiff = ` (+${mylesDiff})`;
else mylesDiff = ` (-${mylesDiff})`;
mylesNum.textContent += mylesDiff;

const dillynNum = document.createElement("span");
dillynNum.textContent = dillynRating;
dillynNum.classList.add("rating");
let dillynDiff = dillynRating - DILLYN_STARTING_ELO;
if (dillynDiff >= 0) dillynDiff = ` (+${dillynDiff})`;
else dillynDiff = ` (-${dillynDiff})`;
dillynNum.textContent += dillynDiff;

vStats.append(vPara, vNum);
mylesStats.append(mylesPara, mylesNum);
dillynStats.append(dillynPara, dillynNum);