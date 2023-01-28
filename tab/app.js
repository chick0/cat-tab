import { updateImage } from "./utils.js";

// Set image in background
updateImage();

/**
 * Keyboard Shortcuts Help box
 */
const helpBox = document.querySelector("div.help");

function hideBox() {
    helpBox.style.display = "none";
    localStorage.setItem("help", "no");
}

if (localStorage.getItem("help") === "no") {
    hideBox();
} else {
    document.querySelector("span.help-x")
        .addEventListener("click", () => {
            if(confirm("Hide this help box?")) {
                hideBox();
            }
        });
}
