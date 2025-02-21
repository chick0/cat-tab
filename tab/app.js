import { fileListUpdateHandler } from "./api.js"
import { pickCatImage, pickCatFromLocal } from "./utils.js"

/** Image load timeout  */
const LOAD_TIMEOUT = 1000

/** timeout ID */
let timeoutChecker = null

document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector("img")

    image.onerror = () => {
        image.src = pickCatFromLocal()
    }

    image.onload = () => {
        clearTimeout(timeoutChecker)
    }

    const SetRandomCatImage = () => {
        image.src = pickCatImage()
        timeoutChecker = setTimeout(() => image.onerror(), LOAD_TIMEOUT)
    }

    fileListUpdateHandler()
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
