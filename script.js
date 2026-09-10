const form = document.querySelector("#contact form");

form.addEventListener("submit", function() {
    form.reset();
});

window.addEventListener("pageshow", function() {
    form.reset();
});