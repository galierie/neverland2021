if (!localStorage.getItem("status")) {
	localStorage.setItem("status", "false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false");
}

var pixiedustCount = localStorage.getItem("pixiedustAmount");
var HighestSP = 0;
var hsNeedsUpdating = true;
var fillerText = [{ Text: 'There it is, Wendy; second star to the right and straight on till morning.', Quote: "Peter Pan, Peter Pan (1953)" },
{ Text: "You can't stick it on with soap, Peter. It needs sewing. Although, come to think of it, I've never thought about it before... um... sewing shadows, I mean.", Quote: "Wendy, Peter Pan (1953)" },
{ Text: "Ha-ha-ha! You wouldn't dare fight old Hook man-to-man. You'd fly away like a cowardly sparrow!", Quote: "Captain Hook, Peter Pan (1953)" },
{ Text: "Don't you understand, Tink? You mean more to me than anything in this whole world!", Quote: "Peter Pan, Peter Pan (1953)" },
{ Text: "You know that place between sleep and awake? That place where you still remember dreaming? That's where I'll always love you... Peter Pan. That's where I'll be waiting.", Quote: "Tinkerbell, Hook (1991)" },
{ Text: "Crook... crook... crickety-crockety crickety-crook, the croc is after Captain Hook - [Gets hit in the head]", Quote: "Mr. Smee, Peter Pan (1953)" },
{ Text: "You are fart factory, slug-slimed, sack-of-rat-guts-in-cat-vomit, cheesy, scab-picked, pimple-squeezing finger bandage.", Quote: "Rufio, Hook (1991)" },
{ Text: "Hear me, men. For reasons of good form, I have decided that the so-called Pan will return in three days to commit the arbitrament of the sword. Smee, translate.", Quote: "Captain Hook, Hook (1991)" },
{ Text: "Oh, I hate being disappointed, Smee. And I hate living in this flawed body. And I hate living in Neverland. And I hate... I hate... I *hate* Peter Pan!", Quote: "Captain Hook, Hook (1991)" },
{ Text: "What in the hell's the matter with you? When are you gonna stop acting like a child?", Quote: "Peter Banning, Hook (1991)" },
{ Text: "To die would be an awfully big adventure.", Quote: "Peter Pan, Peter Pan (2003)" },
{ Text: "Never is an awfully long time.", Quote: "Wendy, Peter Pan (2003)" },
{ Text: "[Lost Boys are] Children who fall out of their prams when the nurse is not looking. If they are not claimed in seven days, they are sent to the Neverland.", Quote: "Peter Pan, Peter Pan (2003)" },
{ Text: "Now, your father has never brandished a sword nor fired a pistol, thank heavens. But he has made many sacrifices for his family, and put away many dreams.", Quote: "Mrs. Darling, Peter Pan (2003)" },
{ Text: "Growing up is such a barbarous business, full of inconvenience... and pimples.", Quote: "Captain Hook, Peter Pan (2003)" },
{ Text: "Brave men do not sneak up upon defenseless women. You are cowards.", Quote: "Tiger Lily, Peter Pan Goes Wrong (2015)" },
{ Text: "Peter Pan is often cited as creating the name 'Wendy'. It was actually an obscure nickname for 'Gwendolyn'.", Quote: "" },
{ Text: "In the original play, Peter and the Lost Boys could fly on their own. When children started to injure themselves by jumping off their beds, Barrie added the rule that characters needed fairy dust in order to fly.", Quote: "" },
{ Text: "Captain Hook didn't appear at all in an earlier draft, he was added to the story for a scene that Barrie expanded because children liked pirates.", Quote: "" },
{ Text: "As is the tradition for Captain Hook and Mr. Darling to be played by the same actor on stage, they are both voiced by Hans Conreid in Peter Pan (1953).", Quote: "" },
{ Text: "Peter Pan was the first play Walt Disney ever saw, having seen a production of it in Marceline, Missouri when he was four years old.", Quote: "" },
];
var testQuote = null;
var currentlyOpened = "none";

// var gachaThings = [
// 	["Doll", "“Alright, here! It’s not dry yet, but a little doll of you, for good luck and protection!”", false],
// 	["Flower Crown", "“There. Please don't frown again. You remember our promise, right?”", false],
// 	["Butterfly", "“The gratitude of being understood.”", false],
// 	["Doll and Carving Knife", "“I don’t know. It’s a weird hobby, don’tcha think?”", false],
// 	["Wendy", "“For the first time in years… I finally made it home.”", false],
// 	["Peter", "“Neverland is anything you want it to be!”", false],
// 	["March", "“And it’s my turn to find him.”", false],
// 	["Binoculars", "“Thank you for letting me see through this blurry world.”", false],
// 	["Book", "A tattered book filled with stories of the past and the future.", false],
// 	["Camera", "“Found you!”", false],
// 	["Sam", "“​​You just looked sad so I gave you a flower crown!”", false],
// 	["Art", "“I wouldn’t trade it for anything in the world.”", false],
// 	["Cardboard Sword", "“She called me a hero. She told me that the Lost wanted to thank me for everything I’ve done for them… and I…”", false],
// 	["May", "“Truthfully, I’m still nervous… but I’ll do it. Maybe… this is what living your own life means.”", false],
// 	["Scarf", "“I’ll place all our memories together deep in my heart.”", false],
// 	["Hourglass", "“I clutch my hourglass and whisper a little prayer.  Little did I know, then, of time’s worst atrocities.”", false]];

