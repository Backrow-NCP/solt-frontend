import styled from 'styled-components';

const SurveyCommon = styled.div`
  text-align: center;

  .title {
    margin: 80px 0 32px;

    p {
      margin-top: 12px;
    }
  }

  .survey_box {
		position: relative;
    width: 1000px;
    margin: 0 auto;
    padding: 40px; 
    border-radius: 24px;
    box-sizing: border-box;
    background: rgba(20, 184, 255, 0.04);

    .tip {
      margin-top: 8px;
    }

    .pagination {
      margin-bottom: 24px;
      font-size: 0;

      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 4px;
        border-radius: 50%;
        background: #ddd;
      }

      span.active {
        background: #14B8FF;
      }

      span:last-child.active {
        background: #36E0C5;
      }
    }

		> span {
			display: inline-block;
			position: absolute;
			top: -10px;
			left: 50%;
			padding: 8px 12px;
			border-radius: 8px;
			background-color: #F78C9F;
			font-weight: 400;
			color: #fff;

			&::after {
				content: "";
				position: absolute;
				bottom: -20px;
				left: 14px;
				border-top: 13px solid #F78C9F;
				border-left: 2px solid transparent;
				border-right: 20px solid transparent;
				border-bottom: 13px solid transparent;
				border-radius: 8px;
			}
		}
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
`;

export default SurveyCommon;

