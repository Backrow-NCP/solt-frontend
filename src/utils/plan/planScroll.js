// plan 영역 푸터와 닿지 않게
export const planScroll = () => {
	const planCont = document.querySelector('.plan_cont');
	const footer = document.querySelector('footer');

	if(planCont && footer) {
		const footerRect = footer.getBoundingClientRect();
		const planContRect = planCont.getBoundingClientRect();

		if(footerRect.top < planContRect.bottom + 80) {
			planCont.classList.add('scroll');
		} else {
			planCont.classList.remove('scroll');
		}
	}
}

// 위치 조정
export const AdjustPlanScroll = () => {
	planScroll();

	window.addEventListener('resize', planScroll);
	window.addEventListener('scroll', planScroll);
}

// 리스너 제거
export const removePlanScroll = () => {
	window.removeEventListener('resize', planScroll);
	window.removeEventListener('scroll', planScroll);
}