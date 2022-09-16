import cats from "/share/cats.js";
import { registerLink } from "../share/link.js";

const flex = document.querySelector("section.flex");

/**
 * Render 'List of cat images' page
 */
function render() {
    cats.forEach((path) => {
        const img = document.createElement("img");
        img.src = path;

        img.addEventListener('click', (event) => {
            /**
             * Scroll to clicked image
             */
            function scroll() {
                event.target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }

            if(document.querySelectorAll("img.clicked").length == 0) {
                event.target.classList.add("clicked");
                scroll();
            } else {
                let flag_add_clicked = true;

                document.querySelectorAll("img.clicked").forEach((element) => {
                    if(element === event.target) {
                        flag_add_clicked = false;
                    }

                    element.classList.remove("clicked");
                });

                if(flag_add_clicked === true) {
                    event.target.classList.add("clicked");
                    scroll();
                } else {
                    scroll();
                }
            }
        });

        flex.appendChild(img);
    });
}

render();
registerLink();
