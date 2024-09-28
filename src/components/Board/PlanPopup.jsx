import React, { useEffect, useRef } from 'react';
import { PopupContainer, CloseButton } from '../../styles/board/planPopup';

const PlanPopup = ({ onClose, style }) => {
  const popupRef = useRef(null); // 팝업 요소를 참조하는 ref

  useEffect(() => {
    // 외부 클릭 감지 핸들러
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // 팝업 외부 클릭 시 onClose 호출
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <PopupContainer ref={popupRef} style={style}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {/* 팝업 내부 내용 */}
      <div>
        <p>플랜 선택 팝업</p>
        <p>여기에서 플랜을 선택하세요.</p>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
        <h2>스크롤 예시</h2>
      </div>
    </PopupContainer>
  );
};

export default PlanPopup;
