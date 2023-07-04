/* Factories */
let autoSlide, toggle = true;

//Colors
let colorList = [
	["hotPink", "#B65477", "rgba(255, 118, 214, 0.16)", "rgba(255, 118, 214, 0.5)", "rgba(255, 118, 214, 1)"],
    ["lemon", "#B8D874", "rgba(255, 231, 130, 0.16)", "rgba(255, 231, 130, 0.5)", "rgba(255, 231, 130, 1)"],
    ["teal", "#5A8392", "rgba(148, 230, 198, 0.16)", "rgba(148, 230, 198, 0.5)", "rgba(148, 230, 198, 1)"],
	["violet", "#7543AD", "rgba(193, 122, 255, 0.16)", "rgba(193, 122, 255, 0.5)", "rgba(193, 122, 255, 1)"],
	["rose", "#E47999", "rgba(255, 164, 192, 0.16)", "rgba(255, 164, 192, 0.5)", "rgba(255, 164, 192, 1)"],
	["cornflower", "#493D79", "rgba(148, 162, 255, 0.16)", "rgba(148, 162, 255, 0.5)", "rgba(148, 162, 255, 1)"],
	["darkViolet", "#1F1627", "rgba(55, 36, 73, 0.16)", "rgba(55, 36, 73, 0.5)", "rgba(55, 36, 73, 1)"],
    ["pixie-cove", "#25A7AA", "rgba(138, 207, 213, 0.16)", "rgba(138, 207, 213, 0.5)", "#BBAE7D"],
    ["phantasia", "#211732", "rgba(89, 55, 92, 0.16)", "rgba(89, 55, 92, 0.5)", "#A9684C"],
    ["jolly-roger", "#54311D", "rgba(235, 201, 114, 0.16)", "rgba(235, 201, 114, 0.5)", "#B2893A"],
    ["pantomime", "#150232", "rgba(251, 166, 72, 0.16)", "rgba(251, 166, 72, 0.5)", "#B74167"],
    ["lucid", "#266C84", "rgba(180, 237, 242, 0.16)", "rgba(180, 237, 242, 0.5)", "#0A2533"],
    ["marooners-rock", "#E9823D", "rgba(255, 205, 135, 0.16)", "rgba(255, 205, 135, 0.5)", "#C8525C"],
];

//Devices
let laptop1 = window.matchMedia("(max-width: 1920px)"),
	tabletLandscape = window.matchMedia("(max-width: 1025px)"),
	phoneLandscape = window.matchMedia("(max-width: 813px)");
	phonePortrait = window.matchMedia("(max-width: 412px)");

//Add to Slideshow
function addToSlideshow(obj){
	//Slideshow Card
	obj.card = document.getElementById("card-template").cloneNode(true);
	obj.card.classList.add("card", obj.color[0]);
	obj.card.id = `${obj.objID}-card`;
	obj.card.style.backgroundColor = obj.color[4];
	
	obj.card.getElementsByClassName("card-body")[0].classList.add(`card-${obj.layout}`);
	
	obj.card.getElementsByClassName("poster-portrait")[0].style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0), ${obj.color[1]}, ${obj.color[1]}), url(${obj.poster})`;
	obj.card.getElementsByClassName("poster-landscape")[0].style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), ${obj.color[1]}, ${obj.color[1]}, ${obj.color[1]}), url(${obj.poster})`;

	obj.card.getElementsByClassName("card-info")[0].classList.add(obj.color[0]);
	obj.title.forEach((t) =>{
		let tImg = document.createElement("img");
		tImg.src = t;
		tImg.classList.add("card-title");
		
		obj.card.getElementsByClassName("card-title-div")[0].appendChild(tImg);
	});
	obj.card.getElementsByClassName("card-info")[0].getElementsByClassName("card-title")[0].alt = obj.objID;
	
	obj.card.getElementsByTagName("a")[0].href = `#${obj.objID}`;

	document.getElementById("card-slideshow").appendChild(obj.card);

	//Page Indicator
	obj.indicator = document.getElementById("card-order-template").cloneNode(true); 
		
	let indicNum = + 1;
	if(obj instanceof FairCategory){
		indicNum += categoryList.indexOf(obj);
	}
	else if(obj instanceof FairEvent){ 
		indicNum += categoryList.length + eventList.indexOf(obj); 
	}

	obj.indicator.id = `card-order${indicNum}`;
	obj.indicator.addEventListener("click", () => { clearInterval(autoSlide); changeCard(indicNum); });

	document.getElementById("card-indicator").appendChild(obj.indicator);
}

