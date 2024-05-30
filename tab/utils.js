import cats from "./cats.js"

export function pickCatImageUrl() {
    const src = cats[Math.floor(Math.random() * cats.length)]

    return src
}
