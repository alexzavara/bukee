"use strict"

$(document).ready(function() {
    $('.header__burger-btn').on('click', function(event){
        event.preventDefault()
        $(this).toggleClass('header__burger-btn_active')
        $('.header__menu').toggleClass('header__menu_active')
        $('body').toggleClass('body__lock')
    })
})