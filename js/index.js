// Code to randomize the color gradient in the intro of the homepage, making it different every time
// In the order of: lemon-teal, teal-cornflower, cornflower-rose, lemon-violet, violet-teal
const INTRO_BACKGROUNDS = [
  "linear-gradient(135deg, rgba(255,231,130,1) 0%, rgba(148,230,198,1) 100%)",
  "linear-gradient(135deg, rgba(148,230,198,1) 0%, rgba(148,230,198,1) 25%, rgba(73,61,121,1) 100%)",
  "linear-gradient(135deg, rgba(255,164,192,1) 0%, rgba(148,162,255,1) 100%)",
  "linear-gradient(135deg, rgba(255,231,130,1) 0%, rgba(255,231,130,1) 25%, rgba(193,122,255,1) 100%)",
  "linear-gradient(135deg, rgba(193,122,255,1) 0%, rgba(193,122,255,1) 10%, rgba(148,230,198,1) 100%)"
];

let intro = document.getElementById("intro");
let newIntroBackground;
do {
  newIntroBackground = INTRO_BACKGROUNDS[Math.floor(Math.random() * INTRO_BACKGROUNDS.length)];
} while (newIntroBackground == window.localStorage.getItem("introBackground"));
window.localStorage.setItem("introBackground", newIntroBackground);
intro.style.background = newIntroBackground;

// Code to randomize the subtitle in the intro of the homepage, making it different every time
const INTRO_SUBTITLES = [
  "Where fantasies never end.",
  "A never-ending daydream.",
  "Second star to the right.",
  "Straight on ‘til morning light."
];

let subtitle = document.getElementById("neverland-subtitle");
let newIntroSubtitle;
do {
  newIntroSubtitle = INTRO_SUBTITLES[Math.floor(Math.random() * INTRO_SUBTITLES.length)];
} while (newIntroSubtitle == window.localStorage.getItem("introSubtitle"));
window.localStorage.setItem("introSubtitle", newIntroSubtitle);
subtitle.innerHTML = newIntroSubtitle;

// Code for the scroll button in the intro
document.getElementById("intro-scroll").addEventListener("click", () => {
  window.scrollBy(0, Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - document.querySelector("header").clientHeight
)
});

// Code to make the Activities slideshow work
const TOTAL_ACTIVITY_AMOUNT = 5;
const ACTIVITY_DESCRIPTIONS = [
  "PHANTASIA: Neverland's Final Showcase—Come and support your favorite Pisay bands, watch guest performers, and join the Neverland Raffle!",
  "THE PIXIE COVE: Neverland's Variety Show—It's your time to shine! Reveal your burning flair and dare to dazzle the crowds. A great variety of entertainment is here for you!",
  "LUCID: Neverland's Dance Battle—Dance to the rhythm of the stars and groove to the beat of your dreams! Watch and dance along to Neverland's Dance Battle!",
  "PANTOMIME: Neverland's Lip Sync Battle—Lipsync for your life! Watch the contestants as they are pitted against each other in this battle of comedic timing and artistic self-expression!",
  "MAROONER'S ROCK: Neverland's E-Sports Tournament—Do you think you have what it takes? Watch your schoolmates take on the jailers in a thrilling series of online games!"
];
let currentActivityNumber = 0;
let activityNavBtns = document.querySelectorAll(".activity-manualbtn");
let currentActivityNavBtn = activityNavBtns[0];
let prevActivityBtn = document.getElementById("activities-prev");
let nextActivityBtn = document.getElementById("activities-next");
let activityImages = document.querySelectorAll(".activity-slide");
let activityCaption = document.querySelector(".activity-caption");

activityNavBtns.forEach((activityNavBtn) => {
  activityNavBtn.addEventListener("click", (e) => {
    currentActivityNavBtn.classList.remove("activity-currentbtn");
    currentActivityNavBtn = e.target;
    currentActivityNavBtn.classList.add("activity-currentbtn");
    currentActivityNumber = Array.prototype.indexOf.call(activityNavBtns, currentActivityNavBtn);
    activityCaption.innerHTML = ACTIVITY_DESCRIPTIONS[currentActivityNumber];
  });
});

