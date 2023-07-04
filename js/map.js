// stream red (taylor's version) :D

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function clock(){
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var oghours = hours;
    // date.getHours();
    var angle, opacity;

    minutes += hours * 60;
    seconds += minutes * 60;
    angle = 360 * (seconds / 86400);

    if (oghours >= 12) {opacity = 0.6 * ((seconds - 43200)/43200);}
    else {opacity = 0.6 - (0.6 * (seconds / 43200));}
    
    if ((seconds >= 0 && seconds <= 21600) || (seconds >= 64800 && seconds <= 86400)) {
        document.getElementById("stars").style.display = "block";
        document.getElementById("clouds").style.display = "none";
    }
    else {
        document.getElementById("stars").style.display = "none";
        document.getElementById("clouds").style.display = "block";
    }

    // console.log(`total seconds: ${seconds} / 86400 seconds`);
    // console.log(`angle: ${angle}`);
    // console.log(`opacity: ${opacity}`);

    document.getElementById("clock-img").style.transform = "rotate(" + angle + "deg)";
    document.getElementById("time-overlay").style.opacity = opacity;
    
}