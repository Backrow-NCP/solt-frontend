import React, { useEffect, useRef } from 'react';
import { PopupContainer, CloseButton } from '../../styles/board/planPopup';

const PlanPopup = ({ onClose, style }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      // 팝업과 플랜 선택 버튼 클릭을 구분하여 처리
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
        <h2>플랜 선택 팝업</h2>
        <p>여기에서 플랜을 선택하세요.</p>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
        <h4>스크롤 예시</h4>
      </div>
    </PopupContainer>
  );
};

export default PlanPopup;
