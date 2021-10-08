const SliderClassName = 'slider-wr'
const SliderDraggableClassName = 'slider-draggable'
const SliderLineClassName = 'slider-line'
const SliderItemClassName = 'slider-item'
const SliderDotsClassName = 'slider-dots'
const SliderDotClassName = 'slider-dot'
const SliderActiveDotClassName = 'slider-dot-active'

class SliderV {
    constructor(element, options = {}) {
        this.containerNode = element
        this.size = element.childElementCount
        this.currentSlide = 0
        this.currentSlideWasChanged = false
        this.settings = {
            margin: options.margin || 0
        }

        this.manageHTML = this.manageHTML.bind(this)
        this.setParameters = this.setParameters.bind(this)
        this.setEvents = this.setEvents.bind(this)
        this.resizeSlider = this.resizeSlider.bind(this)
        this.startDrag = this.startDrag.bind(this)
        this.startSwipe = this.startSwipe.bind(this)
        this.stopDrag = this.stopDrag.bind(this)
        this.stopSwipe = this.stopSwipe.bind(this)
        this.dragging = this.dragging.bind(this)
        this.swiping = this.swiping.bind(this)
        this.setStylePosition = this.setStylePosition.bind(this)
        this.disableStyleTransition= this.disableStyleTransition.bind(this)
        this.changeCurrentSlide = this.changeCurrentSlide.bind(this)
        this.changeActiveDotClass = this.changeActiveDotClass.bind(this)

        this.jumpForSlider = this.jumpForSlider.bind(this)
        this.jumpOfLast = this.jumpOfLast.bind(this)
        


        this.clickDots = this.clickDots.bind(this)


        this.manageHTML()
        this.setParameters()
        this.setEvents()
        
    }

    manageHTML() {
        this.containerNode.classList.add(SliderClassName)
        this.containerNode.innerHTML = `
            <div class="${SliderLineClassName}">
                ${this.containerNode.innerHTML}
            </div>
            <div class="${SliderDotsClassName}"></div>
        `
        this.lineNode = this.containerNode.querySelector(`.${SliderLineClassName}`)
        this.dotsNode = this.containerNode.querySelector(`.${SliderDotsClassName}`)
        
        this.slideNodes = Array.from(this.lineNode.children).map((childNode) => 
            wrapElementByDiv({
                element: childNode,
                className: SliderItemClassName
            })
        )


        this.dotsNode.innerHTML = Array.from(Array(this.size).keys()).map((key) => (
            `<button class="${SliderDotClassName} ${key === this.currentSlide ? SliderActiveDotClassName : ''}"></button>`
        ))/*.slice(1, (this.size-1))*/.join('')

        this.dotNodes = this.dotsNode.querySelectorAll(`.${SliderDotClassName}`)
        
        
    }

    setParameters() {
        const coordsContainer = this.containerNode.getBoundingClientRect()
        this.width = coordsContainer.width
        this.x = -this.currentSlide * (this.width + this.settings.margin)

        this.maximumX = this.size - 1

        this.resetStyleTransition()
        this.lineNode.style.width = `${this.size * (this.width + this.settings.margin)}px`
        this.setStylePosition()
        Array.from(this.slideNodes).forEach((slideNode) => {
            slideNode.style.width = `${(this.width)}px`
            slideNode.style.marginRight = `${this.settings.margin}px`
        })
    }

    setEvents() {
        this.debouncedResizeSlider = debounce(this.resizeSlider)
        window.addEventListener('resize', this.debouncedResizeSlider)

        this.lineNode.addEventListener('mousedown', this.startDrag)
        this.lineNode.addEventListener("touchstart", this.startSwipe)


        window.addEventListener('mouseup', this.stopDrag)
        window.addEventListener("touchend", this.stopSwipe)

        window.addEventListener("touchcancel", this.stopSwipe)

        this.dotsNode.addEventListener('click', this.clickDots)


        



        

    }

    destroyEvents() {
        window.removeEventListener('resize', this.debouncedResizeSlider)

        this.lineNode.removeEventListener('mousedown', this.startDrag)
        window.removeEventListener('mouseup', this.stopDrag)

        this.lineNode.removeEventListener('touchstart', this.startSwipe)
        window.removeEventListener('touchend', this.stopSwipe)
        window.removeEventListener('touchcancel', this.stopSwipe)

        this.dotsNode.removeEventListener('click', this.clickDots)

        this.lineNode.removeEventListener('transitionend', this.jumpOfLast)

        

    }

    resizeSlider() {
        this.setParameters()

    }

    startDrag(evt) {
        this.currentSlideWasChanged = false
        this.clickX = evt.pageX //положение мышки
        this.startX = this.x //текущий слайдер

        this.resetStyleTransition()

        this.containerNode.classList.add(SliderDraggableClassName)
        window.addEventListener('mousemove', this.dragging)
    }

