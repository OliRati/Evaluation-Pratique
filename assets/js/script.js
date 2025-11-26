import menuContent from './menuContent.js'

/*
 * Change images in Hero every 5s
 */

const slides = ["slide-1", "slide-2", "slide-3"];
let currentSlideIndex = 0;
setInterval(() => {
    let nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex >= slides.length)
        nextSlideIndex = 0;

    let previous = document.getElementById(slides[currentSlideIndex]);
    let next = document.getElementById(slides[nextSlideIndex]);

    next.style.display = 'block';
    previous.style.display = 'none';

    currentSlideIndex = nextSlideIndex;
}, 5000);

/*
 * Gestion du menu All Categories
 */

const menuAllCategories = document.getElementById('menuAllCategories');
const subMenuAllCategories = document.getElementById('subMenuAllCategories');
let menuShown = false;
let lastSubMenuShown = undefined;

function redrawFullMenu() {
    // Reset this value on redraw of menu structure
    lastSubMenuShown = undefined;
    subMenuAllCategories.innerHTML = '';

    menuContent.map((item) => {
        // Create a container that encapsulate the item
        // So that hover is only active on item and not subwindow
        const divMenuItemContainer = document.createElement('div');
        divMenuItemContainer.classList.add('menuItemContainer');

        const divMenuItem = document.createElement('div');
        divMenuItem.classList.add('menuItem');

        // Create the icon image in a div
        const divImg = document.createElement('div');
        const img = document.createElement('img');
        img.src = item.imgSrc;
        divImg.append(img);

        // Add it to menu item
        divMenuItem.append(divImg);

        // Add the text in a div
        const divText = document.createElement('div');
        divText.innerText = item.text;
        divMenuItem.append(divText);

        divMenuItemContainer.append(divMenuItem);
        subMenuAllCategories.append(divMenuItemContainer);

        // Gestion du click sur un sous menu
        divMenuItem.addEventListener('click', () => {
            if (lastSubMenuShown != undefined)
                lastSubMenuShown.innerHTML = '';

            const subMenu = document.createElement('div');
            subMenu.classList.add('subMenu');

            item.subMenu.map((subitem) => {
                const divMenuItem = document.createElement('div');
                divMenuItem.classList.add('menuItem');

                const anchor = document.createElement('a');
                anchor.innerText = subitem.text;
                anchor.href = subitem.link;

                divMenuItem.append(anchor);
                subMenu.append(divMenuItem);
            });

            divMenuItemContainer.append(subMenu);

            lastSubMenuShown = subMenu;
        });
    });
}

menuAllCategories.addEventListener('click', () => {
    menuShown = !menuShown;
    if (menuShown)
        subMenuAllCategories.style.display = 'block';
    else {
        subMenuAllCategories.style.display = 'none';
        return;
    }

    redrawFullMenu();
});

/*
 * Gestion de Shop Now
 * Problem : SHOP NOW is only on Heros
 */

const buttons = [
    'promosButton-1',
    'promosButton-2',
    'promosButton-3'];

let nbArticles = 0;

const cartNumber = document.getElementById('cartNumber');

buttons.map(item=>{
    const button = document.getElementById(item);
    button.addEventListener('click', ()=>{
        nbArticles++;
        cartNumber.innerText = nbArticles.toString();
    })
});
