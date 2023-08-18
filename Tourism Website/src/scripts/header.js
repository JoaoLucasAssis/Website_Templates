/*-*-*-*-*-*-*-*-*-* Variables *-*-*-*-*-*-*-*-*-*/
const divHamburger = document.querySelector("div.header__nav--hamburger");
const divHamburgerMenu = document.querySelector("div.header__hamburger-menu");

/*-*-*-*-*-*-*-*-*-* Events *-*-*-*-*-*-*-*-*-*/

// Add or remove the class "active" from hamburger and hamburger-menu
divHamburger.addEventListener("click", () => {
    if (window.innerWidth <= 800) {
        divHamburger.classList.toggle("active");
        divHamburgerMenu.classList.toggle("active");
    }
});