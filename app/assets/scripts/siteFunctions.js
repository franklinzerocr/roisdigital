//  Flag for mobile screensize (width 768px)
var mobile=0;

var scrolling=0; //If scrolling animation
var previousScrollPosition=0;  // the previos scroll position before scrolling starts
var loaded=0; // if the page has loaded

// typewriter function global params
var typeWriterPrimmaryDestination=null 
var typeWriterPrimaryIndex =0;
var typeWriterPrimarySpeed=0;
var typeWriterPrimaryText=""
var typeWriterSecundaryIndex =0;
var typeWriterSecundaryDestination=null 
var typeWriterSecundarySpeed=0;
var typeWriterSecundaryText=""

// Primary Rois Animation Variables
var timeDelayPreloaderOff= 400
var timeDelayEnteringAnimations=2000
var timeDelayPrimayText=700
var timeDelayPrimaryRoisAnimation1= 100
var timeDelayPrimaryRoisAnimation1Complete= 2800

// Original URL of page
var originalURL=window.location.href;

// Flag if form is focus
var focusForm=0;

// Flags for section first time visited 
var sectionFirstTime=[1,1,1,1,1]

// Delays to show secundary text
var shortDelay= 700;
var longDelay= 1200;


/*** JUMP SECTION SCROLL ***/
function getHeaderSection(){
	var i =0;
	for (var section of document.querySelectorAll('Section')) {
		if (document.querySelector('header.header-container').offsetTop == section.offsetTop ){
			break;
		}
		i++;
	}
	return i;
}
function getScrollSection(scrollTop){
	var i =0;
	for (var section of document.querySelectorAll('Section')) {
		if (scrollTop > section.offsetTop - window.innerHeight * 0.75 &&  
			scrollTop < section.offsetTop + window.innerHeight * 0.25 ){
			break;
		}
		i++;
	}
	return i;
}
function getActiveSectionIndex(){
	var i =0;
	for (var section of document.querySelectorAll('Section')) {
		if (previousScrollPosition > section.offsetTop - window.innerHeight / 2 &&  
			previousScrollPosition < section.offsetTop + window.innerHeight / 2 ){
			break;
		}
		i++;
	}
	return i;
} 
function getSectionIndex(id){
	var i =0;
	for (var section of document.querySelectorAll('Section')) {
		if (section.getAttribute("id")== id ){
			break;
		}
		i++;
	}
	return i;
}
function firstTimeScrollingToSection(targetSectionIndex){
	if (!sectionFirstTime[targetSectionIndex]) return 0;
	sectionFirstTime[targetSectionIndex]=0;
	return 1;
}
function resetFirstTime(){
	sectionFirstTime=[1,1,1,1,1]
	for (let element of document.querySelectorAll(".slow-entering-transition, .mid-entering-transition, .fast-entering-transition")){
		element.classList.add("transition")
	}
}
function showSecundaryRoisOrLogo(targetSectionIndex,firstTime=0){
	if (targetSectionIndex>0){ // Show Secundary ROis
		document.querySelector("header .secundary-rois-container").style.display="inline-block"
		document.querySelector("header .logo-container").style.display="none"
		showSecundaryText(targetSectionIndex,firstTime)
	} else { // Show Logo
		document.querySelector("header .logo-container").style.display="inline-block"
		document.querySelector("header .secundary-rois-container").style.display="none"
	}
}	
function showSecundaryText(pos,firstTime){
	activeSecundaryText=document.querySelector(".text.secundary-rois.pos-"+pos)
	displayBox(activeSecundaryText,document.querySelectorAll(".text.secundary-rois"),"table-cell")
	activeSecundaryText.innerHTML=""
	checkWidth()
	delayToShowText=shortDelay;
	if (firstTime && !mobile) delayToShowText=longDelay;
	setTimeout(function() {

		typeWriterAnimation(activeSecundaryText,30)
	}, delayToShowText);
}
function simulateClick (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
	bubbles: true,
	cancelable: true,
	view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
}
function scrollToTargetSectionID(targetSection){
  window.history.pushState("object or string", "Title", "#"+targetSection);
  document.querySelector('body').scroll({left: 0, top: document.querySelector('#'+targetSection).offsetTop , behavior: 'smooth'});
}
function menuOutOfScreen(time="0.2s"){
  move("header .logo-container a").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration(time).end()
  move("header .rois-logo-line").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration(time).end()
  move("header .rois-logo-dot").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration(time).end()
  move("header .animation-container").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration(time).end()
  move("header .text-container.secundary-rois").set("margin-left",-document.querySelector("body").offsetWidth * 0.52).duration(time).end()
  move("header #header_menu").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration(time).end()
  move("header .rois-menu-line-thick").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration(time).end()
  move("header .rois-menu-line-thin").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration(time).end()
}
function menuInsideScreen(){
  move("header .logo-container a").set("margin-left",0).duration('0.2s').end()
  move("header .rois-logo-line").set("margin-left",0).duration('0.2s').end()
  move("header .rois-logo-dot").set("margin-left",0).duration('0.2s').end()
  move("header .animation-container").set("margin-left",0).duration('0.2s').end()
  move("header .text-container.secundary-rois").set("margin-left",0).duration('0.2s').end()
  setTimeout(function() {
    move("header #header_menu").set("margin-left",0).duration('0.4s').end()
    move("header .rois-menu-line-thick").set("margin-left",0).duration('0.4s').end()
    move("header .rois-menu-line-thin").set("margin-left",0).duration('0.4s').end()
  }, 100);
}

