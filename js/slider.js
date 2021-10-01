const SliderClassName = 'slider-wr'
const SliderDraggableClassName = 'slider-draggable'
const SliderLineClassName = 'slider-line'
const SliderItemClassName = 'slider-item'


class SliderV {
    constructor(element, options = {}) {
        this.containerNode = element
        this.size = element.childElementCount
        this.currentSlide = 1
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


        this.manageHTML()
        this.setParameters()
        this.setEvents()
        //this.setStylePosition()
    }

    manageHTML() {
        this.containerNode.classList.add(SliderClassName)
        this.containerNode.innerHTML = `
            <div class="${SliderLineClassName}">
                ${this.containerNode.innerHTML}
            </div>
        `
        this.lineNode = this.containerNode.querySelector(`.${SliderLineClassName}`)

        this.slideNodes = Array.from(this.lineNode.children).map((childNode) => 
            wrapElementByDiv({
                element: childNode,
                className: SliderItemClassName
            })
        )
    }

    setParameters() {
        const coordsContainer = this.containerNode.getBoundingClientRect()
        this.width = coordsContainer.width
        this.x = -this.currentSlide * (this.width + this.settings.margin)

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

        //window.addEventListener('mousecancel', this.stopDrag)
        //window.addEventListener("touchcancel", this.stopSwipe)
    }

    destroyEvents() {
        window.removeEventListener('resize', this.debouncedResizeSlider)

        this.lineNode.removeEventListener('mousedown', this.startDrag)
        window.removeEventListener('mouseup', this.startDrag)
        window.removeEventListener('mousecancel', this.stopDrag)

        this.lineNode.removeEventListener('touchstart', this.startSwipe)
        window.removeEventListener('touchend', this.startSwipe)
        window.removeEventListener('touchcancel', this.stopSwipe)

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
        this.x = -this.currentSlide * (this.width + this.settings.margin)

        this.setStylePosition()
        this.setStyleTransition()

    }

    stopSwipe() {
        window.removeEventListener("touchmove", this.swiping)

        this.x = -this.currentSlide * (this.width + this.settings.margin)

        this.setStylePosition()
        this.setStyleTransition()
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

    setStylePosition() {
        this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`

    }

    setStyleTransition() {
        this.lineNode.style.transition = 'all 0.25s ease 0s'
    }

    resetStyleTransition() {
        this.lineNode.style.transition = 'all 0s ease 0s'
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