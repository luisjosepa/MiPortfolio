/* ==============================
   MENÚ MÓVIL
============================== */

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


/* ==============================
   ANIMACIÓN ABOUT
============================== */

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


/* ==============================
   FORMULARIO
============================== */

const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.querySelector("#name").value.trim();

    const email =
        document.querySelector("#email").value.trim();

    const message =
        document.querySelector("#message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Por favor, completa todos los campos.";

        return;
    }


    formMessage.textContent =
        "¡Gracias! Tu mensaje está listo para enviarse.";

});


/* ==============================
   INDICADOR DE SCROLL
============================== */

const heroSection = document.querySelector(".hero");
const scrollIndicator =
    document.querySelector(".scroll-indicator");

const heroObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                scrollIndicator.classList.remove("hide");

            } else {

                scrollIndicator.classList.add("hide");

            }

        });

    },
    {
        threshold: 0.7
    }
);

heroObserver.observe(heroSection);


/* ==============================
   PARTÍCULAS DEL HERO
============================== */

const particleContainer =
    document.querySelector(".hero-particles");

if (particleContainer) {

    const isMobile =
        window.innerWidth <= 768;

    const particleCount =
        isMobile ? 34 : 55;


    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "hero-particle"
        );


        /* Posición */

        particle.style.setProperty(
            "--x",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--y",
            `${Math.random() * 100}%`
        );


        /* Tamaño más pequeño */

        const size =
            (Math.random() * 1.4 + 0.7)
            .toFixed(2);

        particle.style.setProperty(
            "--size",
            `${size}px`
        );


        /* Movimiento */

        const moveX =
            ((Math.random() - 0.5) * 60)
            .toFixed(0);

        const moveY =
            ((Math.random() - 0.5) * 60)
            .toFixed(0);

        particle.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        particle.style.setProperty(
            "--move-y",
            `${moveY}px`
        );


        /* Velocidad */

        const duration =
            (Math.random() * 16 + 16)
            .toFixed(1);

        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );


        /* Retraso */

        const delay =
            (Math.random() * -20)
            .toFixed(1);

        particle.style.setProperty(
            "--delay",
            `${delay}s`
        );


        /* Opacidad */

        const opacityMin =
            (Math.random() * 0.16 + 0.08)
            .toFixed(2);

        const opacityMax =
            (Math.random() * 0.28 + 0.18)
            .toFixed(2);

        particle.style.setProperty(
            "--opacity-min",
            opacityMin
        );

        particle.style.setProperty(
            "--opacity-max",
            opacityMax
        );


        /* Desenfoque muy sutil */

        const blur =
            (Math.random() * 0.8)
            .toFixed(1);

        particle.style.setProperty(
            "--blur",
            `${blur}px`
        );


        particleContainer.appendChild(
            particle
        );

    }

}