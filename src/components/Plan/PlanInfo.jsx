import PieChart from "./PieChart";

// 플랜 정보
const PlanInfo = ({ memberName, area, totalPrice, pieChartData }) => {
  return (
    <div className="plan_info">
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
    </div>
  );
};

export default PlanInfo;