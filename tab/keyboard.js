import { updateImage } from "./index.js";

/**
 * Shortcut: Toggle fullscreen mode
 */
export function F(){
    if (document.fullscreenElement == null) {
        document.querySelector("html").requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Shortcut: Change random cat image
 */
export function R(){
    updateImage();
}
