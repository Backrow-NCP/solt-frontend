import React from 'react';
import PropTypes from 'prop-types';

import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
} from '../../styles/board/planContainer';
import seoulImage from '../../assets/images/bn/plan_load_02.jpg'; // 서울 이미지를 임포트

const PlanContainer = ({ plan, children }) => {
  // location이 "string"이면 seoulImage 반환, 그렇지 않으면 기본 이미지
  const getImageForLocation = location => {
    if (location === 'string') {
      return seoulImage;
    } else {
      return '/images/default.jpg';
    }
  };

  return (
    <>
      {
        <PlanCard
          key={plan.planId} // 고유한 키 필요
          style={{
            backgroundImage: `url(${getImageForLocation(plan.location)})`,
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
