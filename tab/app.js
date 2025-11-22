import cats from "./cats.js"
import { FILE_LIST, updateRemoteData } from "./api.js"

/** Image load timeout  */
const LOAD_TIMEOUT = 850

/** timeout ID */
let timeoutChecker = null

function pickCatImage() {
    let fileList = localStorage.getItem(FILE_LIST) ?? []

    if (typeof fileList == "string") {
        fileList = JSON.parse(fileList)
    }

    const array = fileList.concat(cats)

    return array[Math.ceil(Math.random() * array.length) - 1]
}

function pickCatFromLocal() {
    return cats[Math.ceil(Math.random() * cats.length) - 1]
}

document.addEventListener("DOMContentLoaded", async () => {
    const image = document.querySelector("img")

    image.onerror = () => {
        image.src = pickCatFromLocal()
    }

    image.onload = () => {
        clearTimeout(timeoutChecker)
        timeoutChecker = null
    }

    //
    await updateRemoteData()

    //
    image.src = pickCatImage()
    timeoutChecker = setTimeout(() => image.onerror(), LOAD_TIMEOUT)
})
