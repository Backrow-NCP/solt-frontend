// 완성된 plan 
//마이페이지, 마이플랜, 게시글 작성시에 plan 선택 요소에 이용될 예정

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; 
import {
  PlanCard,
  PlanDetails,
  PlanName,
  PlanActions,
  EditButton,
} from '../styles/PlanContainer';
import itaewonImage from '../assets/images/bn/area1.jpg';
import jamsilImage from '../assets/images/bn/area2.jpg';
import gangnamImage from '../assets/images/bn/area3.jpg';
import jongroImage from '../assets/images/bn/area4.jpg';
import hongdaeImage from '../assets/images/bn/area5.jpg';

const PlanContainer = ({ plan }) => {
  const getImageForArea = (area) => {
    switch (area) {
      case '이태원': return itaewonImage;
      case '잠실': return jamsilImage;
      case '강남': return gangnamImage;
      case '종로': return jongroImage;
      case '홍대': return hongdaeImage;
      default: return '/images/default.jpg';
    }
  };

  return (
    <PlanCard style={{ backgroundImage: `url(${getImageForArea(plan.area)})` }}>
      <PlanDetails>
        <p className="plan-date weight_sb">{`${plan.startDate} ~ ${plan.endDate}`}</p>
        <p className="plan-area weight_sb">{plan.area}</p>
      </PlanDetails>
      <PlanName>
        <h2 className="plan-title weight_sb">{plan.title}</h2>
        <EditButton>✎</EditButton>
      </PlanName>
      <PlanActions>
        <Button color="blue" size="sm">수정</Button>
        <Button color="white" size="sm">삭제</Button>
      </PlanActions>
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
};

export default PlanContainer;
