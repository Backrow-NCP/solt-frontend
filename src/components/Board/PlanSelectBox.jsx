import React from 'react';
import { PlanStyledBox } from '../../styles/board/boardForm';
import PlanContainer from '../Board/PlanContainer'; // PlanContainer 임포트

const PlanSelectBox = ({ selectedPlan, EditModePlanData, isEditMode }) => {
  console.log('isEditMode 확인용', isEditMode);

  return (
    <PlanStyledBox>
      {selectedPlan ? (
        // selectedPlan이 있을 때 PlanContainer에 selectedPlan을 전달
        <PlanContainer
          EditModePlanData={EditModePlanData}
          plan={selectedPlan}
          style={{
            maxWidth: '90%',
            overflow: 'hidden',
          }}
        />
      ) : isEditMode && EditModePlanData ? (
        // selectedPlan이 없지만 isEditMode가 true이고 EditModePlanData가 있을 때 PlanContainer에 EditModePlanData를 전달
        <PlanContainer
          EditModePlanData={EditModePlanData}
          plan={EditModePlanData[0]} // EditModePlanData가 배열이라면 첫 번째 데이터를 사용
          style={{
            maxWidth: '90%',
            overflow: 'hidden',
          }}
        />
      ) : (
        // selectedPlan도 없고 isEditMode도 false일 때 표시
        <p> 선택된 플랜이 없습니다.</p>
      )}
    </PlanStyledBox>
  );
};

export default PlanSelectBox;
