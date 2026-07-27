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
// Loader
// ==========================

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

// ==========================
// Back To Top
// ==========================

const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll", function(){

    if(document.documentElement.scrollTop > 300){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
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
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
}

function closeImage(){
    document.getElementById("lightbox").style.display = "none";
}

// ===== Counter Animation =====

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = +counter.getAttribute("data-target");
    const isPercent = counter.parentElement.innerText.includes("%");

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

// ===== Contact Form EmailJS =====

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_ohsd8mq",
        "template_jeyc1la",
        this
    ).then(function() {
        alert("✅ Message sent successfully!");
        contactForm.reset();
    }, function(error) {
        alert("❌ Failed to send message.");
        console.log(error);
    });
});