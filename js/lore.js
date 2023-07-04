// stream red (taylor's version) :D
const INTRO_BACKGROUNDS = [
    "background: linear-gradient(135deg, rgba(255,231,130,1) 0%, rgba(148,230,198,1) 100%); background-repeat: no-repeat; background-size: 100%; background-attachment: fixed",
    "background: linear-gradient(135deg, rgba(148,230,198,1) 0%, rgba(148,230,198,1) 25%, rgba(73,61,121,1) 100%); background-repeat: no-repeat; background-size: 100%; background-attachment: fixed",
    "background: linear-gradient(135deg, rgba(255,164,192,1) 0%, rgba(148,162,255,1) 100%); background-repeat: no-repeat; background-size: 100%; background-attachment: fixed",
    "background: linear-gradient(135deg, rgba(255,231,130,1) 0%, rgba(255,231,130,1) 25%, rgba(193,122,255,1) 100%); background-repeat: no-repeat; background-size: 100%; background-attachment: fixed",
    "background: linear-gradient(135deg, rgba(193,122,255,1) 0%, rgba(193,122,255,1) 10%, rgba(148,230,198,1) 100%); background-repeat: no-repeat; background-size: 100%; background-attachment: fixed"
];

let intro = document.getElementById("background");
let newIntroBackground;
do {
    newIntroBackground = INTRO_BACKGROUNDS[Math.floor(Math.random() * INTRO_BACKGROUNDS.length)];
} while (newIntroBackground === window.localStorage.getItem("introBackground"));
window.localStorage.setItem("introBackground", newIntroBackground);
intro.style = newIntroBackground;

// Set default values for unlock states in local storage
const CHARACTERS = ["art", "doll", "march", "may", "sam"];
for (let i = 1; i <= 3; i++) {
    if (!localStorage.getItem(`art${i}`)) {
        CHARACTERS.forEach(character => {
            localStorage.setItem(`${character}${i}`, "locked")
        });
    }
}

// Load in unlocked side stories
CHARACTERS.forEach(character => {
    for (let i = 1; i <= 3; i++) {
        if (localStorage.getItem(`${character}${i}`) == "unlocked") {
            let needsUnlocked = document.getElementById(`needs-unlocked-${character}${i}`);
            let lockImg = document.getElementById(`lock-img-${character}${i}`);
            let amountMessage = document.getElementById(`amount-message-${character}${i}`);
            let openBtn = document.getElementById(`open-btn-${character}${i}`);

            needsUnlocked.classList.remove("locked");
            needsUnlocked.classList.remove(`locked${i}`);
            needsUnlocked.classList.add("unlocked");
            needsUnlocked.addEventListener("click", () => {
                document.getElementById("audioplayer").pause();
            });
            lockImg.src = "img/padlock-white-unlocked.png";
            amountMessage.classList.remove("hide");
            amountMessage.innerHTML = "Successfully unlocked!";
            amountMessage.style.color = "green";
            openBtn.href = `Visual Novels/${character}-ss${i}/index.html`;
            openBtn.target = "_blank";

            let needsUnlockedMobile = document.getElementById(`needs-unlocked-${character}-mobile${i}`);
            let lockImgMobile = document.getElementById(`lock-img-${character}-mobile${i}`);
            let amountMessageMobile = document.getElementById(`amount-message-${character}-mobile${i}`);
            let openBtnMobile = document.getElementById(`open-btn-${character}-mobile${i}`);

            needsUnlockedMobile.classList.remove("locked");
            needsUnlockedMobile.classList.remove(`locked${i}`);
            needsUnlockedMobile.classList.add("unlocked");
            needsUnlockedMobile.addEventListener("click", () => {
                document.getElementById("audioplayer").pause();
            });
            lockImgMobile.src = "img/padlock-white-unlocked.png";
            amountMessageMobile.classList.remove("hide");
            amountMessageMobile.innerHTML = "Successfully unlocked!";
            amountMessageMobile.style.color = "white";
            openBtnMobile.href = `Visual Novels/${character}-ss${i}/index.html`;
            openBtnMobile.target = "_blank";
        }
    }
});

// Mute lore page audio when opening the main story
for (let i = 1; i <= 3; i++) {
    document.querySelectorAll(`a[href='Visual Novels/neverland-act${i}/index.html']`).forEach((btn) => {
        btn.addEventListener("click", () => {
            document.getElementById("audioplayer").pause();
        });
    });
}

// Side stories prices
let SIDE_STORIES_PRICES = [3, 5, 7];

// Onclick event listeners for unlocking side stories
for (let i = 1; i <= 3; i++) {
    CHARACTERS.forEach(character => {
        document.getElementById(`needs-unlocked-${character}${i}`).addEventListener("click", () => {
            sideStoryCheck(character, i);
        });
        document.getElementById(`needs-unlocked-${character}-mobile${i}`).addEventListener("click", () => {
            sideStoryCheck(character, i)
        });
    });
}

