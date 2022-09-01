import cats from "/share/cats.js";

const flex = document.querySelector("section.flex");

// add cat images
cats.forEach(cat => {
    const img = document.createElement("img");
    img.src = cat;

    img.addEventListener('click', (event) => {
        window.open(event.target.src);
    });

    flex.appendChild(img);
});

// add click handler
document.querySelector("span.link").addEventListener("click", () => {
    window.location.replace("/tab/index.html");
});
