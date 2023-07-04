/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function changeSubDesc(newDesc){
	document.getElementById("subDesc").innerHTML = newDesc;
}

function changeDisplay(screen){
	hideAllMembers();
	
	document.getElementById("fairComm").style.display = "none";
	document.getElementById("resources").style.display = "none";
	document.getElementById("sponsors").style.display = "none";
	document.getElementById("ambas").style.display = "none";
	document.getElementById("fairDropdown").style.display = "none";
	changeSubDesc("");
	
	
	if(screen == "fairComm"){
		changeSubDesc("Committee and Subcommittee Heads");
		document.getElementById("subDesc").style.display = "block";
		document.getElementById("fairComm").style.display = "grid";
		document.getElementById("fairDropdown").style.display = "block";
		hideAllCards(); 
		hideAllMembers();
		setTimeout(showAllCards, 1);
		
	}else{
		document.getElementById(screen).style.display = "grid";
		if(screen == "sponsors"){
			changeSubDesc("Sponsors");
		}
		if (screen == "resources"){
			changeSubDesc("Resources");
		}
		if (screen == "ambas"){
			changeSubDesc("Ambassador Campuses");
		}
	}
}

function hideAllCards(){
	var allCards = document.getElementsByClassName("credCard");
	for(var i = 0; i < allCards.length;i++){
		allCards[i].style.display = "none";
	}
}
function showAllCards(){
	var allCards = document.getElementsByClassName("credCard");
	for(var i = 0; i < allCards.length;i++){
		allCards[i].style.display = "block";
	}
}
function hideAllMembers(){
	var allMembers = document.getElementsByClassName("memberList");
	for (var i = 0; i < allMembers.length; i++){
		allMembers[i].style.display = "none";
	}
}


function filter(comm){
	switch(comm){
		case "exec":
			changeSubDesc("Executive Committee");
		break;
		case "events":
			changeSubDesc("Events Committee");
		break;
		case "design":
			changeSubDesc("Design Committee");
		break;
		case "finance":
			changeSubDesc("Finance Committee");
		break;
		case "intAff":
			changeSubDesc("Internal Affairs Committee");
		break;
		case "extAff":
			changeSubDesc("External Affairs Committee");
		break;
		case "jailers":
			changeSubDesc("Jailers Committee");
		break;
		
	}
	hideAllMembers();
	hideAllCards();
	
	var filterCards = document.getElementsByClassName(comm);
	for(var i = 0; i < filterCards.length;i++){
			filterCards[i].style.display = "inline-block";
		if(filterCards[i].classList.contains("memberList")){
		}else{filterCards[i].style.display = "block";}
	}
}