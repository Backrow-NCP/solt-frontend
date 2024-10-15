import React from 'react';

// 날짜 탭
const DayTab = ({ days, selectedDay, onTabClick }) => {
  return (
    <ul className="tab_date flex pt_gy size_sm weight_b">
      {days.map((day, index) => (
        <li
          key={index}
          className={selectedDay === index + 1 ? 'active' : ''}
          onClick={() => onTabClick(index)}
        >
          Day {index + 1}
        </li>
      ))}
    </ul>
  );
}

export default DayTab;
