var previousScrollPosition=0
var scrolling=0;

function getActiveSectionIndex(){
	var i =0;
	for (var section of document.querySelectorAll('Section')) {
		if (previousScrollPosition == section.offsetTop){
			break;
		}
		i++;
	}
	return i;
}

// Lets ignore it for the moment.
const easeInCubic = function (t) { return t*t*t }
 
const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
   const runtime = currentTime - startTime;
   let progress = runtime / duration;
   
   progress = Math.min(progress, 1);
   
   const ease = easeInCubic(progress);
   
   // window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
   document.querySelector('body').scroll(0, startScrollOffset + (scrollEndElemTop * ease));
if(runtime < duration){
     requestAnimationFrame((timestamp) => {
       const currentTime = timestamp || new Date().getTime();
       scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
     })
   }
 }