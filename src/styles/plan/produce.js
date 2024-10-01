import styled from "styled-components";
import serviceIcon01 from '../../assets/images/ico/service_ai.svg';

const PlanProduce = styled.div`
	
	margin-bottom: -200px;

	.plan_cont {
		position: fixed;
		top: 110px;
		left: 20px;
		width: 568px;
		padding: 40px 30px 40px 40px;
		background: #fff;
		border-radius: 32px;
		box-sizing: border-box;
	}
	.plan_cont > button {
		width: 100%;
		margin-top: 10px;
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
	.plan_info .price .graph span {

	}

	.tab_date {
		flex-wrap: nowrap;
		gap: 32px;
		margin: 40px 0 20px;
	}
	.tab_date li.active {
		color: #121212;
	}

	ol {
		position: relative;
		height: 500px;
		padding-right: 10px;
		overflow-y: auto;
	}
	ol::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
	}
	ol > li {
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		gap: 5%;
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
	}
	ol li .place_info {
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
		text-align: right;
	}
	ol li .place_price div {
		flex-wrap: nowrap;
		align-items: flex-end;
		margin-top: 7px;
	}
	ol li .place_price input {
		width: 75px;
		border: 0;
		background: #fff;
		font-size: 18px;
		font-weight: 700;
		color: #F78C9F;
		text-align: right;
	}
	ol li .place_price span {
		vertical-align: text-bottom;
	}
	ol li .place_price button {
		text-decoration: underline;
	}

	ol li .place_change {
		overflow: hidden;
		position: absolute;
		top: 50%;
		right: 10%;
		widtH: 160px;
		border-radius: 8px;
		border: 1px solid #ddd;
		background: #fff;
		transform: translateY(-50%);
	}
	ol li .place_change li:first-child {
		border-bottom: 1px solid #ddd;
	}
	ol li .place_change button {
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

`;

export default PlanProduce;