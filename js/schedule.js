const dateList = [
    "December 04, 2021",
    "December 11, 2021",
    "December 18, 2021",
]

const colorList = [
	"#B65477",
	"#B8D874",
	"#5A8392",
	"#7543AD",
	"#E47999",
	"#493D79",
];

const schedule = [];
class SchedDay {
    constructor(day, date, color){
        this.objID = `day-${day}`;
        this.date = date;
		this.color = color;
        this.day = day;
        this.events = [];

        schedule.push(this);
    }
}

class SchedEvent {
    constructor(objID, title, desc, sDay, tStart, tEnd, status, link, color, p){
        this.objID = objID;
        this.title = title;
		this.desc = desc;
        
		this.sDay = null;
        for(let i = 0; i < schedule.length; i++){
			if(schedule[i].day === sDay){
				this.sDay = schedule[i];
				this.sDay.events.push(this);
				break;
			}
		}

		let tSHolder = tStart.split(" "), tEHolder = tEnd.split(" ");
		let tSNum = tSHolder[1].split(":"), tENum = tEHolder[1].split(":");
		let tSHour = +`${tSNum[0]}`, tEHour = +`${tENum[0]}`;
		if(tSHour >= 12){
			tSNum.push("PM");

			if(tSHour > 12){ tSNum[0] = tSHour % 12; }
		}
		else {
			tSNum.push("AM");

			if(tSHour === 0){ tSNum[0] = "12"; }
		}

		if(tEHour >= 12){
			tENum.push("PM");

			if(tEHour > 12){ tENum[0] = tEHour % 12; }
		}
		else {
			tENum.push("AM");

			if(tEHour === 0){ tENum[0] = "12"; }
		}

		let timeStart = `${tSNum[0]}:${tSNum[1]}${tSNum[3]}`, timeEnd = `${tENum[0]}:${tENum[1]}${tENum[3]}`;

		this.time = `${timeStart} - ${timeEnd}`;
		this.status = status;

		(link.valueOf() === "null") ? this.link = null : this.link = link;
		this.color = color;
    }
}

