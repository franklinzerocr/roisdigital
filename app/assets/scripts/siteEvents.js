

for (let elem of document.querySelectorAll('.scrollto')) {
  
  elem.addEventListener('click',function(e) {
    e.preventDefault();

    window.requestAnimationFrame(function() {
      let targetSection = e.target.href.split('#')[1];
      window.history.pushState("object or string", "Title", "#"+targetSection);

      move("header .logo-container a").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .rois-logo-line").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .rois-logo-dot").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .secundary-rois-container").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header #header_menu").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()
      move("header .rois-menu-line-thick").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()
      move("header .rois-menu-line-thin").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()

      document.querySelector('body').scroll({left: 0, top: document.querySelector('#'+targetSection).offsetTop , behavior: 'smooth'});

      setTimeout(function() {
        var activeSection = getActiveSectionIndex(); 

        document.querySelector('header.header-container').style.top=document.querySelector('#'+targetSection).offsetTop

        move("header .logo-container a").set("margin-left",0).duration('0.2s').end()
        move("header .rois-logo-line").set("margin-left",0).duration('0.2s').end()
        move("header .rois-logo-dot").set("margin-left",0).duration('0.2s').end()
        move("header .secundary-rois-container").set("margin-left",0).duration('0.2s').end()

        setTimeout(function() {
          move("header #header_menu").set("margin-left",0).duration('0.4s').end()
          move("header .rois-menu-line-thick").set("margin-left",0).duration('0.4s').end()
          move("header .rois-menu-line-thin").set("margin-left",0).duration('0.4s').end()
        }, 100);

      }, 500);
    });


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
    if([35,36,37,39].indexOf(e.keyCode) > -1) {
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
    }
    e.preventDefault();
},{ passive: false });

 
document.querySelector('body').addEventListener('scroll', function(event){
  previousScrollPosition=this.scrollTop
  
});