function StatsPopupOpen(Button, device) {
	currentlyOpened = device;
	if (window.innerWidth > 800) {
		currentlyOpened = "PC";
	}
	else {
		currentlyOpened = "Mobile";
	}
	var StatsEnlarged = document.getElementById("ProfilePopupContainer-" + currentlyOpened);

	var pos = [Button.getBoundingClientRect().top, Button.getBoundingClientRect().left];
	StatsEnlarged.setAttribute("style", "top: " + (pos[0] - 180) + "px; left: " + (pos[1] - 40) + "px;");
	StatsEnlarged.className = "";

	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "";

	updateStats();
	fillFlavorText();

	if (device = "PC") {
		setTimeout(function () {
			StatsEnlarged.removeAttribute("style");
			StatsEnlarged.className = "enlarged";
		}, 10);
	}
	else {
		setTimeout(function () {
			StatsEnlarged.removeAttribute("style");
			StatsEnlarged.className = "enlarged swiper mySwiper";
		}, 10);
	}

	updateStats();

}

function StatsPopupHide() {
	var StatsEnlarged = document.getElementById("ProfilePopupContainer-" + currentlyOpened);
	currentlyOpened = "none";
	StatsEnlarged.className = "hidden";
	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "transparent";
}

function updateStats() {
	document.getElementById("PixieDustCount-" + currentlyOpened).innerHTML = pixiedustCount;

	let toBeRemoved = []; let removedSize = 0;
	removedSize = toBeRemoved.length;
}

function fillFlavorText() {
	let index = Math.floor(Math.random() * fillerText.length);
	if (testQuote) {
		index = testQuote;
	}
	document.getElementById("FlavorText-" + currentlyOpened).innerHTML = fillerText[index].Text;
	document.getElementById("QuoteText-" + currentlyOpened).innerHTML = fillerText[index].Quote;
}

function showPopup() {
	resizePopup();
	$('#myPopup-' + currentlyOpened).fadeToggle();
	document.getElementById("myPopup-" + currentlyOpened).style.display = "inline";
}

function resizePopup() {
	var popup = $('#popup-' + currentlyOpened).width();
	var myPopupWidth = $('#myPopup-').width() * -1 * .41;
	var ss = $('#placeholderpop-'  + currentlyOpened).width();
	document.getElementById("placeholderpop-"  + currentlyOpened).style.width = popup+"px";
	document.getElementById("myPopup-" + currentlyOpened).style.marginLeft ="-" +popup +"px";
}

$(document).ready(function () {
	updateStatus();
});

$(window).resize(function () {
	resizePopup();
});

function lock(index, currentlyOpened) {
	if (currentlyOpened == "PC"){
		var prizenamePC = document.getElementsByClassName('item4')[0].children[index];
		prizenamePC.children[2].style.display = "inline-block";
		prizenamePC.children[0].style.opacity = "0.5";
	}
	else{
		var prizenameMobile = document.getElementsByClassName('item4')[1].children[index];
		prizenameMobile.children[2].style.display = "block";
		prizenameMobile.children[0].style.opacity = "0.5";
	}
}
function unlock(index, currentlyOpened) {
	if(currentlyOpened=="PC"){
		var prizenamePC = document.getElementsByClassName('item4')[0].children[index];
		prizenamePC.children[2].style.display = "none";
		prizenamePC.children[0].style.opacity = "1";
	}
	else{
		var prizenameMobile = document.getElementsByClassName('item4')[1].children[index];
		prizenameMobile.children[2].style.display = "none";
		prizenameMobile.children[0].style.opacity = "1";

	}
}

function enlargeGacha(index, where) {
	var gacha = document.getElementsByClassName('item4')[0].children[index];
	var gacha1 = document.getElementsByClassName('item4')[1].children[index];
	if (gacha.children[2].style.display == "none" || where == "ready"|| gacha1.children[2].style.display == "none") {
			var gachaSpotlightPC = document.getElementsByClassName('gachaLarge')[0];
			gachaSpotlightPC.src = "img/" + gachaNames[index] + ".png";
			document.getElementsByClassName('gachaName')[0].innerHTML = gachaThings[index][0];
			document.getElementsByClassName('gachaDescription')[0].innerHTML = gachaThings[index][1];
			var gachaSpotlightMobile = document.getElementsByClassName('gachaLarge')[1];
			gachaSpotlightMobile.src = "img/" + gachaNames[index] + ".png";
			document.getElementsByClassName('gachaName')[1].innerHTML = gachaThings[index][0];
			document.getElementsByClassName('gachaDescription')[1].innerHTML = gachaThings[index][1];
	}
}

function updateStatus() {
	if (window.innerWidth > 1024) {
		currentlyOpened = "PC";
	}
	else {
		currentlyOpened = "Mobile";
	}
	var stat = localStorage.getItem("status");
	var arrStatus = stat.split(",");
	var gallery = document.getElementsByClassName("item4")[0];
	for(let i = 0; i < arrStatus.length; i++){
		if (arrStatus[i] == "false") {
			lock(i, currentlyOpened);
		}
		else {
			enlargeGacha(i, "ready");
			unlock(i, currentlyOpened);
		}
	}
}
