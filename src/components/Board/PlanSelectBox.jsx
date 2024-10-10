import React from 'react';
import { PlanStyledBox } from '../../styles/board/boardForm';
import PlanContainer from '../PlanContainer'; // PlanContainer 임포트

const PlanSelectBox = ({ selectedPlan }) => {
  return (
    <PlanStyledBox>
      {selectedPlan ? (
        <PlanContainer
          plan={selectedPlan}
          style={{
            maxWidth: '90%',
            overflow: 'hidden',
          }}
        />
      ) : (
        '선택된 플랜이 여기에 표시됩니다'
      )}
    </PlanStyledBox>
  );
};

export default PlanSelectBox;
