import React, { useEffect, useRef, useState } from 'react';
import { PopupContainer, CloseButton } from '../../styles/board/planPopup';
import PlanContainer from '../../components/Board/PlanContainer';
import Button from '../Button';
import axios from 'axios';

const PlanPopup = ({ onClose, onSelect, style }) => {
  // onSelect prop 추가
  const popupRef = useRef(null);
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/mock/plan.json');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    fetchPlans();
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <PopupContainer
      ref={popupRef}
      style={style}
      onClick={e => e.stopPropagation()}
    >
      <CloseButton onClick={onClose}>×</CloseButton>
      <div>
        <h2 style={{ padding: 10 }}>공유할 플랜을 선택해 주세요.</h2>
        {plans.length > 0 ? (
          plans.map(plan => (
            <PlanContainer key={plan.id} plan={plan}>
              <Button
                color="blue"
                size="sm"
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                onClick={e => {
                  e.preventDefault(); // 기본 동작 방지
                  onSelect(plan); // 선택한 플랜을 부모 컴포넌트에 전달
                  onClose(); // 팝업 닫기
                }}
              >
                선택
              </Button>
            </PlanContainer>
          ))
        ) : (
          <p>플랜 데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </PopupContainer>
  );
};

export default PlanPopup;
