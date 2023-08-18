/*-*-*-*-*-*-*-*-*-* Variables *-*-*-*-*-*-*-*-*-*/
const carousel = document.querySelector("ul.carousel-container__carousel");
const pages = Array.from(carousel.children);
const pageWidth = pages[0].getBoundingClientRect().width;

const carouselTitle = document.querySelector("div.carousel-container__content>h1");
const carouselButton = document.querySelector("div.carousel-container__content>button");

const carouselNav = document.querySelector(".carousel-container__nav");
const buttons = Array.from(carouselNav.children);


const heroImgContainer = document.querySelector("div.hero__img-container");

const leftArrow = document.querySelector("div.carousel-container__arrow-container.arrow-left");
const rightArrow = document.querySelector("div.carousel-container__arrow-container.arrow-right");

/*-*-*-*-*-*-*-*-*-* Functions *-*-*-*-*-*-*-*-*-*/

// Set the initial position of each page
const setPagePosition = (page, index) => {

    page.style.left = pageWidth * index + "px";
};
pages.forEach(setPagePosition);

// Move to the next or previous page
const moveToPage = (currentPage, targetPage) => {

    if (targetPage !== null) {
        carousel.style.transform = `translateX(-${targetPage.style.left})`;

        currentPage.classList.remove("current-page");
        targetPage.classList.add("current-page");
    }
};

//updating the color of the Buttons on click
const updateButtons = (currentButton, targetButton) => {
    currentButton.classList.remove("current-page");
    targetButton.classList.add("current-page");
};

// Hide/Show arrows based on index
const hideShowArrows = (targetIndex) => {

    if (pageWidth > 950) {
        if (targetIndex === -1) {
            leftArrow.style.visibility = "hidden";
            leftArrow.style.opacity = 0;
            rightArrow.style.visibility = "hidden";
            rightArrow.style.opacity = 0;
        } else {
            leftArrow.style.visibility = targetIndex === 0 ? "hidden" : "visible";
            leftArrow.style.opacity = targetIndex === 0 ? 0 : 1;

            rightArrow.style.visibility = targetIndex === pages.length - 1 ? "hidden" : "visible";
            rightArrow.style.opacity = targetIndex === pages.length - 1 ? 0 : 1;
        }
    }

};

// Change the title of the carousel
const setCarouselTitle = (pageIndex) => {

    carouselTitle.style.animation = "none";

    setTimeout(() => {

        carouselTitle.style.animation = "carousel-container__content--h1 2s";

        pageIndex === 0 ? carouselTitle.innerText = "Revelations" : carouselTitle.innerText = "Explorations";
    }, 1);
};

// Hide/Show first and last children of image-container
const hideShowHeroImages = () => {
    if (pageWidth > 950) {
        heroImgContainer.firstElementChild.style.transform = "translate(-25rem, 3rem) rotate(-10deg)";
        heroImgContainer.lastElementChild.style.transform = "translate(25rem, 3rem) rotate(10deg)";
    } else {
        heroImgContainer.firstElementChild.style.display = "none";
        heroImgContainer.lastElementChild.style.display = "none";
    }
};

/*-*-*-*-*-*-*-*-*-* Events *-*-*-*-*-*-*-*-*-*/

// Starts the carousel
carouselButton.addEventListener("click", () => {

    // Remove the carousel-button
    carouselButton.style.visibility = "hidden";
    carouselButton.style.opacity = 0;

    // Add the carousel-nav
    carouselNav.style.visibility = "visible";
    carouselNav.style.opacity = 1;

    // Set the dimensions of the image-container
    heroImgContainer.style.width = "calc(25rem + 10vw)";
    heroImgContainer.style.height = "calc(35rem + 10vw)";

    hideShowHeroImages();
    hideShowArrows(0);
    setCarouselTitle(0);
});

// Move the carousel to the previous page
leftArrow.addEventListener("click", () => {
    const currentPage = carousel.querySelector(".current-page");
    const previousPage = currentPage.previousElementSibling;

    const currentButton = carouselNav.querySelector(".current-page");
    const previousButton = currentButton.previousElementSibling;

    const previousIndex = pages.findIndex((page) => page === previousPage);

    moveToPage(currentPage, previousPage);
    updateButtons(currentButton, previousButton);
    setCarouselTitle(previousIndex);
    hideShowArrows(previousIndex);
    console.log(previousIndex)
});

// Move the carousel to the next page
rightArrow.addEventListener("click", () => {
    const currentPage = carousel.querySelector(".current-page");
    const nextPage = currentPage.nextElementSibling;

    const currentButton = carouselNav.querySelector(".current-page");
    const nextButton = currentButton.nextElementSibling;

    const nextIndex = pages.findIndex((page) => page === nextPage);

    moveToPage(currentPage, nextPage);
    updateButtons(currentButton, nextButton);
    setCarouselTitle(nextIndex);
    hideShowArrows(nextIndex);
    console.log(nextIndex)
});

// Switch the pages using the carousel-nav
carouselNav.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button");

    if (!targetButton) return;

    const currentPage = carousel.querySelector(".current-page");
    const currentButton = carouselNav.querySelector(".current-page");

    const targetIndex = buttons.findIndex((button) => button === targetButton);
    const targetPage = pages[targetIndex];

    moveToPage(currentPage, targetPage);
    updateButtons(currentButton, targetButton);
    setCarouselTitle(targetIndex);
    hideShowArrows(targetIndex);
    console.log(targetIndex)
});