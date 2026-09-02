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


/* ==============================
   CONFIGURACIÓN NAVBAR
============================== */

const NAVBAR_DURATION = 1400;
const LINKS_DURATION = 450;

let navbarTimer = null;
let linksTimer = null;


/* ==============================
   ABRIR NAVBAR
============================== */

function openNavbar(fromHome = false) {

    clearTimeout(navbarTimer);
    clearTimeout(linksTimer);


    /*
     * Mientras la barra crece,
     * los links permanecen ocultos.
     */

    header.classList.remove(
        "links-visible"
    );

    header.classList.add(
        "expanded"
    );


    menuToggle.textContent = "←";


    /*
     * Esperamos exactamente el tiempo
     * que tarda la barra en expandirse.
     */

    navbarTimer =
        setTimeout(function() {

            header.classList.add(
                "links-visible"
            );


            /*
             * Si volvimos al inicio,
             * quitamos los estados temporales
             * después de que aparecen los links.
             */

            if (fromHome) {

                linksTimer =
                    setTimeout(function() {

                        header.classList.remove(
                            "compact"
                        );

                        header.classList.remove(
                            "expanded"
                        );

                        header.classList.remove(
                            "links-visible"
                        );

                        menuToggle.textContent =
                            "☰";

                    }, LINKS_DURATION);

            }

        }, NAVBAR_DURATION);

}


/* ==============================
   CERRAR NAVBAR
============================== */

function closeNavbar() {

    clearTimeout(navbarTimer);
    clearTimeout(linksTimer);


    /*
     * Los links desaparecen primero.
     */

    header.classList.remove(
        "links-visible"
    );


    /*
     * En el siguiente frame comienza
     * la contracción real.
     */

    requestAnimationFrame(function() {

        header.classList.add(
            "compact"
        );

        header.classList.remove(
            "expanded"
        );

    });


    menuToggle.textContent = "→";

}


/* ==============================
   CLICK DEL BOTÓN
============================== */

menuToggle.addEventListener(
    "click",
    function() {

        /*
         * En móvil conservamos
         * el menú hamburguesa.
         */

        if (
            window.innerWidth <= 768
        ) {

            navLinks.classList.toggle(
                "active"
            );


            if (
                navLinks.classList.contains(
                    "active"
                )
            ) {

                menuToggle.textContent =
                    "✕";

            } else {

                menuToggle.textContent =
                    "☰";

            }

            return;
        }


        /*
         * En desktop el botón solo funciona
         * cuando la navbar está compacta.
         */

        if (
            header.classList.contains(
                "compact"
            )
        ) {

            /*
             * Si está abierta,
             * la volvemos a cerrar.
             */

            if (
                header.classList.contains(
                    "expanded"
                )
            ) {

                closeNavbar();

            } else {

                /*
                 * Si está cerrada,
                 * la abrimos.
                 */

                openNavbar(false);

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
    document.querySelector(
        ".about-image img"
    );

const aboutContent =
    document.querySelector(
        ".about-content"
    );


const aboutObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (
                    entry.isIntersecting
                ) {

                    aboutImage.classList.add(
                        "show"
                    );

                    aboutContent.classList.add(
                        "show"
                    );

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


aboutObserver.observe(
    aboutSection
);


/* ==============================
   NAVEGADOR INTERNO: SOBRE MÍ / RESUME
============================== */

const aboutSwitches = document.querySelectorAll(".about-switch");
const aboutViews = document.querySelectorAll(".about-view");

function switchAboutView(viewName) {

    aboutSwitches.forEach(function (button) {

        const isActive =
            button.dataset.aboutView === viewName;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-selected",
            String(isActive)
        );

    });

    aboutViews.forEach(function (view) {

        const isActive =
            view.id === `${viewName}-view`;

        view.classList.toggle(
            "active",
            isActive
        );

        view.setAttribute(
            "aria-hidden",
            String(!isActive)
        );

    });

}

aboutSwitches.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            switchAboutView(
                button.dataset.aboutView
            );

        }
    );

});


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "ArrowLeft" &&
            event.key !== "ArrowRight"
        ) {
            return;
        }

        const focusedButton =
            document.activeElement;

        if (
            !focusedButton ||
            !focusedButton.classList.contains(
                "about-switch"
            )
        ) {
            return;
        }

        event.preventDefault();

        switchAboutView(
            event.key === "ArrowLeft"
                ? "about"
                : "resume"
        );

    }
);


/* ==============================
   FORMULARIO
============================== */

const contactForm =
    document.querySelector(
        ".contact-form"
    );

