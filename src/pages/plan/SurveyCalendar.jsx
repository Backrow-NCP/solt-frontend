import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { startOfToday, isSameDay, isBefore, isAfter, differenceInDays } from 'date-fns'; // differenceInDays 추가
import { ko } from 'date-fns/locale'; // 한국어 로케일 불러오기

const SurveyCalendar = ({ onDateSelect, selectedDates  }) => {
  const [dateRange, setDateRange] = useState(selectedDates || [null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    setDateRange(selectedDates || [null, null]); // 선택된 날짜가 있으면 초기화
  }, [selectedDates]);

  const handleDateChange = (update) => {
    const [newStartDate, newEndDate] = update;

    // 종료 날짜가 선택되었을 때, 최대 5일 이내로 제한
    if (newStartDate && newEndDate && differenceInDays(newEndDate, newStartDate) > 4) {
      alert("최대 5일까지만 선택할 수 있습니다.");
      return;
    }

    setDateRange(update);
    if (newStartDate && newEndDate) {
      onDateSelect(update);
    }
  };

  // 각 날짜에 스타일을 적용하는 함수
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
    <div className="survey_cont">
      <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          minDate={startOfToday()} // 오늘 날짜부터 선택 가능
          selectsRange // 시작과 끝 날짜를 한 번에 선택
          monthsShown={2} // 두 개의 달력 표시
          inline // 달력을 인라인으로 표시
          dayClassName={dayClassName} // 각 날짜에 스타일 적용
          locale={ko} // 한국어 로케일 설정
          dateFormat="yyyy년 MM월" // 원하는 날짜 형식
          formatWeekDay={(day) => day.substr(0, 1)} // 요일 형식: "일월화수목금토"
          showYearDropdown // 연도를 드롭다운 형식으로 변경
          showMonthDropdown // 월을 드롭다운 형식으로 변경
          dropdownMode="select" // 드롭다운 모드로 설정
      />
    </div>
  );
};

export default SurveyCalendar;
