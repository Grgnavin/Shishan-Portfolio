// Toggle navigation drawer
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');
const drawerClose = document.getElementById('drawerClose');

hamburger.addEventListener('click', function () {
    navDrawer.classList.toggle('hidden');
});

drawerClose.addEventListener('click', function () {
    navDrawer.classList.add('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


firebase.initializeApp(firebaseConfig);

// Function to save message to Firebase
function saveMessage(data) {
    const contactFormDB = firebase.database().ref("contactForm");
    const newMessageRef = contactFormDB.push();
    newMessageRef.set(data);
}

// Function to display a message at the bottom of the form
function displayMessage(message, duration) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    document.getElementById('contactForm').appendChild(messageElement);

    // Remove the message after the specified duration
    setTimeout(() => {
        messageElement.remove();
    }, duration);
}

// Function to handle form submission
function sendMessage(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Check if any field is empty
    if (!name || !email || !message) {
        return;
    }

    // Save message to Firebase
    saveMessage({ name, email, message });

    // Display success message
    displayMessage('Message Sent Successfully!', 5000);

    // Reset the form
    document.getElementById('contactForm').reset();
}

// Check if the event listener is already attached before adding it
const contactForm = document.getElementById('contactForm');
if (contactForm && !contactForm.hasEventListener) {
    contactForm.hasEventListener = true;
    contactForm.addEventListener('submit', sendMessage);
}

// 
document.addEventListener("DOMContentLoaded", function () {
    var returnToTop = document.getElementById('return-to-top');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            returnToTop.style.display = 'block';
        } else {
            returnToTop.style.display = 'none';
        }
    });

    // Smooth scroll to top
    returnToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// JavaScript to handle navbar visibility based on scroll direction
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scroll down
        document.querySelector("nav").classList.add("hide");
    } else {
        // Scroll up
        document.querySelector("nav").classList.remove("hide");
    }
    lastScrollTop = currentScroll;
});


function closeDrawer() {
    document.getElementById('navDrawer').classList.add('hidden');
}

// JavaScript to update the footer content with the current year
function updateYear() {
        var currentYear = new Date().getFullYear();
        document.getElementById("currentYear").textContent = currentYear;
    }

    // Call the function initially to set the year
    updateYear();

    // Automatically update the year every year
    setInterval(updateYear, 1000 * 60 * 60 * 24);

