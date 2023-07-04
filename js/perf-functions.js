/* Event Slideshow */
const evtCard = document.getElementsByClassName("card"); //Slideshow Cards
const cardOrder = document.getElementsByClassName("card-order"); //Page Indicators

function cardTop(status){
	if(status === 0){
		document.getElementById("card-left").style.display = "none";
		document.getElementById("card-right").style.display = "none";
	}
	else if(status === 1){
		document.getElementById("card-left").style.display = "flex";
		document.getElementById("card-right").style.display = "flex";
	}

	return;
}

function setEvtCards(){
	for(let i = 0; i < evtCard.length; i++){
		if(evtCard[i].classList.contains("turn-card")){
			evtCard[i].style.zIndex = "0";
			for(let j = 1; j < evtCard.length / 2; j++){
				evtCard[(i + j) % evtCard.length].style.left = "100%";
				evtCard[((i - j) + evtCard.length) % evtCard.length].style.left = "-100%";

				if(j == 1){
					evtCard[(i + j) % evtCard.length].style.zIndex = "-1";
					evtCard[((i - j) + evtCard.length) % evtCard.length].style.zIndex = "-1";
				}
				else {
					evtCard[(i + j) % evtCard.length].style.zIndex = "-2";
					evtCard[((i - j) + evtCard.length) % evtCard.length].style.zIndex = "-2";
				}
			}

			break;
		}
	}
}

function toNextEvent(inc){
	for(let f = 0; f < evtCard.length; f++){
		if(evtCard[f].classList.contains("turn-card")){
			//Remove Current Designations
			evtCard[f].classList.remove("turn-card");
			cardOrder[f].classList.remove("turn-order");

			let t = (inc < 0) ? ((f - 1) + evtCard.length) % evtCard.length : (f + 1) % evtCard.length; //Get Next Card

			//Add Next Designations
			evtCard[t].style.left = "0";
			evtCard[t].classList.add("turn-card");
			cardOrder[t].classList.add("turn-order");

			setEvtCards();

			break;
		}
	}

	return;
}

function changeCard(t){
	for(let f = 0; f < evtCard.length; f++){
		if(evtCard[f].classList.contains("turn-card")){
			//Animate
			evtCard[f].classList.remove("turn-card");
			cardOrder[f].classList.remove("turn-order");

			//Add Designations
			evtCard[t].style.left = "0";
			evtCard[t].classList.add("turn-card");
			cardOrder[t].classList.add("turn-order");

			setEvtCards();

			break;
		}
	}
	
	return;
}

/* Video Libraries */
let elements,
	dragging = false,
	currentElemIndex = 0,
	newMousePos = 0,
	mousePos = 0;

function startDrag(e){
	toggle = false;
	clearInterval(autoSlide);

	elements = e;
	dragging = true;


	for(let i = 0; i < e.length; i++){ 
		if(elements[i].classList.contains("turn-thumbnail") || elements[i].classList.contains("turn-card")){ 
			currentElemIndex = i; 
		} 
	}
	mousePos = (event.type.includes("mouse")) ? event.pageX : event.touches[0].clientX;
}

function moveDrag(){
	if(dragging){ newMousePos = (event.type.includes("mouse")) ? event.pageX : event.touches[0].clientX; }
}

function endDrag(evt, type){
	dragging = false;

	const movedBy = (newMousePos != 0) ? newMousePos - mousePos : 0;
	switch(type.valueOf()){
		case "slideshow":
			if(movedBy < -100){ toNextEvent(+1); }
			if (movedBy > 100){ toNextEvent(-1); }
			break;
		case "vidLib":
			if(movedBy < -100){ evt.toNextThumbnail(+1); }
			if (movedBy > 100){ evt.toNextThumbnail(-1); }
			break;
	}

	newMousePos = 0;
	mousePos = 0;
}
//Source: https://www.youtube.com/watch?v=5bxFSOA5JYo

/* AutoScroll */
function chaChaSlide(){
	if(toggle === true){
		toNextEvent(+1); //Event Slideshow

		eventList.forEach((evt) => { evt.toNextThumbnail(+1); }); //Video Library

		console.log("autoSlide");
	}
}

autoSlide = setInterval(function(){ chaChaSlide(); }, 5000);

/* Switch Tabs and Windows */
document.addEventListener("visibilitychange", () => {
	switch(document.visibilityState){
		case "prerender":
		case "unloaded":
		case "hidden":
			toggle = false;
			console.log("hidden");
			break;
		case "visible":
			toggle = true;
			console.log("visible");
			break;
	}
});