//Categories
let categoryList = [], eventList = [];
class FairCategory {
	constructor(objID, info, titleImgNum, layout, color, type, p){
		this.objID = objID;

		let catInfo = info.split("\\n");
		catInfo.forEach((ci) => { ci = `${ci}`; });
		this.info = catInfo;

		this.poster = `img/pubmat/${this.objID}.png`;
		this.layout = layout;

        if(color === null){
            let rng = Math.floor(Math.random() * 7);
            this.color = colorList[rng];
        }
        else {
            for(let i = 0; i < colorList.length; i++){
                if(colorList[i][0].valueOf() === color){
                    this.color = colorList[i];
                    break;
                }
            }
        }

		this.type = type;

		let t = [];
		for(let i = 0; i < titleImgNum; i++){ t.push(`img/performances/category/${this.objID} (${i}).png`); }
		this.title = t;

		categoryList.push(this);
		addToSlideshow(this);

		//Container
		this.container = document.getElementById("container-template").cloneNode(true);
		this.container.id = this.objID;
		this.container.getElementsByClassName("major-text")[0].style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), ${this.color[1]}, ${this.color[1]}), url(${this.poster})`;
		this.container.getElementsByClassName("major-info")[0].classList.add(this.color[0]);

		this.title.forEach((t) => {
			let tImg = document.createElement("img");
			tImg.src = t;
			tImg.classList.add("major-title");

			this.container.getElementsByClassName("major-title-div")[0].appendChild(tImg);
		});
		this.container.getElementsByClassName("major-title")[0].alt = this.objID;

		this.info.forEach((ci) => {
			let ciPTag = document.createElement("p");
			ciPTag.innerHTML = ci;
			this.container.getElementsByClassName("major-info")[0].appendChild(ciPTag);

			let ciBreak = document.createElement("br");
			this.container.getElementsByClassName("major-info")[0].appendChild(ciBreak);
		});

		document.getElementById(`${this.type}-vids`).appendChild(this.container);

		//Galleries
		this.gallery = document.getElementById("galleries-template").cloneNode(true);
		this.gallery.id = `${this.objID}-galleries`;
		document.getElementById(`${this.type}-galleries`).appendChild(this.gallery);
	}
}

//Events
class FairEvent {
	constructor(objID, info, titleImgNum, layout, color, type, category, form, p){
		this.objID = objID;

		let evtInfo = info.split("\\n");
		evtInfo.forEach((ei) => { ei = `${ei}`; });
		this.info = evtInfo;

		if(category.valueOf() === "show-vids" || category.valueOf() === "compet-vids"){ this.category = category; }
		else {
			for(let i = 0; i < categoryList.length; i++){
				if(categoryList[i].objID.valueOf() === category){
					this.category = categoryList[i];
					break;
				}
			}
		}

		this.vidGallery = [];
		
		let t = []
		for(let i = 0; i < titleImgNum; i++){ t.push(`img/performances/title/${this.objID} (${i}).png`); }
		this.title = t;

		eventList.push(this);

		if(this.category.valueOf() === "show-vids" || this.category.valueOf() === "compet-vids"){
			this.poster = `img/pubmat/${this.objID}.png`;
			this.layout = layout;

			if(color === null){
                let rng = Math.floor(Math.random() * 7);
                this.color = colorList[rng];
            }
            else {
                for(let i = 0; i < colorList.length; i++){
                    if(colorList[i][0].valueOf() === color){
                        this.color = colorList[i];
                        break;
                    }
                }
            }

			this.type = type;
			addToSlideshow(this);
		}
		else {
			this.info.push("---"); 
			this.category.info.forEach((ci) => { this.info.push(ci); });

			this.poster = this.category.poster;
			this.layout = this.category.layout;
			this.color = this.category.color;
			this.type = this.category.type;
		}

		if(this.type.valueOf() === "compet"){ this.form = form; }
		
		//Video Library
		this.vidLib = document.getElementById("lib-template").cloneNode(true);
		(eventList.indexOf(this) % 2 === 0) ? this.vidLib.classList.add("to-left", this.color[0]) : this.vidLib.classList.add("to-right", this.color[0]);
		this.vidLib.id = this.objID;
		
		this.vidLib.getElementsByClassName("lib-text")[0].style.backgroundColor = this.color[1];
		
		this.title.forEach((t) =>{
			let tImg = document.createElement("img");
			tImg.src = t;
			tImg.classList.add("lib-title");
			
			this.vidLib.getElementsByClassName("lib-title-div")[0].appendChild(tImg);
		});
		this.vidLib.getElementsByClassName("lib-title")[0].alt = this.objID;
		
		this.vidLib.getElementsByClassName("lib-info")[0].classList.add(this.color[0]);
		this.vidLib.getElementsByClassName("lib-info")[0].style.overflow = "hidden";
		this.vidLib.getElementsByClassName("lib-info")[0].offsetHeight;
		this.vidLib.getElementsByClassName("lib-info")[0].style.overflow = "auto";
		
		this.vidLib.getElementsByTagName("a")[0].addEventListener("click", () => { this.loadModal(); });
		(this.type.valueOf() === "compet" && this.form != null)? this.vidLib.getElementsByTagName("a")[1].href = this.form : this.vidLib.getElementsByTagName("a")[1].style.display = "none";
		
		for(let i = 0; i < 2; i++){
			this.vidLib.getElementsByClassName("lib-arrow")[i].addEventListener("click", () => { clearInterval(autoSlide); (i % 2 === 0) ? this.toNextThumbnail(-1) : this.toNextThumbnail(+1); });

			if(laptop1.matches){
				this.vidLib.getElementsByClassName("lib-arrow")[i].style.backgroundColor = this.color[3];
				this.vidLib.getElementsByClassName("lib-arrow")[i].style.transition = "0.8s ease-in-out";
				this.vidLib.getElementsByClassName("lib-arrow")[i].addEventListener("mouseover", () => this.vidLib.getElementsByClassName("lib-arrow")[i].style.backgroundColor = this.color[4]);
				this.vidLib.getElementsByClassName("lib-arrow")[i].addEventListener("mouseleave", () => this.vidLib.getElementsByClassName("lib-arrow")[i].style.backgroundColor = this.color[3]);
			}
		}

		this.vidLib.getElementsByClassName("lib-window")[0].style.backgroundColor = this.color[3];
		this.vidLib.getElementsByClassName("lib-window")[0].getElementsByTagName("img")[0].src = this.poster;
		this.vidLib.getElementsByClassName("lib-window")[0].getElementsByTagName("img")[0].alt = this.objID;
		this.vidLib.getElementsByClassName("lib-window")[0].getElementsByTagName("img")[0].classList.add(this.layout);
		
		this.vidLib.getElementsByClassName("lib-road")[0].classList.add(this.color[0]);

		//Video Library Modal
		this.modal = document.getElementById("modal-template").cloneNode(true);
		this.modal.classList.add("vidlib-modal");

		let modalFill = document.getElementById("vidlib-modal-fill-template").cloneNode(true);
		modalFill.id = "";
		this.modal.getElementsByClassName("modal-attach")[0].appendChild(modalFill);

		this.modal.id = `${this.objID}-modal`;
		this.modal.getElementsByClassName("vidlib-modal-fill")[0].classList.add(this.color[0]);
		this.modal.getElementsByClassName("evt-primer")[0].style.backgroundImage = `url(${this.poster})`;
		this.modal.getElementsByClassName("evt-title-div")[0].style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0), ${this.color[1]}, ${this.color[1]})`;
		this.title.forEach((t) => {
			let tImg = document.createElement("img");
			tImg.src = t;
			tImg.classList.add("evt-title");

			this.modal.getElementsByClassName("evt-title-div")[0].appendChild(tImg);
		});

		this.modal.getElementsByClassName("evt-info")[0].style.backgroundColor = this.color[1];
		this.info.forEach((ei) => {
			let eiPTag = document.createElement("p");
			eiPTag.innerHTML = ei;
			this.modal.getElementsByClassName("evt-info")[0].insertBefore(eiPTag, this.modal.getElementsByClassName("evt-info")[0].getElementsByTagName("a")[0]);

			let eiBreak = document.createElement("br");
			this.modal.getElementsByClassName("evt-info")[0].insertBefore(eiBreak, this.modal.getElementsByClassName("evt-info")[0].getElementsByTagName("a")[0]);
		});
		(this.type.valueOf() === "compet" && this.form != null) ? this.modal.getElementsByClassName("evt-info")[0].getElementsByTagName("a")[0].href = this.form : this.modal.getElementsByClassName("evt-info")[0].getElementsByTagName("a")[0].style.display = "none";

		let modalRows = ``;
		for(let i = 0; i < this.vidGallery.length; i++){
			modalRows += `1fr `;
		}
		this.modal.getElementsByClassName("evt-lib")[0].style.gridTemplateRows = `${modalRows}`;

		this.modal.getElementsByClassName("modal-exit")[0].addEventListener("click", () => { this.modal.style.display = "none"; });
		this.modal.getElementsByClassName("modal-left")[0].getElementsByClassName("modal-arrow-img")[0].addEventListener("click", () => { this.loadNextModal(-1); });
		this.modal.getElementsByClassName("modal-right")[0].getElementsByClassName("modal-arrow-img")[0].addEventListener("click", () => { this.loadNextModal(+1); });

		document.getElementById("vidlib-modal").appendChild(this.modal);

		//Video Gallery
		this.modalGallery = document.getElementById("evt-gallery-template").cloneNode(true);
		this.modalGallery.id = `${this.objID}-gallery`; 	

		//Append to HTML
		if(this.category.valueOf() === "show-vids" || this.category.valueOf() === "compet-vids"){
			document.getElementById(this.category).insertBefore(this.vidLib, document.getElementById(this.category).getElementsByClassName("major")[0]); //Video Libraries
			document.getElementById(`${this.type}-galleries`).insertBefore(this.modalGallery, document.getElementById(`${this.type}-galleries`).childNodes[0]); //Modal Gallery
		}
		else {
			document.getElementById(this.category.container.id).appendChild(this.vidLib); //Video Libraries
			document.getElementById(this.category.gallery.id).appendChild(this.modalGallery); //Modal Gallery
		}
	}
	
	toNextThumbnail(inc){
		if(this.vidGallery.length < 2){ return; } //Check if Library is Expanded or There Are Less Than Two Videos
		
		let tNail = this.vidLib.getElementsByClassName("thumbnail");
		
		for(let c = 0; c < tNail.length; c++){
			if(tNail[c].classList.contains("turn-thumbnail")){
				//Get Thumbnail Indexes
				let l = ((c - 1) + tNail.length) % tNail.length; //Left
				let r = (c + 1) % tNail.length; //Right
				
				//Remove Current Designations
				tNail[c].style.zIndex = "-1";
				
				tNail[l].classList.remove("left-thumbnail");
				tNail[c].classList.remove("turn-thumbnail");
				tNail[r].classList.remove("right-thumbnail");
				
				let o;
				if(inc < 0){
					o = ((l - 1) + tNail.length) % tNail.length; //Get Next Left Thumbnail
					
					//Add Next Designations
					tNail[o].classList.add("left-thumbnail");
					tNail[l].classList.add("turn-thumbnail");
					tNail[c].classList.add("right-thumbnail");
					
					tNail[l].style.zIndex = "1"; //Set z-index
				}
				else if(inc > 0){
					o = (r + 1) % tNail.length; //Get Next Right Thumbnail
					
					//Add Next Designations
					tNail[c].classList.add("left-thumbnail");
					tNail[r].classList.add("turn-thumbnail");
					tNail[o].classList.add("right-thumbnail");
					
					tNail[r].style.zIndex = "1"; //Set z-index
				}
				
				break;
			}
		}
		
		return;
	}

	loadModal(){ this.modal.style.display = "block"; }

	loadNextModal(inc){
		let i = eventList.indexOf(this) + inc;
		if(i < 0){ i += eventList.length; }
		else if(i >= eventList.length){ i %= eventList.length }

		this.modal.style.display = "none";
		eventList[i].loadModal();
	}
}

