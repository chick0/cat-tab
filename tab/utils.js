import cats from "./cats.js";

/**
 * Update random cat image
 */
export function updateImage(){
    const src = cats[Math.floor(Math.random() * cats.length)];
    document.querySelector("html").style.backgroundImage = `url(${src})`;
}
