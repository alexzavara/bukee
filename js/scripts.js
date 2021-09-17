"use strict"


//animation nav
document.querySelector('.header__burger-btn').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.header__burger-btn').classList.toggle('header__burger-btn_active')
    document.querySelector('.header__menu').classList.toggle('header__menu_active')
    document.querySelector('body').classList.toggle('body__lock')
})



//carousel js
    let position = 1 
    const slidesToShow = 1
    const slidesToScroll = 1
    const expertsContainer = document.querySelector('.experts__slider-container') 
    const expertsSlider = document.querySelector('.experts__slider') 
    const expertsSliderItem = document.querySelector('.experts__slider-item') 
    const expertsSliderItemAll = document.querySelectorAll('.experts__slider-item') 
    
    const expertsSliderBtn1 = document.querySelector('.experts__slider-btn1')
    const expertsSliderBtn2 = document.querySelector('.experts__slider-btn2')
    const expertsSliderBtn3 = document.querySelector('.experts__slider-btn3')
    const expertsSliderBtn4 = document.querySelector('.experts__slider-btn4')


    


    positionOfBtn()
    positionOfSlide()


//first btn
    expertsSliderBtn1.addEventListener('click', () => {
        if (position == 4) {
            position = 5
            expertsSliderPosition()
            positionOfBtn() 
            infinityCarusel()
            transitionSlides()
        } else{
            transitionSlides()
            position = 1
            expertsSliderPosition()
            positionOfBtn()
        }
    })

//second btn
    expertsSliderBtn2.addEventListener('click', () => {
        transitionSlides()
        position = 2
        infinityCarusel()
        expertsSliderPosition()
        positionOfBtn()
        
    })

//third btn
    expertsSliderBtn3.addEventListener('click', () => {
        transitionSlides()
        position = 3
        infinityCarusel()
        expertsSliderPosition()
        positionOfBtn()
    })

//fourth btn
    expertsSliderBtn4.addEventListener('click', () => {
        if (position == 1) {
            position = 0
            expertsSliderPosition()
            positionOfBtn() 
            infinityCarusel()
            transitionSlides()
        } else{
            transitionSlides()
            position = 4
            infinityCarusel()
            expertsSliderPosition()
            positionOfBtn()
        }

        
    })





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

    function expertsSliderPosition () {
        expertsSlider.style.transform = 'translateX('+ (-position * 100) +'%)'
    }

    function positionOfSlide() {
        expertsSliderPosition()
        //expertsSlider.style.transform = 'translateX('+ (-position * 100) +'%)'
        //expertsSlider.style.transform = 'translateX(-100%)'
        //expertsSlider.style.transition = 'none'
    }

    function infinityCarusel () {
        expertsSlider.addEventListener('transitionend', function() {
            if (expertsSliderItemAll[position].id === 'experts__slider-itemFIRST') {
                position = 1
                expertsSlider.style.transition = 'none'
                expertsSliderPosition()
                positionOfBtn()
            } else if (expertsSliderItemAll[position].id === 'experts__slider-itemLAST') {
                position = 4
                expertsSlider.style.transition = 'none'
                expertsSliderPosition()
                positionOfBtn()
            } else {
                position
            }
        })
    }

    function transitionSlides () {
        expertsSlider.style.transition = 'transform .2s'
    }
