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

function shareWebsite() {
    const url = window.location.href;
    const text = 'Discover the beauty of Malaysia with our travel guide!';

    if (navigator.share) {
        // Use Web Share API if supported
        navigator.share({
            title: 'Travel Malaysia',
            text: text,
            url: url
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        // Fallback for Facebook
        const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        
        // Fallback for Twitter
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        
        // Fallback for LinkedIn
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
        
        // Calculate the center position
        const width = 600;
        const height = 400;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);

        // Open a window in the center of the screen with all three share options
        const sharePopup = window.open('', 'Share', `width=${width},height=${height},top=${top},left=${left}`);
        sharePopup.document.write(`
            <html>
            <head>
                <title>Share This Website</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    h2 {
                        color: #333;
                        margin-bottom: 20px;
                    }
                    a {
                        display: inline-block;
                        margin: 10px;
                        padding: 10px 15px;
                        font-size: 16px;
                        text-decoration: none;
                        color: white;
                        border-radius: 5px;
                    }
                    .fb-share {
                        background-color: #3b5998;
                    }
                    .twitter-share {
                        background-color: #1da1f2;
                    }
                    .linkedin-share {
                        background-color: #0077b5;
                    }
                    a:hover {
                        opacity: 0.8;
                    }
                </style>
            </head>
            <body>
                <h2>Share This Website</h2>
                <a href="${fbShareUrl}" class="fb-share" target="_blank">Share on Facebook</a><br>
                <a href="${twitterShareUrl}" class="twitter-share" target="_blank">Share on Twitter</a><br>
                <a href="${linkedInShareUrl}" class="linkedin-share" target="_blank">Share on LinkedIn</a>
            </body>
            </html>
        `);
        sharePopup.document.close(); // Ensure the document is fully loaded
    }
}

//Cookie consent
document.addEventListener('DOMContentLoaded', function () {
    const cookieConsentBanner = document.getElementById('cookieConsentBanner');
    const acceptCookiesButton = document.getElementById('acceptCookies');

    console.log(sessionStorage.getItem('cookieConsent')); //null

    // Initialize cookieConsent in sessionStorage if not set
    if (sessionStorage.getItem('cookieConsent') === null) {
        sessionStorage.setItem('cookieConsent', 'false');
    }

    // Check if the user has already consented
    if (sessionStorage.getItem('cookieConsent') == 'false') {
        cookieConsentBanner.style.display = 'block';
    }
    else{
        cookieConsentBanner.style.display = 'none';
    }

    console.log(sessionStorage.getItem('cookieConsent'));

    acceptCookiesButton.addEventListener('click', function () {
        // Change the button's value to 'True'
        this.value = 'True';

        // Store the consent status in sessionStorage
        sessionStorage.setItem('cookieConsent', 'true');

        // Hide the cookie consent banner
        cookieConsentBanner.style.display = 'none';
    });
});