document.addEventListener("DOMContentLoaded", function() {

    var imgElement = document.querySelector('.img img');
    

    imgElement.style.opacity = '0';
    imgElement.style.transform = 'scale(0.8)';
    imgElement.style.transition = 'opacity 2s ease-in-out, transform 2s ease-in-out';


    setTimeout(function() {
        imgElement.style.opacity = '1';
        imgElement.style.transform = 'scale(0.9)';
    }, 100); 

    setInterval(function() {
        imgElement.style.transform = 'scale(1)'; // Enlarge more
        setTimeout(function() {
            imgElement.style.transform = 'scale(0.9)'; // Shrink slightly
        }, 1000); // Wait 1 second before shrinking
    }, 2000); // Repeat every 2 seconds

});