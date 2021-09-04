"use strict"

$(document).ready(function() {
    $('.header__burger-btn').on('click', function(event){
        event.preventDefault()
        $(this).toggleClass('header__burger-btn_active')
        $('.header__menu').toggleClass('header__menu_active')
        $('body').toggleClass('body__lock')
    })



    let position = 0 
    const slidesToShow = 1
    const slidesToScroll = 1
    const expertsContainer = $('.experts__slider-container')
    const expertsSlider = $('.experts__slider')
    const expertsSliderItem = $('.experts__slider-item')
    const expertsSliderBtn1 = $('.experts__slider-btn1')
    const expertsSliderBtn2 = $('.experts__slider-btn2')
    const expertsSliderBtn3 = $('.experts__slider-btn3')
    const expertsSliderBtn4 = $('.experts__slider-btn4')


    expertsSliderBtn1.click(function(){
        expertsSlider.css({
            transform: 'translateX(0)'
        })
    })
    expertsSliderBtn2.click(function(){
        expertsSlider.css({
            transform: 'translateX(-100%)'
        })
    })
    expertsSliderBtn3.click(function(){
        expertsSlider.css({
            transform: 'translateX(-200%)'
        })
    })
    expertsSliderBtn4.click(function(){
        expertsSlider.css({
            transform: 'translateX(-300%)'
        })
    })

    
})