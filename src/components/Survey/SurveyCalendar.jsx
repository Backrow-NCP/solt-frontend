import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { startOfToday, isSameDay, isBefore, isAfter, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

import bottom from '../../assets/images/ico/arrow_bottom.svg'
import left from '../../assets/images/ico/arrow_left.svg'
import right from '../../assets/images/ico/arrow_right.svg'

const SurveyCalendar = ({ onDateSelect, selectedDates  }) => {
  const [dateRange, setDateRange] = useState(selectedDates || [null, null]);
  const [startDate, endDate] = dateRange;

  // 선택된 날짜 초기화
  useEffect(() => {
    setDateRange(selectedDates || [null, null]);
  }, [selectedDates]);

  const handleDateChange = (update) => {
    const [newStartDate, newEndDate] = update;

    // 최대 5일로 제한
    if (newStartDate && newEndDate && differenceInDays(newEndDate, newStartDate) > 4) {
      alert("최대 5일까지만 선택할 수 있습니다.");
      return;
    }

    setDateRange(update);
    if (newStartDate && newEndDate) {
      onDateSelect(update);
    }
  };

  // 스타일 적용
  const dayClassName = date => {
    const today = startOfToday();
    if (isSameDay(date, today)) return 'today-date';
    if (isSameDay(date, startDate))
      return endDate == null || isSameDay(date, endDate)
        ? 'start-date start-date-only'
        : 'start-date';
    if (isSameDay(date, endDate)) return 'end-date';
    if (
      startDate &&
      endDate &&
      isAfter(date, startDate) &&
      isBefore(date, endDate)
    )
      return 'middle-date';
    return '';
  };

  return (
    <Calendar className="survey_cont">
      <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          minDate={startOfToday()}
          selectsRange
          monthsShown={2}
          inline
          dayClassName={dayClassName}
          locale={ko}
          dateFormat="yyyy년 MM월"
          formatWeekDay={(day) => day.substr(0, 1)}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
      />
    </Calendar>
  );
};

export default SurveyCalendar;

const Calendar = styled.div`
  .react-datepicker {
    position: relative;
    font-size: 0;
  }

  .react-datepicker button.react-datepicker__navigation {
    overflow: hidden;
    position: absolute;
    top: -35px;
    z-index: 1;
    width: 10px;
    height: 16px;
    padding: 0;
    border: none;
    text-align: center;
    text-indent: -999em;
    cursor: pointer;
  }

  .react-datepicker__navigation--previous {
    left: 20px;
    background: url(${left}) no-repeat;
  }

  .react-datepicker__navigation--next {
    right: 20px;
    background: url(${right}) no-repeat;
  }

  .react-datepicker__month-container {
    display: inline-block;
    width: 48%;
    padding: 16px 32px;
    background: #fff;
    border-radius: 16px;
    box-sizing: border-box;
    vertical-align: top;
  }

  .react-datepicker__month-container:nth-of-type(1) {
    margin-right: 4%;
  }

  .react-datepicker__month-container:nth-of-type(1) h2 {
    display: none;
  }

  .react-datepicker__header {
    position: relative;
    text-align: left;
  }

  .react-datepicker__header h2 {
    padding: 16px 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    word-spacing: 6px;
  }

  .react-datepicker__header__dropdown {
    font-size: 0;
  }

  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    display: inline-block;
  }

  .react-datepicker__year-dropdown-container {
    margin-left: 10px;
  }

  .react-datepicker__month-dropdown-container select,
  .react-datepicker__year-dropdown-container select {
    padding: 16px 20px 16px 0;
    border: 0;
    outline: 0;
    background: url(${bottom}) right center no-repeat;
    font-size: 20px;
    font-weight: 600;
    appearance: none;
    -webkit-appearance: none;
  }

  .react-datepicker__month-dropdown-container option,
  .react-datepicker__year-dropdown-container option {
    font-size: 16px;
    font-weight: 400;
  }

  .react-datepicker__day-names {
    white-space: nowrap;
    font-size: 0;
    text-align: center;
  }

  .react-datepicker__day-names > div {
    display: inline-block;
    width: 14.285%;
    font-size: 15px;
    color: #121212;
    line-height: 34px;
    text-align: center;
  }

  .react-datepicker__month {
    margin: 0.4rem;
    text-align: center;
  }

  .react-datepicker__week {
    margin-top: 4px;
    font-size: 0;
    white-space: nowrap;
  }

  .react-datepicker__day {
    display: inline-block;
    width: 14.285%;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }

  .today-date {
    font-weight: 500;
    color: #14B8FF;
  }

  .start-date, .end-date, .middle-date {
    background: #14B8FF;
    color: #fff;
  }

  .start-date {
    border-radius: 16px 0 0 16px;
    font-weight: 600;
  }

  .end-date {
    border-radius: 0 16px 16px 0;
    font-weight: 600;
  }

  .start-date-only {
    border-radius: 16px !important;
  }

  .react-datepicker__day--disabled {
    color: #999;
  }
`;