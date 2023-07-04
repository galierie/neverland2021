let currentPage = location.href.split("/").slice(-1)[0];

// Code to mark the current page in the header
pagesInNav = ["schedule.html",
              "merch.html",
              "lore.html",
              "performances.html",
              "freedomwall.html"]
if (pagesInNav.includes(currentPage)) {
    pagesInNav.forEach(page => {
        pageLink = document.querySelector(".site-nav a[href='" + page + "']");
        currentPageLink = document.querySelector(".site-nav a[href='" + currentPage + "']");
        if (pageLink == currentPageLink) {
            currentPageLink.classList.add("current-page");
        } else {
            if (pageLink.classList.contains("current-page")) {
                pageLink.classList.remove("current-page");
            }
        }
    })
};

// Code for the header's dropdown button when the screen is smaller
let siteNav = document.querySelector(".site-nav");
let dropdownBtn = document.getElementById("hamburger-menu-btn");
dropdownBtn.addEventListener("click", () => {
    if (siteNav.classList.contains("responsive-navbar")) {
        siteNav.classList.remove("responsive-navbar");
    } else {
        siteNav.classList.add("responsive-navbar");
    }
});

// Code for the footer's back to top button
if (currentPage != "lore.html" && currentPage != "map.html" && currentPage != "freedomwall.html") {
    let footer = document.querySelector("footer");
    let backToTop = document.querySelector(".back-to-top");

    let footerObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    backToTop.classList.add("visible");
                } else {
                    backToTop.classList.remove("visible");
                }
            });
        }
    );

    footerObserver.observe(footer);
}

// Code for the background music

if (!localStorage.getItem("homecoming")) {
    localStorage.setItem("homecoming", "0");
    localStorage.setItem("stardust", "0");
    localStorage.setItem("trinkets", "0");
}

let currentMusic;
switch(currentPage) {
    case "index.html":
    case "lore.html":
        currentMusic = "homecoming.wav";
        break;
    case "merch.html":
    case "credits.html":
        currentMusic = "trinkets.wav";
        break;
    case "freedomwall.html":
    case "schedule.html":
        currentMusic = "stardust.wav";
        break;
    default:
        currentMusic = "";
}

if (currentPage != "performances.html") {
    let bgMusic = document.getElementById("audioplayer");
    let bgMusicSource = document.querySelector("#audioplayer source");
    bgMusicSource.src = "audio/" + currentMusic;
    bgMusic.volume = 0.05;
    // if (currentMusic == "stardust.mp3") {
    //     bgMusic.volume = 0.2;
    // } else if (currentMusic == "trinkets.mp3") {
    //     bgMusic.volume = 0.04;
    // }
    bgMusic.currentTime = +localStorage.getItem(currentMusic.slice(0,-4));
    bgMusic.play();

    function setMusicTime() {
        localStorage.setItem(currentMusic.slice(0,-4), bgMusic.currentTime);
    }

    if (currentMusic) {
        setInterval(setMusicTime, 1000);  
    }
}

/*
-------------------
CODE FOR PIXIE DUST
-------------------
*/
let today = new Date();
let todayDateString = formatDate(today);

let pixiedustAmountDisplays = [
    document.getElementById("pixiedust-amt"),
    document.getElementById("PixieDustCount-PC"),
    document.getElementById("PixieDustCount-Mobile")
];

// set default values for pixie dust amount and streak for first-time visitors
if (!localStorage.getItem("pixiedustAmount")) {
    localStorage.setItem("pixiedustAmount", 5);
    localStorage.setItem("lastReceivedPixieDust", todayDateString);
    localStorage.setItem("dailyStreak", "1");
}
pixiedustAmountDisplays.forEach(display => {
    display.innerHTML = localStorage.getItem("pixiedustAmount");
});

