
/* =====================
   DARK MODE + LOCALSTORAGE
===================== */

const darkBtn = document.getElementById("darkModeBtn");

// Charger thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// Toggle dark mode
if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

/* =====================
   NAVBAR SCROLL EFFECT
===================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }
});

/* =====================
   RETOUR EN HAUT
===================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (!topBtn) return;

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================
   COMPTEURS ANIMÉS
========================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const increment = Math.ceil(target / 100);

            const updateCounter = () => {

                current += increment;

                if (current < target) {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }

            };

            updateCounter();
            counterObserver.unobserve(counter);
        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => counterObserver.observe(counter));

/* ==========================
   FADE IN SECTIONS
========================== */

const sections = document.querySelectorAll(".fade-section");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            sectionObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => sectionObserver.observe(section));

/* ===============================
   FILTRE FREELANCES (COMMIT 8)
=============================== */

const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".freelance-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const filter = btn.dataset.filter;

        cards.forEach(card => {

            if (filter === "all") {
                card.style.display = "block";
            } else {
                card.style.display =
                    card.dataset.category === filter ? "block" : "none";
            }

        });

    });
});

/* ===============================
   VALIDATION FORMULAIRE CONTACT
=============================== */

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // champs
        const name = document.getElementById("name");
        const surname = document.getElementById("surname");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        // erreurs
        const nameError = document.getElementById("nameError");
        const surnameError = document.getElementById("surnameError");
        const emailError = document.getElementById("emailError");
        const subjectError = document.getElementById("subjectError");
        const messageError = document.getElementById("messageError");
        const successMsg = document.getElementById("successMsg");

        // reset messages
        nameError.textContent = "";
        surnameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";
        successMsg.textContent = "";

        let valid = true;

        // ======================
        // NOM
        // ======================
        if (name.value.trim() === "") {
            nameError.textContent = "Le nom est obligatoire";
            valid = false;
        }

        // ======================
        // PRENOM
        // ======================
        if (surname.value.trim() === "") {
            surnameError.textContent = "Le prénom est obligatoire";
            valid = false;
        }

        // ======================
        // EMAIL (REGEX)
        // ======================
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {
            emailError.textContent = "L'email est obligatoire";
            valid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = "Format email invalide";
            valid = false;
        }

        // ======================
        // SUJET
        // ======================
        if (subject.value === "") {
            subjectError.textContent = "Veuillez choisir un sujet";
            valid = false;
        }

        // ======================
        // MESSAGE
        // ======================
        if (message.value.trim().length < 20) {
            messageError.textContent = "Le message doit contenir au moins 20 caractères";
            valid = false;
        }

        // ======================
        // SUCCESS
        // ======================
        if (valid) {
            successMsg.textContent = "Message envoyé avec succès ✅";

            form.reset();
        }
    });

}