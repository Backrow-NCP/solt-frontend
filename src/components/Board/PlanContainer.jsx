import React from 'react';
import PropTypes from 'prop-types';

import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
} from '../../styles/board/planContainer';
import itaewonImage from '../../assets/images/bn/area1.jpg';
import jamsilImage from '../../assets/images/bn/area2.jpg';
import gangnamImage from '../../assets/images/bn/area3.jpg';
import jongroImage from '../../assets/images/bn/area4.jpg';
import hongdaeImage from '../../assets/images/bn/area5.jpg';

const PlanContainer = ({ plan, children, planData }) => {
  // 지역에 따른 이미지를 반환하는 함수
  const getImageForArea = area => {
    switch (area) {
      case '이태원':
        return itaewonImage;
      case '잠실':
        return jamsilImage;
      case '강남':
        return gangnamImage;
      case '종로':
        return jongroImage;
      case '홍대':
        return hongdaeImage;
      default:
        return '/images/default.jpg';
    }
  };
  console.log('planData PlanContainer', planData);

  return (
    <PlanCard style={{ backgroundImage: `url(${getImageForArea(plan.area)})` }}>
      <PlanDetails>
        <p className="plan_date weight_sb">{`${planData[0].startDate} ~ ${planData[0].endDate}`}</p>
      </PlanDetails>
      <PlanName>
        <h2 className="plan_title weight_sb">{planData[0].title}</h2>
      </PlanName>
      <PlanActions>{children}</PlanActions>
    </PlanCard>
  );
};

PlanContainer.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    area: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default PlanContainer;

//해당하는 플랜의 데이터를 전부 받아온 뒤, plan.title, startDate, endDate, 이미지는
