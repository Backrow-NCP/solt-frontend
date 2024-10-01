import React, { useEffect, useRef, useState } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;
  
  const [selectedInfo, setSelectedInfo] = useState([]); // 여러 개의 카테고리 정보를 저장하는 상태

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance) {
      chartInstance.destroy();
    }

    // 카테고리별 금액 합계 계산
    const totals = data.reduce(
      (acc, place) => {
        acc[place.category] = (acc[place.category] || 0) + place.price;
        return acc;
      },
      { 숙박: 0, 식비: 0, 교통비: 0, 쇼핑: 0, 관광지: 0, 레포츠: 0, 문화시설: 0, 축제: 0 }
    );

    const totalSum = Object.values(totals).reduce((a, b) => a + b, 0);

    // 추가적으로 색상 배열을 각 카테고리별로 확장
    const backgroundColors = [
      '#15B8FF', '#FFD600', '#6dd3ff', '#F78CA0', '#43A311', 
      '#FF9E9E', '#121212', '#888', '#36E0C5', '#FEAE5E'
    ];

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
				 // 카테고리 이름
        labels: Object.keys(totals),
        datasets: [
          {
            data: Object.values(totals),
            backgroundColor: backgroundColors.slice(0, Object.keys(totals).length),
            hoverOffset: 0,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        onClick: () => {
          // 0원인 카테고리 제외
          const allInfo = Object.keys(totals)
            .filter(label => totals[label] > 0)
            .map(label => {
              const value = totals[label];
              const percentage = ((value / totalSum) * 100).toFixed(1); // 퍼센트 계산
              return { label, value, percentage };
            });
          setSelectedInfo(allInfo);
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <ChartContainer className="graph">
			<span>클릭해서 세부 내용을 확인하세요</span>
      <canvas ref={chartRef} />
      <InfoContainer>
        {selectedInfo.length > 0 && selectedInfo.map((info, index) => (
          <div className="info" key={index}>
            <span className="label">{info.label}</span>
            <span className="value">약 {info.value.toLocaleString()}원</span>
            <span className="percentage">({info.percentage}%)</span>
          </div>
        ))}
      </InfoContainer>
    </ChartContainer>
  );
};

export default PieChart;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-left: 20px;
`;
