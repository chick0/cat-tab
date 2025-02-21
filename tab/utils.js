import cats from "./cats.js"

/**
 * @returns {string} Image url (Local & from API)
 */
export function pickCatImage() {
    let fileList = localStorage.getItem("fileList") ?? []

    if (typeof fileList == "string") {
        fileList = JSON.parse(fileList)
    }

    const array = fileList.concat(cats)

    return array[Math.ceil(Math.random() * array.length) - 1]
}

/**
 * @returns {string} Local image url
 */
export function pickCatFromLocal() {
    return cats[Math.ceil(Math.random() * cats.length) - 1]
}

/**
 * @param {string} path
 * @returns {string}
 */
export function getFileName(path) {
    return path.replace(/^.*[\\\/]/, "").replace(/(\.[A-z]*)/, "")
}

/**
 * @returns {string[]}
 */
export function getLocalHashList() {
    let result = []

    cats.forEach((cat) => {
        result.push(getFileName(cat))
    })

    return result
}
