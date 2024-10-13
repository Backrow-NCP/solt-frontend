import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import planData from '../../mock/planProduce.json'; // 임시 데이터
import Button from '../../components/Button';
import PlanComplete from '../../styles/plan/complete';
import transportBus from '../../assets/images/ico/transport_bus_gy.svg';
import transportRun from '../../assets/images/ico/transport_run_gy.svg';

const Complete = () => {
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    try {
      setPlan(planData);
      setPlaces(planData.place);
    } catch (err) {
      console.error('데이터 로딩 중 오류가 발생했습니다.');
    }
  }, []);

  // 날짜별로 장소 그룹화
  const groupedPlaces = useMemo(() => {
    if (!places) return {};

    return places.reduce((acc, place) => {
      const date = new Date(place.startTime).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(place);
      return acc;
    }, {});
  }, [places]);

  const daysCount = Object.keys(groupedPlaces).length;

  // 총 금액 계산
  const totalPrice = useMemo(() => {
    return places.reduce((acc, place) => acc + place.price, 0);
  }, [places]);

  // 날짜별 금액 계산
  const getDayTotalPrice = (dayPlaces) => {
    return dayPlaces.reduce((acc, place) => acc + place.price, 0);
  };

  // 슬릭 설정
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: daysCount > 3 ? 4 : daysCount,
    slidesToScroll: 1,
    swipe: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: daysCount > 3 ? 2 : daysCount,
					slidesToScroll: 1,
				},
			},
		],
  };

	// 전체 화면
	const handleFullView = () => {
		document.querySelector('.btn_view').style.display = 'none';
		document.querySelector('.slick-slider').classList.add('full');
	}

  // PDF 저장
  const handleDownloadPDF = () => {
    const input = document.getElementById('plan_complete');
    if (!input) return;

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${plan.title}.pdf`);
      })
      .catch((err) => console.error('PDF 생성 실패:', err));
  };

  // 마이페이지 저장
  const handleSaveToMyPage = async () => {
    try {
      const response = await axios.post('/api/savePlan', { planId: plan.planId });
      if (response.status === 200) {
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
    <PlanComplete id="plan_complete">
      <h2>
				{planData.member.name} 님의 <span className="pt_blue">{plan?.area}</span> 여행 플랜이에요
      </h2>
      <div className="price flex pt_pink">
        <span className="size_sm weight_sb">예상 총 금액</span>
        <strong>
          <span>{totalPrice.toLocaleString()}</span>원
        </strong>
      </div>

			{/* 슬라이드 */}
      <Slider {...settings}>
        {Object.entries(groupedPlaces).map(([date, dayPlaces], dayIndex) => (
          <DaySlide key={dayIndex}>
            <h3 className="size_md">Day {dayIndex + 1}</h3>
            <p className="day_price pt_blue size_xs">총 예상 금액 {getDayTotalPrice(dayPlaces).toLocaleString()}원</p>

            <ol>
              {dayPlaces.map((place, index) => {
                const nextPlace = dayPlaces[index + 1];
                const route = nextPlace
                  ? plan.route.find(
                      (r) => r.startPlaceId === place.placeId && r.endPlaceId === nextPlace.placeId
                    )
                  : null;

                return (
                  <li key={place.placeId} className="flex">
                    <div className="place_number size_xxs">{index + 1}</div>
                    <div className="place_info">
                      <span className="place_time pt_blue size_xxs weight_sb">{new Date(place.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <strong className="place_name size_sm weight_sb">{place.placeName}</strong>
                      <span className="place_category size_xxs pt_gy">{place.category}</span>
                      
                      {/* 이동수단 영역 */}
                      {route && (
                        <div className="transport_info flex size_xxs pt_gy">
                          <img src={route.transport.type === '도보' ? transportRun : transportBus} alt={route.transport.type} />
                          <span>{route.transport.type}</span>
                          <span>{route.travelTime}분</span>
                          <span>({route.distance}km)</span>
                        </div>
                      )}
                    </div>
                    <div className="place_price">
                      <p className="size_xxs weight_md">예상 금액</p>
                      <span className="pt_pink size_sm weight_sb">{place.price.toLocaleString()}원</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </DaySlide>
        ))}
      </Slider>

			<button className="btn_view pt_gy size_md weight_md" onClick={handleFullView}>전체 화면 보기</button>

      <div className="button_box flex">
        <Button size="xxl" color="white" style={{ borderColor: '#eee' }} className="weight_md" onClick={handleDownloadPDF}>
          PDF로 저장
        </Button>
        <Button size="xxl" color="blue" className="weight_md" onClick={handleSaveToMyPage}>
          마이페이지에 저장
        </Button>
      </div>
    </PlanComplete>
  );
};

const DaySlide = styled.div``;

export default Complete;

