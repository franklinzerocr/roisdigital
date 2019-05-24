// Explore thhrough all the .scrollto anchor elements and add listeners
for (let anchor of document.querySelectorAll('.scrollto')) {
  
  // Click the anchor link and go to target section and animate menu
  anchor.addEventListener('click',function(e) {
    e.preventDefault();
    if (!loaded) return false;
    window.requestAnimationFrame(function() {
      let targetSection = anchor.getAttribute("href").split('#')[1];
      let targetSectionIndex=getSectionIndex(targetSection)
      // if (targetSectionIndex==0) resetFirstTime()

      scrollToTargetSectionID(targetSection)
      menuOutOfScreen()

      setTimeout(function() {
        if (firstTimeScrollingToSection(targetSectionIndex)) {
          showSecundaryRoisOrLogo(targetSectionIndex,1)
          animateEnteringSection(targetSection)
        }else 
          showSecundaryRoisOrLogo(targetSectionIndex)


        setTimeout(function() {
          menuActiveSection(targetSection)

          // Move header to target section
          document.querySelector('header.header-container').style.top=document.querySelector('#'+targetSection).offsetTop

          menuInsideScreen()

        }, 200);
      }, 200);

    });

  })
}

// Disable events froms keyboard
document.querySelector('body').addEventListener("keyup", function(e) {
  if (focusForm && [33, 34].indexOf(e.keyCode) <= -1 ) return true;
  e.preventDefault();
});
document.querySelector('body').addEventListener("keypress", function(e) {
  if (focusForm && [33, 34].indexOf(e.keyCode) <= -1 ) return true;
  e.preventDefault();
});


// Enable keydown from these navigation keys only, to trigger click on respective anchor link
document.querySelector('body').addEventListener("keydown", function(e) {
    if (focusForm && [33, 34].indexOf(e.keyCode) <= -1 ) return true;

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

// Flag for enabling keyboard on forms
for (let input of document.querySelectorAll('input,textarea')) {
  input.onfocus=function(){
    focusForm=1;
  }
  input.onblur=function(){
    focusForm=0;
  }
}

// Update the previousScrollPosition whenever scroll
document.querySelector('body').addEventListener('scroll', function(event){
  if (mobile){
    scrollSection=getScrollSection(this.scrollTop)
    headerSection=getHeaderSection()
    console.log(scrollSection)
    console.log(headerSection)
    if (scrollSection!=headerSection){
      targetSection=document.querySelectorAll('Section')[scrollSection].getAttribute("id")
      simulateClick(document.querySelector(".scrollto[href='#"+targetSection+"']"))   
      // e.preventDefault();
    }
  }
  previousScrollPosition=this.scrollTop  
});

// Whenever wheel trigger click on respective anchor link
document.querySelector('body').addEventListener('wheel', function(e) {  
    e.preventDefault();
    if (mobile) return false;
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
},{ passive: false });



// Service List Navigation
for (let serviceTitle of document.querySelectorAll('#Services .services-list li')) {
  
  serviceTitle.onmouseenter= function(e) { 
    displayBox(serviceTitle,document.querySelectorAll('#Services .service'),"inline-block")
    setActive(serviceTitle,document.querySelectorAll('#Services .services-list li'))
  };

  serviceTitle.addEventListener('click',function(e) {
    displayBox(serviceTitle,document.querySelectorAll('#Services .service'),"inline-block")
    setActive(serviceTitle,document.querySelectorAll('#Services .services-list li'))
  });
 
}


// Portfolio List Navigation
for (let portfolioIndex of document.querySelectorAll('#Portfolio .portfolio-controls .portfolio-index')) {

  portfolioIndex.addEventListener('click',function(e) {
    displayBox(portfolioIndex,document.querySelectorAll('#Portfolio .portfolio'))
    setActive(portfolioIndex,document.querySelectorAll('#Portfolio .portfolio-controls a'))
  });
 
}


// Team Arrows Navigation
for (let arrow of document.querySelectorAll('#Team .member .member-controls .arrow')) {

  arrow.addEventListener('click',function(e) {
    displayBox(arrow,arrow.parentElement.parentElement.querySelectorAll(".member-img"))
    if (arrow.classList.contains("next-arrow")){
      arrowNavigation(arrow,1)
      arrowNavigation(arrow.parentElement.querySelector(".prev-arrow"),1)
    }else  if (arrow.classList.contains("prev-arrow")){
      arrowNavigation(arrow,-1)
      arrowNavigation(arrow.parentElement.querySelector(".next-arrow"),-1)
    }
  })
  
}

// Close Message Box
document.querySelector(".message-box").addEventListener("click",function(){
  this.style.display="none"
})

// 
window.onresize=homeResizeRearrangements;