const formMessage =
    document.querySelector(
        ".form-message"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .querySelector("#name")
                .value
                .trim();


        const email =
            document
                .querySelector("#email")
                .value
                .trim();


        const message =
            document
                .querySelector("#message")
                .value
                .trim();


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
    document.querySelector(
        ".scroll-indicator"
    );


const heroObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (
                    entry.isIntersecting
                ) {

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


heroObserver.observe(
    heroSection
);


/* ==============================
   NAVBAR COMPACTO
============================== */

const navbarObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                clearTimeout(navbarTimer);
                clearTimeout(linksTimer);


                /*
                 * En móvil dejamos la navbar
                 * completamente normal.
                 */

                if (
                    window.innerWidth <= 768
                ) {

                    header.classList.remove(
                        "compact"
                    );

                    header.classList.remove(
                        "expanded"
                    );

                    header.classList.remove(
                        "links-visible"
                    );

                    return;
                }


                /* ==============================
                   VOLVEMOS AL HERO
                ============================== */

                if (
                    entry.isIntersecting
                ) {

                    /*
                     * Si estaba compacta,
                     * usamos EXACTAMENTE la misma
                     * función que usa la flecha.
                     */

                    if (
                        header.classList.contains(
                            "compact"
                        )
                    ) {

                        openNavbar(true);

                    }

                    return;
                }


                /* ==============================
                   SALIMOS DEL HERO
                ============================== */

                closeNavbar();

            });

        },

        {
            threshold: 0.15
        }

    );


navbarObserver.observe(
    heroSection
);


/* ==============================
   PARTÍCULAS DEL HERO
============================== */

const particleContainer =
    document.querySelector(
        ".hero-particles"
    );


if (particleContainer) {

    const isMobile =
        window.innerWidth <= 768;


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
            document.createElement(
                "span"
            );


        particle.classList.add(
            "hero-particle"
        );


        /* ==============================
           POSICIÓN
        ============================== */

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


        /* ==============================
           TAMAÑO
        ============================== */

        const size =
            (
                Math.random() * 1.1 +
                0.6
            ).toFixed(2);


        particle.style.setProperty(
            "--size",
            `${size}px`
        );


        /* ==============================
           MOVIMIENTO
        ============================== */

        const moveX =
            (
                (Math.random() - 0.5) *
                140
            ).toFixed(0);


        const moveY =
            (
                (Math.random() - 0.5) *
                140
            ).toFixed(0);


        particle.style.setProperty(
            "--move-x",
            `${moveX}px`
        );


        particle.style.setProperty(
            "--move-y",
            `${moveY}px`
        );


        /* ==============================
           VELOCIDAD
        ============================== */

        const duration =
            (
                Math.random() * 18 +
                18
            ).toFixed(1);


        particle.style.setProperty(
            "--duration",
            `${duration}s`
        );


        /* ==============================
           RETRASO
        ============================== */

        const delay =
            (
                Math.random() * -20
            ).toFixed(1);


        particle.style.setProperty(
            "--delay",
            `${delay}s`
        );


        /* ==============================
           OPACIDAD
        ============================== */

        const opacity =
            (
                Math.random() * 0.3 +
                0.15
            ).toFixed(2);


        particle.style.setProperty(
            "--opacity",
            opacity
        );


        /* ==============================
           DESENFOQUE
        ============================== */

        const blur =
            (
                Math.random() * 0.6
            ).toFixed(1);


        particle.style.setProperty(
            "--blur",
            `${blur}px`
        );


        /* ==============================
           AGREGAR PARTÍCULA
        ============================== */

        particleContainer.appendChild(
            particle
        );


        /* ==============================
           DATOS
        ============================== */

        particleData.push({

            element:
                particle,

            xPercent:
                xPercent,

            yPercent:
                yPercent,

            baseX:
                0,

            baseY:
                0,

            x:
                0,

            y:
                0,

            targetX:
                0,

            targetY:
                0

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
                        data.xPercent /
                        100
                    ) * width;


                data.baseY =
                    (
                        data.yPercent /
                        100
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

    let mouseInside =
        false;

    let animationRunning =
        false;


    heroSection.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                heroSection.getBoundingClientRect();


            mouseX =
                event.clientX -
                rect.left;


            mouseY =
                event.clientY -
                rect.top;


            mouseInside =
                true;


            startParticleAnimation();

        }
    );


    heroSection.addEventListener(
        "mouseleave",
        function() {

            mouseInside =
                false;


            startParticleAnimation();

        }
    );


    /* ==============================
       INICIAR ANIMACIÓN
    ============================== */

    function startParticleAnimation() {

        if (
            animationRunning
        ) {
            return;
        }


        animationRunning =
            true;


        requestAnimationFrame(
            updateParticleRepulsion
        );

    }


    /* ==============================
       REPULSIÓN
    ============================== */

    function updateParticleRepulsion() {

        let hasMovement =
            false;


        const radius =
            160;


        const strength =
            25;


        particleData.forEach(
            function(data) {

                if (
                    mouseInside
                ) {

                    const dx =
                        data.baseX -
                        mouseX;


                    const dy =
                        data.baseY -
                        mouseY;


                    const distanceSquared =
                        dx * dx +
                        dy * dy;


                    if (
                        distanceSquared <
                        radius * radius
                    ) {

                        const distance =
                            Math.sqrt(
                                distanceSquared
                            );


                        if (
                            distance > 0
                        ) {

                            const force =
                                1 -
                                distance /
                                radius;


                            const currentStrength =
                                strength *
                                force;


                            data.targetX =
                                (
                                    dx /
                                    distance
                                ) *
                                currentStrength;


                            data.targetY =
                                (
                                    dy /
                                    distance
                                ) *
                                currentStrength;

                        }

                    } else {

                        data.targetX =
                            0;


                        data.targetY =
                            0;

                    }

                } else {

                    data.targetX =
                        0;


                    data.targetY =
                        0;

                }


                /* ==============================
                   MOVIMIENTO SUAVE
                ============================== */

                data.x +=
                    (
                        data.targetX -
                        data.x
                    ) * 0.12;


                data.y +=
                    (
                        data.targetY -
                        data.y
                    ) * 0.12;


                /* ==============================
                   COMPROBAR MOVIMIENTO
                ============================== */

                if (
                    Math.abs(
                        data.x
                    ) > 0.01 ||

                    Math.abs(
                        data.y
                    ) > 0.01 ||

                    Math.abs(
                        data.targetX
                    ) > 0.01 ||

                    Math.abs(
                        data.targetY
                    ) > 0.01
                ) {

                    hasMovement =
                        true;

                }


                /* ==============================
                   APLICAR MOVIMIENTO
                ============================== */

                if (
                    Math.abs(
                        data.x
                    ) > 0.01 ||

                    Math.abs(
                        data.y
                    ) > 0.01
                ) {

                    data.element.style.translate =
                        `${data.x}px ${data.y}px`;

                } else {

                    data.element.style.translate =
                        "0 0";

                }

            }
        );


        /* ==============================
           CONTINUAR O DETENER
        ============================== */

        if (
            hasMovement
        ) {

            requestAnimationFrame(
                updateParticleRepulsion
            );

        } else {

            animationRunning =
                false;

        }

    }

}

