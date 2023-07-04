let currentPage = location.href.split("/").slice(-1)[0];

// Code for the header's dropdown button when the screen is smaller
if (currentPage != "freedomwall.html") {  // freedom wall does not have header/footer so it is the exception
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

 // Code for the gold doubloons
let today = new Date();
let todayDateString = formatDate(today);

let doubloonsAmountDisplay = document.getElementById("doubloon-amt");

// set default values for doubloons amount and streak for first-time visitors
if (!localStorage.getItem("doubloonsAmount")) {  
    localStorage.setItem("doubloonsAmount", 5);
    if (currentPage != "freedomwall.html") {
        doubloonsAmountDisplay.innerHTML = localStorage.getItem("doubloonsAmount");
    }

    localStorage.setItem("lastReceivedDailyDoubloons", todayDateString);
    localStorage.setItem("dailyStreak", "1");
} else {
    if (currentPage != "freedomwall.html") {
        doubloonsAmountDisplay.innerHTML = localStorage.getItem("doubloonsAmount");
    }
}

// if the date has changed, the user wins an amount of daily doubloons
let lastReceivedDailyDoubloons = localStorage.getItem("lastReceivedDailyDoubloons");
if (todayDateString != lastReceivedDailyDoubloons) {  
    console.log("Date has changed!");

    if (formatDate(getDateAfter(new Date(lastReceivedDailyDoubloons))) == todayDateString) {
        localStorage.setItem("dailyStreak", +localStorage.getItem("dailyStreak")+1);
        console.log("Streak updated! Streak is now " + localStorage.getItem("dailyStreak"));

        /*Streak | Doubloons
               1 | 5
               2 | 6
               3 | 7
               4 | 8
               5 | 9
              6+ | 10
        */
        let dailyStreak = +localStorage.getItem("dailyStreak");
        if (dailyStreak <= 6) {
            addDoubloons(dailyStreak + 4);
        } else {
            addDoubloons(10);
        }
    } else {
        localStorage.setItem("dailyStreak", "1");
        console.log("Streak is now broken! Back to " + localStorage.getItem("dailyStreak"));
        addDoubloons(5);
    }

    localStorage.setItem("lastReceivedDailyDoubloons", todayDateString);
}

// Code to give user a random chance of gaining doubloons when exploring the site pages
// The user has a 20% chance of earning 2 doubloons per page, per day; if they've earned it today from a certain page, they can't get another 2 doubloons from the page until tomorrow

let yesterday = today;
yesterday.setDate(yesterday.getDate() - 1);
yesterdayDateString = formatDate(yesterday);

// if the user has not earned doubloons from the current page, there is a random chance of getting 2 doubloons
if (currentPage.endsWith(".html")) {  // exclude pages such as images
    // set default value for first time page visitor
    if (localStorage.getItem(currentPage) === null) {  
        localStorage.setItem(currentPage, yesterdayDateString);
    }

    if (localStorage.getItem(currentPage) !== todayDateString) {  
        // 20% chance of gaining 2 doubloons from that page
        let randomNumber = Math.random();
        if (randomNumber <= 0.2) {
            console.log(`Earned 2 doubloons from the page ${currentPage}`);
            addDoubloons(2);
            localStorage.setItem(currentPage, todayDateString);
        }
    }
}

// Date-related functions
function addDoubloons(amountToAdd) {
    // Adds the given amount of doubloons to the user's total; saves it to Local Storage and also updates the amount in the header
    let currentDoubloonsAmount = +localStorage.getItem("doubloonsAmount");
    if (currentDoubloonsAmount + amountToAdd > 99) {
        currentDoubloonsAmount = 99;
    } else {
        currentDoubloonsAmount += amountToAdd;
    }
    localStorage.setItem("doubloonsAmount", currentDoubloonsAmount);
    if (currentPage != "freedomwall.html") {
        doubloonsAmountDisplay.innerHTML = localStorage.getItem("doubloonsAmount");
    }
}

function formatDate(date) {
    // Formats a JS date into "YYYY-MM-DD" format
    let yearString = date.getFullYear().toString();
    let monthString = ((date.getMonth()+1) < 10) ?
            "0" + (date.getMonth()+1) :  // add "0" placeholder if needed
            (date.getMonth()+1).toString();
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

//search bar

function openSearch() {
    document.getElementById("search-box").style.width = "100%";
}

function hide() {
    document.getElementById("search-box").style.width = "0";
}