import React from 'react';
import styled from "styled-components";
import planData from '../../mock/planProduce.json'; // 임시 데이터
import PlaceComplete from '../../components/Plan/PlaceComplete';

const Download = React.forwardRef(({ groupedPlaces, getDayTotalPrice }, ref) => {
  return (
    <PDF ref={ref}>
      {Object.entries(groupedPlaces).map(([date, dayPlaces], index) => (
        <div key={index} className="plan_day">
          <PlaceComplete 
            dayPlaces={dayPlaces} 
            plan={planData} 
            getDayTotalPrice={getDayTotalPrice} 
          />
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