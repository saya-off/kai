const LETTER_LINES = [
  "Woi saya dinda.",
  "Saya bosan nonton, males bat. kalau bukan tetangga gamau nonton ah.",
  "iyo bilangmi terus 'aku mah ganteng, aku mah gini, aku mah begitu'.",
  "apa apalahhh bla bla bla wahai vtuber plenger kebangetan. OKE CUKUP",
  "SPIL IPK DONGGGGGGGGGGGGGGGGGGGGGG"
];

const PETAL_SYMBOLS = ["🌸", "🌹", "✦", "·", "❀"];
const PETAL_COUNT   = 18;

const coverPage    = document.getElementById("cover-page");
const letterPage   = document.getElementById("letter-page");
const openBtn      = document.getElementById("open-btn");
const backBtn      = document.getElementById("back-btn");
const playSoundBtn = document.getElementById("play-sound-btn");
const audio        = document.getElementById("surprise-audio");
const letterDate   = document.getElementById("letter-date");
const petalsWrap   = document.getElementById("petals");

function setDate() {
  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  letterDate.textContent = now.toLocaleDateString("id-ID", options);
}

function spawnPetals() {
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement("span");
    p.classList.add("petal");
    p.textContent = PETAL_SYMBOLS[Math.floor(Math.random() * PETAL_SYMBOLS.length)];
    p.style.left          = Math.random() * 100 + "vw";
    p.style.fontSize      = (0.7 + Math.random() * 0.8) + "rem";
    p.style.opacity       = (0.3 + Math.random() * 0.5).toString();
    p.style.animationDuration  = (6 + Math.random() * 8) + "s";
    p.style.animationDelay     = (Math.random() * 6) + "s";
    petalsWrap.appendChild(p);
  }
}

function revealLetterLines() {
  const ids = ["line1", "line2", "line3", "line4", "line5"];

  LETTER_LINES.forEach((text, i) => {
    const el = document.getElementById(ids[i]);
    if (!el) return;
    el.textContent = text;

    setTimeout(() => {
      el.classList.add("revealed");
    }, 300 + i * 350);
  });

  const closing   = document.querySelector(".closing");
  const signature = document.querySelector(".signature");
  const delay     = 300 + LETTER_LINES.length * 350 + 200;

  setTimeout(() => {
    closing.classList.add("revealed");
    signature.classList.add("revealed");
  }, delay);

  setTimeout(() => {
    playSoundBtn.classList.remove("hidden");
  }, delay + 600);
}

function openLetter() {
  coverPage.classList.remove("active");
  setTimeout(() => {
    letterPage.classList.add("active");
    revealLetterLines();
  }, 500);
}

function goBack() {
  letterPage.classList.remove("active");
  setTimeout(() => {
    coverPage.classList.add("active");
    audio.pause();
    audio.currentTime = 0;
    ["line1","line2","line3","line4","line5"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("revealed");
    });
    document.querySelector(".closing").classList.remove("revealed");
    document.querySelector(".signature").classList.remove("revealed");
    playSoundBtn.classList.add("hidden");
  }, 500);
}

let isPlaying = false;

function toggleSound() {
  if (isPlaying) {
    audio.pause();
    playSoundBtn.textContent = "🎵 Putar Kejutan";
    isPlaying = false;
  } else {
    audio.play().catch(() => {
    });
    playSoundBtn.textContent = "⏸ Pause";
    isPlaying = true;
  }
}

audio.addEventListener("ended", () => {
  playSoundBtn.textContent = "🎵 Putar Lagi";
  isPlaying = false;
});

openBtn.addEventListener("click", openLetter);
backBtn.addEventListener("click", goBack);
playSoundBtn.addEventListener("click", toggleSound);

setDate();
spawnPetals();
