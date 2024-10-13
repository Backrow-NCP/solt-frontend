import styled from "styled-components";

const PlanComplete = styled.div`

	margin-top: 80px;
  text-align: center;

  .price {
    justify-content: center;
    align-items: center;
    margin: 20px 0 32px;

    > span {
      display: inline-block;
			margin-right: 12px;
			padding: 6px 8px;
			border: 1px solid #F78C9F;
			border-radius: 5px;
			background: rgba(247, 140, 159, 0.06);
			line-height: 1;
			vertical-align: text-bottom;
    }

    > strong {
		display: inline-block;
		font-size: 26px;
		font-weight: 700;
		line-height: 1;

			span {
				font-size: 45px;
			}

		}
  }

	// 슬라이드
	.slick-slider {
		overflow: hidden;
		position: relative;
		height: 40vh;
		margin-left: 17%;
	}
	.slick-slider::before {
		content: "";
		position: absolute;
		z-index: 1;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30%;
		background: linear-gradient(to bottom, transparent, #fff);
	}
	.slick-slider::after {
		content: "";
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
		width: 30%;
		height: 100%;
		background: linear-gradient(to right, transparent, #fff);
	}
	.slick-slider.full {
		height: auto;
	}
	.slick-slider.full::before {
		display: none;
	}
	.slick-track {
		display: flex;
		flex-wrap: nowrap;
	}
	.slick-slide {
		float: none;
		margin-right: 16px;
		padding: 24px;
		border: 1px solid #ddd;
		border-radius: 16px;
	}

  h3 {
    margin-bottom: 12px;
  }
	.day_price {
		padding: 10px 0;
		border: 1px solid rgba(20, 184, 255, 0.16);
		border-radius: 8px;
		background: rgba(20, 184, 255, 0.06);
		text-align: center;
	}

	// 날짜별 일정
  li {
		flex-wrap: nowrap;
		align-items: flex-start;
		justify-content: space-between;
    margin-top: 32px;

		> div {
			box-sizing: border-box;
		}

		.place_number {
			width: 20px;
			padding: 5px 6px 4px;
			border-radius: 6px;
			background: #14B8FF;
			color: #fff;
			line-height: 1;
		}
		.place_info {
			width: calc(100% - 140px);
			text-align: left;

			.place_time {
				display: block;
				margin-bottom: 4px;
				line-height: 20px;
			}
		}
    .place_price {
			width: 100px;
			margin-top: 28px;
			text-align: right;

			p {
				margin-bottom: 3px;
			}
    }
		.place_name {
			margin-right: 8px;
		}
		.transport_info {
			gap: 2px;
			margin-top: 8px;
		}
  }
	li:last-child {
		margin-top: 24px;
	}

	// 버튼
	.btn_view {
		margin-top: 32px;
		text-decoration: underline;
	}
	.button_box {
		margin-top: 50px;
		justify-content: center;
    gap: 20px;
	}
	.button_box button {
		width: 400px;
		padding: 20px 0;
	}

`;

export default PlanComplete;