// if the date has changed, the user wins an amount of daily pixie dust
let lastReceivedPixieDust = localStorage.getItem("lastReceivedPixieDust");
if (todayDateString != lastReceivedPixieDust) {
    if (formatDate(getDateAfter(new Date(lastReceivedPixieDust))) == todayDateString) {
        localStorage.setItem("dailyStreak", +localStorage.getItem("dailyStreak") + 1);

        /*Streak | Pixie Dust
               1 | 5
               2 | 6
               3 | 7
               4 | 8
               5 | 9
              6+ | 10
        */
        let dailyStreak = +localStorage.getItem("dailyStreak");
        if (dailyStreak <= 6) {
            addPixieDust(dailyStreak + 4);
        } else {
            addPixieDust(10);
        }
    } else {
        localStorage.setItem("dailyStreak", "1");
        addPixieDust(5);
    }

    localStorage.setItem("lastReceivedPixieDust", todayDateString);
}

// Code to give user a random chance of gaining pixie dust when exploring the site pages
// The user has a 25% chance of earning 3 pixie dust per page, per day; if they've earned it today from a certain page, they can't get another 3 pixie dust from the page until tomorrow

let yesterday = today;
yesterday.setDate(yesterday.getDate() - 1);
yesterdayDateString = formatDate(yesterday);

// if the user has not earned pixie dust from the current page, there is a random chance of getting 3 pixie dust
if (currentPage.endsWith(".html")) {  // exclude pages such as images
    // set default value for first time page visitor
    if (localStorage.getItem(currentPage) === null) {
        localStorage.setItem(currentPage, yesterdayDateString);
    }

    if (localStorage.getItem(currentPage) !== todayDateString) {
        // 20% chance of gaining 3 pixie dust from that page
        let randomNumber = Math.random();
        if (randomNumber <= 0.25) {
            addPixieDust(3);
            localStorage.setItem(currentPage, todayDateString);
        }
    }
}

function addPixieDust(amountToAdd) {
    // Adds the given amount of pixie dust to the user's total; saves it to Local Storage and also updates the amount in the header
    let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
    if (currentPixieDustAmount + amountToAdd > 99) {
        currentPixieDustAmount = 99;
    } else {
        currentPixieDustAmount += amountToAdd;
    }
    localStorage.setItem("pixiedustAmount", currentPixieDustAmount);
    pixiedustAmountDisplays.forEach(display => {
        display.innerHTML = localStorage.getItem("pixiedustAmount");
    });
}

function spendPixieDust(amountToSpend) {
    // Spend a certain amount of pixie dust to unlock lore
    let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
    if (currentPixieDustAmount >= amountToSpend) {
        currentPixieDustAmount -= amountToSpend;
        localStorage.setItem("pixiedustAmount", currentPixieDustAmount);
        pixiedustAmountDisplays.forEach(display => {
            display.innerHTML = localStorage.getItem("pixiedustAmount");
        });
    }
}

/* Pixie Dust Regular Check */
let currentPixieDustAmount = +localStorage.getItem("pixiedustAmount");
setInterval(() => {
    let updatedPixieDustAmount = +localStorage.getItem("pixiedustAmount");
    if (currentPixieDustAmount < updatedPixieDustAmount) {
        alert("Hmm, I think someone is trying to create more pixie dust!");
        alert("Sorry, you know you can't create something out of nothing.");
        spendPixieDust(updatedPixieDustAmount - currentPixieDustAmount);
    }
}, 3000);  

// Date-related functions
function formatDate(date) {
    // Formats a JS date into "YYYY-MM-DD" format
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth() + 1) < 10) ?
        "0" + (date.getMonth() + 1) :  // add "0" placeholder if needed
        (date.getMonth() + 1).toString();
    let dayString = (date.getDate() < 10) ?
        "0" + date.getDate() :  // add "0" placeholder if needed
        date.getDate().toString();

    return `${yearString}-${monthString}-${dayString}`;
}

function getDateAfter(date) {
    // Returns the date right after a given date
    let dateAfter = new Date(date);
    dateAfter.setDate(dateAfter.getDate() + 1);
    return dateAfter;
}

// SEARCH BAR

function openSearch() {
    document.getElementById("search-box").style.width = "100%";
    document.getElementById("cancelSearch").style.display = "block";
}

function hide() {
    document.getElementById("search-box").style.width = "0";
    document.getElementById("cancelSearch").style.display = "none";
}