import React from 'react';
import PropTypes from 'prop-types';

import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
} from '../../styles/board/planContainer';

// 각 지역에 맞는 이미지를 import
import area1Image from '../../assets/images/bn/area1.jpg';
import area2Image from '../../assets/images/bn/area2.jpg';
import area3Image from '../../assets/images/bn/area3.jpg';
import area4Image from '../../assets/images/bn/area4.jpg';
import area5Image from '../../assets/images/bn/area5.jpg';
import area6Image from '../../assets/images/bn/area6.jpg';
import area7Image from '../../assets/images/bn/area7.jpg';


const PlanContainer = ({ plan, children }) => {
  // 지역에 따라 이미지를 반환하는 함수
  const getImageForLocation = (area) => {
    switch (area) {
      case '이태원':
        return area1Image;
      case '잠실':
        return area2Image;
      case '강남':
        return area3Image;
      case '종로':
        return area4Image;
      case '홍대':
        return area5Image;
      case '잠실': // 중복된 지역인 경우에도 커버 가능
        return area6Image;
      default:
        return area7Image; // 다른 지역은 기본 이미지 사용
    }
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
