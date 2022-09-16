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
registerLink();

/**
 * Keyboard Shortcuts
 * 
 * F: Toggle fullscreen mode
 * R: Change random cat image
 */
document.addEventListener("keypress", (event) => {
    const key = event.key.toUpperCase();

    if (key == "F") {
        if (document.fullscreenElement == null) {
            document.querySelector("html").requestFullscreen();
        } else {
            document.exitFullscreen();
        }    
    } else if (key == "R") {
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

/**
 * Keyboard Shortcuts Help box
 */
const helpBox = document.querySelector("div.help");

helpBox.hideIt = () => {
    helpBox.style.display = "none";
    localStorage.setItem("help", "no");
}

if(localStorage.getItem("help") === "no") {
    helpBox.hideIt();
}

helpBox.addEventListener("click", () => {
    if(confirm("Hide this help box?")) {
        helpBox.hideIt();
    } else {
        alert("Canceled.");
    }
});
