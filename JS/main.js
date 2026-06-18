/* =====================
   DARK MODE
===================== */

const darkBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

if(darkBtn){

    darkBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }

    });

}

/* =====================
   NAVBAR
===================== */

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){
        navbar.classList.add("navbar-scroll");
    }else{
        navbar.classList.remove("navbar-scroll");
    }

});

/* =====================
   RETOUR EN HAUT
===================== */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }

});

if(topBtn){

    topBtn.addEventListener("click",()=>{

        window.scrollTo({
            top:0,
            behavior:"smooth"
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

counters.forEach(counter => {
    counterObserver.observe(counter);
});
/* ==========================
   ANIMATION FADE-IN
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

sections.forEach(section => {
    sectionObserver.observe(section);
});