    startSwipe(evt) {
        this.currentSlideWasChanged = false
        this.touchX = evt.touches[0].clientX //положение пальца
        this.startX = this.x  //текущий слайдер

        this.resetStyleTransition()

        window.addEventListener("touchmove", this.swiping)
    }

    stopDrag() {
        window.removeEventListener('mousemove', this.dragging)
        
        this.containerNode.classList.remove(SliderDraggableClassName)

        //this.lineNode.addEventListener('transitionend', this.changeCurrentSlide)

        this.changeCurrentSlide()

    }

    stopSwipe() {
        window.removeEventListener("touchmove", this.swiping)

        //this.lineNode.addEventListener('transitionend', this.changeCurrentSlide)
        this.changeCurrentSlide()
    }

    dragging(evt) {
        this.dragX = evt.pageX
        const dragShift = this.dragX -this.clickX
        this.x = this.startX + dragShift
        
        
        this.setStylePosition()
        

        //change active slide
        if (
            dragShift > 20 &&
            dragShift > 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide > 0
        ) {
            this.currentSlideWasChanged = true
            this.currentSlide = this.currentSlide - 1
            
        }

        if (
            dragShift < -20 &&
            dragShift < 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide < this.size - 1
        ) {
            this.currentSlideWasChanged = true
            this.currentSlide = this.currentSlide + 1
            
        } 
    }

    swiping(evt) {
        this.swipeX = evt.touches[0].clientX
        const swipeShift = this.swipeX -this.touchX
        this.x = this.startX + swipeShift

        this.setStylePosition()

        if (
            swipeShift > 20 &&
            swipeShift > 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide > 0
        ) {
            this.currentSlideWasChanged = true
            this.currentSlide = this.currentSlide - 1
            
        }

        if (
            swipeShift < -20 &&
            swipeShift < 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide < this.size - 1
        ) {
            this.currentSlideWasChanged = true
            this.currentSlide = this.currentSlide + 1
        }         

    }

    clickDots(evt) {
        
        const dotNode = evt.target.closest('button')
        if(!dotNode) {
            return
        }
        
        
        let dotNumber
        for(let i = 0; i < this.dotNodes.length; i++) {
            /*
            if (i === 0) {
                i = 1
                console.log(i)
                
            } else if (i === this.maximumX) {
                i = this.maximumX - 1
            }
            */

            if (this.dotNodes[i] === dotNode) {
                dotNumber = i
                break
            }
            
        }
        


        if(dotNumber === this.currentSlide) {
            return
        }

        this.currentSlide = dotNumber
        this.changeCurrentSlide()
    }


    changeCurrentSlide() {
        /*
        if (this.currentSlide === this.maximumX){
            
            this.currentSlide = 1
            this.x = -this.currentSlide * (this.width + this.settings.margin)
            this.disableStyleTransition()
            this.setStylePosition()
            this.setStyleTransition()
            this.changeActiveDotClass()
        }
        if (this.currentSlide === 0) {
            
            this.currentSlide = this.maximumX -1
            this.x = -this.currentSlide * (this.width + this.settings.margin)
            this.disableStyleTransition()
            this.setStylePosition()
            this.setStyleTransition()
            this.changeActiveDotClass()
            

        } else {} 
        */
            this.x = -this.currentSlide * (this.width + this.settings.margin)
            this.setStylePosition()
            this.setStyleTransition()
            this.changeActiveDotClass()
        
              
    }

    changeActiveDotClass() {
        for(let i = 0; i < this.dotNodes.length; i++) {
            this.dotNodes[i].classList.remove(SliderActiveDotClassName)
           
        }
        
        this.dotNodes[this.currentSlide].classList.add(SliderActiveDotClassName)

    }



    jumpForSlider(){   
        
    }
    
    jumpOfLast() {
        if (this.currentSlide === this.maximumX){
            this.disableStyleTransition()
            this.currentSlide = 1
        }
        if (this.currentSlide === 0) {
            this.disableStyleTransition()
            this.currentSlide = this.maximumX -1
        }
        //console.log(this.maximumX)
    }

    setStylePosition() {
        this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`

    }

    setStyleTransition() {
        this.lineNode.style.transition = 'all .25s ease 0s'
    }

    resetStyleTransition() {
        this.lineNode.style.transition = 'all 0s ease 0s'
    }

    disableStyleTransition() {
        this.lineNode.style.transition = 'none'
    }
}

//helpers
function wrapElementByDiv({element, className}) {
    const wrapperNode = document.createElement('div')
    wrapperNode.classList.add(className)

    element.parentNode.insertBefore(wrapperNode, element)
    wrapperNode.appendChild(element)

    return wrapperNode
}

function debounce(func, time = 100) {
    let timer 
    return function (event) {
        clearTimeout(timer)
        timer = setTimeout(func, time, event)
    }
}