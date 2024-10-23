import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
} from '../../styles/board/planContainer';

// 각 지역에 맞는 이미지를 import
import seoulImage from '../../assets/images/bn/area2.jpg';

const PlanContainer = ({ plan, children, EditModePlanData }) => {
  // 지역에 따라 이미지를 반환하는 함수
  const getImageForLocation = area => {
    return seoulImage; // 모든 경우에 서울 이미지 반환
  };

  useEffect(() => {
    console.log('plan container 에서 찍는 콘솔', EditModePlanData);
  }, [EditModePlanData]); // EditModePlanData가 변경될 때마다 실행

  // plan 객체가 존재하는 경우와 EditModePlanData의 첫 번째 요소가 존재하는 경우 처리
  const activePlan =
    EditModePlanData && EditModePlanData.length > 0
      ? EditModePlanData[0]
      : plan;

  return (
    <PlanCard
      key={activePlan.id} // 고유한 키 필요
      style={{
        backgroundImage: `url(${getImageForLocation(activePlan.location)})`,
      }}
    >
      <PlanDetails>
        <p className="plan_date weight_sb">{`${activePlan.startDate} ~ ${activePlan.endDate}`}</p>
      </PlanDetails>
      <PlanName>
        <h2 className="plan_title weight_sb">{activePlan.title}</h2>
      </PlanName>
      <PlanActions>{children}</PlanActions>
    </PlanCard>
  );
};

PlanContainer.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
  EditModePlanData: PropTypes.arrayOf(
    PropTypes.shape({
      planId: PropTypes.number,
      location: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default PlanContainer;