// Event listeners for unlock buttons in side stories
for (let i = 1; i <= 3; i++) {
    let lockedBtns = document.querySelectorAll(`.locked${i}`);

    lockedBtns.forEach(lockedBtn => {
        lockedBtn.addEventListener("mouseover", () => {
            let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
            if (currentPixieDustAmount < SIDE_STORIES_PRICES[i - 1] && !lockedBtn.classList.contains("unlocked")) {
                lockedBtn.style.animation = "shake 0.8s";
                lockedBtn.style.transform = "";
            } else {
                lockedBtn.style.animation = "";
                lockedBtn.style.transform = "scale(1.05)";
            }
        });

        lockedBtn.addEventListener("mouseout", () => {
            let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
            if (currentPixieDustAmount < SIDE_STORIES_PRICES[i - 1] && !lockedBtn.classList.contains("unlocked")) {
                lockedBtn.style.animation = "";
                lockedBtn.style.transform = "";
            } else {
                lockedBtn.style.animation = "";
                lockedBtn.style.transform = "";
            }
        });
    });
}

// Event listeners for amount messages in side stories
CHARACTERS.forEach(character => {
    for (let i = 1; i <= 3; i++) {
        let openBtn = document.getElementById(`open-btn-${character}${i}`);
        let amountMessage = document.getElementById(`amount-message-${character}${i}`);

        openBtn.addEventListener("mouseover", () => {
            let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
            if (localStorage.getItem(`${character}${i}`) == "unlocked") {
                amountMessage.innerHTML = " Click to view this side story! ";
                amountMessage.style.color = "green";
            } else if (currentPixieDustAmount < SIDE_STORIES_PRICES[i - 1]) {
                amountMessage.innerHTML = " Not enough pixie dust! ";
                amountMessage.style.color = "red";
            } else {
                amountMessage.innerHTML = " Click to unlock this side story! ";
                amountMessage.style.color = "black";
            }
        });

        openBtn.addEventListener("mouseout", () => {
            amountMessage.display = "none";
        });

        let openBtnMobile = document.getElementById(`open-btn-${character}-mobile${i}`);
        let amountMessageMobile = document.getElementById(`amount-message-${character}${i}`);

        openBtnMobile.addEventListener("mouseover", () => {
            let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
            if (localStorage.getItem(`${character}${i}`) == "unlocked") {
                amountMessage.innerHTML = " Click to view this side story! ";
                amountMessage.style.color = "green";
            } else if (currentPixieDustAmount < SIDE_STORIES_PRICES[i - 1]) {
                amountMessageMobile.innerHTML = " Not enough pixie dust! ";
                amountMessageMobile.style.color = "white";
            } else {
                amountMessageMobile.innerHTML = " Click to unlock this side story! ";
                amountMessageMobile.style.color = "black";
            }
        });

        openBtn.addEventListener("mouseout", () => {
            amountMessageMobile.display = "none";
        });
    }
});

function sideStoryCheck(character, sideStoryNumber) {
    if (localStorage.getItem(`${character}${sideStoryNumber}`) != "unlocked") {
        let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
        if (currentPixieDustAmount >= SIDE_STORIES_PRICES[sideStoryNumber - 1]) {
            spendPixieDust(SIDE_STORIES_PRICES[sideStoryNumber - 1]);
            localStorage.setItem(`${character}${sideStoryNumber}`, "unlocked");

            let needsUnlocked = document.getElementById(`needs-unlocked-${character}${sideStoryNumber}`);
            let lockImg = document.getElementById(`lock-img-${character}${sideStoryNumber}`);
            let amountMessage = document.getElementById(`amount-message-${character}${sideStoryNumber}`);
            let openBtn = document.getElementById(`open-btn-${character}${sideStoryNumber}`);

            needsUnlocked.classList.remove("locked");
            needsUnlocked.classList.remove(`locked${sideStoryNumber}`);
            needsUnlocked.classList.add("unlocked");
            document.getElementById("audioplayer").pause();
            needsUnlocked.addEventListener("click", () => {
                document.getElementById("audioplayer").pause();
            });
            lockImg.src = "img/padlock-white-unlocked.png";
            amountMessage.classList.remove("hide");
            amountMessage.innerHTML = "Successfully unlocked!";
            amountMessage.style.color = "green";
            openBtn.href = `Visual Novels/${character}-ss${sideStoryNumber}/index.html`;
            openBtn.target = "_blank";

            let needsUnlockedMobile = document.getElementById(`needs-unlocked-${character}-mobile${sideStoryNumber}`);
            let lockImgMobile = document.getElementById(`lock-img-${character}-mobile${sideStoryNumber}`);
            let amountMessageMobile = document.getElementById(`amount-message-${character}-mobile${sideStoryNumber}`);
            let openBtnMobile = document.getElementById(`open-btn-${character}-mobile${sideStoryNumber}`);

            needsUnlockedMobile.classList.remove(`locked${sideStoryNumber}`);
            needsUnlockedMobile.classList.add("unlocked");
            needsUnlockedMobile.addEventListener("click", () => {
                document.getElementById("audioplayer").pause();
            });
            lockImgMobile.src = "img/padlock-white-unlocked.png";
            amountMessageMobile.classList.remove("hide");
            amountMessageMobile.innerHTML = "Successfully unlocked!";
            amountMessageMobile.style.color = "white";
            openBtnMobile.href = `Visual Novels/${character}-ss${sideStoryNumber}/index.html`;
            openBtnMobile.target = "_blank";
        }
    }
}