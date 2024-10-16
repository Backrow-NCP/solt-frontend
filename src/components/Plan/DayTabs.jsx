import styled from 'styled-components';

// 날짜 탭
const DayTab = ({ days, selectedDay, onTabClick }) => {
  return (
    <Tab className="tab_date flex pt_gy size_sm weight_b">
      {days.map((day, index) => (
        <li
          key={index}
          className={selectedDay === index + 1 ? 'active' : ''}
          onClick={() => onTabClick(index)}
        >
          Day {index + 1}
        </li>
      ))}
    </Tab>
  );
}

export default DayTab;

const Tab = styled.ul`
  flex-wrap: nowrap;
  gap: 32px;
  margin: 40px 0 20px;

  > li {
    cursor: pointer;

    &.active {
      color: #121212;
    }
  }
`;