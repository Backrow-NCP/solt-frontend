import { useEffect, useState, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import apiClient, { setupInterceptors } from '../../config/AxiosConfig';
import PlanComplete from '../../styles/plan/complete';

import Button from '../../components/Button';
import PlaceComplete from '../../components/Plan/PlaceComplete';
import Download from './Download';

const Complete = ({ onLoginClick }) => {
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const hiddenPageRef = useRef(null);

  // 스토리지에 있는 planData 가져오기
  useEffect(() => {
    setupInterceptors(setLoading);
    try {
      const planData = sessionStorage.getItem('planData');
      if (planData) {
        const parsedPlan = JSON.parse(planData);
        setPlan(parsedPlan);
        setPlaces(parsedPlan.places);
        console.log('세션 스토리지에서 데이터를 성공적으로 가져왔습니다.');
      } else {
        console.error('세션 스토리지에 planData 데이터가 없습니다.');
      }
    } catch (err) {
      console.error(
        '세션 스토리지에서 데이터를 가져오는 중 오류가 발생했습니다.',
        err
      );
    }
  }, []);

  // 날짜별로 장소 그룹화
  const groupedPlaces = places.reduce((acc, place) => {
    const date = new Date(place.startTime).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(place);
    return acc;
  }, {});

  // 날짜별 금액 계산
  const getDayTotalPrice = dayPlaces => {
    return dayPlaces.reduce((acc, place) => acc + place.price, 0);
  };

  const daysCount = Object.keys(groupedPlaces).length;

  // 총 금액 계산
  const totalPrice = useMemo(() => {
    return places.reduce((acc, place) => acc + place.price, 0);
  }, [places]);

  // 슬릭 설정
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: daysCount > 3 ? 4 : daysCount || 1,
    slidesToScroll: 1,
    swipe: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: daysCount > 3 ? 2 : daysCount || 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // 전체 화면
  const handleFullView = () => {
    document.querySelector('.btn_view').style.display = 'none';
    document.querySelector('.slick-slider').classList.add('full');
  };

  // PDF 저장
  const handleDownloadPDF = async () => {
    // 로그인 여부
    const token = localStorage.getItem('token');
    if (!token) {
      alert('플랜 저장은 로그인 시 가능합니다.');
      onLoginClick();
      return;
    }

    const input = hiddenPageRef.current;
    if (!input) {
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
      return;
    }

    const dayElements = input.querySelectorAll('.plan_day');
    if (dayElements.length === 0) {
      alert('PDF에 추가할 일정이 없습니다.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const availableWidth = pdfWidth - 20;

    try {
      // 중복제거 (짝수 페이지 삭제)
      for (let i = 0; i < dayElements.length; i++) {
        if (i % 2 === 0) {
          const dayElement = dayElements[i];
          try {
            const canvas = await html2canvas(dayElement, {
              scale: 2,
              useCORS: true,
              willReadFrequently: true,
            });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            if (i > 0) pdf.addPage();

            const imgWidth = availableWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
          } catch (error) {
            alert(
              `일정 ${i + 1} 페이지를 PDF로 저장하는 중 오류가 발생했습니다.`
            );
          }
        }
      }
      pdf.save(`plan_solt.pdf`);
    } catch (error) {
      alert('PDF 생성 중 오류가 발생했습니다.');
    }
  };

  // 마이페이지 저장
  const handleSaveToMyPage = async () => {
    // 로그인 여부 확인
    const token = localStorage.getItem('token');
    if (!token) {
      alert('플랜 저장은 로그인 시 가능합니다.');
      onLoginClick();
      return;
    }

    try {
      const planData = JSON.parse(sessionStorage.getItem('planData'));
      if (!planData) {
        alert('플랜 데이터가 없습니다.');
        return;
      }

      // 서버로 플랜 데이터 전송
      let response = null;
      if (planData.planId) {
        // PlanId가 있으면 PUT 요청
        const newPlanData = {
          ...planData,
          themes: planData.themes.map(theme => theme.themeId),
        };
        console.log('수정 중...', newPlanData);
        response = await apiClient.put(
          `/plans/${newPlanData.planId}`,
          newPlanData
        );
      } else {
        // 없으면 POST 요청
        const newPlanData = {
          ...planData,
          places: planData.places.map(place => {
            place.placeId = null;
            return place;
          }),
          routes: planData.routes.map(route => {
            route.routeId = null;
            return route;
          }),
          themes: planData.themes.map(theme => theme.themeId),
        };
        console.log('저장 중...', newPlanData);
        response = await apiClient.post('/plans/', newPlanData);
      }

      if (response && response.status === 200) {
        alert('플랜이 마이페이지에 저장되었습니다!');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <PlanComplete id="plan_complete">
        <h2>
          {plan?.member.name || '여행자'} 님의{' '}
          <span className="pt_blue">{plan?.area}</span> 여행 플랜이에요
        </h2>
        <div className="price flex pt_pink">
          <span className="size_sm weight_sb">예상 총 금액</span>
          <strong>
            <span>{totalPrice.toLocaleString()}</span>원
          </strong>
        </div>

        {/* 날짜별 일정 표시 */}
        {daysCount > 1 ? (
          <Slider {...settings}>
            {Object.entries(groupedPlaces).map(
              ([date, dayPlaces], dayIndex) => (
                <div key={dayIndex}>
                  <PlaceComplete
                    dayPlaces={dayPlaces}
                    plan={plan}
                    getDayTotalPrice={getDayTotalPrice}
                  />
                </div>
              )
            )}
          </Slider>
        ) : (
          //[영훈 수정] 일정이 하루면 슬라이드 없게 수정
          <div
            style={{
              maxWidth: '800px',
              minWidth: '300px',
              width: '50%',
              margin: '0 auto',
            }}
          >
            {Object.entries(groupedPlaces).map(
              ([date, dayPlaces], dayIndex) => (
                <div key={dayIndex}>
                  <PlaceComplete
                    dayPlaces={dayPlaces}
                    plan={plan}
                    getDayTotalPrice={getDayTotalPrice}
                  />
                </div>
              )
            )}
          </div>
        )}

        {/* [영훈 수정] 일정이 하루일 때 전체보기 안보이게 수정 */}
        {daysCount > 1 && (
          <button
            className="btn_view pt_gy size_md weight_md"
            onClick={handleFullView}
          >
            전체 화면 보기
          </button>
        )}

        {/* <button
          className="btn_view pt_gy size_md weight_md"
          onClick={handleFullView}
        >
          전체 화면 보기
        </button> */}

        <div className="button_box inner flex">
          <Button
            size="xxl"
            color="white"
            style={{ borderColor: '#eee' }}
            className="weight_md"
            onClick={handleDownloadPDF}
          >
            PDF로 저장
          </Button>
          <Button
            size="xxl"
            color="blue"
            className="weight_md"
            onClick={handleSaveToMyPage}
          >
            마이페이지에 저장
          </Button>
        </div>
      </PlanComplete>

      {/* 캡쳐 영역 */}
      <Download
        ref={hiddenPageRef}
        groupedPlaces={groupedPlaces}
        getDayTotalPrice={getDayTotalPrice}
      />
    </>
  );
};

export default Complete;
