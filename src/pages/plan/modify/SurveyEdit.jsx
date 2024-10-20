import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../../../config/AxiosConfig';

// 컴포넌트
import SurveyCommon from '../../../styles/plan/survey';
import SurveyCalendar from '../../../components/Survey/SurveyCalendar';
import Button from '../../../components/Button';
import PrevBtn from '../../../assets/images/ico/btn_survey_prev.svg';
import Loading from '../Loading';

const SurveyEdit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('여행자');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [answers, setAnswers] = useState({
    calendar: null,
  });
  const [loading, setLoading] = useState(false);
  const [planDuration, setPlanDuration] = useState(0);
  const [planData, setPlanData] = useState(null);
  const { planId } = useParams();

  useEffect(() => {
    setupInterceptors(setLoading);
    getPlanData();
  }, []);

  const getPlanData = () => {
    if (planId) {
      apiClient.get(`/plans/${planId}`).then(res => {
        const fetchedData = res.data;
        setPlanData(fetchedData);

        const calculatedDuration =
          (new Date(fetchedData.endDate) - new Date(fetchedData.startDate)) /
            (1000 * 60 * 60 * 24) +
          1;

        setPlanDuration(calculatedDuration);
        setUsername(fetchedData?.member?.name || username);
      }).catch(console.error);
    }
  };

  // 날짜 선택
  const handleDateSelect = (selectedDates) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      calendar: selectedDates,
    }));
  };

  // 버튼 비활성화 여부
  const isNextButtonDisabled = () => {
    return !answers.calendar;
  };

  // Axios
  const handleFinish = async () => {
		try {
      const newPlan = editPlanDays(planData, new Date(answers.calendar[0]));

			// 전송할 데이터
			const data = {
        ...planData,
				startDate: answers.calendar[0],
				endDate: answers.calendar[1],
			};

			// 세션 스토리지에 저장
			sessionStorage.setItem('planData', JSON.stringify(data));

			// 이동
			navigate('/plan/produce');
		} catch (error) {
			console.error('서버 요청 오류 발생: ', error);
		}
	};

  // 버튼 렌더링
  const renderButtons = () => {
    return (
      <>
        <button onClick={() => navigate(-1)} className="btn_prev">
          <img src={PrevBtn} alt="이전 페이지" />
        </button>
        <Button size="xxl" color="pink" onClick={handleFinish} disabled={isNextButtonDisabled()}>
          여행 일정 확인하기
        </Button>
      </>
    );
  };

  if (loading) return <Loading />;

  return (
    <SurveyCommon className="inner">
      <div className="title">
        <h2>
          {username} 님의<br />
          <span className="pt_blue">여행 일정을 조정</span>해 볼게요
        </h2>
        <p className="pt_gy size_md">막막한 계획 짜기, AI 소금이가 대신 해드릴게요!</p>
      </div>

      <div className="survey_box">
        <h3 className="size_xl weight_b">여행 기간을 선택해 주세요</h3>

        {/* 날짜 선택 렌더링 */}
        <SurveyCalendar onDateSelect={handleDateSelect} selectedDates={answers.calendar} planDuration={planDuration} />
      </div>

      {/* 버튼 */}
      <div className="button flex">
        {renderButtons()}
      </div>
    </SurveyCommon>
  );
};

const editPlanDays = (plan, newStartDate) => { 
  const originalStartDate = new Date(plan.startDate);
  const dateDifferenceInDays = Math.floor((newStartDate - originalStartDate) / (1000 * 60 * 60 * 24));

  const updatedPlaces = plan.places.map(place => {
      const updatedStartTime = new Date(place.startTime);
      updatedStartTime.setDate(updatedStartTime.getDate() + dateDifferenceInDays + 1);

      const updatedEndTime = new Date(place.endTime);
      updatedEndTime.setDate(updatedEndTime.getDate() + dateDifferenceInDays + 1);

      return {
          ...place,
          startTime: formatToLocalISO(updatedStartTime),
          endTime: formatToLocalISO(updatedEndTime),
      };
  });

  const updatedRoutes = plan.routes.map(route => {
      const updatedStartTime = new Date(route.startTime);
      updatedStartTime.setDate(updatedStartTime.getDate() + dateDifferenceInDays);

      const updatedEndTime = new Date(route.endTime);
      updatedEndTime.setDate(updatedEndTime.getDate() + dateDifferenceInDays);

      return {
          ...route,
          startTime: formatToLocalISO(updatedStartTime),
          endTime: formatToLocalISO(updatedEndTime),
      };
  });

  const newPlan = {
      ...plan,
      places: updatedPlaces,
      routes: updatedRoutes,
  };

  return newPlan;
};

  /** 시간을 로컬 시간대로 ISO 형식으로 변환 **/
const formatToLocalISO = (date) => {
  const offset = date.getTimezoneOffset() * 60000; // 로컬 시간대 오프셋 계산
  const localDate = new Date(date.getTime() - offset); // 오프셋 적용
  return localDate.toISOString().slice(0, -1); // 마지막 'Z' 제거
};

export default SurveyEdit;
