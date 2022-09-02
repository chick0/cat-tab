import cats from "/share/cats.js";
import { registerLink } from "../share/link.js";

const flex = document.querySelector("section.flex");

/**
 * Render 'List of cat images' display
 */
function render() {
    flex.innerHTML = "";
    cats.forEach((path) => {
        const img = document.createElement("img");
        img.src = path;

        img.addEventListener('click', (event) => {
            window.open(event.target.src);
        });

        flex.appendChild(img);
    });
}

render();
registerLink("/tab/index.html");
