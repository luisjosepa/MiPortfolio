const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});

const aboutSection = document.querySelector(".about");
const aboutImage = document.querySelector(".about-image img");
const aboutContent = document.querySelector(".about-content");

const aboutObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                aboutImage.classList.add("show");
                aboutContent.classList.add("show");

                aboutObserver.unobserve(aboutSection);
            }

        });

    },
    {
        threshold: 0.3
    }
);

aboutObserver.observe(aboutSection);

const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Por favor, completa todos los campos.";
        return;
    }

    formMessage.textContent = "¡Gracias! Tu mensaje está listo para enviarse.";
});