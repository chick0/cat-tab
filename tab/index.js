import cats from "/share/cats.js";
import { registerLink } from "../share/link.js";

/**
 * Update random cat image
 */
function updateImage(){
    const src = cats[Math.floor(Math.random() * cats.length)];
    document.querySelector("html").style.backgroundImage = `url(${src})`;
}

updateImage();
registerLink("/list-of-cat-images/index.html");
