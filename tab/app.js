import { pickCatImageUrl, pickCatImageFromCache } from "./utils.js"

document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector("img")

    image.onerror = () => {
        image.src = pickCatImageFromCache()
    }

    const SetRandomCatImage = () => {
        image.src = pickCatImageUrl()
    }

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
