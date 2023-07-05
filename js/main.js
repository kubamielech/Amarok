const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.hamburger')
const navMobile = document.querySelector('.navbar__mobile')
const navItems = navMobile.querySelectorAll('.navbar__item')
const navShadow = document.querySelector('.nav-shadow')
const accordion = document.querySelector('.accordion')
const accordionBtns = document.querySelectorAll('.accordion__btn')
const sliderBox = document.querySelector('.slider-box')
const leftBtn = document.querySelector('.btn-left')
const rightBtn = document.querySelector('.btn-right')
const carouselImages = document.querySelectorAll('.slider-img')
const footerYear = document.querySelector('.footer__year')

const carouselWidth = 1250
const carouselSpeed = 3000

let root = document.documentElement
let index = 0

const handleNav = () => {
	navBtn.classList.toggle('is-active')
	navMobile.classList.toggle('navbar__mobile--active')
	navShadow.classList.toggle('nav-shadow--active')
    document.body.classList.toggle('fixed-body')
}

const handleScrollBar = () => {
	const scroll = window.scrollY
	const leftToScroll = document.body.getBoundingClientRect().height - window.innerHeight
	const scrollBarWidth = Math.floor((scroll / leftToScroll) * 100)

	root.style.setProperty('--scroll-width', `${scrollBarWidth}%`)

    if(scrollBarWidth > 9) {
        nav.classList.add('nav-active')
    } else {
        nav.classList.remove('nav-active')
    }

}

function openAccordionItems() {
	if (this.nextElementSibling.classList.contains('accordion__info--active')) {
		this.nextElementSibling.classList.remove('accordion__info--active')
	} else {
		closeAccordionItems()
		this.nextElementSibling.classList.toggle('accordion__info--active')
	}
}

const closeAccordionItems = () => {
	const allActiveItems = document.querySelectorAll('.accordion__info--active')
	allActiveItems.forEach(item => item.classList.remove('accordion__info--active'))
}

const clickOutsideAccordion = e => {
	if (
		e.target.classList.contains('accordion__btn') ||
		e.target.classList.contains('accordion__info') ||
		e.target.classList.contains('accordion__info-text')
	) {
		return
	} else {
		closeAccordionItems()
	}
}

const handleCarousel = () => {
	index++
	changeImage()
}

let startCarousel = setInterval(handleCarousel, carouselSpeed)

const changeImage = () => {
	if (index > carouselImages.length - 1) {
		index = 0
	} else if (index < 0) {
		index = carouselImages.length - 1
	}

	sliderBox.style.transform = `translateX(${-index * carouselWidth}px)`
}

const handleRightArrow = () => {
	index++
	resetInterval()
}

const handleLeftArrow = () => {
	index--
	resetInterval()
}

const resetInterval = () => {
	changeImage()
	clearInterval(startCarousel)
	startCarousel = setInterval(handleCarousel, carouselSpeed)
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleScrollBar()
handleCurrentYear()
navItems.forEach(navItem => navItem.addEventListener('click', handleNav))
navBtn.addEventListener('click', handleNav)
navShadow.addEventListener('click', handleNav)
window.addEventListener('scroll', handleScrollBar)
accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems))
window.addEventListener('click', clickOutsideAccordion)
rightBtn.addEventListener('click', handleRightArrow)
leftBtn.addEventListener('click', handleLeftArrow)