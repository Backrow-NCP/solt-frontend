import styled from 'styled-components';
import bottom from '../../assets/images/ico/arrow_bottom.svg'
import left from '../../assets/images/ico/arrow_left.svg'
import right from '../../assets/images/ico/arrow_right.svg'

const SurveyCommon = styled.div`
  text-align: center;

  .title {
    margin: 80px 0 32px;
  }
  .title p {
    margin-top: 12px;
  }
  .survey_box {
    width: 1000px;
    margin: 0 auto;
    padding: 40px; 
    border-radius: 24px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: rgba(20, 184, 255, 0.04);
  }
  .survey_box .tip {
    margin-top: 8px;
  }
  .survey_box .pagination {
    margin-bottom: 24px;
    font-size: 0;
  }
  .survey_box .pagination span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    border-radius: 50%;
    background: #ddd;
  }
  .survey_box .pagination span.active {
    background: #14B8FF;
  }
  .survey_box .pagination span:last-child.active {
    background: #36E0C5;
  }
  .button {
    align-items: center;
    justify-content: center;
    margin: 32px auto 0;
    gap: 10px;
  }
  .survey_cont {
    margin-top: 32px;
  }

  // 기간 선택
  .react-datepicker {
    position: relative;
    font-size: 0;
  }
  .react-datepicker button.react-datepicker__navigation {
    overflow: hidden;
    position: absolute;
    top: -35px;
    z-index: 1;
    width: 10px;
    height: 16px;
    padding: 0;
    border: none;
    text-align: center;
    text-indent: -999em;
    cursor: pointer;
  }
  .react-datepicker__navigation--previous {
    left: 20px;
    background: url(${left}) no-repeat;
  }
  .react-datepicker__navigation--next {
    right: 20px;
    background: url(${right}) no-repeat;
  }

  .react-datepicker__month-container {
    display: inline-block;
    width: 48%;
    padding: 16px 32px;
    background: #fff;
    border-radius: 16px;
    box-sizing: border-box;
    vertical-align: top;
  }
  .react-datepicker__month-container:nth-of-type(1) {
    margin-right: 4%;
  }
  .react-datepicker__month-container:nth-of-type(1) h2 {
    display: none;
  }
  .react-datepicker__header {
    position: relative;
    text-align: left;
  }
  .react-datepicker__header h2 {
    padding: 16px 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    word-spacing: 6px
  }
  .react-datepicker__header__dropdown {
    font-size: 0;
  }
  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    display: inline-block;
  }
  .react-datepicker__year-dropdown-container {
    margin-left: 10px;
  }
  .react-datepicker__month-dropdown-container select,
  .react-datepicker__year-dropdown-container select {
    padding: 16px 20px 16px 0;
    border: 0;
    outline: 0;
    background: url(${bottom}) right center no-repeat;
    font-size: 20px;
    font-weight: 600;
    appearance: none;
    -webkit-appearance: none;
  }
  .react-datepicker__month-dropdown-container option,
  .react-datepicker__year-dropdown-container option {
    font-size: 16px;
    font-weight: 400;
  }
  .react-datepicker__day-names {
    white-space: nowrap;
    font-size: 0;
    text-align: center;
  }
  .react-datepicker__day-names > div {
    display: inline-block;
    width: 14.285%;
    font-size: 15px;
    color: #121212;
    line-height: 34px;
    text-align: center;
  }

  .react-datepicker__month {
    margin: 0.4rem;
    text-align: center;
  }
  .react-datepicker__week {
    margin-top: 4px;
    font-size: 0;
    white-space: nowrap;
  }
  .react-datepicker__day {
    display: inline-block;
    width: 14.285%;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
  .today-date {
    font-weight: 500;
    color: #14B8FF;
  }
  .start-date, .end-date, .middle-date {
    background: #14B8FF;
    color: #fff;
  }
  .start-date {
    border-radius: 16px 0 0 16px;
    font-weight: 600;
  }
  .end-date {
    border-radius: 0 16px 16px 0;
    font-weight: 600;
  }
  .start-date-only {
    border-radius: 16px !important;
  }
  .react-datepicker__day--disabled  {
    color: #999;
  }

  // 지역 선택
  .area_list {
    gap: 16px;
  }
  .area_list li {
    flex-grow: 1;
    flex-basis: calc(20% - 16px);
    max-width: 20%;
  }
  .area_list li button {
    overflow: hidden;
    display: block;
    position: relative;
    border-radius: 16px;
  }
  .area_list li button span {
    position: absolute;
    z-index: 1;
    bottom: 16px;
    left: 16px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
  }
  .area_list li.disabled {
    opacity: 0.5;
  }
  
  // 키워드 선택
  .keyword_list {
    padding: 32px 40px;
    border-radius: 16px;
    background: #fff;
  }
  .keyword_list > div {
    flex: 1;
    text-align: left;
  }
  .keyword_list > div h3 {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 700;
  }
  .keyword_list > div li {
    margin-bottom: 12px;
  }
  .keyword_list > div li:last-child {
    margin-bottom: 0;
  }
  .keyword_list > div li button {
    padding: 10px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 18px;
    line-height: 24px;
  }
  .keyword_list > div li button.active {
    border-color: #14B8FF;
    background: rgba(20, 184, 255, 0.06);
    font-weight: 600;  
    color: #14B8FF;
  }
  
	// 장소 선택
	.place_search {
		width: 638px;
		margin: 0 auto;
	}
	.place_search input {
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
	.place_search input::placeholder {
		color: #888;
	}
	.place_search ul {
		gap: 12px;
		justify-content: center;
		margin-top: 16px;
	}
	.place_search ul li {
		padding: 12px 16px;
		border: 1px solid #14B8FF;
		border-radius: 8px;
		background: #fff;
		font-size: 18px;
		font-weight: 600;
		color: #14B8FF;
	}
	.place_search ul li button {
		margin-left: 8px;
		vertical-align: bottom;
	}
	.place_recomm {
		margin-top: 40px;
	}
	.place_recomm h3 {
		margin-bottom: 16px;
	}
	.place_recomm ul {
		justify-content: center;
		gap: 12px;
	}
	.place_recomm ul li button {
		display: block;
		overflow: hidden;
		border: 1px solid #ddd;
		border-radius: 8px;
	}
	.place_recomm ul li img {
		width: 100%;
	}
	.place_recomm ul li span {
		display: block;	
		padding: 12px 0;
		background: #fff;
	}
	.place_recomm ul li button.active {
		border-color: #14B8FF;
		color: #14B8FF;
	}
`;

export default SurveyCommon;