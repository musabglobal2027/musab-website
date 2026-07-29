// ==========================
// Premium Hero Image Slider
// ==========================

(function () {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 5000;

    function goTo(index) {
        slides[current].classList.remove("active");
        dots[current] && dots[current].classList.remove("active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
        dots[current] && dots[current].classList.add("active");
    }

    function next() { goTo(current + 1); }

    function start() {
        stop();
        timer = setInterval(next, INTERVAL);
    }

    function stop() {
        if (timer) clearInterval(timer);
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            goTo(parseInt(dot.dataset.slide, 10));
            start(); // reset timer after manual navigation
        });
    });

    // Pause the slider when the tab isn't visible (saves battery/CPU)
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
    });

    start();
})();

// ==========================
// Mobile Menu
// ==========================

function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
}

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("active");
    });
});

// ==========================
// Dark Mode
// ==========================

function toggleTheme(){

    document.body.classList.toggle("dark");

    const btn = document.getElementById("themeBtn");

    if(document.body.classList.contains("dark")){
        btn.innerHTML = "☀️";
    }else{
        btn.innerHTML = "🌙";
    }

}

// ==========================
// Scroll Animation
// ==========================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    sections.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            section.classList.add("show");
        }

    });

});

// Show first section on page load
window.dispatchEvent(new Event("scroll"));

// ==========================
// Loader (hides fast, doesn't wait on slow resources like the map iframe)
// ==========================

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader && loader.style.display !== "none") {
        loader.style.display = "none";
    }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(hideLoader, 250);
} else {
    document.addEventListener("DOMContentLoaded", () => setTimeout(hideLoader, 250));
}
// Safety net in case something above doesn't fire
window.addEventListener("load", hideLoader);
setTimeout(hideLoader, 2500);

// ==========================
// Back To Top
// ==========================

const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll", function(){

    if(document.documentElement.scrollTop > 300){
        topBtn.classList.add("visible");
    }else{
        topBtn.classList.remove("visible");
    }

});

}
function topFunction(){

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// ==========================
// Scroll Progress Bar
// ==========================

window.addEventListener("scroll", () => {

    let scrollTop = document.documentElement.scrollTop;

    let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    let progress = (scrollTop / scrollHeight) * 100;

   const progressBar = document.getElementById("progressBar");

if(progressBar){
    progressBar.style.width = progress + "%";
}
});

// ===== Gallery Lightbox =====

function openImage(src){
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");

    if(lightbox && img){
        lightbox.style.display = "flex";
        img.src = src;
    }
}

function closeImage(){
    const lightbox = document.getElementById("lightbox");

    if(lightbox){
        lightbox.style.display = "none";
    }
}

// ===== Counter Animation =====

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    const isPercent = counter.parentElement.textContent.includes("%");

    const updateCounter = () => {

        const count = +counter.innerText;
        const increment = Math.ceil(target / 100);

        if (count < target) {

            counter.innerText = count + increment;
            setTimeout(updateCounter, 20);

        } else {

            if (isPercent) {
                counter.innerText = target + "%";
            } else {
                counter.innerText = target + "+";
            }

        }

    };

    updateCounter();

});

// ===== Automatic Copyright Year =====

const year = document.getElementById("year");

if(year){
    year.innerHTML = new Date().getFullYear();
}

// ===== Contact Form EmailJS (lazy-loaded for faster page load) =====

const contactForm = document.getElementById("contact-form");
let emailjsReady = false;
let emailjsLoading = null;

function loadEmailJS() {
    if (emailjsLoading) return emailjsLoading;

    emailjsLoading = new Promise((resolve, reject) => {
        if (window.emailjs) {
            emailjsReady = true;
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        script.onload = () => {
            emailjs.init("1uDRilufiTbiTvJ0l");
            emailjsReady = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });

    return emailjsLoading;
}

if (contactForm) {

    // Start loading EmailJS as soon as the contact section is near the viewport,
    // so it's ready by the time the user finishes typing (no wait on submit).
    if ("IntersectionObserver" in window) {
        const contactObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadEmailJS();
                    contactObserver.disconnect();
                }
            });
        }, { rootMargin: "300px" });
        contactObserver.observe(contactForm);
    }

    // Also start loading the moment the user interacts with the form
    contactForm.addEventListener("focusin", () => loadEmailJS(), { once: true });

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
        }

        loadEmailJS().then(() => {
            return emailjs.sendForm("service_ohsd8mq", "template_jeyc1la", contactForm);
        }).then(function () {

            alert("✅ Message sent successfully!");
            contactForm.reset();

        }).catch(function (error) {

            alert("❌ Failed to send message. Please try WhatsApp or call us instead.");
            console.log(error);

        }).finally(() => {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

    });

}
