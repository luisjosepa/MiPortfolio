/* ==============================
   MENÚ Y NAVBAR
============================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

const header =
    document.querySelector(".header");

const heroSection =
    document.querySelector(".hero");

const NAVBAR_DURATION = 1450;

let navbarTimer = null;
let navbarAnimating = false;


/* ==============================
   LINKS
============================== */

function hideNavbarLinks() {
    navLinks.classList.remove("links-visible");
}

function showNavbarLinks() {
    navLinks.classList.add("links-visible");
}


/* ==============================
   ABRIR DESDE LA CÁPSULA
============================== */

function openCompactNavbar() {

    clearTimeout(navbarTimer);

    navbarAnimating = true;

    header.classList.add("compact");
    header.classList.add("expanded");

    hideNavbarLinks();

    menuToggle.textContent = "←";
}


/* ==============================
   CERRAR DESDE LA CÁPSULA ABIERTA
============================== */

function closeCompactNavbar() {

    clearTimeout(navbarTimer);

    navbarAnimating = true;

    hideNavbarLinks();

    header.classList.remove("expanded");
    header.classList.add("compact");

    menuToggle.textContent = "→";
}


/* ==============================
   TRANSICIÓN DE LA BARRA
============================== */

const navbarElement =
    document.querySelector(".navbar");


navbarElement.addEventListener(
    "transitionend",
    function(event) {

        if (event.propertyName !== "width") {
            return;
        }

        if (!header.classList.contains("compact")) {
            return;
        }

        if (header.classList.contains("expanded")) {

            showNavbarLinks();

            navbarAnimating = false;

            return;
        }

        navbarAnimating = false;

    }
);


/* ==============================
   VOLVER AL INICIO
============================== */

function openNavbarAtHome() {

    clearTimeout(navbarTimer);

    navbarAnimating = true;

    header.classList.add("compact");
    header.classList.add("expanded");

    hideNavbarLinks();

    menuToggle.textContent = "←";

    const finishHome = function(event) {

        if (event.propertyName !== "width") {
            return;
        }

        if (!header.classList.contains("expanded")) {
            return;
        }

        navbarElement.removeEventListener(
            "transitionend",
            finishHome
        );

        showNavbarLinks();

        requestAnimationFrame(function() {

            header.classList.remove("compact");
            header.classList.remove("expanded");

            menuToggle.textContent = "☰";

            navbarAnimating = false;

        });
    };

    navbarElement.addEventListener(
        "transitionend",
        finishHome
    );
}


/* ==============================
   BOTÓN
============================== */

menuToggle.addEventListener(
    "click",
    function() {

        /* Menú móvil */
        if (window.innerWidth <= 768) {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {

                menuToggle.textContent = "✕";

            } else {

                menuToggle.textContent = "☰";

            }

            return;
        }


        /* Desktop */

        if (header.classList.contains("compact")) {

            if (
                header.classList.contains("expanded")
            ) {

                closeCompactNavbar();

            } else {

                openCompactNavbar();

            }

        }

    }
);


/* ==============================
   ANIMACIÓN ABOUT
============================== */

const aboutSection =
    document.querySelector(".about");

const aboutImage =
    document.querySelector(".about-image img");

const aboutContent =
    document.querySelector(".about-content");


const aboutObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    aboutImage.classList.add("show");

                    aboutContent.classList.add("show");

                    aboutObserver.unobserve(
                        aboutSection
                    );

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

const contactForm =
    document.querySelector(".contact-form");

const formMessage =
    document.querySelector(".form-message");


contactForm.addEventListener(
    "submit",
    function(event) {

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

    }
);


/* ==============================
   INDICADOR DE SCROLL
============================== */

const scrollIndicator =
    document.querySelector(".scroll-indicator");


const heroObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    scrollIndicator.classList.remove(
                        "hide"
                    );

                } else {

                    scrollIndicator.classList.add(
                        "hide"
                    );

                }

            });

        },

        {
            threshold: 0.7
        }

    );


heroObserver.observe(heroSection);


/* ==============================
   NAVBAR COMPACTO
============================== */

const navbarObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                /* Móvil */

                if (window.innerWidth <= 768) {

                    header.classList.remove("compact");
                    header.classList.remove("expanded");

                    navLinks.classList.remove(
                        "links-visible"
                    );

                    return;
                }


                /* ==============================
                   VOLVEMOS AL HERO
                ============================== */

                if (entry.isIntersecting) {

                    if (
                        header.classList.contains("compact") &&
                        !header.classList.contains("expanded")
                    ) {

                        openNavbarAtHome();

                    } else if (
                        !header.classList.contains("compact")
                    ) {

                        showNavbarLinks();

                    }

                    return;
                }


                /* ==============================
                   SALIMOS DEL HERO
                ============================== */

                clearTimeout(navbarTimer);

                hideNavbarLinks();

                header.classList.remove("expanded");

                header.classList.add("compact");

                menuToggle.textContent = "→";

            });

        },

        {
            threshold: 0.15
        }

    );


navbarObserver.observe(heroSection);


/* ==============================
   PARTÍCULAS DEL HERO
============================== */

const particleContainer =
    document.querySelector(".hero-particles");