function createSchedule(sched){
	let schedCon = document.createElement("div");
	schedCon.className = "scheduleContainer";

	let dayLabel = document.createElement("h1");
	dayLabel.classList.add("dayLabel");
    dayLabel.style.margin = "20px 0";
	dayLabel.innerHTML = `Fair Day ${sched.day}`;
	schedCon.appendChild(dayLabel);

    let dateLabel = document.createElement("p");
    dateLabel.classList.add("dateLabel");
    dateLabel.style.fontStyle = "italic";
    dateLabel.style.color = "#1F1627";
    dateLabel.style.textAlign = "center";
    dateLabel.style.margin = "20px 0 60px 0";
    dateLabel.innerHTML = sched.date;
    schedCon.appendChild(dateLabel);

	let events = sched.events;
	
	for (let i = 0; i < events.length; i++){
		let eventData = events[i];
		let eventColor = (eventData.color.valueOf() === "null") ? sched.color : eventData.color;
		
		let evCon = document.getElementById("evConTemp").cloneNode(true);
		evCon.id = eventData.objID;
		evCon.style.backgroundColor = eventColor;

		let evPub = eventData.objID.slice(0, -3);
		evCon.getElementsByClassName("eventPub")[0].src = `img/pubmat/${evPub}.png`;

		let eCImg = evCon.getElementsByClassName("timeLeft")[0].getElementsByTagName("img")[0];
		let eCLink = evCon.getElementsByClassName("timeLeft")[0].getElementsByTagName("a")[0];
		if(eventData.status === null){
			eCImg.src = "img/schedule/1.png";
		}
		else {
			eCImg.src = `img/schedule/${eventData.status}.png`;
			
            switch(eventData.status){
                case -2:
                    eCLink.innerHTML = "| Catch it in the Gallery of Performance Videos";
                    eventData.link = `performances.html#${evPub}`;
                    break;
                case -1:
                    eCLink.innerHTML = "| Catch it in YouTube";
                    break;
                case 0:
                    eCLink.innerHTML = "| Now Streaming";
                    break;
                case 1:
                    eCLink.innerHTML = "| Coming Soon";
                    break;
            }
		}

		(eventData.link === null) ? eCLink.style.display = "none" : eCLink.href = eventData.link;

		evCon.getElementsByClassName("eventLabel")[0].innerHTML = eventData.title;
		evCon.getElementsByClassName("timeLabel")[0].innerHTML = eventData.time;
		
		let ePCon = evCon.getElementsByClassName("ePContainer")[0];
		let middleVertDiv = evCon.getElementsByClassName("middleVert")[0].getElementsByTagName("div");
		let middleHori = evCon.getElementsByClassName("middleHori");
		evCon.getElementsByClassName("dropdown")[0].addEventListener("click", () => {
			evCon.getElementsByClassName("eventDescription")[0].style.display = "flex";
			evCon.getElementsByClassName("dropdown")[0].style.display = "none";

			evCon.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), ${eventColor}, ${eventColor}, ${eventColor}), url(img/pubmat/${evPub}.png)`
			ePCon.classList.remove("ePHidden");
			ePCon.classList.add("ePShown");

			middleVertDiv[0].style.height = "20px";
			middleVertDiv[1].style.height = "20px";
			middleHori[0].style.height = "20px";
			middleHori[1].style.height = "20px";
		});
		evCon.getElementsByClassName("collapse")[0].addEventListener("click", () => {
			evCon.getElementsByClassName("dropdown")[0].style.display = "block";
			evCon.getElementsByClassName("eventDescription")[0].style.display = "none";

			evCon.style.backgroundImage = ``;
			ePCon.classList.remove("ePShown");
			ePCon.classList.add("ePHidden");

			middleVertDiv[0].style.height = "0";
			middleVertDiv[1].style.height = "0";
			middleHori[0].style.height = "0";
			middleHori[1].style.height = "0";
		});

		if(eventData.desc != null){
			let evDesc = []
			evDesc = eventData.desc.split("\\n");
			evDesc.forEach((eD) => {
				let eDB = document.createElement("br");
				evCon.getElementsByClassName("eventDescription")[0].appendChild(eDB);

				let eDP = document.createElement("p");
				eDP.innerHTML = eD;
				evCon.getElementsByClassName("eventDescription")[0].appendChild(eDP);
			});
		}

		schedCon.appendChild(evCon);
	}
	document.getElementById("schedule").appendChild(schedCon);
	
	return schedCon;
}

let dragging = false,
	newMousePos = 0,
	mousePos = 0;
function startDrag(){
	dragging = true;
	mousePos = (event.type.includes("mouse")) ? event.pageX : event.touches[0].clientX;
}
function moveDrag(){
	if(dragging){ newMousePos = (event.type.includes("mouse")) ? event.pageX : event.touches[0].clientX; }
}
function endDrag(){
	dragging = false;
	
	const movedBy = (newMousePos != 0) ? newMousePos - mousePos : 0;

    if(movedBy < -100){ moveMarquee(+1, "arrow"); }
    if(movedBy > 100){ moveMarquee(-1, "arrow"); }
	
	newMousePos = 0;
	mousePos = 0;
}

let marqueeList = [],
    nowShowing = [];
function createMarquee(evt){
    let marqCon = document.getElementById("marqConTemp").cloneNode(true);
    marqCon.id = "";
    marqueeList.push(marqCon);

    switch(evt.status){
        case -1:
            marqCon.getElementsByClassName("status")[0].innerHTML = "Catch it in YouTube";
            marqCon.classList.add("farLeftMarq");
            break;
        case 0:
            marqCon.getElementsByClassName("status")[0].innerHTML = "Now Streaming";
            marqCon.classList.add("farRightMarq");

            nowShowing.push((marqueeList.indexOf(marqCon) - 1));
            nowShowing.push(marqueeList.indexOf(marqCon));
            nowShowing.push((marqueeList.indexOf(marqCon) + 1));
            break;
        case 1:
            marqCon.getElementsByClassName("status")[0].innerHTML = "Coming Soon";
            marqCon.classList.add("farRightMarq");
            break;
    }

    marqCon.getElementsByClassName("marqDisplay")[0].style.backgroundColor = evt.color;
    marqCon.getElementsByClassName("marqDisplay")[0].style.backgroundImage = `url(img/pubmat/${evt.objID.slice(0, -3)}.png)`;

    marqCon.addEventListener("click", () => { window.open(evt.link); });

    marqCon.addEventListener("touchstart", () => { startDrag(); });
    marqCon.addEventListener("touchmove", () => { moveDrag(); });
    marqCon.addEventListener("touchend", () => { endDrag(); });
    
    marqCon.addEventListener("mousedown", () => { startDrag(); });
    marqCon.addEventListener("mousemove", () => { moveDrag(); });
    marqCon.addEventListener("mouseup", () => { endDrag(); });
    marqCon.addEventListener("mouseleave", () => { endDrag(); });

    let marqIndic = document.createElement("div");
    marqIndic.id = `marqOrder-${marqueeList.indexOf(marqCon)}`;
    marqIndic.classList.add("marqOrder");

    marqIndic.addEventListener("click", () => { moveMarquee(marqueeList.indexOf(marqCon), "indicator"); });

    document.getElementById("marqueeRoad").appendChild(marqCon);
    document.getElementById("marqueeIndicator").appendChild(marqIndic);

    return marqCon;
}

function moveMarquee(num, mode){
    let index = 0;
    switch(mode.valueOf()){
        case "arrow":
            index = document.getElementsByClassName("turnOrder")[0].id.slice(10);
            index = +`${index}`;
            index += num;
            break;
        case "indicator":
            index = num;
            break;
    }
    index = (index + marqueeList.length) % marqueeList.length;
    
    document.getElementsByClassName("leftMarq")[0].classList.remove("leftMarq");
    document.getElementsByClassName("marqueeContainer")[((index - 1) + marqueeList.length) % marqueeList.length].classList.add("leftMarq");

    document.getElementsByClassName("turnMarq")[0].classList.remove("turnMarq");
    document.getElementsByClassName("marqueeContainer")[index].classList.add("turnMarq");

    document.getElementsByClassName("rightMarq")[0].classList.remove("rightMarq");
    document.getElementsByClassName("marqueeContainer")[(index + 1) % marqueeList.length].classList.add("rightMarq");

    document.getElementsByClassName("turnOrder")[0].classList.remove("turnOrder");
    document.getElementsByClassName("marqOrder")[index].classList.add("turnOrder");
}

for(let i = 0; i < 3; i++){
    let rng = Math.floor(Math.random() * colorList.length);

    new SchedDay(i + 1, dateList[i], colorList[rng]);
}
function makeEvents(){
	$(function(){
		$.ajax({
			type: "GET",
			url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqAczcE8wfIrfwU8DjCkyP8EZ-l7lHQw4rLQJ2rCZHEb95w-zEikqkN4Hl1CjbuRHe6p3fb3CkJbPl/pub?gid=532093322&single=true&output=csv",

			success: function(dataCSV){
				let evtIndiv = []; 
				evtIndiv = dataCSV.split("\n");

				for(let i = 1; i < evtIndiv.length; i++){
					let evtData = evtIndiv[i].split(",");
					
					if(evtData.length > 12){
						while(evtData.length > 12){
							evtData[2] += ",";
							evtData[2] += evtData[3];
							evtData.splice(3, 1);
						}

						evtData[2] = evtData[2].slice(1, evtData[2].length - 1);
						evtData[2] = evtData[2].replaceAll("\"\"", "\"");
					}

					if(evtData[2].valueOf() === "null"){ evtData[2] = null; }

					evtData[3] = +`${evtData[3]}`;
					(evtData[8].valueOf() === "null") ? evtData[8] = null : evtData[8] = +`${evtData[8]}`;

					new SchedEvent(evtData[0], evtData[1], evtData[2], evtData[3], evtData[4], evtData[5], evtData[8], evtData[9], evtData[10], evtData[11]);
				}

				schedule.forEach((sched) => {
					createSchedule(sched);

                    sched.events.forEach((evt) => { if((evt.status != null && evt.status != -2) && evt.link != null){ createMarquee(evt); } });
				});

                if(marqueeList.length > 0){
                    document.getElementById("marquee").style.display = "block";

                    document.getElementById("mLArr").addEventListener("click", () => { moveMarquee(-1, "arrow"); });
                    document.getElementById("mRArr").addEventListener("click", () => { moveMarquee(+1, "arrow"); });

                    switch(marqueeList.length){
                        case 1:
                            document.getElementById("mLArr").style.display = "none";
                            document.getElementById("mRArr").style.display = "none";

                            document.getElementById("marquee").getElementsByClassName("marqueeContainer")[0].classList.add("turnMarq");
                            document.getElementById("marquee").getElementsByClassName("marqOrder")[0].classList.add("turnOrder");
                            break;
                        case 2:
                            let cln0 = document.getElementById("marquee").getElementsByClassName("marqueeContainer")[0].cloneNode(true);
                            cln0.classList.add("rightMarq");
                            marqueeList.push(cln0);
                            document.getElementById("marqueeRoad").appendChild(cln0);

                            let ord0 = document.getElementById("marquee").getElementsByClassName("marqOrder")[0].cloneNode(true);
                            ord0.id = `${ord0.id.slice(0, -2)}02`;
                            document.getElementById("marqueeIndicator").appendChild(ord0);
                            
                            let cln1 = document.getElementById("marquee").getElementsByClassName("marqueeContainer")[1].cloneNode(true);
                            marqueeList.push(cln1);
                            document.getElementById("marqueeRoad").appendChild(cln1);

                            let ord1 = document.getElementById("marquee").getElementsByClassName("marqOrder")[1].cloneNode(true);
                            ord1.id = `${ord0.id.slice(0, -2)}03`;
                            document.getElementById("marqueeIndicator").appendChild(ord1);

                            document.getElementById("marquee").getElementsByClassName("marqueeContainer")[0].classList.add("leftMarq");

                            document.getElementById("marquee").getElementsByClassName("marqueeContainer")[1].classList.add("turnMarq");
                            document.getElementById("marquee").getElementsByClassName("marqOrder")[1].classList.add("turnOrder");
                        default:
                            if(nowShowing.length < 3){ nowShowing.push(0, 1, 2); }

                            let marquees = document.getElementById("marquee").getElementsByClassName("marqueeContainer");
                            if(marquees[nowShowing[0]] === null || marquees[nowShowing[0]] === undefined){
                                nowShowing[0] = ((nowShowing[1] - 1) + marqueeList.length) % marqueeList.length;
                            }
                            if(marquees[nowShowing[2]] === null || marquees[nowShowing[2]] === undefined){
                                nowShowing[2] = (nowShowing[1] + 1) % marqueeList.length;
                            }

                            marquees[nowShowing[0]].classList.add("leftMarq");
                            marquees[nowShowing[1]].classList.add("turnMarq");
                            marquees[nowShowing[2]].classList.add("rightMarq");

                            document.getElementById("marquee").getElementsByClassName("marqOrder")[nowShowing[1]].classList.add("turnOrder");
                            break;
                    }
                }
			},
		});
	});
}