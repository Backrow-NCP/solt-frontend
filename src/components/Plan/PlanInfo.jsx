import styled from 'styled-components';
import PieChart from "./PieChart";
import serviceIcon01 from '../../assets/images/ico/service_ai.svg';

// 플랜 정보
const PlanInfo = ({ memberName, area, totalPrice, pieChartData }) => {
  return (
    <Info className="plan_info">
      <span className="size_sm weight_md pt_blue">솔트 AI 플래너</span>
      <h2>
        {memberName} 님의
        <br />
        <span className="pt_blue">{area}</span> 여행 플랜
      </h2>

      <div className="price pt_pink">
        <span className="size_sm weight_sb">예상 총 금액</span>
        <strong>
          <span>{totalPrice.toLocaleString()}</span>원
        </strong>

        {/* 원그래프 */}
        <PieChart data={pieChartData} />
      </div>
    </Info>
  );
};

export default PlanInfo;

const Info = styled.div`
  > span {
    display: block;
    margin-bottom: 12px;
    padding-left: 28px;
    background: url(${serviceIcon01}) no-repeat left center;
    line-height: 24px;
  }

  h2 {
    font-size: 28px;
  }

  // 금액 영역
  .price {
    position: relative;
    margin-top: 16px;
    font-size: 0;

    > span {
      display: inline-block;
      margin-right: 12px;
      padding: 6px 8px;
      border: 1px solid #f78c9f;
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
`;