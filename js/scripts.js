"use strict"


//animation nav
document.querySelector('.header__burger-btn').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.header__burger-btn').classList.toggle('header__burger-btn_active')
    document.querySelector('.header__menu').classList.toggle('header__menu_active')
    document.querySelector('body').classList.toggle('body__lock')
})





new SliderV(document.getElementById('slider-wr'), {
    margin: 10
})