//Videos
class FairVideo {
	constructor(title, info, evt, platform, vidID, thumbID, p){
		this.title = title;

		let vidInfo = info.split("\\n");
		vidInfo.forEach((vi) => { vi = `${vi}`; });
		vidInfo.push("--");
		this.info = vidInfo;

		for(let i = 0; i < eventList.length; i++){ if(eventList[i].objID.valueOf() === evt){ this.evt = eventList[i]; } }
		this.platform = platform;
		this.vidID = vidID;
		this.thumbID = thumbID;
		
		this.evt.vidGallery.push(this);
		this.evt.info.forEach((ei) => { this.info.push(ei); });
		
		//Thumbnail
		this.thumbnail = document.getElementById("vid-thumbnail-template").cloneNode(true);
		this.thumbnail.id = `${this.evt.objID}-thumbnail${this.evt.vidGallery.indexOf(this)}`;
        this.thumbnail.style.backgroundColor = this.evt.color[4];
		if(this.platform.valueOf() === "FBWatch"){ this.thumbnail.getElementsByTagName("img")[0].classList.add(`GDrive-img`); }
        else { this.thumbnail.getElementsByTagName("img")[0].classList.add(`${this.platform}-img`); }
		
		this.thumbnail.getElementsByClassName("thumbnail-title")[0].style.backgroundColor = this.evt.color[4];
		this.thumbnail.getElementsByClassName("vid-title")[0].innerHTML = this.title;
		
		this.thumbnail.addEventListener("click", () => { 
			clearInterval(autoSlide); 
			this.loadModal(); 
		});

		//Video Modal
		this.modal = document.getElementById("modal-template").cloneNode(true);
		this.modal.classList.add("vid-modal");

		let modalFill = document.getElementById("vid-modal-fill-template").cloneNode(true);
		modalFill.id = "";
		this.modal.getElementsByClassName("modal-attach")[0].appendChild(modalFill);

		this.modal.classList.add(this.evt.objID, this.platform);
		this.modal.id = `${this.evt.objID}-modal${this.evt.vidGallery.indexOf(this)}`;
		
		this.modal.getElementsByClassName("vid-title")[0].innerHTML = this.title;

		this.info.forEach((vi) => {
			let viPTag = document.createElement("p");
			viPTag.classList.add("vid-info");
			viPTag.innerHTML = vi;
			this.modal.getElementsByClassName("vid-text")[0].appendChild(viPTag);

			let viBreak = document.createElement("br");
			this.modal.getElementsByClassName("vid-text")[0].appendChild(viBreak);
		});

		if(this.evt.type.valueOf() === "compet" && this.evt.form != null){
			let l = document.createElement("a");
			l.classList.add("vid-info");
			l.href = this.evt.form;
			l.target = "_blank";
			l.innerHTML = "Vote for your favorite performance here";

			this.modal.getElementsByClassName("vid-text")[0].appendChild(l);
		}
		
		this.modal.getElementsByClassName("modal-exit")[0].addEventListener("click", () => { 
			this.stopVid(); 
			this.modal.style.display = "none";
		});
		
		for(let i = 0; i < 2; i++){ this.modal.getElementsByClassName("modal-arrow-img")[i].addEventListener("click", () => { this.stopVid(); }); }
		this.modal.getElementsByClassName("modal-arrow-img")[0].addEventListener("click", () => { this.loadNextModal(-1); });
		this.modal.getElementsByClassName("modal-arrow-img")[1].addEventListener("click", () => { this.loadNextModal(+1); });

		//Platform-Dependent
		let player = document.createElement("iframe");

        let warn = document.createElement("p");
        warn.classList.add("vid-info");
        let wBreak = document.createElement("br");

		switch(this.platform.valueOf()){
            case "FBWatch":
                this.thumbnail.getElementsByTagName("img")[0].src = `https://drive.google.com/uc?export=download&id=${this.thumbID}`;
				player.src = `https://drive.google.com/file/d/${this.thumbID}/preview`;
                this.thumbnail.addEventListener("click", () => { window.open(`https://fb.watch/${this.vidID}/`); });
                this.thumbnail.classList.add("FBWatch", this.vidID);

                warn.innerHTML = `Warning [Facebook Live]: This video cannot be embedded to the site. Please click the link below to watch the video:\n<a href="https://fb.watch/${this.vidID}/" target="_blank">https://fb.watch/${this.vidID}/</a>`;
                this.modal.getElementsByClassName("vid-text")[0].insertBefore(warn, this.modal.getElementsByClassName("vid-info")[0]);
                this.modal.getElementsByClassName("vid-text")[0].insertBefore(wBreak, this.modal.getElementsByClassName("vid-info")[1]);

                break;
			case "GDrive":
				this.thumbnail.getElementsByTagName("img")[0].src = `https://drive.google.com/uc?export=download&id=${this.thumbID}`;
				player.src = "https://drive.google.com/file/d/";

                warn.innerHTML = "Warning [Google Drive Video]: If the video does not play on your device, click the icon on the top right corner of the video player.";
                this.modal.getElementsByClassName("vid-text")[0].insertBefore(warn, this.modal.getElementsByClassName("vid-info")[0]);
                this.modal.getElementsByClassName("vid-text")[0].insertBefore(wBreak, this.modal.getElementsByClassName("vid-info")[1]);
				break;
			case "YouTube":
				this.thumbnail.getElementsByTagName("img")[0].src = `https://img.youtube.com/vi/${this.thumbID}/hqdefault.jpg`;
				player.src = "https://www.youtube.com/embed/";
				break;
		}
		player.id = `${this.evt.objID}-video${this.evt.vidGallery.indexOf(this)}`;
		player.style.width = "100%";
		player.style.height = "100%";
		player.allow = "autoplay; fullscreen; picture-in-picture";
		this.modal.getElementsByClassName("vid-player")[0].appendChild(player);

		//Event Modal Thumbnail
		this.modalThumbnail = this.thumbnail.cloneNode(true);
		this.modalThumbnail.classList.remove("thumbnail", "left-thumbnail", "right-thumbnail");
		this.modalThumbnail.classList.add("turn-thumbnail", "modal-thumbnail");
		this.modalThumbnail.id = `${this.evt.objID}-modal-thumbnail${this.evt.vidGallery.indexOf(this)}`;

        this.modalThumbnail.style.backgroundColor = "";
		this.modalThumbnail.style.gridRow = `${this.evt.vidGallery.indexOf(this) + 1}`;
		this.modalThumbnail.getElementsByClassName("thumbnail-title")[0].style.backgroundColor = "rgba(0, 0, 0, 0)";
		this.modalThumbnail.getElementsByClassName("vid-title")[0].style.color = "#1F1627";

		this.modalThumbnail.addEventListener("click", () => { 
			clearInterval(autoSlide); 
			this.loadModal(); 
		});

		//Append to HTML
		this.evt.vidLib.getElementsByClassName("lib-road")[0].appendChild(this.thumbnail);
		this.evt.modal.getElementsByClassName("evt-lib")[0].appendChild(this.modalThumbnail);
		this.evt.modalGallery.appendChild(this.modal);
	}
	
