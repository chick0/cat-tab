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
registerLink("/cats/index.html");

/**
 * Keyboard Shortcuts
 * 
 * f: Fullscreen
 * r: Change random cat image
 */
document.addEventListener("keypress", (event) => {
    const key = event.key.toLowerCase();

    if (key == "f") {
        if (document.fullscreenElement == null) {
            document.querySelector("html").requestFullscreen();
        } else {
            document.exitFullscreen();
        }    
    } else if (key == "r") {
        updateImage();
    }
});

/**
 * Hide 'List of cats' button in fullscreen mode
 */
document.addEventListener("fullscreenchange", () => {
    const link = document.querySelector("span.link");

    if (document.fullscreenElement == null) {
        link.style.display = "block";
    } else {
        link.style.display = "none";
    }
});
