

for (let elem of document.querySelectorAll('.scrollto')) {
  elem.addEventListener('click',function(e) {
    e.preventDefault();

    let targetSection = e.target.href.split('#')[1];
    window.history.pushState("object or string", "Title", "#"+targetSection);
    document.querySelector('body').scroll({left: 0, top: document.querySelector('#'+targetSection).offsetTop , behavior: 'smooth'});

  })
}




document.querySelector('body').addEventListener("keyup", function(e) {
  e.preventDefault();
});
document.querySelector('body').addEventListener("keypress", function(e) {
  e.preventDefault();
});

document.querySelector('body').addEventListener("keydown", function(e) {
    var activeSection = getActiveSectionIndex();
    // home, end, lef, right keys:
    if([/*35,36,*/37,39].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    // space, page down, down keys:
    else if([32, 34, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      if (activeSection< document.querySelectorAll('Section').length -1 ){ //  down
        targetSection=document.querySelectorAll('Section')[activeSection+1].getAttribute("id")
        simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
 

      }
    }
    // page up, up keys:
    else if([ 33, 38].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      if (activeSection> 0 ){ // up 

        targetSection=document.querySelectorAll('Section')[activeSection-1].getAttribute("id")
        simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
 
      }
    }
}, false);


document.querySelector('body').addEventListener('wheel', function(e) {  
    if (!scrolling){
      scrolling=1;
      const delta = Math.sign(e.deltaY);
      var activeSection = getActiveSectionIndex();
      if (delta>0 && activeSection< document.querySelectorAll('Section').length -1 ){ // Wheel down

        targetSection=document.querySelectorAll('Section')[activeSection+1].getAttribute("id")
        simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
 

      }else if (delta<0 && activeSection >0 ){ // Wheel up

        targetSection=document.querySelectorAll('Section')[activeSection-1].getAttribute("id")
        simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
 
      }
      scrolling=0;
      // add custom scroll code if you want
    }
    e.preventDefault();
},{ passive: false });

 

document.querySelector('body').addEventListener('scroll', function(event){
  var currentScrollPosition=this.scrollTop
  // if (currentScrollPosition>previousScrollPosition) {
  //   console.log('down')
  // }else if(currentScrollPosition<previousScrollPosition){
  //   console.log('up')
  // }else if(currentScrollPosition==previousScrollPosition){
  //   console.log('same')
  // }
  previousScrollPosition=currentScrollPosition
}); 
// document.querySelector('body').addEventListener('scroll', scrollEnd()); 