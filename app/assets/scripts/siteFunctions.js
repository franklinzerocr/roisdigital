var scrolling=0; //If scrolling animation
var previousScrollPosition=0;  // the previos scroll position before scrolling starts
var loaded=0; // if the page has loaded

/*** JUMP SECTION SCROLL ***/

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
function simulateClick (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
	bubbles: true,
	cancelable: true,
	view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
}; 

/*** - END - ***/



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

/*** - END - ***/



/*** Rois Entering and breathing animation ***/

function primaryRoisOn(){
	startDelay= 500
	animation1= 3000
	setTimeout(function() {
	document.querySelector(".animate.primary-rois.pos-1").style.display = 'block'
		setTimeout(function() {
			document.querySelector(".animate.primary-rois.pos-1").style.display = 'none'
			document.querySelector(".animate.primary-rois.pos-2").style.display = 'block'
		}, animation1);
	}, startDelay);
}

/*** - END - ***/


/*** Stop the loader ***/

function preLoaderOff(){
	loaded=1;
	var loaderOff = move(".loader").set('display', "none")
	document.querySelector(".page-content.loading").classList.remove("loading")
  	move(".loader").set('opacity', 0).duration("0.5s")
  		.then(loaderOff).end()
}

/*** - END - ***/



/*** OnLoad ***/

window.onload = function() {
	preLoaderOff()
  	primaryRoisOn()
};

/*** - END - ***/



/*** init ***/

(function() {

	/**** SMOOTHSCROLL ***/
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
	/*** - END - ***/


	// Reset the page after reload
	if(window.location.href.indexOf("#") > -1) {
		activeSection=getActiveSectionIndex()
		targetSection=document.querySelectorAll('Section')[activeSection].getAttribute("id")
		simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
		menuActiveSection(targetSection)
		window.history.pushState("object or string", "Title", "/");
    }


}());