	loadModal(){
        this.modal.style.display = "block"; //Show Modal
		if(laptop1.matches){ this.modal.getElementsByClassName("vid-text")[0].scrollTop = "0"; }
		if(tabletLandscape.matches){ this.modal.getElementsByClassName("vid-modal-fill")[0].scrollTop = "0"; }
		this.playVid();
		
		return;
	}
	
	loadNextModal(inc){
		let fIndex = this.evt.vidGallery.indexOf(this); //Get fIndex
		let tIndex = fIndex + inc; //Get tIndex
		
		//Check if tIndex Goes Out of Bounds
		if(tIndex < 0){ tIndex += this.evt.vidGallery.length; }
		if(tIndex >= this.evt.vidGallery.length){ tIndex %= this.evt.vidGallery.length; }
		
		let to = this.evt.vidGallery[tIndex]; //Get to *da choppa*
		
		this.modal.style.display = "none"; //Hide Current Modal
		to.loadModal(); //Load Next Modal
		
		return;
	}
	
	playVid(){
		switch(this.platform.valueOf()){
			case "FBWatch":
                break;
			case "GDrive":
				this.modal.getElementsByTagName("iframe")[0].src = `https://drive.google.com/file/d/${this.vidID}/preview`;
				break;
			case "YouTube":
				this.modal.getElementsByTagName("iframe")[0].src += `${this.vidID}?rel=0&enablejsapi=1&autoplay=1`; //Add to Video Source
				break;
		}
		
		return;
	}
	
