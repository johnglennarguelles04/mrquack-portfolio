const form = document.querySelector("#contact form");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page redirect

    const formData = new FormData(form);
    
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        alert("Message sent successfully!");
        form.reset(); // Safe to clear now that data was sent
    } else {
        alert("Something went wrong. Please try again.");
    }
});
