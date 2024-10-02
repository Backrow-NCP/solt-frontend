import styled from "styled-components";

import leftBtn from '../../assets/images/ico/arrow_left.svg';
import rightBtn from '../../assets/images/ico/arrow_right.svg';

const PlanLoad = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100vh - 127px);

	// 백그라운드
	.background {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.6);
		backdrop-filter: blur(5px);
	}

	// 컨텐츠
	.load_cont {
		position: absolute;
		z-index: 3;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
		text-align: center;
	}
	.load_cont > div {
		width: 50%;
		margin: 0 auto;
		padding: 40px 0 70px;
		border-radius: 30px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		background: #fff;

	}
	.load_cont .load_icon {
		overflow: hidden;
		position: relative;
		height: 40px;
    margin-bottom: 20px;
	}
	.load_cont .load_icon img {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 75px;
		transform: translate(-50%, -50%);
	}
	.load_cont h2 {
		margin-bottom: 5px;
	}

	// 슬라이드
	.slick-slider {
		max-width: 600px;
		margin: 30px auto 0;
	}
	.slick-prev,
	.slick-next {
		z-index: 1;
		top: 35%;
		width: 50px;
	}
	.slick-prev::before,
	.slick-next::before {
		display: inline-block;
		width: 50px;
    height: 50px;
		padding: 20px;
    border-radius: 10px;
    border: 1px solid #ddd;
		background: #fff no-repeat center center;
		font-size: 0;
	}
	.slick-prev {
		left: -20%;
	}
	.slick-next {
		right: -20%;
	}
	.slick-prev::before {
		background-image: url(${leftBtn});
	}
	.slick-next::before {
		background-image: url(${rightBtn});
	}
	.slide_thumb {
		text-align: center;
	}
	.slide_thumb img {
		display: inline-block;
		max-width: 100%;
		border-radius: 10px;
	}
	.slide_desc {
		margin-top: 15px;
	}
`;

export default PlanLoad;