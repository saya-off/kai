const LINES = [
  "Weee",
  "langsung intinya, dengerin kamu tebar pesona",
  "'aku mah ganteng, aku mah gini gitu' tuh bikin ngantuk",
  "tahu gak? Kalau bukan karena kasihan/tetangga,",
  "mending spil IPK aja sini daripada kebanyakan bla bla bla!"
];

const NOTES = ["♩","♪","♫","♬","𝅘𝅥","🎵","🎶"];

function spawnNotes() {
  const wrap = document.getElementById('notes');
  for (let i = 0; i < 14; i++) {
    const n = document.createElement('span');
    n.classList.add('note');
    n.textContent = NOTES[Math.floor(Math.random() * NOTES.length)];
    n.style.left = Math.random() * 100 + 'vw';
    n.style.fontSize = (0.8 + Math.random() * 0.9) + 'rem';
    n.style.opacity = (0.2 + Math.random() * 0.4).toString();
    n.style.animationDuration = (8 + Math.random() * 10) + 's';
    n.style.animationDelay = (Math.random() * 8) + 's';
    wrap.appendChild(n);
  }
}

function buildEQ() {
  const wrap = document.getElementById('eq-bars');
  const heights = [14,22,10,28,18,24,8,20,16,26];
  const speeds  = [0.6,0.9,0.5,1.1,0.75,0.85,0.55,0.95,0.7,1.0];
  heights.forEach((h, i) => {
    const b = document.createElement('div');
    b.classList.add('eq-bar');
    b.style.setProperty('--h', h + 'px');
    b.style.setProperty('--d', speeds[i] + 's');
    b.style.animationDelay = (i * 0.07) + 's';
    wrap.appendChild(b);
  });
}

function setDate() {
  const d = new Date();
  document.getElementById('date-tag').textContent =
    d.toLocaleDateString('id-ID', {day:'numeric',month:'short',year:'numeric'});
}

const coverPage  = document.getElementById('cover-page');
const letterPage = document.getElementById('letter-page');
const openBtn    = document.getElementById('open-btn');
const backBtn    = document.getElementById('back-btn');
const playBtn    = document.getElementById('play-btn');
const audio      = document.getElementById('audio');
const prog       = document.getElementById('prog');
const timeCur    = document.getElementById('time-cur');
const timeTotal  = document.getElementById('time-total');
const signArea   = document.getElementById('sign-area');

let isPlaying = false;
let revealed = false;

function fmt(s) {
  const m = Math.floor(s/60), sec = Math.floor(s%60);
  return m + ':' + String(sec).padStart(2,'0');
}

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  prog.style.width = pct + '%';
  timeCur.textContent = fmt(audio.currentTime);
});

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶';
  isPlaying = false;
});

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
    isPlaying = false;
  } else {
    audio.play().catch(()=>{});
    playBtn.textContent = '⏸';
    isPlaying = true;
  }
}

function revealLines() {
  if (revealed) return;
  revealed = true;
  LINES.forEach((text, i) => {
    const el = document.getElementById('line' + (i+1));
    if (!el) return;
    el.textContent = text;
    setTimeout(() => { el.classList.add('active'); }, 400 + i * 400);
  });
  const delay = 400 + LINES.length * 400 + 300;
  setTimeout(() => { signArea.classList.add('show'); }, delay);
}

function openLetter() {
  coverPage.classList.remove('active');
  setTimeout(() => {
    letterPage.classList.add('active');
    revealLines();
  }, 600);
}

function goBack() {
  letterPage.classList.remove('active');
  audio.pause(); audio.currentTime = 0;
  playBtn.textContent = '▶'; isPlaying = false;
  prog.style.width = '0%'; timeCur.textContent = '0:00';
  ['line1','line2','line3','line4','line5'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active','past'); el.textContent = ''; }
  });
  signArea.classList.remove('show');
  revealed = false;
  setTimeout(() => { coverPage.classList.add('active'); }, 600);
}

openBtn.addEventListener('click', openLetter);
backBtn.addEventListener('click', goBack);
playBtn.addEventListener('click', togglePlay);

spawnNotes();
buildEQ();
setDate();