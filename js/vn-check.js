let filePath = location.href.split("/");
let character = filePath[filePath.length-2].split("-")[0];
console.log(character);
if (localStorage.getItem(character + "1") != "unlocked") {
    alert("Hey, someone got in without unlocking the story properly!");
    alert("Ughh, sometimes people are too smart for their own good.")
    alert("Let me bring you back...")
    window.location.replace("http://neverland2021.com/lore.html");
}