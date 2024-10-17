import { useEffect, useState, useMemo, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import planData from '../../mock/planProduce.json'; // 임시 데이터
import PlanComplete from '../../styles/plan/complete';

import Button from '../../components/Button';
import PlaceComplete from '../../components/Plan/PlaceComplete';
import Download from './Download';

const Complete = () => {
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);
  const hiddenPageRef = useRef(null);

  useEffect(() => {
    try {
      setPlan(planData);
      setPlaces(planData.place);
    } catch (err) {
      console.error('데이터 로딩 중 오류가 발생했습니다.');
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
  const getDayTotalPrice = (dayPlaces) => {
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
    slidesToShow: daysCount > 3 ? 4 : (daysCount || 1),
    slidesToScroll: 1,
    swipe: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: daysCount > 3 ? 2 : (daysCount || 1),
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
						const canvas = await html2canvas(dayElement, { scale: 2, useCORS: true, willReadFrequently: true });
						const imgData = canvas.toDataURL('image/jpeg', 1.0);

						if (i > 0) pdf.addPage();

						const imgWidth = availableWidth;
						const imgHeight = (canvas.height * imgWidth) / canvas.width;

						pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
					} catch (error) {
						console.error(`Error capturing day ${i + 1}:`, error);
						alert(`일정 ${i + 1} 페이지를 PDF로 저장하는 중 오류가 발생했습니다.`);
					}
				}
			}
			pdf.save(`${planData.member.name}_plan.pdf`);
		} catch (error) {
			console.error('PDF 생성 오류:', error);
			alert('PDF 생성 중 오류가 발생했습니다.');
		}
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
    <>
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

        {/* 날짜별 일정 표시 */}
        <Slider {...settings}>
          {Object.entries(groupedPlaces).map(([date, dayPlaces], dayIndex) => (
            <div key={dayIndex}>
              <PlaceComplete dayPlaces={dayPlaces} plan={plan} getDayTotalPrice={getDayTotalPrice} />
            </div>
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

      {/* 캡쳐 영역 */}
      <Download ref={hiddenPageRef} groupedPlaces={groupedPlaces} getDayTotalPrice={getDayTotalPrice} />
    </>
  );
};

export default Complete;
