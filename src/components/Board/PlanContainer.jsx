import React from 'react';
import PropTypes from 'prop-types';

import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
} from '../../styles/board/planContainer';

// 각 지역에 맞는 이미지를 import

import seoulImage from '../../assets/images/bn/plan_load_02.jpg';

const PlanContainer = ({ plan, children }) => {
  // 지역에 따라 이미지를 반환하는 함수
  const getImageForLocation = area => {
    return seoulImage; // 모든 경우에 서울 이미지 반환
  };

  return (
    <>
      {
        <PlanCard
          key={plan.id} // 고유한 키 필요
          style={{
            backgroundImage: `url(${getImageForLocation(plan.area)})`,
          }}
        >
          <PlanDetails>
            <p className="plan_date weight_sb">{`${plan.startDate} ~ ${plan.endDate}`}</p>
          </PlanDetails>
          <PlanName>
            <h2 className="plan_title weight_sb">{plan.title}</h2>
          </PlanName>
          <PlanActions>{children}</PlanActions>
        </PlanCard>
      }
    </>
  );
};
PlanContainer.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired, // location을 plan의 속성으로 수정
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
  planData: PropTypes.arrayOf(
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
