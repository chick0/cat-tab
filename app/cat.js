import cats from "/app/cats.js";

// set image
const src = cats[Math.floor(Math.random() * cats.length)];
document.querySelector("html").style.backgroundImage = `url(${src})`;
