// Update the previousScrollPosition whenever scroll
document.querySelector('body').addEventListener('scroll', function(event){
  previousScrollPosition=this.scrollTop  
});

// Explore thhrough all the .scrollto anchor elements and add listeners
for (let elem of document.querySelectorAll('.scrollto')) {
  
  // Click the anchor link, go to target section and animate menu
  elem.addEventListener('click',function(e) {
    e.preventDefault();

    window.requestAnimationFrame(function() {

      //Scroll to the target section
      let targetSection = e.target.href.split('#')[1];
      window.history.pushState("object or string", "Title", "#"+targetSection);
      document.querySelector('body').scroll({left: 0, top: document.querySelector('#'+targetSection).offsetTop , behavior: 'smooth'});

      // Move menu elements outside screen
      move("header .logo-container a").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .rois-logo-line").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .rois-logo-dot").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header .secundary-rois-container").set("margin-left",-document.querySelector("body").offsetWidth * 0.41).duration('0.2s').end()
      move("header #header_menu").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()
      move("header .rois-menu-line-thick").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()
      move("header .rois-menu-line-thin").set("margin-left",document.querySelector("body").offsetWidth * 0.6).duration('0.2s').end()

      setTimeout(function() {

        menuActiveSection(targetSection)

        // Move header menu to target section
        document.querySelector('header.header-container').style.top=document.querySelector('#'+targetSection).offsetTop


        // Move menu inside screen again
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

// Disable events froms keyboard
document.querySelector('body').addEventListener("keyup", function(e) {e.preventDefault();});
document.querySelector('body').addEventListener("keypress", function(e) {e.preventDefault();});


// Enable keydown from these navigation keys only to trigger click on respective anchor link
document.querySelector('body').addEventListener("keydown", function(e) {
    var activeSection = getActiveSectionIndex();
    // lef, right keys:
    if([37,39].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    // home keys
    else if([36].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      targetSection=document.querySelectorAll('Section')[0].getAttribute("id")
      simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
    }
    // end keys
    else if([35].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      targetSection=document.querySelectorAll('Section')[document.querySelectorAll('Section').length -1].getAttribute("id")
      simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))
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


// Whenever wheel trigger click on respective anchor link
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