/*** END OF - JUMP SECTION SCROLL ***/




/*** ACTIVE SECTION ON MENU ***/

function menuActiveSection(activeSection){
	i=0;
	flag=false; 
	for (let el of document.querySelectorAll('#header_menu li a')) {
		currentIteration=document.querySelectorAll('#header_menu li')[i]
		currentIteration.classList.remove("active")
	  
		if (el.getAttribute("href").split('#')[1]==activeSection || flag){
	    	currentIteration.classList.remove("hidden")
	    	flag=true;
	    if (el.getAttribute("href").split('#')[1]==activeSection) 
	     	currentIteration.classList.add("active")
	  	}
	  	else currentIteration.classList.add("hidden")

	  	i++;
	}
}

/*** END OF - ACTIVE SECTION ON MENU ***/




/***  NAVIGATION HELPERS ***/

function getPos(elem){
	pos=""
	for (let classItem of elem.classList){
    	if (classItem.indexOf("pos-")> -1) {
    		pos=classItem
    		break
    	}
    }
    return pos
}
function displayBox(active,boxes,display="") { 
	pos=getPos(active)
	for (let box of boxes) {
		if (box.classList.contains(pos)){
			if (display) {box.style.display= display;} 
			else {box.style.display= "block";}
		}else box.style.display= "none"
	}
}
function setActive(active,list){
  	for (let item of list) {
	    item.classList.remove("active");
  	}
  	active.classList.add("active");
}
function arrowNavigation(active,step){
	pos=getPos(active)
	posLength=active.getAttribute("attr-length")
	active.classList.remove(pos)
	

	pos=Number(pos.split("-")[1])
	newpos=pos+step

	if (newpos>posLength)
		active.classList.add("pos-"+1)
	else if (newpos<1)
		active.classList.add("pos-"+posLength)
	else active.classList.add("pos-"+newpos)
}


/*** END OF - NAVIGATION HELPERS ***/





/*** ANIMATIONS ***/
function enableNavigation(){
	if (!loaded){
		loaded=1;
		document.querySelector(".page-content.loading").classList.remove("loading")
		document.querySelector("#Home .scrollto").style.opacity=1;
	}
}
function typeWriterPrimary() {
  	if (typeWriterPrimaryIndex < typeWriterPrimaryText.length) {
  		window.requestAnimationFrame(function() {
	    	typeWriterPrimaryDestination.innerHTML = typeWriterPrimaryText.substring(0, typeWriterPrimaryIndex)+"_";
		});
	    typeWriterPrimaryIndex++;
	    setTimeout(typeWriterPrimary, typeWriterPrimarySpeed);
  	}else {
	  	window.requestAnimationFrame(function() {
	  		typeWriterPrimaryDestination.innerHTML = typeWriterPrimaryText
	  	});
  	}
}
function typeWriterSecundary() {
  	if (typeWriterSecundaryIndex < typeWriterSecundaryText.length) {
  		window.requestAnimationFrame(function() {
	    	typeWriterSecundaryDestination.innerHTML = typeWriterSecundaryText.substring(0, typeWriterSecundaryIndex)+"_";
		});
	    typeWriterSecundaryIndex++;
	    setTimeout(typeWriterSecundary, typeWriterSecundarySpeed);
  	}else {
	  	window.requestAnimationFrame(function() {
	  		typeWriterSecundaryDestination.innerHTML = typeWriterSecundaryText
	  	});
  	}
}
function typeWriterAnimation(element,velocity){
	if (element.classList.contains("primary-rois")){
		typeWriterPrimaryDestination=element
		typeWriterPrimaryDestination.innerHTML=""
		typeWriterPrimaryIndex =0;
		typeWriterPrimarySpeed=velocity;
		typeWriterPrimaryText=typeWriterPrimaryDestination.getAttribute("attr-text")
		typeWriterPrimary()

	}else {
		typeWriterSecundaryDestination=element
		typeWriterSecundaryDestination.innerHTML=""
		typeWriterSecundaryIndex =0;
		typeWriterSecundarySpeed=velocity;
		typeWriterSecundaryText=typeWriterSecundaryDestination.getAttribute("attr-text")
		typeWriterSecundary()
	}

}
function primaryRoisOnSecondTime(){
	document.querySelector(".animate.primary-rois.pos-1").style.display = 'block'
	document.querySelector(".animate.primary-rois.pos-2").style.display = 'none'
	setTimeout(function() { // Breathing Rois
		document.querySelector(".animate.primary-rois.pos-1").style.display = 'none'
		document.querySelector(".animate.primary-rois.pos-2").style.display = 'block'
	},timeDelayPrimaryRoisAnimation1Complete);
}
function primaryRoisOn(){
	checkWidth()
	if (mobile) timeDelayPreloaderOff=0;
	setTimeout(function() { // Entering Rois
	document.querySelector(".animate.primary-rois.pos-1").style.display = 'block'

		setTimeout(function() { // Start Entering Animations on home
			firstTimeScrollingToSection(0)
			animateEnteringSection("Home")

			setTimeout(function() { // Display Primary Text
				document.querySelector("#Home .text-container.primary-rois").style.opacity=1
				typeWriterAnimation(document.querySelector(".text.primary-rois"),20)
				enableNavigation()

				setTimeout(function() { // Breathing Rois
					document.querySelector(".animate.primary-rois.pos-1").style.display = 'none'
					document.querySelector(".animate.primary-rois.pos-2").style.display = 'block'
				}, timeDelayPrimaryRoisAnimation1);

			}, timeDelayPrimayText);

		}, timeDelayEnteringAnimations);

	}, timeDelayPreloaderOff);
}
function preLoaderOff(){
	var loaderOff = move(".loader").set('display', "none")
  	move(".loader").set('opacity', 0).duration("0.5s")
  		.then(loaderOff).end()
}
function animateEnteringSection(targetSection){
	delayEntering=0;
	checkWidth()
	if (mobile) delayEntering=shortDelay
	setTimeout(function() { // Breathing Rois
		for (let element of document.querySelectorAll("#"+targetSection+" .transition")){
			element.classList.remove("transition")
		}
	}, delayEntering);
}

