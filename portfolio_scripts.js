// Listen for page scroll
window.onscroll = function() {stickyNavBar()};

// Get Navbar and offset position of it
const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

// Add sticky class when navbar reaches the top of the window
function stickyNavBar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky')
    } else { //remove sticky when scrolled near top
        navbar.classList.remove('sticky');
    }
}