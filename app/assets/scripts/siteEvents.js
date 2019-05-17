for (let elem of document.querySelectorAll('.scrollto')) {
  elem.addEventListener('click',function(e) {
    e.preventDefault();

    // 1. Get the element id to which you want to scroll
    console.log(e.target)
    const scrollElemId = e.target.href.split('#')[1];

    // 2. find that node from the document
    const scrollEndElem = document.getElementById(scrollElemId);

    // 3. and well animate to that node.. 
    const anim = requestAnimationFrame((timestamp) => {
      const stamp = timestamp || new Date().getTime();
      const duration = 1000;
      const start = stamp;

      const startScrollOffset = previousScrollPosition;
      const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

      scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
    })
  })
}



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

window.addEventListener("keydown", function(e) {
    var activeSection = getActiveSectionIndex();
    // home, end, lef, right keys:
    if([/*35,36,*/37,39].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    // space, page down, down keys:
    else if([32, 34, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      if (activeSection< document.querySelectorAll('Section').length -1 ){ //  down

        const anim = requestAnimationFrame((timestamp) => {
          const stamp = timestamp || new Date().getTime();
          const duration = 1000;
          const start = stamp;

          const startScrollOffset = previousScrollPosition;
          const scrollEndElemTop = document.querySelectorAll('Section')[activeSection+1].getBoundingClientRect().top;

          scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })

      }
    }
    // page up, up keys:
    else if([ 33, 38].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      if (activeSection> 0 ){ // up 

        const anim = requestAnimationFrame((timestamp) => {
          const stamp = timestamp || new Date().getTime();
          const duration = 1000;
          const start = stamp;

          const startScrollOffset = previousScrollPosition;
          const scrollEndElemTop = document.querySelectorAll('Section')[activeSection-1].getBoundingClientRect().top;

          scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })
      }
    }
}, false);


window.addEventListener('wheel', function(e) {  
    if (!scrolling){
      scrolling=1;
      const delta = Math.sign(e.deltaY);
      var activeSection = getActiveSectionIndex();
      if (delta>0 && activeSection< document.querySelectorAll('Section').length -1 ){ // Wheel down
        // document.querySelector('body').scroll(0,document.querySelectorAll('Section')[activeSection+1].offsetTop);

        const anim = requestAnimationFrame((timestamp) => {
          const stamp = timestamp || new Date().getTime();
          const duration = 1000;
          const start = stamp;

          const startScrollOffset = previousScrollPosition;
          const scrollEndElemTop = document.querySelectorAll('Section')[activeSection+1].getBoundingClientRect().top;

          scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })

      }else if (delta<0 && activeSection >0 ){ // Wheel up
        // document.querySelector('body').scroll(0,document.querySelectorAll('Section')[activeSection-1].offsetTop);

        const anim = requestAnimationFrame((timestamp) => {
          const stamp = timestamp || new Date().getTime();
          const duration = 1000;
          const start = stamp;

          const startScrollOffset = previousScrollPosition;
          const scrollEndElemTop = document.querySelectorAll('Section')[activeSection-1].getBoundingClientRect().top;

          scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })
      }
      scrolling=0;
      // add custom scroll code if you want
    }
    e.preventDefault();
},{ passive: false });