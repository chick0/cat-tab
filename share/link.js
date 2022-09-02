/**
 * Add 'click' event listener in link text
 * 
 * @param {string} path 
 */
export function registerLink(path){
    document.querySelector("span.link").addEventListener("click", () => {
        window.location.replace(path);
    });
}
