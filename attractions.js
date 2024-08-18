document.addEventListener('DOMContentLoaded', function() {
    const mapImage = document.querySelector('.map img');
    const areas = document.querySelectorAll('map[name="destination-map"] area');

    function updateAreaCoordinates() {
        const naturalWidth = mapImage.naturalWidth;
        const naturalHeight = mapImage.naturalHeight;
        const displayedWidth = mapImage.offsetWidth;
        const displayedHeight = mapImage.offsetHeight;

        const widthRatio = displayedWidth / naturalWidth;
        const heightRatio = displayedHeight / naturalHeight;

        areas.forEach(area => {
            const originalCoords = area.getAttribute('coords').split(',');
            const scaledCoords = originalCoords.map((coord, index) => {
                return index % 2 === 0 ? coord * widthRatio : coord * heightRatio;
            });
            area.setAttribute('coords', scaledCoords.join(','));
        });
    }

    // Update coordinates on load and resize
    updateAreaCoordinates();
    window.addEventListener('resize', updateAreaCoordinates);


    areas.forEach(area => {
        area.addEventListener('click', (event) => {
            event.preventDefault();

            // Reset background color of all sections
            const allSections = document.querySelectorAll('.section1, .section2');
            allSections.forEach(section => {
                section.style.backgroundColor = 'rgba(97, 151, 233, 0.6)'; // Reset to original color
            });

            const targetId = area.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Change background color of the clicked section
            targetElement.style.backgroundColor = 'rgba(200, 198, 245, 0.6)';

            // ... (your existing smooth scrolling code) ...
        });
    });


    // Ensure smooth scrolling to sections
    areas.forEach(area => {
        area.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = area.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').offsetHeight; 
    
     scrollOptions = {
                behavior: 'smooth',
                block: 'start', // Ensure the target is at the top of the viewport
                inline: 'nearest'
            };
    
            // Calculate the offset to account for the header
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
            window.scrollTo({
                top: offsetTop,
                ...scrollOptions
            });
        });
    });
});


const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll',   
 () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';   

    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});