/* ==============================
   HERO CAROUSEL
============================== */

(function () {

    const carousel = document.querySelector(".hero-carousel");
    const slides = document.querySelectorAll(".hero-slide");
    const controls = document.querySelectorAll(".hero-slide-control");

    const previousButton =
        document.querySelector(".hero-slider-arrow-prev");

    const nextButton =
        document.querySelector(".hero-slider-arrow-next");

    const hero = document.querySelector(".hero");
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (!carousel || !slides.length || !controls.length) {
        return;
    }

    let currentSlide = 0;
    let autoplayTimer = null;

    let isDragging = false;
    let pointerStartX = 0;
    let pointerCurrentX = 0;
    let dragOffset = 0;
    let activePointerId = null;

    const AUTOPLAY_DELAY = 7000;
    const SWIPE_THRESHOLD = 60;
    const DRAG_START_THRESHOLD = 8;

    function updateScrollIndicator(index) {

        if (!scrollIndicator) {
            return;
        }

        if (index === 0) {
            scrollIndicator.classList.remove("hide");
        } else {
            scrollIndicator.classList.add("hide");
        }

    }

    function showSlide(nextSlide, direction = 1) {

        const normalizedSlide =
            (nextSlide + slides.length) % slides.length;

        if (normalizedSlide === currentSlide) {
            return;
        }

        const oldSlide = slides[currentSlide];
        const newSlide = slides[normalizedSlide];

        oldSlide.style.transition = "";
        oldSlide.style.transform = "";
        newSlide.style.transition = "";
        newSlide.style.transform = "";

        oldSlide.classList.remove(
            "is-active",
            "is-leaving-left",
            "is-leaving-right"
        );

        newSlide.classList.remove(
            "is-active",
            "is-leaving-left",
            "is-leaving-right"
        );

        oldSlide.classList.add(
            direction > 0
                ? "is-leaving-left"
                : "is-leaving-right"
        );

        newSlide.classList.add("is-active");

        controls.forEach(function (control, index) {

            const isActive =
                index === normalizedSlide;

            control.classList.toggle(
                "is-active",
                isActive
            );

            control.setAttribute(
                "aria-selected",
                isActive
                    ? "true"
                    : "false"
            );

        });

        currentSlide = normalizedSlide;

        updateScrollIndicator(
            currentSlide
        );

        window.setTimeout(function () {

            oldSlide.classList.remove(
                "is-leaving-left",
                "is-leaving-right"
            );

        }, 800);

        restartAutoplay();

    }

    function nextSlide() {
        showSlide(
            currentSlide + 1,
            1
        );
    }

    function previousSlide() {
        showSlide(
            currentSlide - 1,
            -1
        );
    }

    function restartAutoplay() {

        window.clearInterval(
            autoplayTimer
        );

        if (isDragging) {
            return;
        }

        autoplayTimer =
            window.setInterval(
                nextSlide,
                AUTOPLAY_DELAY
            );

    }

    controls.forEach(function (control, index) {

        control.addEventListener(
            "click",
            function () {

                showSlide(
                    index,
                    index > currentSlide
                        ? 1
                        : -1
                );

            }
        );

    });


    /* ==============================
       FLECHAS DEL CAROUSEL
    ============================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                previousSlide();

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                nextSlide();

            }
        );

    }

    if (hero) {

        hero.addEventListener(
            "mouseenter",
            function () {

                window.clearInterval(
                    autoplayTimer
                );

            }
        );

        hero.addEventListener(
            "mouseleave",
            function () {

                restartAutoplay();

            }
        );

        /*
         * ARRASRE CON MOUSE / TOUCH
         *
         * El mismo sistema sirve para desktop y móvil.
         * En móvil, touch-action: pan-y permite seguir haciendo
         * scroll vertical mientras el gesto horizontal controla
         * el carousel.
         */

        hero.addEventListener(
            "pointerdown",
            function (event) {

                /* No iniciar drag al pulsar botones o enlaces. */
                if (
                    event.target.closest &&
                    event.target.closest("a, button, input, textarea, select")
                ) {
                    return;
                }

                if (event.pointerType === "mouse" && event.button !== 0) {
                    return;
                }

                isDragging = true;
                activePointerId = event.pointerId;
                pointerStartX = event.clientX;
                pointerCurrentX = event.clientX;
                dragOffset = 0;

                window.clearInterval(autoplayTimer);

                hero.classList.add("is-dragging");

                carousel.setPointerCapture(event.pointerId);

            }
        );

        hero.addEventListener(
            "pointermove",
            function (event) {

                if (
                    !isDragging ||
                    event.pointerId !== activePointerId
                ) {
                    return;
                }

                pointerCurrentX = event.clientX;
                dragOffset =
                    pointerCurrentX -
                    pointerStartX;

                if (
                    Math.abs(dragOffset) >
                    DRAG_START_THRESHOLD
                ) {
                    event.preventDefault();
                }

                const activeSlide =
                    slides[currentSlide];

                if (!activeSlide) {
                    return;
                }

                const resistance =
                    Math.min(1, Math.abs(dragOffset) / 260);

                const softenedOffset =
                    dragOffset * (1 - resistance * 0.18);

                activeSlide.style.transform =
                    `translate3d(${softenedOffset}px, 0, 0) scale(${1 - resistance * 0.012})`;

            }
        );

        function finishDrag() {

            if (!isDragging) {
                return;
            }

            const distance =
                pointerCurrentX -
                pointerStartX;

            const activeSlide =
                slides[currentSlide];

            isDragging = false;
            activePointerId = null;

            hero.classList.remove("is-dragging");

            if (activeSlide) {
                activeSlide.style.transition =
                    "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
                activeSlide.style.transform =
                    "translate3d(0, 0, 0) scale(1)";
            }

            if (
                Math.abs(distance) >=
                SWIPE_THRESHOLD
            ) {

                window.setTimeout(function () {

                    if (activeSlide) {
                        activeSlide.style.transition = "";
                        activeSlide.style.transform = "";
                    }

                    if (distance < 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }

                }, 20);

                return;
            }

            window.setTimeout(function () {

                if (activeSlide) {
                    activeSlide.style.transition = "";
                    activeSlide.style.transform = "";
                }

            }, 360);

            restartAutoplay();

        }

        hero.addEventListener(
            "pointerup",
            function (event) {

                if (event.pointerId === activePointerId) {
                    finishDrag();
                }

            }
        );

        hero.addEventListener(
            "pointercancel",
            finishDrag
        );

        hero.addEventListener(
            "lostpointercapture",
            function () {

                if (isDragging) {
                    finishDrag();
                }

            }
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {
                nextSlide();
            }

            if (event.key === "ArrowLeft") {
                previousSlide();
            }

        }
    );

    updateScrollIndicator(
        currentSlide
    );

    restartAutoplay();

})();