if (particleContainer) {

    const isMobile =
        window.innerWidth <= 768;


    /* ==============================
       CANTIDAD
    ============================== */

    const particleCount =
        isMobile
            ? 120
            : 200;


    const particleData = [];


    /* ==============================
       CREAR PARTÍCULAS
    ============================== */

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.classList.add(
            "hero-particle"
        );


        /* Posición */

        const xPercent =
            Math.random() * 100;

        const yPercent =
            Math.random() * 100;


        particle.style.setProperty(
            "--x",
            `${xPercent}%`
        );

        particle.style.setProperty(
            "--y",
            `${yPercent}%`
        );


        /* Tamaño */

        const size =
            (
                Math.random() * 1.1 + 0.6
            ).toFixed(2);


        particle.style.setProperty(
            "--size",
            `${size}px`
        );


        /* Movimiento */

        const moveX =
            (
                (Math.random() - 0.5) * 140
            ).toFixed(0);

        const moveY =
            (
                (Math.random() - 0.5) * 140
            ).toFixed(0);


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
            (
                Math.random() * 18 + 18
            ).toFixed(1);


        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );


        /* Retraso */

        const delay =
            (
                Math.random() * -20
            ).toFixed(1);


        particle.style.setProperty(
            "--delay",
            `${delay}s`
        );


        /* Opacidad */

        const opacity =
            (
                Math.random() * 0.3 + 0.15
            ).toFixed(2);


        particle.style.setProperty(
            "--opacity",
            opacity
        );


        /* Desenfoque */

        const blur =
            (
                Math.random() * 0.6
            ).toFixed(1);


        particle.style.setProperty(
            "--blur",
            `${blur}px`
        );


        particleContainer.appendChild(
            particle
        );


        /* Datos */

        particleData.push({

            element: particle,

            xPercent: xPercent,

            yPercent: yPercent,

            baseX: 0,

            baseY: 0,

            x: 0,

            y: 0,

            targetX: 0,

            targetY: 0

        });

    }


    /* ==============================
       POSICIONES BASE
    ============================== */

    function updateBasePositions() {

        const width =
            heroSection.clientWidth;

        const height =
            heroSection.clientHeight;


        particleData.forEach(
            function(data) {

                data.baseX =
                    (
                        data.xPercent / 100
                    ) * width;

                data.baseY =
                    (
                        data.yPercent / 100
                    ) * height;

            }
        );

    }


    updateBasePositions();


    window.addEventListener(
        "resize",
        updateBasePositions
    );


    /* ==============================
       CURSOR
    ============================== */

    let mouseX = 0;

    let mouseY = 0;

    let mouseInside = false;

    let animationRunning = false;


    heroSection.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                heroSection.getBoundingClientRect();


            mouseX =
                event.clientX - rect.left;

            mouseY =
                event.clientY - rect.top;


            mouseInside = true;


            startParticleAnimation();

        }
    );


    heroSection.addEventListener(
        "mouseleave",
        function() {

            mouseInside = false;

            startParticleAnimation();

        }
    );


    /* ==============================
       INICIAR ANIMACIÓN
    ============================== */

    function startParticleAnimation() {

        if (animationRunning) {
            return;
        }


        animationRunning = true;


        requestAnimationFrame(
            updateParticleRepulsion
        );

    }


    /* ==============================
       REPULSIÓN
    ============================== */

    function updateParticleRepulsion() {

        let hasMovement = false;


        const radius = 160;

        const strength = 25;


        particleData.forEach(
            function(data) {

                if (mouseInside) {

                    const dx =
                        data.baseX - mouseX;

                    const dy =
                        data.baseY - mouseY;


                    const distanceSquared =
                        dx * dx + dy * dy;


                    if (
                        distanceSquared <
                        radius * radius
                    ) {

                        const distance =
                            Math.sqrt(
                                distanceSquared
                            );


                        if (distance > 0) {

                            const force =
                                1 -
                                distance / radius;


                            const currentStrength =
                                strength * force;


                            data.targetX =
                                (
                                    dx / distance
                                ) *
                                currentStrength;


                            data.targetY =
                                (
                                    dy / distance
                                ) *
                                currentStrength;

                        }

                    } else {

                        data.targetX = 0;

                        data.targetY = 0;

                    }

                } else {

                    data.targetX = 0;

                    data.targetY = 0;

                }


                /* Movimiento suave */

                data.x +=
                    (
                        data.targetX -
                        data.x
                    ) *
                    0.12;


                data.y +=
                    (
                        data.targetY -
                        data.y
                    ) *
                    0.12;


                /* Comprobar movimiento */

                if (
                    Math.abs(data.x) > 0.01 ||
                    Math.abs(data.y) > 0.01 ||
                    Math.abs(data.targetX) > 0.01 ||
                    Math.abs(data.targetY) > 0.01
                ) {

                    hasMovement = true;

                }


                /* Aplicar movimiento */

                if (
                    Math.abs(data.x) > 0.01 ||
                    Math.abs(data.y) > 0.01
                ) {

                    data.element.style.translate =
                        `${data.x}px ${data.y}px`;

                } else {

                    data.element.style.translate =
                        "0 0";

                }

            }
        );


        if (hasMovement) {

            requestAnimationFrame(
                updateParticleRepulsion
            );

        } else {

            animationRunning = false;

        }

    }

}