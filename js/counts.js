const animItems = document.querySelectorAll('._numbersCount')


if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++){
            const animItem = animItems[index]
            let animItemHeight = animItem.offsetHeight
            let animItemOffset = offset(animItem).top
            const animStart = 4
            let animItemStart = +animItem.innerHTML
            const animItemMax = +animItem.dataset.max
            const media400 = 400
            let winInWidth = window.innerWidth
            const diferenseWidth = winInWidth <= media400

            let animItemPoint = window.innerHeight - animItemHeight / animStart


            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if ((animItem == animItems[2]) && diferenseWidth){
                    animItemOffset = animItemOffset - 88
                }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

                this.removeEventListener('scroll', animOnScroll)

                if (animItemMax < 14) {
                    let interval = setInterval(function() {
                        animItem.innerHTML = ++animItemStart
                        if(animItemStart == animItemMax) {
                            clearInterval(interval)
                        }
                    }, 300)
                } else {
                    const animTime = 5000
                    const animStep = 100

                    let animT = Math.round(animTime / (animItemMax / animStep))
                    let animNum = 0
                    let interval = setInterval(function() {
                        animNum = animNum + animStep
                        if(animNum == animItemMax) {
                            clearInterval(interval)
                        }
                        animItem.innerHTML = animNum
                    }, animT)
                }   
            } 
        }
    }
}


function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
}
