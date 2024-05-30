import { pickCatImageUrl } from "./utils.js"

/**
 * Set random cat image to background
 */
function SetRandomCatImage() {
    const image = document.querySelector("img")
    const url = pickCatImageUrl()

    if (image != null) {
        image.src = url
    }
}

document.addEventListener("DOMContentLoaded", () => {
    SetRandomCatImage()

    document.addEventListener("keypress", (event) => {
        switch (event.key) {
            case "r":
            case "R":
                SetRandomCatImage()
                break
        }
    })
})
