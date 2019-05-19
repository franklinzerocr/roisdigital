var scrolling=0;
var previousScrollPosition=0; 
var loaded=0;

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

	if(window.location.href.indexOf("#") > -1) {
		activeSection=getActiveSectionIndex()
		targetSection=document.querySelectorAll('Section')[activeSection].getAttribute("id")
		simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
		menuActiveSection(targetSection)
		window.history.pushState("object or string", "Title", "/");
    }


}());


/*** OnLoad ***/
var loaderNone = move(".loader").set('display', "none")
var roisOn= move(".animate.primary-rois.pos-1").set("display","block").delay('0.5s')

window.onload = function() {
	loaded=1;
	document.querySelector(".page-content.loading").classList.remove("loading")
  	move(".loader").set('opacity', 0).duration("1s")
  		.then(loaderNone).then(roisOn).end()
};