/* Initializing ProductBox & Pages */
window.onload = function() {
   initializeProductBoxes(ProductBoxDetails);
   initializePages();
   document.getElementById("merch-search").value = "";
   if (mediaQuery.matches) {
        AdjustPageNav();
   }
}

/* Adjusts responsiveness n stuff when window gets resized */
window.onresize = function () {
	if (mediaQuery.matches) {
		AdjustPageNav();
	}

	else {
		let MorePages = document.getElementsByClassName("MorePages1");
		let MorePages2 = document.getElementsByClassName("MorePages2");

		for (let i = 0; i < MorePages.length; i++) {
			MorePages[i].style.display = "none";
			MorePages2[i].style.display = "none";
		}

		Filter();
    }
}

var CurrentEnlargedIndex = 0; var ImgGalleryCounter = 0;
var Products = [];
var filteredProducts = [];
var searchedProducts = [];
var currentlyInTransition = false; var transitionStyle = "fade"; /*fade, cube */
var isFiltered = false;
var pageLimit = 5; 
var mediaQuery = window.matchMedia('(max-width: 768px)');

var ProductBoxDetails = [
	{ Id: 00, Orient: "H", Name: "Shirts Set", Description: "When you buy all of the shirts, you can get a free Bucket Hat of your choice! The available designs are shown as well. A size chart is also provided after the shirt designs.", Price: 1250.00, Category: "deals", Match: 0, Gallery: ["img/merch/Bundles/All Shirts.png", "img/merch/Bundles/Shirts.png", "img/merch/A&S Shirt-1.png", "img/merch/DMM Shirt-1.png", "img/merch/The Lost Shirt-1.png", "img/merch/Peter Shirt-1.png", "img/merch/Wendy Shirt-1.png", "img/merch/Bundles/Bucket Hats-1.png", "img/merch/Clothing/Size Chart (Shirt).png"] },

	{ Id: 01, Orient: "H", Name: "Art & Sam Shirt", Description: "You can add Art and Sam's Button Pins to this shirt for only Php 20.00 each! Their designs are shown as well. A size chart is also provided after the shirt design.", Price: 250.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/Art and Sam Shirt.png", "img/merch/Clothing/Art & Sam (Front).png", "img/merch/Clothing/Art & Sam (Back).png", "img/merch/Character Pins/Art.png", "img/merch/Character Pins/Sam.png", "img/merch/Clothing/Size Chart (Shirt).png"] },
	{ Id: 02, Orient: "H", Name: "Doll, March, & May Shirt", Description: "You can add Doll, March, and May's Button Pins to this shirt for only Php 20.00 each! Their designs are shown as well. A size chart is also provided after the shirt design.", Price: 250.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/Doll, March, & May Shirt.png", "img/merch/Clothing/Doll, March, & May (Front).png", "img/merch/Clothing/Doll, March, & May (Back).png", "img/merch/Character Pins/Doll.png", "img/merch/Character Pins/March.png", "img/merch/Character Pins/May.png", "img/merch/Clothing/Size Chart (Shirt).png"] },
	{ Id: 03, Orient: "H", Name: "The Lost Shirt", Description: "You can add any Quote Button Pin to this shirt for only Php 20.00 each! The stickers' designs are shown as well A size chart is also provided after the shirt design.", Price: 250.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/The Lost Shirt.png", "img/merch/Clothing/The Lost (Front).png", "img/merch/Clothing/The Lost (Back).png", "img/merch/Quote Pins.png", "img/merch/Clothing/Size Chart (Shirt).png"] },
	{ Id: 04, Orient: "H", Name: "Peter Shirt", Description: "You can add Peter's Button Pin to this shirt for only Php 20.00! Their designs are shown as well. A size chart is also provided after the shirt design.", Price: 250.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/Peter Shirt.png", "img/merch/Clothing/Peter (Front).png", "img/merch/Clothing/Peter (Back).png", "img/merch/Character Pins/Peter.png", "img/merch/Clothing/Size Chart (Shirt).png"] },
	{ Id: 05, Orient: "H", Name: "Wendy Shirt", Description: "You can add Wendy's Button Pin to this shirt for only Php 20.00! Their designs are shown as well. A size chart is also provided after the shirt design.", Price: 250.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/Wendy Shirt.png", "img/merch/Clothing/Wendy (Front).png", "img/merch/Clothing/Wendy (Back).png", "img/merch/Character Pins/Wendy.png", "img/merch/Clothing/Size Chart (Shirt).png"] },

	{ Id: 06, Orient: "H", Name: "Mask", Description: "You can add any Quote Button Pin to your chosen mask for only Php 20.00 each! Their designs are shown as well.", Price: 300.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Masks/Masks.png", "img/merch/Masks/Lavender.png", "img/merch/Masks/Pink.png", "img/merch/Masks/Purple.png", "img/merch/Masks/Teal.png", "img/merch/Masks/Yellow.png", "img/merch/Quote Pins.png"] },

	{ Id: 07, Orient: "H", Name: "Lost Bucket Hat", Description: "You can add a Quote Button Pin of your choice to this hat for only Php 20.00! The available designs are provided as well.", Price: 200.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Hats/Bucket Hats.png", "img/merch/Hats/White Hat.png", "img/merch/Quote Pins.png"] },
	{ Id: 08, Orient: "H", Name: "Hourglass Bucket Hat", Description: "You can add a Quote Button Pin of your choice to this hat for only Php 20.00! The available designs are provided as well.", Price: 200.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Hats/Bucket Hats.png", "img/merch/Hats/Yellow Hat.png", "img/merch/Quote Pins.png"] },
	{ Id: 09, Orient: "H", Name: "2nd Star to the Right Bucket Hat", Description: "You can add a Quote Button Pin of your choice to this hat for only Php 20.00! The available designs are provided as well.", Price: 200.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Hats/Bucket Hats.png", "img/merch/Hats/Black Hat.png", "img/merch/Quote Pins.png"] },

	{ Id: 10, Orient: "H", Name: "Peter Drawstring Bag", Description: "You can add a Quote Button Pin of your choice to this bag for only Php 20.00! The available designs are provided as well.", Price: 200.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Bags/Bags.png", "img/merch/Bags/Peter Drawstring.png", "img/merch/Quote Pins.png"] },
	{ Id: 11, Orient: "H", Name: "Wendy Drawstring Bag", Description: "You can add a Quote Button Pin of your choice to this bag for only Php 20.00! The available designs are provided as well.", Price: 200.0, Category: "accessories", Match: 0, Gallery: ["img/merch/Bags/Bags.png", "img/merch/Bags/Wendy Drawstring.png", "img/merch/Quote Pins.png"] },
	{ Id: 12, Orient: "H", Name: "Peter Tote Bag", Description: "You can add a Quote Button Pin of your choice to this bag for only Php 20.00! The available designs are provided as well", Price: 200.0, Category: "accessories", Match: 0, Gallery: ["img/merch/Bags/Bags.png", "img/merch/Bags/Peter Tote.png", "img/merch/Quote Pins.png"] },
	{ Id: 13, Orient: "H", Name: "Wendy Tote Bag", Description: "You can add a Quote Button Pin of your choice to this bag for only Php 20.00! The available designs are provided as well.", Price: 200.0, Category: "accessories", Match: 0, Gallery: ["img/merch/Bags/Bags.png", "img/merch/Bags/Wendy Tote.png", "img/merch/Quote Pins.png"] },

	{ Id: 14, Orient: "H", Name: "Lost Sticker Set", Description: "Have  some relatable and funny moments with the Lost~!", Price: 60.00, Category: "art", Match: 0, Gallery: ["img/merch/Sticker Sets.png", "img/merch/Lost/Art.png", "img/merch/Lost/Doll.png", "img/merch/Lost/March.png", "img/merch/Lost/May.png", "img/merch/Lost/Sam.png"] },
	{ Id: 15, Orient: "H", Name: "Framed Sticker Set", Description: "A set full of smiles from your fave Neverland crew! :D", Price: 80.00, Category: "art", Match: 0, Gallery: ["img/merch/Sticker Sets.png", "img/merch/Framed/Art.png", "img/merch/Framed/Doll.png", "img/merch/Framed/March.png", "img/merch/Framed/May.png", "img/merch/Framed/Sam.png", "img/merch/Framed/Peter.png", "img/merch/Framed/Wendy.png"] },
	{ Id: 16, Orient: "H", Name: "Picnic Sticker Set", Description: "Let's go on a picnic with Peter and Wendy! Nom nom nom", Price: 50.00, Category: "art", Match: 0, Gallery: ["img/merch/Sticker Sets.png", "img/merch/Peter & Wendy/picnic.png", "img/merch/Peter & Wendy/Peter Picnic.png", "img/merch/Peter & Wendy/Wendy Picnic.png"] },
	{ Id: 17, Orient: "H", Name: "Neverland Sticker Set", Description: "Off to fulfill a never-ending daydream in Neverland with the gang!", Price: 80.00, Category: "art", Match: 0, Gallery: ["img/merch/Sticker Sets.png", "img/merch/Neverland/Art.png", "img/merch/Neverland/Doll.png", "img/merch/Neverland/March.png", "img/merch/Neverland/May.png", "img/merch/Neverland/Sam.png", "img/merch/Neverland/Peter.png", "img/merch/Neverland/Wendy.png", "img/merch/Neverland/Shadow.png"] },

	{ Id: 18, Orient: "H", Name: "Portrait Prints", Description: "You can buy the Portrait Prints individually (Php 30.00 each) or as a set. When you buy them as a set, you can get a free Portrait Print of your choice!", Price: 180.00, Category: "art", Match: 0, Gallery: ["img/merch/Portraits/Portrait Prints.png", "img/merch/Portraits/Art.png", "img/merch/Portraits/Doll.png", "img/merch/Portraits/March.png", "img/merch/Portraits/May.png", "img/merch/Portraits/Sam.png", "img/merch/Portraits/Peter.png", "img/merch/Portraits/Wendy.png"] },
	{ Id: 19, Orient: "H", Name: "Polaroid Prints", Description: "You can buy the Polaroid Prints individually (Php 20.00 each) or as a set. When you buy them as a set, you can get a free Polaroid Print of your choice!", Price: 100.00, Category: "art", Match: 0, Gallery: ["img/merch/Polaroids/Polaroid Prints.png", "img/merch/Polaroids/polaroid 1.png", "img/merch/Polaroids/polaroid 2.png", "img/merch/Polaroids/polaroid 3.png", "img/merch/Polaroids/polaroid 4.png", "img/merch/Polaroids/polaroid 5.png", "img/merch/Polaroids/polaroid 6.png"] },
	{ Id: 20, Orient: "H", Name: "Peter x Wendy Prints", Description: "You can buy the Peter x Wendy Prints individually (Php 30.00 each) or as a set. When you buy them as a set, you'll get a Php 10.00 discount!", Price: 50.0, Category: "art", Match: 0, Gallery: ["img/merch/Peter & Wendy/Peter x Wendy Prints.png", "img/merch/Peter & Wendy/Peter Print.png", "img/merch/Peter & Wendy/Wendy Print.png"] },

	{ Id: 21, Orient: "H", Name: "Character Button Pins", Description: "You can buy the Character Button Pins individually (Php 25.00 each) or as a set. When you buy them as a set, you can get 2 free Polaroid Prints of your choice! The available designs are provided as well.", Price: 175.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Character Pins/Character Pins.png", "img/merch/Character Pins/Art.png", "img/merch/Character Pins/Sam.png", "img/merch/Character Pins/Doll.png", "img/merch/Character Pins/March.png", "img/merch/Character Pins/May.png", "img/merch/Character Pins/Peter.png", "img/merch/Character Pins/Wendy.png"] },
	{ Id: 22, Orient: "H", Name: "Quote Button Pins", Description: "You can buy the Quote Button Pins individually (Php 25.00 each) or as a set. ", Price: 100.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Quote Pins/Quote Pins.png", "img/merch/Quote Pins/Fly with Me.png", "img/merch/Quote Pins/Hold on Tight.png", "img/merch/Quote Pins/I'll Be Here.png", "img/merch/Quote Pins/A Never-ending Daydream.png"] },

	{ Id: 23, Orient: "H", Name: "Hourglass Enamel Pin", Description: "The sands never seem to run out~", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Hourglass.png"] },
	{ Id: 24, Orient: "H", Name: "Sword & Flower Crown Enamel Pin", Description: "Fragrant and pretty but deadly indeed.", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Sword & Flower.png"] },
	{ Id: 25, Orient: "H", Name: "Doll Enamel Pin", Description: "Get your very own mini Doll!", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Doll.jpg"] },
	{ Id: 26, Orient: "H", Name: "Binoculars Enamel Pin", Description: "See what lies in wait beyond the horizon...", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Binoculars.jpg"] },
	{ Id: 27, Orient: "H", Name: "Scarf Enamel Pin", Description: "Make sure to bundle up before facing the winds of Neverland!", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Scarf.jpg"] },
	{ Id: 28, Orient: "H", Name: "Cape Enamel Pin", Description: "A must-have to look cool on your adventures!", Price: 150.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Cape.jpg"] },
	{ Id: 29, Orient: "H", Name: "Peter x Wendy Pin", Description: "Fly away to a place where your dreams never end with Peter and Wendy~", Price: 300.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Enamel Pins/Enamel Pins.png", "img/merch/Enamel Pins/Peter & Wendy.jpg"] },

	{ Id: 30, Orient: "H", Name: "Varsity Jacket", Description: "Comfy & swaggy jacket to keep you warm and cozy from the elements of Neverland. A size chart is also provided after the jacket design.", Price: 750.00, Category: "wearables", Match: 0, Gallery: ["img/merch/Clothing/Varsity Jacket.png", "img/merch/Clothing/Varsity Mock-up.jpg", "img/merch/Clothing/Size Chart (Jacket).png"] },

	{ Id: 31, Orient: "H", Name: "Sam x Doll Keychain", Description: "Make some sandcastles at the beach with Sam and Doll!", Price: 120.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Keychains/Keychains.png", "img/merch/Keychains/K-01.png"] },
	{ Id: 32, Orient: "H", Name: "The Lost Keychain", Description: "Explore the wonders of Neverland, but don't forget to rest!", Price: 120.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Keychains/Keychains.png", "img/merch/Keychains/K-02.png"] },
	{ Id: 33, Orient: "H", Name: "Peter x Wendy Keychain (Detailed)", Description: "Have fun and relax with Peter & Wendy!", Price: 120.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Keychains/Keychains.png", "img/merch/Keychains/K-03.png"] },
	{ Id: 34, Orient: "H", Name: "Peter x Wendy Keychain (Outline)", Description: "\"You promised me right? Let's meet again sometime.\"", Price: 120.00, Category: "accessories", Match: 0, Gallery: ["img/merch/Keychains/Keychains.png", "img/merch/Keychains/K-04.png"] },

	{ Id: 35, Orient: "H", Name: "Bundle 1 - Faith", Description: "Buy a Varsity Jacket and a Shirt to get a Mask of your choice for free! A size chart is also provided after the jacket and shirt designs.", Price: 1000.00, Category: "deals", Match: 0, Gallery: ["img/merch/Bundles/Bundle 1.png", "img/merch/Bundles/Varsity Jacket.png", "img/merch/Bundles/Shirts.png", "img/merch/Bundles/A&S Shirt-2.png", "img/merch/Bundles/DMM Shirt-2.png", "img/merch/Bundles/The Lost Shirt-2.png", "img/merch/Bundles/Peter Shirt-2.png", "img/merch/Bundles/Wendy Shirt-2.png", "img/merch/Bundles/Face Masks.png", "img/merch/Clothing/Size Chart (Shirt).png", "img/merch/Clothing/Size Chart (Jacket).png"] },
	{ Id: 36, Orient: "H", Name: "Bundle 2 - Trust", Description: "Buy 2 Shirts and a Bucket Hat to save Php 50.00! A size chart is also provided after the shirt designs.", Price: 650.00, Category: "deals", Match: 0, Gallery: ["img/merch/Bundles/Bundle 2.png", "img/merch/Bundles/Shirts.png", "img/merch/Bundles/A&S Shirt-2.png", "img/merch/Bundles/DMM Shirt-2.png", "img/merch/Bundles/The Lost Shirt-2.png", "img/merch/Bundles/Peter Shirt-2.png", "img/merch/Bundles/Wendy Shirt-2.png", "img/merch/Bundles/Bucket Hats-2.png", "img/merch/Clothing/Size Chart (Shirt).png"] },
	{ Id: 37, Orient: "H", Name: "Bundle 3 - Pixie Dust", Description: "Buy a Tote or String Bag, a Bucket Hat, and a Keychain to get a free Mask of your choice!", Price: 520.00, Category: "deals", Match: 0, Gallery: ["img/merch/Bundles/Bundle 3.png", "img/merch/Bundles/Bags.png", "img/merch/Bundles/Bucket Hats-2.png", "img/merch/Bundles/Keychains.png", "img/merch/Bundles/Face Masks.png"] },
];

function initializeProductBoxes(source) {
	var PBoxContainer = document.getElementById("ProductBoxContainer");
	var detailsReverseMap = ["Name", "Description", "Price"];
	
	//Creates ProductBox HTML
	for (let i = 0; i < source.length; i++) {
		let PBoxDiv = document.createElement("div");
		PBoxDiv.className = "ProductBox";
		PBoxDiv.dataset.index = source[i].Id;
		PBoxDiv.setAttribute("onclick","ProductBoxEnlarge(this)");
		
		let PBoxImgDiv = document.createElement("div");
		PBoxImgDiv.className = "ProdImg";
		PBoxDiv.appendChild(PBoxImgDiv);
		let PBoxImg = document.createElement("img");
		if(source[i].Orient == "V") {
			PBoxImg.className = "prodimg vertical";
		}
		else {
			PBoxImg.className = "prodimg";
		}
		PBoxImg.src = source[i].Gallery[0];
		PBoxImgDiv.appendChild(PBoxImg);
		
		let PBoxDeetsDiv = document.createElement("div");
		PBoxDeetsDiv.className = "ProdDeets";
		PBoxDiv.appendChild(PBoxDeetsDiv);
		for(let j = 0; j < 3; j++){
			let PBoxDeets = document.createElement("text");

			if (j == 2) {
				PBoxDeets.innerHTML = "Php " + source[i][detailsReverseMap[j]];
			}

			else {
				PBoxDeets.innerHTML = source[i][detailsReverseMap[j]];
			}
			PBoxDeetsDiv.appendChild(PBoxDeets);
		}
		PBoxContainer.appendChild(PBoxDiv);

		Products.push(PBoxDiv);
	}
}

function ProductBoxEnlarge(PBox) {
	var PBoxEnlarged = document.getElementById("EnlargedProductBox");
	var pos = [PBox.getBoundingClientRect().top , PBox.getBoundingClientRect().left ];
	PBoxEnlarged.setAttribute("style", "top: " + pos[0] + "px; left: " + pos[1] + "px;");
	PBoxEnlarged.className = "ProductBox";
	
	CurrentEnlargedIndex = PBox.dataset.index;
	var PBoxObject = ProductBoxDetails[CurrentEnlargedIndex];
	document.getElementById("EnlargedName").innerHTML = PBoxObject.Name;
	document.getElementById("EnlargedDesc").innerHTML = PBoxObject.Description;
	document.getElementById("EnlargedPrice").innerHTML = "Php " + PBoxObject.Price;
	
	//MiniImages
	var OtherImages = document.getElementById("OtherImages");
	OtherImages.innerHTML = "";
	
	for(let i = 0; i < PBoxObject.Gallery.length; i++){
		let miniImg = document.createElement("img");
		miniImg.src = PBoxObject.Gallery[i];
		miniImg.setAttribute("onclick", "EnlargeImg("+ i +")");
		OtherImages.appendChild(miniImg);
	}
	
	//Mobile
	var ProdImg = document.getElementById("ProdImg");
	let imgs = ProdImg.childNodes;
	let toBeRemoved = []; let removedSize = 0;
	for (let i = 0; i < imgs.length; i++) {
		if(imgs[i].className != "transitionimg" && imgs[i].className != "transitionimg hide" ) {
			toBeRemoved.push(imgs[i]);
		}
	}
	
	removedSize = toBeRemoved.length;
	for(let i = 0; i < removedSize; i++) {
		ProdImg.removeChild(toBeRemoved[i]);
	}
	
	if(screen.width <= 1024) {
		for(let i = 0; i < PBoxObject.Gallery.length; i++){
			let prodimg = document.createElement("img");
			prodimg.src = PBoxObject.Gallery[i];
			prodimg.className = "prodimg swiper-slide";
			ProdImg.appendChild(prodimg);
		}
	}
	else {
		let prodimg = document.createElement("img");
		prodimg.src = PBoxObject.Gallery[0];
		if(PBoxObject.Orient == "V") {
			prodimg.className = "prodimg vertical";
		}
		else {
			prodimg.className = "prodimg";
		}
		prodimg.id = "EnlargedImage";
		ProdImg.appendChild(prodimg);
	}
		
	
	// Black BG
	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "";
	
	setTimeout(function() {
		PBoxEnlarged.removeAttribute("style");
		PBoxEnlarged.className = "ProductBox enlarged";}, 10);
	
}

function EnlargedPBoxHide() {
	var PBox = document.getElementById("EnlargedProductBox");
	PBox.className = "ProductBox hide";
	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "transparent";
	ImgGalleryCounter = 0;
	
}

function OrderFormEnlarge(Button) {
	var PBoxEnlarged = document.getElementById("EnlargedOrderForm");
	var pos = [Button.getBoundingClientRect().top , Button.getBoundingClientRect().left ];
	PBoxEnlarged.setAttribute("style", "top: " + pos[0] + "px; left: " + pos[1] + "px;");
	PBoxEnlarged.className = "OrderFormBox";
	
	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "";
	
	setTimeout(function() {
	PBoxEnlarged.removeAttribute("style");
	PBoxEnlarged.className = "OrderFormBox enlarged";}, 10);
}

function EnlargedOrderFormHide() {
	var PBox = document.getElementById("EnlargedOrderForm");
	PBox.className = "OrderFormBox hide";
	var BlackBG = document.getElementById("BlackBG");
	BlackBG.className = "transparent";
	
}

function initializePages() {
	var pages = 0; 
	for (let i = 8; i<Products.length; i++) {
		Products[i].className = "ProductBox hide";
	}

	// Resets Page Nav & Page Navigation
	for (let a = 1; a<=5; a++) {
		document.getElementById("Page" + a).style.display = "none";
		let rnavs = document.getElementsByClassName("P" + a);

		for (let b = 0; b<2; b++) {
			rnavs[b].style.display = "none";
		}
	}

	// Sets how many pages are available depending on "content"
	if (Products.length <= 8) {
		pages = 1;
		pageLimit = 1;
	}

	else if (Products.length <= 16) {
		pages = 2;
		pageLimit = 2;
	}

	else if (Products.length <= 24) {
		pages = 3;
		pageLimit = 3;
	}

	else if (Products.length <= 32) {
		pages = 4;
		pageLimit = 4;
	}

	else {
		pages = 5;
		pageLimit = 5;
	}
	// Initializes PageNav & Page Navigation
	for (let j = 1; j<=pageLimit; j++) {
		document.getElementById("Page" + j).style.display = "inline-block";
		let navs = document.getElementsByClassName("P" + j);
		for (let k = 0; k<navs.length; k++) {
			navs[k].style.display = "inline-block";

			if (j == 1) {
				navs[k].style.backgroundColor = "#493d79";
				navs [k].style.color = "white";
			}

			else {
				navs[k].style.backgroundColor = "transparent";
				navs [k].style.color = "black";
			}
		}
	}

	if (mediaQuery.matches) {
        AdjustPageNav();
   }
   //window.alert((document.getElementsByClassName("P4"))[0].style.display);
}

function Filter() {
	// Resets filtered products & sets isFiltered
	filteredProducts = [];
	isFiltered = true;

	// Sorters (Name & Price)
	var AtoZ = document.getElementById("AtoZ");
	var ZtoA = document.getElementById("ZtoA");
	var HtoL = document.getElementById("HtoL");
	var LtoH = document.getElementById("LtoH");

	// Product Container
	var PBoxContainer = document.getElementById("ProductBoxContainer");

	// Categories
	var categories = document.getElementsByClassName("categories");
	var Categories = [];

	// Cycles thru categories to check which ones are included
	for (let i = 0; i<4; i++) {
		if (categories[i].checked == true) {
			//window.alert(categories[i].name);
			Categories.push(categories[i].name);
		}
	}

	// Filters by category if any category filter is selected
	if (Categories.length) {
		for (let j = 0; j<ProductBoxDetails.length; j++) {
			for (let k = 0; k<Categories.length; k++) {
				if (ProductBoxDetails[j].Category == Categories[k]) {
					filteredProducts.push(ProductBoxDetails[j]);
				}
			}
		}
	}

	else {
		for (let b = 0; b<ProductBoxDetails.length; b++) {
			filteredProducts.push(ProductBoxDetails[b]);
		}
	}

	// Sorts filtered products according to selected sorter
	 if (AtoZ.checked) {
		filteredProducts.sort(function (a, b) {
			var nameA = a.Name;
			var nameB = b.Name;

			if (nameA < nameB) {
				return -1;
			}

			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	}

	else if (ZtoA.checked) {
		filteredProducts.sort(function (a, b) {
			var nameA = a.Name;
			var nameB = b.Name;

			if (nameA < nameB) {
				return 1;
			}

			if (nameA > nameB) {
				return -1;
			}

			return 0;
		});
	}

	else if (HtoL.checked) {
		filteredProducts.sort(function (a, b) {
			var priceA = a.Price;
			var priceB = b.Price;

			if (priceA < priceB) {
				return 1;
			}

			if (priceA > priceB) {
				return -1;
			}

			return 0;
		});
	}

	else if (LtoH.checked) {
		filteredProducts.sort(function (a, b) {
			var priceA = a.Price;
			var priceB = b.Price;

			if (priceA < priceB) {
				return -1;
			}

			if (priceA > priceB) {
				return 1;
			}

			return 0;
		});
	}

	// Rearranges & fixes pages
	let productBoxes = PBoxContainer.childNodes;
	let toBeRemoved = []; let removedSize = 0;
	for (let i = 0; i < productBoxes.length; i++) {
		if(productBoxes[i].id == "" || productBoxes[i].id == "NoResults") {
			toBeRemoved.push(productBoxes[i]);
		}
	}
	
	removedSize = toBeRemoved.length;
	for(let i = 0; i < removedSize; i++) {
		PBoxContainer.removeChild(toBeRemoved[i]);
	}

	Products = [];
	initializeProductBoxes(filteredProducts);
	initializePages();
	document.getElementById("ChoosePage").value = "Page 1";

	// Triggers search when filters are disabled
	if (document.getElementById("merch-search").value.trim() != "") {
		Search();
	}
}

function changePage(p) {
	var page = document.getElementById("ChoosePage").value.substring(5,6);
	
	switch (p) {
		case "Previous":
			if (page>1) {
				page--;
			}
			break;

		case "Next":
			if (page<pageLimit) {
				page++;
			}
			break;

		case "Page 1":
			page = 1;
			break;

		case "Page 2":
			page = 2;
			break;

		case "Page 3":
			page = 3;
			break;

		case "Page 4":
			page = 4;
			break;

		case "Page 5":
			page = 5;
			break;
	} 

	// Hides products from previous page(s)
	if (page > 1) {
		for (let i = 0; i<((page-1)*8); i++) {
			Products[i].className = "ProductBox hide";
		}
	}
	
	// Displays products in current page
	for (let j=((page-1)*8); j<ProductBoxDetails.length; j++) {
		if (Products[j]) {
			Products[j].className = "ProductBox";
		}
	}

	// Hides products from later page(s)
	if (page < 5) {
		for (let k = (page*8); k<ProductBoxDetails.length; k++) {
			if (Products[k]) {
				Products[k].className = "ProductBox hide";
			}

			else {
				break;
			}
		}
	}

	// Updates Page Nav
	document.getElementById("ChoosePage").value = "Page " + page;
	
	for (let i = 1; i<=pageLimit; i++) {
		let navs = document.getElementsByClassName("P" + i);

		for (let j = 0; j<navs.length; j++) {
			if (i == page) {
				navs[j].style.backgroundColor = "#493d79";
				navs [j].style.color = "white";
			}

			else {
				navs[j].style.backgroundColor = "transparent";
				navs [j].style.color = "black";
			}
		} 
	}

	if (mediaQuery.matches) {
        AdjustPageNav();
   }
}

function CheckOne(c) {
	// Sorters (Name & Price)
	var AtoZ = document.getElementById("AtoZ");
	var ZtoA = document.getElementById("ZtoA");
	var HtoL = document.getElementById("HtoL");
	var LtoH = document.getElementById("LtoH");

	switch (c) {
		case "A":
			ZtoA.checked = false;
			HtoL.checked = false;
			LtoH.checked = false;
			break;

		case "Z":
			AtoZ.checked = false;
			HtoL.checked = false;
			LtoH.checked = false;
			break;

		case "H":
			AtoZ.checked = false;
			ZtoA.checked = false;
			LtoH.checked = false;
			break;

		case "L":
			AtoZ.checked = false;
			ZtoA.checked = false;
			HtoL.checked = false;
			break;
	}
}

function ResetFilter() {
	var categories = document.getElementsByClassName("categories");
	var PBoxContainer = document.getElementById("ProductBoxContainer");

	document.getElementById("AtoZ").checked = false;
	document.getElementById("ZtoA").checked = false;
	document.getElementById("HtoL").checked = false;
	document.getElementById("LtoH").checked = false;

	// Resets PageNav in FilterBox
	document.getElementById("ChoosePage").value = "Page 1";

	for (let i = 0; i<categories.length; i++) {
		categories[i].checked = false;
	}

	document.getElementById("merch-search").value = "";

	// Resets displayed products
	let productBoxes = PBoxContainer.childNodes;
	let toBeRemoved = []; let removedSize = 0;
	for (let i = 0; i < productBoxes.length; i++) {
		if(productBoxes[i].id == "" || productBoxes[i].id == "NoResults") {
			toBeRemoved.push(productBoxes[i]);
		}
	}
	
	removedSize = toBeRemoved.length;
	for(let i = 0; i < removedSize; i++) {
		PBoxContainer.removeChild(toBeRemoved[i]);
	}

	isFiltered = false;
	filteredProducts = [];
	searchedProducts = [];
	Products = [];
	initializeProductBoxes(ProductBoxDetails);
	initializePages();
}

function Search() {
	// Product Container & Source Array
	var PBoxContainer = document.getElementById("ProductBoxContainer");
	var src = [];

	// Resets searchedProducts & Match counts (if any)
	searchedProducts = [];

	for (let a = 0; a<ProductBoxDetails.length; a++) {
		ProductBoxDetails[a].Match = 0;
	}

	// Gets typed in value in search bar
	var search = document.getElementById("merch-search").value;
	search = search.toLowerCase();
	search = search.trim();

	// Changes source to be searched thru depending on isFiltered
	if (isFiltered) {
		for (let a = 0; a<filteredProducts.length; a++) {
			src.push(filteredProducts[a]);
		}
	}

	else {
		for (let b = 0; b<ProductBoxDetails.length; b++) {
			src.push(ProductBoxDetails[b]);
		}
	}
	
	// Checks for any matches
	for (let i = 0; i<src.length; i++) {
		if ((src[i].Name).toLowerCase().includes(search)) {
			src[i].Match += 3;
		}

		if ((src[i].Description).toLowerCase().includes(search)) {
			src[i].Match += 2;
		}

		if (((src[i].Price).toString()).toLowerCase().includes(search)) {
			src[i].Match += 1;
		}
	}

	// Adds products to searchedProducts if they have a match
	for (let j = 0; j<src.length; j++) {
		if (src[j].Match > 0) {
			searchedProducts.push(src[j]);
		}
	}

	// Sorts searchedProducts by order of relevance determined earlier
	searchedProducts.sort(function (a, b) {
		var matchA = a.Match;
		var matchB = b.Match;

		if (matchA < matchB) {
			return 1;
		}

		if (matchA > matchB) {
			return -1;
		}

		return 0;
	});

	// Rearranges and fixes pages
	let productBoxes = PBoxContainer.childNodes;
	let toBeRemoved = []; let removedSize = 0;
	for (let i = 0; i < productBoxes.length; i++) {
		if(productBoxes[i].id == "" || productBoxes[i].id == "NoResults") {
			toBeRemoved.push(productBoxes[i]);
		}
	}
	
	removedSize = toBeRemoved.length;
	for(let i = 0; i < removedSize; i++) {
		PBoxContainer.removeChild(toBeRemoved[i]);
	}

	// If there's no results
	if (!searchedProducts.length) {
		let none = document.createElement("text");
		none.setAttribute('id', 'NoResults');
		none.innerHTML = 'Your search for "' + search + '" has no results :(';
		PBoxContainer.appendChild(none);
	}

	Products = [];
	initializeProductBoxes(searchedProducts);
	initializePages();
	document.getElementById("ChoosePage").value = "Page 1";
}

function PreviousImg() {
	if(!currentlyInTransition) {
		var PBoxObject = ProductBoxDetails[CurrentEnlargedIndex];
		ImgGalleryCounter--;
		
		if (ImgGalleryCounter < 0) {
			ImgGalleryCounter = PBoxObject.Gallery.length - 1;
		}
		
		GalleryTransition("left", PBoxObject.Gallery[ImgGalleryCounter]);
	}
}

function NextImg() {
	if(!currentlyInTransition) {
		var PBoxObject = ProductBoxDetails[CurrentEnlargedIndex];
	
		ImgGalleryCounter++;
		if (ImgGalleryCounter > PBoxObject.Gallery.length - 1) {
			ImgGalleryCounter = 0;
		}
		
		GalleryTransition("right", PBoxObject.Gallery[ImgGalleryCounter]);
	}
}

function EnlargeImg(i) {
	if(!currentlyInTransition) {
		var PBoxObject = ProductBoxDetails[CurrentEnlargedIndex];
	
		GalleryTransition("up", PBoxObject.Gallery[i]);
		ImgGalleryCounter = i;
	}	
}

function GalleryTransition (dir, newImg) {
	
		currentlyInTransition = true;
		var tImgPresent = document.getElementById("TransitionImgPresent");
		var tImgFuture = document.getElementById("TransitionImgFuture");
		var enlargedImg = document.getElementById("EnlargedImage");
		var enlargedImgClass = enlargedImg.className;
		var position = ( document.getElementById("ProdImg").offsetWidth - 300 ) / 2;
		var widthPercent = 65;
		if(enlargedImgClass == "prodimg vertical") {
			widthPercent = 50;
		}
		tImgPresent.className = "transitionimg";
		
		tImgPresent.src = enlargedImg.src;
		tImgFuture.src = newImg;
		enlargedImg.src = newImg;
		
		enlargedImg.className = enlargedImgClass + " transparent";
		
		
		if(transitionStyle == "fade") {

			tImgPresent.setAttribute("style", "opacity: 100%; left: " + position + "px; width: " + widthPercent +"%;");
			
			if(dir == "right") {
				tImgFuture.setAttribute("style", "opacity: 100%; width: 30%; left: 80%;");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in; width: 30%; left: 10%;");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in; width: " + widthPercent +"%; opacity: 100%; left: " + position + "px");}, 10);
			}
			else if(dir == "left") {
				tImgFuture.setAttribute("style", "opacity: 100%; width: 30%; left: 0%;");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in; width: 30%; left: 80%;");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in; width: " + widthPercent +"%; opacity: 100%; left: " + position + "px");}, 10);
			}
			else {
				tImgFuture.setAttribute("style", "opacity: 100%; width: 30%; top: 100%; left: 10%");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in; width: 30%; ");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in; width: " + widthPercent +"%; opacity: 100%; top: 0%;");}, 10);
			}
			
			
			setTimeout(function(){ enlargedImg.className = enlargedImgClass; }, 510);
			setTimeout(function(){ tImgFuture.removeAttribute("style"); tImgPresent.className = "transitionimg hide"; currentlyInTransition = false; }, 520);	
		}
		else if(transitionStyle == "cube") {
			
			tImgPresent.setAttribute("style", "opacity: 100%; left: " + position + "px;");
			
			if(dir == "right") {
				tImgFuture.setAttribute("style", "opacity: 100%; transform: rotateY(90deg) translateZ(150px)");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in-out; transform: rotateY(-90deg) translateZ(150px); opacity: 100%;");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in-out; transform: rotateY(0deg) translateZ(150px); opacity: 100%;");}, 10);
			}
			else if(dir == "left") {
				tImgFuture.setAttribute("style", "opacity: 100%; transform: rotateY(-90deg) translateZ(150px)");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in-out; transform: rotateY(90deg) translateZ(150px); opacity: 100%;");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in-out; transform: rotateY(0deg) translateZ(150px); opacity: 100%;");}, 10);
			}
			else {
				tImgFuture.setAttribute("style", "opacity: 100%; transform: rotateX(-90deg) translateZ(150px)");
				setTimeout(function() {	tImgPresent.setAttribute("style", "transition: .5s ease-in-out; transform: rotateX(90deg) translateZ(150px);");
				tImgFuture.setAttribute("style", "transition: all .5s ease-in-out; transform: rotateX(0deg) translateZ(150px); opacity: 100%;");}, 10);
			}
			
			setTimeout(function(){ enlargedImg.className = "prodimg"; }, 510);
			setTimeout(function(){ tImgFuture.removeAttribute("style"); currentlyInTransition = false; }, 520);	
		}	
}

function OpenCategory(n) {
	var toOpen;
	var id = "";
	switch (n) {
		case 1:
			id = "fname";
			break;
		case 2:
			id = "fprice";
			break;
		case 3:
			id = "fcategory";
			break;
	}

	toOpen = document.getElementById(id);

	if (toOpen.style.display == "none" || toOpen.style.display == "") {
		toOpen.style.display = "block";
	}
	
	else {
		toOpen.style.display = "none";
	}
}

// For responsivenes
function AccessFilter() {
	var filterBox = document.getElementById("FilterBox");
	var BlackBG = document.getElementById("BlackBG-Filter");

	if (filterBox.style.display == "") {
		BlackBG.className = "";
		filterBox.style.display = "inline-block";
	}
	else {
		BlackBG.className = "transparent";
		filterBox.style.display = "";
	}
}

function AdjustPageNav() {
	var page = document.getElementById("ChoosePage").value.substring(5,6);
	var MP1 = document.getElementsByClassName("MorePages1");
	var MP2 = document.getElementsByClassName("MorePages2");

	// Resets PageNav & Ellipses
	for (let i  = 1; i<=5; i++) {
		let pnums = document.getElementsByClassName("P" + i);
		for (let j = 0; j<2; j++) {
			pnums[j].style.display = "inline-block";
		}
	}

	for (let k = 0; k<2; k++) {
		MP1[k].style.display = "inline-block";
		MP2[k].style.display = "inline-block";
	}

	switch (page) {
		case "1":
			if (pageLimit < 3) {
				for (let i = 2; i<=5; i++) {
					if (i <= pageLimit) {
						continue;
					}
					
					let pnums = document.getElementsByClassName("P" + i);
					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let m = 0; m<2; m++) {
					MP2[m].style.display = "none";
				}
			}

			else if (pageLimit > 3) {
				for (let i = 3; i<=5; i++) {
					let pnums = document.getElementsByClassName("P" + i);
					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}
			}

			else if (pageLimit == 3) {
				for (let i = 4; i<=5; i++) {
					let pnums = document.getElementsByClassName("P" + i);
					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let k = 0; k<2; k++) {
					MP2[k].style.display = "none";
				}
			}

			for (let m = 0; m<2; m++) {
				MP1[m].style.display = "none";
			}
			break;

		case "2":
			if (pageLimit > 3) {
				for (let i = 1; i<=5; i++) {
					if (i ==  2) {
						continue;
					}
					
					let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}
			}

			else if (pageLimit == 3) {
				for (let i = 4; i<=5; i++) {
					let pnums = document.getElementsByClassName("P" + i);
					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let k = 0; k<2; k++) {
					MP1[k].style.display = "none";
					MP2[k].style.display = "none";
				}
			}
			break;

		case "3": 
			if (pageLimit == 5) {
				for (let i = 1; i<=5; i++) {
					if (i == 3) {
						continue;
					}
					
					let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}
			}

			else if (pageLimit == 4) {
				for (let i = 1; i<=5; i++) {
					if (i == 3 || i == 4) {
						continue;
					}
					
					let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let k = 0; k<2; k++) {
					MP2[k].style.display = "none";
				}
			}

			else if (pageLimit == 3) {
				for (let i = 4; i<=5; i++) {
					let pnums = document.getElementsByClassName("P" + i);
					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let k = 0; k<2; k++) {
					MP1[k].style.display = "none";
					MP2[k].style.display = "none";
				}
			}
			break;

		case "4":
			if (pageLimit == 4) {
				for (let i = 1; i<=5; i++) {
					if (i == 3 || i == 4) {
						continue;
					}

					let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}
				for (let m = 0; m<2; m++) {
					MP2[m].style.display = "none";
				}
			}

			else {
				for (let i = 1; i<=5; i++) {
					if (i == 4 || i == 5) {
						continue;
					}
					
					let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
				}

				for (let m = 0; m<2; m++) {
					MP2[m].style.display = "none";
				}
			}
			break;

		case "5":
			for (let i = 1; i<=3; i++) {
				let pnums = document.getElementsByClassName("P" + i);

					for (let j = 0; j<2; j++) {
						pnums[j].style.display = "none";
					}
			}

			for (let m = 0; m<2; m++) {
				MP2[m].style.display = "none";
			}
			break;
	}
}
