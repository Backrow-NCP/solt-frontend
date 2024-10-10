import styled from "styled-components";
import serviceIcon01 from '../../assets/images/ico/service_ai.svg';

const PlanProduce = styled.div`
  position: relative;
	margin-bottom: -200px;

	.plan_cont {
		position: fixed;
    z-index: 1;
		top: 50%;
		left: 20px;
		width: 568px;
		padding: 40px 30px 40px 40px;
		background: #fff;
		border-radius: 32px;
		box-sizing: border-box;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		transform: translateY(-50%);
		transition: 0.3s ease;
	}
	.plan_cont.scroll {
		top: 38%;
	}
	.plan_cont > button {
		width: 100%;
		margin-top: 10px;
	}
	.plan_cont > button:first-of-type {
		margin-top: 40px;
	}

	.plan_info > span {
		display: block;
		margin-bottom: 12px;
		padding-left: 28px;
		background: url(${serviceIcon01}) no-repeat left center;
		line-height: 24px;
	}
	.plan_info h2 {
		font-size: 28px;
	}
	.plan_info .price {
		position: relative;
		margin-top: 16px;
		font-size: 0;
	}
	.plan_info .price > span {
		display: inline-block;
		margin-right: 12px;
		padding: 6px 8px;
		border: 1px solid #F78C9F;
		border-radius: 5px;
		background: rgba(247, 140, 159, 0.06);
		line-height: 1;
		vertical-align: text-bottom;
	}
	.plan_info .price > strong {
		display: inline-block;
		font-size: 26px;
		font-weight: 700;
		line-height: 1;
	}
	.plan_info .price > strong span {
		font-size: 45px;
	}
	.plan_info .price .graph {
		position: absolute;
		right: 10px;
		bottom: 0;
		width: 80px;
	}
	.plan_info .price .graph > span {
		position: absolute;
    top: -45px;
    left: 40%;
    padding: 8px 12px;
    border-radius: 8px;
		border-radius: 8px;
		background: #FFD600;
		color: #121212;
		line-height: 1;
		white-space: nowrap;
    animation: float 2s ease-in-out infinite;
	}
	.plan_info .price .graph.active > span {
		display: none;
	}
	.plan_info .price .graph > span::after {
		content: "";
    position: absolute;
    bottom: -8px;
    left: 12px;
    border-top: 10px solid #FFD600;
    border-left: 5px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    border-radius: 10px;
	}
	@keyframes float {
		0% {
				transform: translateY(0);
		}
		50% {
				transform: translateY(6px);
		}
		100% {
				transform: translateY(0);
		}
	}
	.plan_info .price .graph > canvas {
		cursor: pointer;
	}
	.plan_info .price .graph > .info {
		display: none;
		position: absolute;
		top: 0;
		right: -20px;
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
		background: #fff;
		transform: translateX(100%);
	}
	.plan_info .price .graph.active > .info {
		display: block;
	}
	.plan_info .price .graph > .info li {
		flex-wrap: nowrap;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 5px;
		font-size: 12px;
		white-space: nowrap;
	}
	.plan_info .price .graph > .info li:last-child {
		margin-bottom: 0;
	}
	.plan_info .price .graph > .info li .label {
		color: #121212;
	}

	.tab_date {
		flex-wrap: nowrap;
		gap: 32px;
		margin: 40px 0 20px;
	}
	.tab_date li {
		cursor: pointer;
	}
	.tab_date li.active {
		color: #121212;
	}

	ol {
		height: 40vh;
		padding-right: 10px;
		overflow-y: auto;
	}
	ol::-webkit-scrollbar {
		width: 3px;
	}
	ol::-webkit-scrollbar-thumb {
    background-color: #aaa;
		border-radius: 5px;
  }
  ol::-webkit-scrollbar-track {
    background-color: #eee;
		border-radius: 5px;
  }
	ol > li {
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		position: relative;
		padding: 28px 0;
	}
	ol > li::after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		right: 0;
		width: 90%;
		height: 1px;
		background: #eee;
	}
	ol > li:last-child::after {
		display: none;
	}
	ol li .place_cont {
	}
	ol li .place_time {
		position: relative;
		width: 40px;
	}
	ol li .place_info {
		width: calc(100% - 234px);
	}
	ol li .place_info h3 {
		display: inline-block;
	}
	ol li .place_info > span {
		display: inline-block;
		margin-left: 8px;
		vertical-align: text-top;
	}
	ol li .place_info > div {
		margin: 8px 0;
	}
	ol li .place_info > div span {
		margin-left: 4px
	}
	ol li .place_info > div strong {
		margin-left: 10px;
	}
	ol li .place_price {
		width: 110px;
		text-align: right;
	}
	ol li .place_price div {
		flex-wrap: nowrap;
		align-items: flex-end;
		justify-content: flex-end;
		margin-top: 7px;
	}
	ol li .place_price input {
		width: 75px;
		border: 0;
		background: #fff;
		font-size: 18px;
		font-weight: 700;
		color: #121212;
		text-align: right;
	}
	ol li .place_price input:disabled {
		color: #F78C9F;
	}
	ol li .place_price input::-webkit-outer-spin-button,
	ol li .place_price input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
	}
	ol li .place_price input {
	-moz-appearance: textfield;
	}
	ol li .place_price span {
		vertical-align: text-bottom;
	}
	ol li .place_price button {
		text-decoration: underline;
	}
	ol li > button {
		width: 24px;
	}
	ol li > button img {
		width: 100%;
	}
	ol li .place_change {
		overflow: hidden;
		position: absolute;
		top: 50%;
		right: 10%;
		widtH: 160px;
		border-radius: 8px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
		background: #fff;
		transform: translateY(-50%);
	}
	ol li .place_change li:first-child {
		border-bottom: 1px solid #ddd;
	}
	ol li .place_change button,
	ol li .place_change button.active {
		width: 100%;
		padding: 12px 0;
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		transition: 0.2s;
	}
	ol li .place_change button:hover {
		background: #14B8FF;
		color: #fff;
	}

	// 수정 영역
	.plan_modify {
		position: fixed;
    z-index: 1;
		top: 50%;
		left: 600px;
		width: 500px;
		padding: 40px 30px 40px 40px;
		background: #fff;
		border-radius: 32px;
		box-sizing: border-box;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
		transform: translateY(-50%);
		transition: 0.3s ease;
	}
	.plan_modify h3 {
		margin-bottom: 40px;
	}
	.plan_modify button {
		width: 100%;
	}
	.plan_modify button:first-of-type {
		margin: 40px 0 10px;
	}
	.directly input {
		width: 100%;
		height: 72px;
		padding: 0 40px;
		border: 1px solid #ddd;
		border-radius: 16px;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size: 18px;
		color: #121212;
	}
	.directly input::placeholder {
		color: #888;
	}
	.directly .selected_place {
		margin-top: 10px;
		padding: 16px;
		border: 1px solid #14B8FF;
		border-radius: 16px;
		background: rgba(20,184,255,0.06);
	}
	.directly .selected_place h4 {
		margin-bottom: 5px;
	}
	.recomm ul {
    overflow-y: auto;
		height: 30vh;
    padding-right: 10px;
	}
	.recomm ul::-webkit-scrollbar {
		width: 3px;
	}
	.recomm ul::-webkit-scrollbar-thumb {
    background-color: #aaa;
		border-radius: 5px;
  }
  .recomm ul::-webkit-scrollbar-track {
    background-color: #eee;
		border-radius: 5px;
  }
	.recomm ul li {
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		padding: 16px;
		border: 1px solid #ddd;
    border-radius: 16px;
		background: #fff;
		transition: 0.2s;
		cursor: pointer;
	}
	.recomm ul li:last-child {
		margin-bottom: 4px;
	}
	.recomm ul li:hover {
		border-color: #14B8FF;
	}
	.recomm ul li.selected {
		border-color: #14B8FF;
		background: rgba(20,184,255,0.06);
	}
	.recomm ul li img {
    width: 70px;
    margin-right: 15px;
    border-radius: 12px;
  }
	.recomm ul li .place_info {
		width: calc(100% - 185px);
	}
	.recomm ul li .place_info p {
		overflow: hidden;
		display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
		height: 30px;
		margin-top: 6px;
		font-size: 13px;
		line-height: 15px;
		text-overflow:ellipsis;

	}
	.recomm ul li .place_price {
		width: 100px;
		text-align: right;
	}
	.recomm ul li .place_price strong {
		display: block;
		margin-top: 5px;
	}

  // map
  .gmnoprint {
    display: none;
  }
		

`;

export default PlanProduce;