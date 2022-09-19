import cats from "/share/cats.js";
import { registerLink } from "../share/link.js";
import * as Keyboard from "./keyboard.js";

/**
 * Update random cat image
 */
export function updateImage(){
    const src = cats[Math.floor(Math.random() * cats.length)];
    document.querySelector("html").style.backgroundImage = `url(${src})`;
}

updateImage();
registerLink();

/**
 * Keyboard Shortcuts event handler
 */
document.addEventListener("keypress", (event) => {
    const key = event.key.toUpperCase();
    const func = Keyboard[key];

    if (func != undefined) {
        func();
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

document.querySelector("span.help-x")
    .addEventListener("click", () => {
        if(confirm("Hide this help box?")) {
            helpBox.hideIt();
        } else {
            alert("Canceled.");
        }
    });

/**
 * Set Keyboard Shortcuts click event handler
 */
document.querySelectorAll(".click.to-keyboard")
    .forEach((element) => {
        element.addEventListener("click", (event) => {
            Keyboard[event.target.dataset.key]();
        });
    });
