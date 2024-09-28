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
			'#15B8FF', '#F78CA0', '#36E0C5', '#FFD600', '#43A311', 
			'#FF9E9E', '#121212', '#888', '#0043FF', '#FEAE5E'
    ];

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(totals), // 카테고리 이름들
        datasets: [
          {
            data: Object.values(totals), // 각 카테고리별 금액
            backgroundColor: backgroundColors.slice(0, Object.keys(totals).length),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false // 호버 툴팁 비활성화
          }
        },
        onClick: () => {
          // 0원인 카테고리 제외하고 모든 카테고리 정보 업데이트
          const allInfo = Object.keys(totals)
            .filter(label => totals[label] > 0) // 0원인 항목 제외
            .map(label => {
              const value = totals[label];
              const percentage = ((value / totalSum) * 100).toFixed(1); // 퍼센트 계산
              return { label, value, percentage };
            });
          setSelectedInfo(allInfo); // 클릭 시 모든 카테고리 정보를 업데이트
        },
        plugins: {
          legend: {
            display: false // 범례 비활성화
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <ChartContainer>
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