/*** END OF - ANIMATIONS ***/




/*** MESSAGES BOX ***/


function showMessage(){
  	if(originalURL.indexOf("#Contacted") > -1) {
  		setTimeout(function() {
  			document.querySelector(".message-box").style.display="block"
  			document.querySelector(".message-box").style.opacity=1
  			displayBox(document.querySelector(".message-box .message-text.pos-1"),document.querySelectorAll(".message-box .message-text"),"table-cell" )
  		}, timeDelayPreloaderOff);
  	}
}


/*** END OF - MESSAGE BOX ***/




/*** INIT SMOOTHSCROLL ***/

function initSmoothscroll(){
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
		|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}

/*** END OF - INIT SMOOTHSCROLL ***/




/*** AFTER RELOADING ***/

function resetPosition(){
	if(originalURL.indexOf("#") > -1) {
		activeSection=getActiveSectionIndex()
		targetSection=document.querySelectorAll('Section')[activeSection].getAttribute("id")
		simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
		menuActiveSection(targetSection)

		window.history.pushState("object or string", "Title", "/");
    }
}

/*** END OF - AFTER RELOADING ***/




/*** MOBILE CHECK ***/

function checkWidth() {
    var windowsize =window.innerWidth;
    if (windowsize <= 768) mobile=1;
    else mobile=0;
}

/*** END OF - MOBILE CHECK ***/




/*** REARRANGEMENT OF DOM ELEMENTS ***/
function socialLinksRearrange(){
	checkWidth()
	homeSocialLinks=document.querySelector("#Home .social-links-container")
	if (mobile) {
		document.querySelector("#Home .text-container.primary-rois").appendChild(homeSocialLinks)
	}
	else {
		document.querySelector("#Home .primary-rois-container .animated-rois-container").appendChild(homeSocialLinks)
	}
}
function menuContainersSwitch(){
	checkWidth()
	if (mobile){ // secundary rois at the end
		secundaryRoisContainer=document.querySelector("header .secundary-rois-container")
		document.querySelector("header .container").appendChild(secundaryRoisContainer)
	}else{ // menu at the end
		menuContainer=document.querySelector("header .menu-container")
		document.querySelector("header .container").appendChild(menuContainer)
	}
}
function servicesContainersSwitch(){
	checkWidth()
	if (mobile){ // Services List at the end
		servicesListContainer=document.querySelector("#Services .service-list-container")
		document.querySelector("#Services .container").appendChild(servicesListContainer)
		scrolltoContainer=document.querySelector("#Services .scrollto")
		document.querySelector("#Services .container").appendChild(scrolltoContainer)
	}else{ // menu at the end
		servicesBoxesContainer=document.querySelector("#Services .services-box")
		document.querySelector("#Services .container").appendChild(servicesBoxesContainer)
		scrolltoContainer=document.querySelector("#Services .scrollto")
		document.querySelector("#Services .container").appendChild(scrolltoContainer)
	}
}
function homeResizeRearrangements(){
	socialLinksRearrange()
	menuContainersSwitch()
	servicesContainersSwitch()
}