/* ==============================
   CONTACT FORM HANDLER
   ============================== */
const form = document.querySelector("#contact form");
const successMessage = document.querySelector("#successMessage");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: new FormData(form)
        });

        const result = await response.json();

        if (result.success) {
            form.reset();
            successMessage.classList.add("show");
            setTimeout(() => successMessage.classList.remove("show"), 3500);
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("Unable to send the message. Please try again.");
        console.error(error);
    }
});

/* ==============================
   NAVBAR SCROLL HIDE/SHOW
   ============================== */
let lastScrollPosition = window.scrollY;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;
    
    if (currentScrollPosition <= 10 || currentScrollPosition < lastScrollPosition) {
        nav.classList.remove("hide");
    } else {
        nav.classList.add("hide");
    }
    
    lastScrollPosition = currentScrollPosition;
});

/* ==============================
   SETTINGS DROPDOWN & NIGHT MODE
   ============================== */
const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.querySelector(".settings-menu");
const themeToggle = document.getElementById("themeToggle");

// Toggle dropdown menu
settingsButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle("show");
});

// Close dropdown on outside click
document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-settings")) {
        settingsMenu.classList.remove("show");
    }
});

// Toggle dark mode
themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Night Mode";
    settingsMenu.classList.remove("show");
});

/* ==============================
   SECTION ANIMATION OBSERVER
   ============================== */
const sections = document.querySelectorAll(
    "#about, #objective, #skills, #personal-skills, table, #project-demonstration, #contact, .links, #certificates"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
    });
}, { threshold: 0.15 });

sections.forEach((section) => observer.observe(section));

/* ==============================
   CERTIFICATE AUTO LOOP & VIEWER
   ============================== */
const certificateTrack = document.querySelector(".certificate-track");

if (certificateTrack) {
    // Clone cards for infinite loop
    const certificates = document.querySelectorAll(".certificate-card");
    certificates.forEach((card) => {
        certificateTrack.appendChild(card.cloneNode(true));
    });

    const certificateModal = document.getElementById("certificateModal");
    const enlargedCertificate = document.getElementById("enlargedCertificate");
    const closeCertificate = document.getElementById("closeCertificate");

    const closeModal = () => certificateModal.classList.remove("show");

    // Event Delegation: Handle clicks on cards or cloned cards
    certificateTrack.addEventListener("click", (e) => {
        const card = e.target.closest(".certificate-card");
        if (!card) return;

        const img = card.querySelector("img");
        if (!img) return;

        enlargedCertificate.src = img.src;
        enlargedCertificate.alt = img.alt;
        certificateModal.classList.add("show");
    });

    // Close interactions
    closeCertificate?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeModal();
    });

    certificateModal?.addEventListener("click", (e) => {
        if (e.target === certificateModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}
