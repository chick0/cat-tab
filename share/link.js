/**
 * Add 'click' event listener in link text 
 */
export function registerLink(){
    document.querySelector("span.link").addEventListener("click", (event) => {
        const href = event.target.dataset.href;
        window.location.replace(href);
    });
}
