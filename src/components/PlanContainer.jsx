// 완성된 plan 
//마이페이지, 마이플랜, 게시글 작성시에 plan 선택 요소에 이용될 예정

// src/components/PlanContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; // Button 컴포넌트 경로에 맞게 import

const PlanContainer = ({ plan, getImageForArea }) => {
  return (
    <div
      className="plan-card"
      style={{
        backgroundImage: `url(${getImageForArea(plan.area)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 왼쪽 영역 (Date, Area) */}
      <div className="plan-details">
        <p className="plan-date weight_sb" style={{ color: 'white' }}>
          {`${plan.startDate} ~ ${plan.endDate}`}
        </p>
        <p className="plan-area weight_sb" style={{ color: 'white' }}>
          {plan.area}
        </p>
      </div>
      <div className="plan-name">
        <h2 className="plan-title weight_sb" style={{ color: 'white' }}>
          {plan.title}
        </h2>
        <button className="edit-btn weight_sb" style={{ color: 'white' }}>
          ✎
        </button>
      </div>
      {/* 오른쪽 영역 (Buttons) */}
      <div className="plan-actions">
        <Button color="blue" size="sm">
          수정
        </Button>
        <Button color="white" size="sm">
          삭제
        </Button>
      </div>
    </div>
  );
};

// PropTypes 설정 (옵션)
PlanContainer.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    area: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  getImageForArea: PropTypes.func.isRequired,
};

export default PlanContainer;
