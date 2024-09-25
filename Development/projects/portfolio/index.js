document.addEventListener('DOMContentLoaded', function() {
    showSection('home'); // Ensure the home section is visible initially
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('section'); // Select all sections
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block'; // Show the selected section
            section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
        } else {
            section.style.display = 'none'; // Hide all other sections
        }
    });
}

// Add event listeners to each navigation link for mouseover
document.getElementById("service-link").addEventListener("mouseover", function(event) {
    event.preventDefault();
    showSection("services-section"); // Show Services section
});

document.getElementById("education-link").addEventListener("mouseover", function(event) {
    event.preventDefault();
    showSection("education-section"); // Show Education section
});

document.getElementById("skill-link").addEventListener("mouseover", function(event) {
    event.preventDefault();
    showSection("skills-section"); // Show Skills section
});

document.getElementById("contact-link").addEventListener("mouseover", function(event) {
    event.preventDefault();
    showSection("contact-section"); // Show Contact section
});

// Optional: Hide sections when mouse leaves the navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener("mouseleave", function(event) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
    });
});