const gachaNames = ["Doll", "FlowerCrown", "Butterfly", "DollAndCarving", "Wendy", "Peter", "March", "Binoculars", "Book",
  "Polaroid", "Sam", "Art", "Sword", "May", "Scarf", "Hourglass"];
var prizesStatus = [false, false, false, false, false, false, false, false,
  false, false, false, false, false, false, false, false];
const gachaThings = [
  ["Doll", "“Alright, here! It’s not dry yet, but a little doll of you, for good luck and protection!”"],
  ["Flower Crown", "“There. Please don't frown again. You remember our promise, right?”"],
  ["Butterfly", "“The gratitude of being understood.”"],
  ["Doll and Carving Knife", "“I don’t know. It’s a weird hobby, don’tcha think?”"],
  ["Wendy", "“For the first time in years… I finally made it home.”"],
  ["Peter", "“Neverland is anything you want it to be!”"],
  ["March", "“And it’s my turn to find him.”"],
  ["Binoculars", "“Thank you for letting me see through this blurry world.”"],
  ["Book", "A tattered book filled with stories of the past and the future."],
  ["Camera", "“Found you!”"],
  ["Sam", "“​​You just looked sad so I gave you a flower crown!”"],
  ["Art", "“I wouldn’t trade it for anything in the world.”"],
  ["Cardboard Sword", "“She called me a hero. She told me that the Lost wanted to thank me for everything I’ve done for them… and I…”"],
  ["May", "“Truthfully, I’m still nervous… but I’ll do it. Maybe… this is what living your own life means.”"],
  ["Scarf", "“I’ll place all our memories together deep in my heart.”"],
  ["Hourglass", "“I clutch my hourglass and whisper a little prayer.  Little did I know, then, of time’s worst atrocities.”"]];
var temp = parseInt(localStorage.getItem("gachaCount"));
var placeholder = document.getElementsByClassName("placeholder");

function clearLocalS() {
  localStorage.clear();
}

function enter() {
  if (!localStorage.getItem("status")) {
    localStorage.setItem("date", new Date(1 / 1 / 2021));
    localStorage.setItem("gachaCount", 0);
    localStorage.setItem("status", prizesStatus);
  }
  //if (localStorage.getItem("gachaCount") < 16){
  var gachaContainer = document.getElementsByClassName("gachaContainer")[0];
  var exitButton = document.getElementById("exit-button");
  var splashArt = document.getElementById("splash-art");
  var gachaName = document.getElementById("gachaName");
  var gachaDescription = document.getElementById("gachaDescription");
  var prizeAlert = document.getElementById("prizeAlert");

  gachaPull();
  $('#overlay').fadeToggle("fast");
  $('#exit-button').fadeToggle("fast");
  $('#splash-art').fadeToggle("fast");
  if (screen.width <= screen.height) {
    gachaName.style.fontSize = "10vw";
    gachaName.style.marginTop = "0%";
    gachaDescription.style.fontSize = "4vw";
    gachaContainer.style.width = "75%";
    splashArt.style.width = "75%";
    prizeAlert.style.fontSize = "9vw";
    exitButton.style.width = "15%";
    exitButton.margintop = "2%";
    exitButton.marginright = "2%";
  }
  if (screen.width * .72 >= screen.height) {
    var width = screen.height * .7;
    gachaContainer.style.width = width + "px";
  }
  //}
  //else {
  //    alert("You've gottem them all:)");
  //  }
}
function exit() {
  $('#overlay').fadeToggle("fast");
  $('#exit-button').fadeToggle("fast");
  $('#splash-art').fadeToggle("fast");
}
//gacha mechanics
$(document).ready(function () {
  var d = new Date();
  if (localStorage.getItem("date") < d.getDate()) {
    enter();
  }
  localStorage.setItem("date", d.getDate());
  if (!localStorage.getItem("status")) {
    updateStatus();

  }
});
function gachaPull() {
  var index = Math.floor(Math.random() * 16);
  temp = parseInt(localStorage.getItem("gachaCount"));
  var arrStatus = localStorage.getItem("status").split(",");
  //while (arrStatus[index] == "true"){
  index = Math.floor(Math.random() * 16);
  //}
  temp = temp + 1;
  localStorage.setItem("gachaCount", temp);
  arrStatus[index] = "true";
  localStorage.setItem("status", arrStatus);

  document.getElementById("gachaName").innerHTML = gachaThings[index][0];
  document.getElementById("gachaDescription").innerHTML = gachaThings[index][1];
  document.getElementById("splash-art").src = "img/" + gachaNames[index] + ".png"//dont add a ; it works tho idk y

}
