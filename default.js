document.addEventListener('DOMContentLoaded',function(){
    const video = document.getElementById('bgv')
    video.playbackRate = 0.3; //slow down the video half speed
})


var header = document.getElementById("navigation");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

const navItems = document.querySelectorAll('#navigation li a');
const tooltip = document.getElementById('tooltip');
const tooltipIcon = document.getElementById('tooltip-icon');

navItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
    });

    item.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});

tooltipIcon.addEventListener('mouseover', () => {
    tooltip.style.display = 'block';
});

tooltipIcon.addEventListener('mouseout', () => {
    tooltip.style.display   
 = 'none';
});