	stopVid(){
		switch(this.platform.valueOf()){
			case "FBWatch":
                break;
			case "GDrive":
				this.modal.getElementsByTagName("iframe")[0].src = "https://drive.google.com/file/d/";
			case "YouTube":
				this.modal.getElementsByTagName("iframe")[0].src = this.modal.getElementsByTagName("iframe")[0].src.slice(0, -42); //Cut Video Source
				break;
		}
		
		return;
	}
}
/*
Sources: 
	https://stackoverflow.com/questions/13619074/play-iframe-video-on-click-a-link-javascript
	https://stackoverflow.com/questions/40685142/youtube-autoplay-not-working
	https://stackoverflow.com/questions/48124306/embedding-google-drive-videos-using-html5-video
*/

//Videos
function makeFairVideo(){
	$(function(){
		$.ajax({
			type: "GET",
			url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl--JX3nWCgnzkmzk-BVS-QbKOzC8V6llb6SY5GmWNdfS0LgJhUc6DPgTbYU6tTnirVG6QkVpJAAQ6/pub?gid=0&single=true&output=csv",

			success: function(vidCSV){
				let vidAtt = [];
				vidAtt = vidCSV.split("\n");

				for(let i = 1; i < vidAtt.length; i++){
					let vidNew = [];
					vidNew = vidAtt[i].split(",");

					if(vidNew.length > 7){
						while(vidNew.length > 7){
							vidNew[1] += ",";
							vidNew[1] += vidNew[2];
							vidNew.splice(2, 1);
						}

						vidNew[1] = vidNew[1].slice(1, vidNew[1].length - 1);
						vidNew[1] = vidNew[1].replaceAll("\"\"", "\"");
					}
					
					new FairVideo(vidNew[0], vidNew[1], vidNew[2], vidNew[3], vidNew[4], vidNew[5], vidNew[6]);
				}

				toHTML();
			},
		});
	});
}

