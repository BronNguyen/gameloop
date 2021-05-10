var element = document.getElementById("myCanvas");
var left = 0;
var rAF_ID;

var rAFCallback = function () {
  element.style.marginLeft = ++left + "px";

  // cancel animation frame after 60px
  if (left == 60) {
    cancelAnimationFrame(rAF_ID);
  } else {
    rAF_ID = requestAnimationFrame(rAFCallback);
  }
};

rAF_ID = requestAnimationFrame(rAFCallback);
