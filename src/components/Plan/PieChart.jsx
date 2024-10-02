import React, { useEffect, useRef, useState } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  const [selectedInfo, setSelectedInfo] = useState([]);
  const [active, setActive] = useState(false);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance) {
      chartInstance.destroy();
    }

    const calculatedTotals = data.reduce(
      (acc, place) => {
        acc[place.category] = (acc[place.category] || 0) + place.price;
        return acc;
      },
      { 숙박: 0, 식비: 0, 교통비: 0, 쇼핑: 0, 관광지: 0, 레포츠: 0, 문화시설: 0, 축제: 0 }
    );

    setTotals(calculatedTotals);

    const totalSum = Object.values(calculatedTotals).reduce((a, b) => a + b, 0);

    // 0원 제거 & 퍼센트 계산
    const initialInfo = Object.keys(calculatedTotals)
      .filter(label => calculatedTotals[label] > 0)
      .map(label => {
        const value = calculatedTotals[label];
        const percentage = ((value / totalSum) * 100).toFixed(1);
        return { label, value, percentage };
      });
    setSelectedInfo(initialInfo);

    // 카테고리 색상
    const backgroundColors = [
      '#15B8FF', '#FFD600', '#6dd3ff', '#F78CA0', '#43A311', 
      '#FF9E9E', '#121212', '#888', '#36E0C5', '#FEAE5E'
    ];

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(calculatedTotals),
        datasets: [
          {
            data: Object.values(calculatedTotals),
            backgroundColor: backgroundColors.slice(0, Object.keys(calculatedTotals).length),
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
          setActive(!active); // active 토글
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, active]);

  return (
    <ChartContainer className={`graph ${active ? 'active' : ''}`}>
      <span className="size_sm weight_sb">클릭해서 세부 내용을 확인하세요</span>
      <canvas ref={chartRef} />
      <ul className="info">
        {/* selectedInfo로 0원이 아닌 항목만 표시 */}
        {selectedInfo.map((info, index) => (
          <li key={index} className="flex">
            <span className="label weight_md">{info.label}</span>
            <span className="value weight_md">약 {info.value.toLocaleString()}원</span>
            <span className="percentage pt_gy">{info.percentage}%</span>
          </li>
        ))}
      </ul>
    </ChartContainer>
  );
};

export default PieChart;

const ChartContainer = styled.div``;
