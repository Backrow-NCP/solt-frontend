import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import PlaceComplete from '../../components/Plan/PlaceComplete';

const Download = React.forwardRef(({ groupedPlaces, getDayTotalPrice }, ref) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // 세션 스토리지에서 'planTest' 데이터를 가져오기
    const storedPlan = sessionStorage.getItem('planTest');
    if (storedPlan) {
      const parsedPlan = JSON.parse(storedPlan);
      setPlan(parsedPlan);
    } else {
      console.error('세션 스토리지에 planTest 데이터가 없습니다.');
    }
  }, []);

  return (
    <PDF ref={ref}>
      {Object.entries(groupedPlaces).map(([date, dayPlaces], index) => (
        <div key={index} className="plan_day">
          {plan && (
            <PlaceComplete 
              dayPlaces={dayPlaces} 
              plan={plan} 
              getDayTotalPrice={getDayTotalPrice} 
            />
          )}
        </div>
      ))}
    </PDF>
  );
});

export default Download;

const PDF = styled.div`
  position: absolute;
  top: -100000px;
  left: 0;
  width: 210mm;
  padding: 10mm;
  box-sizing: border-box;

  .plan_day {
    text-align: center;
    margin-bottom: 40mm;
  }
`;
