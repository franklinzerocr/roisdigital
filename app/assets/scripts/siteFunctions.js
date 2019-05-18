var previousScrollPosition=0
var scrolling=0;

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

function scrollEnd(){
	console.log("scrollEnd")
	// document.querySelector('body').addEventListener('mouseup', function(e){
	// 	let currentScrollPosition=document.querySelector('body').scrollTop
	// 	var activeSection = getActiveSectionIndex();

	// 	if(currentScrollPosition<previousScrollPosition){ // down
	// 		console.log("down")
	// 		targetSection=document.querySelectorAll('Section')[activeSection+1].getAttribute("id")
	// 		simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))

	// 	} 
	// 	else if (currentScrollPosition>previousScrollPosition) { // up
	// 		console.log("up")
	// 		targetSection=document.querySelectorAll('Section')[activeSection-1].getAttribute("id")
	// 		simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))

	// 	}
	// });
	var currentScrollPosition=document.querySelector('body').scrollTop
	previousScrollPosition=currentScrollPosition
}


(function() {
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

}());