//Events
function makeFairEvent(){
	$(function(){
		$.ajax({
			type: "GET",
			url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl--JX3nWCgnzkmzk-BVS-QbKOzC8V6llb6SY5GmWNdfS0LgJhUc6DPgTbYU6tTnirVG6QkVpJAAQ6/pub?gid=1991837364&single=true&output=csv",

			success: function(evtCSV){
				let evtAtt = [];
				evtAtt = evtCSV.split("\n");

				for(let i = 1; i < evtAtt.length; i++){
					let evtNew = [];
					evtNew = evtAtt[i].split(",");

					if(evtNew.length > 9){
						while(evtNew.length > 9){
							evtNew[1] += ",";
							evtNew[1] += evtNew[2];
							evtNew.splice(2, 1);
						}

						evtNew[1] = evtNew[1].slice(1, evtNew[1].length - 1);
						evtNew[1] = evtNew[1].replaceAll("\"\"", "\"");
					}

					evtNew[2] = +`${evtNew[2]}`;
					evtNew[7] = `${evtNew[7]}`

                    if(evtNew[4].valueOf() === "null"){ evtNew[4] = null; }
                    if(evtNew[7].valueOf() === "null"){ evtNew[7] = null; }
                    
					new FairEvent(evtNew[0], evtNew[1], evtNew[2], evtNew[3], evtNew[4], evtNew[5], evtNew[6], evtNew[7], evtNew[8]);
				}

				makeFairVideo();
			},
		});
	});
}

