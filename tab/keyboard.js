import { updateImage } from "./utils.js";

/**
 * Shortcut: Toggle fullscreen mode
 */
function F(){
    if (document.fullscreenElement == null) {
        document.querySelector("html").requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Shortcut: Change random cat image
 */
function R(){
    updateImage();
}

/**
 * Keyboard Shortcuts event handler
 */
document.addEventListener("keypress", (event) => {
    const key = event.key.toUpperCase();

    switch (key) {
        case "F":
            F();
            break;
        case "R":
            R();
            break;

        default:
            break;
    }
});
