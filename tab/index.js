import cats from "/share/cats.js";

// choice random cat image
const src = cats[Math.floor(Math.random() * cats.length)];
document.querySelector("html").style.backgroundImage = `url(${src})`;

// add click handler
document.querySelector("span.link").addEventListener("click", () => {
    window.location.replace("/list-of-cat-images/index.html");
});
