import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Area01 from '../../assets/images/bn/survey_area_01.jpg';
import Area02 from '../../assets/images/bn/survey_area_02.jpg';
import Area03 from '../../assets/images/bn/survey_area_03.jpg';
import Area04 from '../../assets/images/bn/survey_area_04.jpg';
import Area05 from '../../assets/images/bn/survey_area_05.jpg';
import Area06 from '../../assets/images/bn/survey_area_06.jpg';
import Area07 from '../../assets/images/bn/survey_area_07.jpg';
import Area08 from '../../assets/images/bn/survey_area_08.jpg';
import Area09 from '../../assets/images/bn/survey_area_09.jpg';
import Area10 from '../../assets/images/bn/survey_area_10.jpg';

const SurveyArea = ({ onAreaSelect, selectedArea }) => {
  // list
  const areas = [
    { id: 1, name: '서울특별시', imgSrc: Area01, disabled: false },
    { id: 2, name: '부산광역시', imgSrc: Area02, disabled: true },
    { id: 3, name: '제주도', imgSrc: Area03, disabled: true },
    { id: 4, name: '인천광역시', imgSrc: Area04, disabled: true },
    { id: 5, name: '강원도', imgSrc: Area05, disabled: true },
    { id: 6, name: '대전광역시', imgSrc: Area06, disabled: true },
    { id: 7, name: '광주광역시', imgSrc: Area07, disabled: true },
    { id: 8, name: '울산광역시', imgSrc: Area08, disabled: true },
    { id: 9, name: '세종특별자차시', imgSrc: Area09, disabled: true },
    { id: 10, name: '경기도', imgSrc: Area10, disabled: true },
  ];

  const [selectedAreaState, setSelectedArea] = useState(selectedArea || '서울특별시');

	// 선택된 지역 초기화
  useEffect(() => {
    setSelectedArea(selectedArea || '서울특별시');
  }, [selectedArea]);

  // 비활성화 안내
  const handleClick = (area) => {
    if (area.disabled) {
      alert(`${area.name}는 서비스 준비중입니다 😊`);
    } else {
      // 데이터 전달
      setSelectedArea(area.name);
      onAreaSelect(area.name);
    }
  };

  return (
    <Area className="survey_cont">
      <ul className="area_list flex">
        {areas.map((area) => (
          <li key={area.id} className={selectedAreaState === area.name ? "active" : "disabled"}>
            <button onClick={() => handleClick(area)}>
              <span>{area.name}</span>
              <img src={area.imgSrc} alt={area.name} />
            </button>
          </li>
        ))}
      </ul>
    </Area>
  );
};

export default SurveyArea;

const Area = styled.div`
  .area_list {
    gap: 16px;

    li {
      flex-grow: 1;
      flex-basis: calc(20% - 16px);
      max-width: 20%;

      button {
        overflow: hidden;
        display: block;
        position: relative;
        border-radius: 16px;

        span {
          position: absolute;
          z-index: 1;
          bottom: 16px;
          left: 16px;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }
      }

      &.disabled {
        opacity: 0.5;
      }
    }
  }
`;