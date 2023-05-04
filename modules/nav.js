'use strict';

const navBar = document.querySelector('.navigation__items')
const burgerButton = document.querySelector('.burger-button')

burgerButton.addEventListener('click', () => navBar.classList.toggle('navigation__items--active'))
