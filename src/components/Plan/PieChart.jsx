import React, { useEffect, useRef, useState } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // 차트 인스턴스를 저장할 ref

  const [selectedInfo, setSelectedInfo] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return; // 캔버스가 로드되지 않았으면 실행 안 함
    const ctx = chartRef.current.getContext('2d');

    // 기존 차트 인스턴스가 있으면 파괴
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // 데이터 형식을 'label'과 'value'로 합산
    const calculatedTotals = data.reduce((acc, item) => {
      acc[item.label] = (acc[item.label] || 0) + item.value;
      return acc;
    }, {});

    const totalSum = Object.values(calculatedTotals).reduce((a, b) => a + b, 0);

    // 0원 항목 제거 및 퍼센트 계산
    const initialInfo = Object.keys(calculatedTotals)
      .filter(label => calculatedTotals[label] > 0)
      .map(label => {
        const value = calculatedTotals[label];
        const percentage = totalSum > 0 ? ((value / totalSum) * 100).toFixed(1) : 0;
        return { label, value, percentage };
      });
    setSelectedInfo(initialInfo);

    // 카테고리별 색상 설정 (필요에 따라 색상 배열 조정)
    const backgroundColors = [
      '#15B8FF', '#FFD600', '#6dd3ff', '#F78CA0', '#43A311', 
      '#FF9E9E', '#121212', '#888', '#36E0C5', '#FEAE5E'
    ];

    // Pie 차트 인스턴스 생성
    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item.label).filter(label => calculatedTotals[label] > 0),
        datasets: [
          {
            data: data.map(item => item.value).filter((value, index) => calculatedTotals[data[index].label] > 0),
            backgroundColor: backgroundColors.slice(0, data.length),
            hoverOffset: 4,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false, // 툴팁 비활성화
          },
          legend: {
            display: false, // 범례 비활성화
          },
        },
        onClick: () => {
          setActive(prev => !prev); // active 상태 토글
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

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