prevActivityBtn.addEventListener("click", (e) => {
  currentActivityNavBtn.classList.remove("activity-currentbtn");

  currentActivityNumber--;
  if (currentActivityNumber < 0) {
    currentActivityNumber = TOTAL_ACTIVITY_AMOUNT - 1;
  }
  currentActivityNavBtn = activityNavBtns[currentActivityNumber];

  currentActivityNavBtn.click();
  currentActivityNavBtn.classList.add("activity-currentbtn");

  activityCaption.innerHTML = ACTIVITY_DESCRIPTIONS[currentActivityNumber];
});
nextActivityBtn.addEventListener("click", (e) => {
  currentActivityNavBtn.classList.remove("activity-currentbtn");

  currentActivityNumber++;
  if (currentActivityNumber == TOTAL_ACTIVITY_AMOUNT) {
    currentActivityNumber = 0;
  }
  currentActivityNavBtn = activityNavBtns[currentActivityNumber];

  currentActivityNavBtn.click();
  currentActivityNavBtn.classList.add("activity-currentbtn");

  activityCaption.innerHTML = ACTIVITY_DESCRIPTIONS[currentActivityNumber];
});

// Code to have the Activities be on auto-scroll until one of the buttons or images is clicked
let autoScrollInterval = setInterval(() => {
  currentActivityNavBtn.classList.remove("activity-currentbtn");
  currentActivityNumber++;
  if (currentActivityNumber == TOTAL_ACTIVITY_AMOUNT) {
    currentActivityNumber = 0;
  }
  currentActivityNavBtn = activityNavBtns[currentActivityNumber];
  currentActivityNavBtn.classList.add("activity-currentbtn");

  document.getElementById("activity-btn" + (currentActivityNumber + 1)).checked = true;

  activityCaption.innerHTML = ACTIVITY_DESCRIPTIONS[currentActivityNumber];
}, 7500);  // 7.5 seconds

[...activityNavBtns, ...activityImages, prevActivityBtn, nextActivityBtn].forEach((btn) => {
  btn.addEventListener("click", () => clearInterval(autoScrollInterval));
});

// Code to make the Merch slideshow work
const TOTAL_MERCH_AMOUNT = 5;
let currentMerchNumber = 0;
let merchNavBtns = document.querySelectorAll(".merch-manualbtn");
let currentMerchNavBtn = merchNavBtns[0];
let prevMerchBtn = document.getElementById("merch-prev");
let nextMerchBtn = document.getElementById("merch-next");

merchNavBtns.forEach((merchNavBtn) => {
  merchNavBtn.addEventListener("click", (e) => {
    currentMerchNavBtn.classList.remove("merch-currentbtn");
    currentMerchNavBtn = e.target;
    currentMerchNavBtn.classList.add("merch-currentbtn");
    currentMerchNumber = Array.prototype.indexOf.call(merchNavBtns, currentMerchNavBtn);
  });
});

prevMerchBtn.addEventListener("click", (e) => {
  currentMerchNavBtn.classList.remove("merch-currentbtn");

  currentMerchNumber--;
  if (currentMerchNumber < 0) {
    currentMerchNumber = TOTAL_MERCH_AMOUNT - 1;
  }
  currentMerchNavBtn = merchNavBtns[currentMerchNumber];

  currentMerchNavBtn.click();
  currentMerchNavBtn.classList.add("merch-currentbtn");
});
nextMerchBtn.addEventListener("click", (e) => {
  currentMerchNavBtn.classList.remove("merch-currentbtn");

  currentMerchNumber++;
  if (currentMerchNumber == TOTAL_MERCH_AMOUNT) {
    currentMerchNumber = 0;
  }
  currentMerchNavBtn = merchNavBtns[currentMerchNumber];

  currentMerchNavBtn.click();
  currentMerchNavBtn.classList.add("merch-currentbtn");
});

// Code for the Sponsors
const SPONSOR_VIDEOS = ["img/sponsor-videos/educo.mp4",
                        "img/sponsor-videos/merrymart.mp4",
                        "img/sponsor-videos/smart.mp4",
                        "img/sponsor-videos/winford.mp4"];
if (!localStorage.getItem("sponsor-vid")) {
  localStorage.setItem("sponsor-vid", "0");
}

let sponsorVidNumber = +localStorage.getItem("sponsor-vid");

let ad = document.querySelector("#ad video");
ad.src = SPONSOR_VIDEOS[sponsorVidNumber];

ad.addEventListener("ended", () => {
  sponsorVidNumber++;
  if (sponsorVidNumber == SPONSOR_VIDEOS.length) {
    sponsorVidNumber = 0;
  }
  localStorage.setItem("sponsor-vid", `${sponsorVidNumber}`);
  ad.src = SPONSOR_VIDEOS[sponsorVidNumber];
  ad.load();
  ad.play();
});