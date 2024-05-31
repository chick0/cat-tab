import cats from "./cats.js"

/**
 * @returns {string} Cat image url
 */
export function pickCatImageUrl() {
    let fileList = localStorage.getItem("fileList") ?? []

    if (fileList.length != 0) {
        fileList = JSON.parse(fileList)
    }

    const array = fileList.concat(cats)

    const url = array[Math.floor(Math.random() * array.length)]

    if (url.startsWith("/")) {
        return url
    }

    const imageFromCache = localStorage.getItem(url)

    if (imageFromCache != null) {
        return imageFromCache
    } else {
        fetch(url)
            .then((resp) => resp.blob())
            .then((blob) => {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.result.startsWith("data:image/webp")) {
                        localStorage.setItem(url, reader.result)
                    }
                }

                reader.readAsDataURL(blob)
            })
    }

    return url
}

/**
 * @returns {string} Cat image url
 */
export function pickCatImageFromCache() {
    return cats[Math.floor(Math.random() * cats.length)]
}
