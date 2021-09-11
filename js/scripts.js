"use strict"



document.querySelector('.header__burger-btn').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.header__burger-btn').classList.toggle('header__burger-btn_active')
    document.querySelector('.header__menu').classList.toggle('header__menu_active')
    document.querySelector('body').classList.toggle('body__lock')
})


    let position = 1
    const slidesToShow = 1
    const slidesToScroll = 1
    const expertsContainer = document.querySelector('.experts__slider-container')
    const expertsSlider = document.querySelector('.experts__slider')
    const expertsSliderItem = document.querySelector('.experts__slider-item')
    const expertsSliderBtn1 = document.querySelector('.experts__slider-btn1')
    const expertsSliderBtn2 = document.querySelector('.experts__slider-btn2')
    const expertsSliderBtn3 = document.querySelector('.experts__slider-btn3')
    const expertsSliderBtn4 = document.querySelector('.experts__slider-btn4')

    expertsSliderPosition()
    positionOfBtn()
    



    expertsSliderBtn1.addEventListener('click', () => {
        if (position == 4) {
            expertsSlider.style.transform = 'translateX(-500%)'
            expertsSlider.style.transform = 'translateX(-100%)'
            expertsSlider.style.transition = '0'
            
            
            position = 1
        }
        expertsSlider.style.transform = 'translateX(-100%)'
        
        positionOfBtn()
        position = 1
        console.log(position)
    })
    expertsSliderBtn2.addEventListener('click', () => {
        expertsSlider.style.transform = 'translateX(-200%)'
        position = 2
        positionOfBtn()
        console.log(position)
    })
    expertsSliderBtn3.addEventListener('click', () => {
        expertsSlider.style.transform = 'translateX(-300%)'
        position = 3
        positionOfBtn()
        console.log(position)
    })
    expertsSliderBtn4.addEventListener('click', () => {
        expertsSlider.style.transform = 'translateX(-400%)'
        position = 4
        positionOfBtn()
        console.log(position)
    })




    function expertsSliderPosition () {
        expertsSlider.style.transform = 'translateX(-100%)'

    }

    function positionOfBtn() {
        if (position == 1) {
            expertsSliderBtn1.classList.add('experts__btn_active')
            expertsSliderBtn2.classList.remove('experts__btn_active')
            expertsSliderBtn3.classList.remove('experts__btn_active')
            expertsSliderBtn4.classList.remove('experts__btn_active')
        } else if (position == 2) {
            expertsSliderBtn1.classList.remove('experts__btn_active')
            expertsSliderBtn2.classList.add('experts__btn_active')
            expertsSliderBtn3.classList.remove('experts__btn_active')
            expertsSliderBtn4.classList.remove('experts__btn_active')
        } else if (position == 3) {
            expertsSliderBtn1.classList.remove('experts__btn_active')
            expertsSliderBtn2.classList.remove('experts__btn_active')
            expertsSliderBtn3.classList.add('experts__btn_active')
            expertsSliderBtn4.classList.remove('experts__btn_active')
        } else if (position == 4) {
            expertsSliderBtn1.classList.remove('experts__btn_active')
            expertsSliderBtn2.classList.remove('experts__btn_active')
            expertsSliderBtn3.classList.remove('experts__btn_active')
            expertsSliderBtn4.classList.add('experts__btn_active')
        }
    }
    


    /*expertsSlider.addEventListener('transitionend', function(){

    })*/
    