//Categories
function makeFairCategory(){
	$(function(){
		$.ajax({
			type: "GET",
			url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl--JX3nWCgnzkmzk-BVS-QbKOzC8V6llb6SY5GmWNdfS0LgJhUc6DPgTbYU6tTnirVG6QkVpJAAQ6/pub?gid=414308819&single=true&output=csv",

			success: function(catCSV){
				let catAtt = [];
				catAtt = catCSV.split("\n");

				for(let i = 1; i < catAtt.length; i++){
					let catNew = [];
					catNew = catAtt[i].split(",");

					if(catNew.length > 7){
						while(catNew.length > 7){
							catNew[1] += ",";
							catNew[1] += catNew[2];
							catNew.splice(2, 1);
						}

						catNew[1] = catNew[1].slice(1, catNew[1].length - 1);
						catNew[1] = catNew[1].replaceAll("\"\"", "\"");
					}

					catNew[2] = +`${catNew[2]}`;
                    if(catNew[4].valueOf() === "null"){ catNew[4] = null; }

					new FairCategory(catNew[0], catNew[1], catNew[2], catNew[3], catNew[4], catNew[5], catNew[6]);
				}

				makeFairEvent();
			},
		});
	});
}

//HTML Elements
function toHTML(){
	/* Misc. Things */
    let mainCardRng = Math.floor(Math.random() * 6);
    document.getElementById("main-card").style.backgroundColor = colorList[mainCardRng][1];

	eventList.forEach((evt) => {
		let rng = (evt.vidGallery.length < 3) ?  0 : Math.floor(Math.random() * evt.vidGallery.length);
		if(evt.vidGallery.length != 0){ evt.vidGallery[rng].thumbnail.classList.add("turn-thumbnail"); }

		if(evt.vidGallery.length === 0){
			let tNail = document.getElementById("vid-thumbnail-template").cloneNode(true);
			tNail.classList.add("turn-thumbnail");

			tNail.getElementsByTagName("img")[0].src = "img/performances/placeholder.png";
			tNail.getElementsByTagName("img")[0].alt = "Coming Soon";
			tNail.getElementsByTagName("img")[0].classList.add("YouTube-img");

			tNail.getElementsByClassName("thumbnail-title")[0].style.backgroundColor = "#1F1627";
			tNail.getElementsByClassName("vid-title")[0].innerHTML = "Coming Soon";

			evt.vidLib.getElementsByClassName("lib-road")[0].appendChild(tNail);
		}

		if(evt.vidGallery.length < 2){
			evt.vidLib.getElementsByClassName("lib-arrow-img")[0].style.display = "none";
			evt.vidLib.getElementsByClassName("lib-arrow-img")[1].style.display = "none";

			evt.vidGallery.forEach((vid) =>{
				vid.modal.getElementsByClassName("modal-arrow-img")[0].style.display = "none";
				vid.modal.getElementsByClassName("modal-arrow-img")[1].style.display = "none";
			});
		}
		else if(evt.vidGallery.length === 2){
			let cln1 = evt.vidGallery[0].thumbnail.cloneNode(true);
			cln1.classList.remove("turn-thumbnail");
			cln1.classList.add("pseudo");
			cln1.id = evt.objID + "-thumbnail3";
			cln1.addEventListener("click", () => { evt.vidGallery[0].loadModal(); });

            if(cln1.classList.contains("FBWatch")){
                cln1.addEventListener("click", () => {
                    window.open(`https://fb.watch/${cln1.classList[2]}/`);
                });
            }

			evt.vidLib.getElementsByClassName("lib-road")[0].appendChild(cln1);
			
			let cln2 = evt.vidGallery[1].thumbnail.cloneNode(true);
			cln2.classList.add("pseudo", "left-thumbnail");
			cln2.id = evt.objID + "-thumbnail4";
			cln2.addEventListener("click", () => { evt.vidGallery[1].loadModal(); });

            if(cln2.classList.contains("FBWatch")){
                cln2.addEventListener("click", () => {
                    window.open(`https://fb.watch/${cln2.classList[2]}/`);
                });
            }

			evt.vidLib.getElementsByClassName("lib-road")[0].appendChild(cln2);
			
			evt.vidGallery[1].thumbnail.classList.add("right-thumbnail");
		}
		else if(evt.vidGallery.length > 2){
			evt.vidGallery[(rng + 1) % evt.vidGallery.length].thumbnail.classList.add("right-thumbnail");
			evt.vidGallery[((rng - 1) + evt.vidGallery.length) % evt.vidGallery.length].thumbnail.classList.add("left-thumbnail");
		}

		evt.modal.getElementsByClassName("evt-lib")[0].style.height = `${evt.vidGallery.length * 115}px`;

		//Add Thumbnail Event Listeners for Dragging Elements
		let thumbnails = evt.vidLib.getElementsByClassName("thumbnail");
		for(let i = 0; i < thumbnails.length; i++){
			thumbnails[i].addEventListener("touchstart", () => { startDrag(thumbnails); });
			thumbnails[i].addEventListener("touchmove", () => { moveDrag(); });
			thumbnails[i].addEventListener("touchend", () => { endDrag(evt, "vidLib"); });
			
			thumbnails[i].addEventListener("mousedown", () => { startDrag(thumbnails); });
			thumbnails[i].addEventListener("mousemove", () => { moveDrag(); });
			thumbnails[i].addEventListener("mouseup", () => { endDrag(evt, "vidLib"); });
			thumbnails[i].addEventListener("mouseleave", () => { endDrag(evt, "vidLib"); });
		}
	});

	//Add Slideshow Card Event Listeners for Dragging
	let cards = document.getElementsByClassName("card");
	for(let i = 0; i < cards.length; i++){
		cards[i].addEventListener("touchstart", () => { startDrag(cards); });
		cards[i].addEventListener("touchmove", () => { moveDrag(); });
		cards[i].addEventListener("touchend", () => { endDrag(null, "slideshow"); });
		
		cards[i].addEventListener("mousedown", () => { startDrag(cards); });
		cards[i].addEventListener("mousemove", () => { moveDrag(); });
		cards[i].addEventListener("mouseup", () => { endDrag(null, "slideshow"); });
		cards[i].addEventListener("mouseleave", () => { endDrag(null, "slideshow"); });
	}
	setEvtCards();

	return;
}