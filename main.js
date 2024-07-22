document.addEventListener('DOMContentLoaded', () => {
    const placeholderCur = document.querySelector('#placeholder-cur'),
        btnNext = document.querySelector('#carousel_next'),
        btnPrev = document.querySelector('#carousel_prev'),
        card = document.querySelector('#card'),
        slider = document.querySelector('#slider'),
        max = 6
    let count, mobile, intervalId

    if (card.offsetWidth < window.innerWidth / 2) {
        mobile = false
        count = 3
        placeholderCur.innerText = count
    } else {
        mobile = true
        count = 1
        placeholderCur.innerText = count
    }

    interval()

    btnNext.addEventListener("click", () => {
        clearInt()
        slideUp()
        interval()
    })
    btnPrev.addEventListener("click", () => {
        clearInt()
        slideDown()
        interval()
    })

    function interval() {
        if(!intervalId) {
            intervalId = setInterval(() => {
                if (count < max) {
                    slideUp()
                } else {
                    slideDown()
                }
            }, 4000)
        }
    }

    function clearInt() {
        clearInterval(intervalId)
        intervalId = null
    }

    window.addEventListener("reset", resize)

    function resize() {
        if (card.offsetWidth < window.innerWidth / 2) {
            mobile = false
            count = 3
            update()
            return
        }
        mobile = true
        count = 1
        update()
    }

    function slideUp() {
        if (count < max) {
            if (mobile) {
                count += 1
            } else {
                count += 3
            }
            update()
        }
    }

    function slideDown() {
        if (count > 0) {
            if (mobile) {
                count -= 1
            } else {
                count -= 3
            }
            update()
        }
    }

    function update() {
        let percentage
        if (mobile) {
            percentage = ((count-1) * 100)
        } else {
            percentage = ((count / 3) - 1) * 100
        }

        slider.style.transform = "translateX(-" + percentage + "%)"
        placeholderCur.innerText = count
        btnNext.disabled = count === max;
        if (mobile) {
            btnPrev.disabled = count === 1
        } else {
            btnPrev.disabled = count === 3
        }
    }

    const stages = {
        inner: document.querySelector("#stages_inner"),
        btnPrev: document.querySelector("#stages_prev_btn"),
        btnNext: document.querySelector("#stages_next_btn"),
        stageCount: document.querySelectorAll(".stage-count")
    }
    let stageCont = 1, stageMax = 5

    stages.btnNext.addEventListener("click", stageSlideUp)
    stages.btnPrev.addEventListener("click", stageSlideDown)

    function stageSlideUp() {
        if (stageCont < stageMax) {
            stages.stageCount[stageCont - 1].classList.remove("stages-count-active")
            stageCont += 1
            stages.inner.style.transform
                = "translate(-"+ stagePersCount(stageCont, stageMax) +"%)"
            stages.btnNext.disabled = stageCont === stageMax
            stages.btnPrev.disabled = stageCont === 1
            stages.stageCount[stageCont - 1].classList.add("stages-count-active")
        }
    }

    function stageSlideDown() {
        if (stageCont > 1) {
            stages.stageCount[stageCont - 1].classList.remove("stages-count-active")
            stageCont -= 1
            stages.inner.style.transform
                = "translate(-"+ stagePersCount(stageCont, stageMax) +"%)"
            stages.btnPrev.disabled = stageCont === 1
            stages.btnNext.disabled = stageCont === stageMax
            stages.stageCount[stageCont - 1].classList.add("stages-count-active")
        }
    }

    function stagePersCount(count, max) {
        return ((count * 100) - 100) + ((count * max) - max)
    }
})