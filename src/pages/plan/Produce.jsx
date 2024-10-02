import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loading from './Loading';
import styled from 'styled-components';
import PlanProduce from '../../styles/plan/produce';
import planTime from '../../utils/plan/planTime';
import { AdjustPlanScroll, removePlanScroll } from '../../utils/plan/planScroll';
import PieChart from '../../components/Plan/PieChart';
import Button from '../../components/Button';

import memberData from '../../mock/member.json'; // 임시 데이터
import planData from '../../mock/planProduce.json'; // 임시 데이터

import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';
import PlanModifyBtn from '../../assets/images/ico/btn_plan_modify.svg';
import PlanModifyActiveBtn from '../../assets/images/ico/btn_plan_modify_active.svg';

const Produce = () => {
  const [userName, setUserName] = useState('여행자'); // 회원 이름
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [editPrice, setEditPrice] = useState({}); // 일정 예상 금액
  const [editPlace, setEditPlace] = useState({}); // 일정 수정 버튼
  const [isEditing, setIsEditing] = useState(false); // 일정 수정 여부
  const [selectedDay, setSelectedDay] = useState(1); // 날짜 선택

  // 날짜별 일정
  const days = Array.from(new Set(places.map((place) => new Date(place.startTime).toLocaleDateString())));
  // 선택한 날짜 일정만 필터링
  const filteredPlaces = places.filter(
    (place) => new Date(place.startTime).toLocaleDateString() === days[selectedDay - 1]
  );

  // 플랜 임시데이터 불러오기
  useEffect(() => {
    setUserName(memberData.firstName);
    //setPlan(planData);

		// 로딩 테스트~
		const timer = setTimeout(() => {
      setPlan(planData);
    }, 4000);

    setPlaces(planData.place);

    // combinedList 생성
    const newCombinedList = [];
    planData.place.forEach((place, i) => {
      newCombinedList.push({ type: 'place', data: place });

      if (i > 0 && i < planData.route.length) {
        newCombinedList.push({ type: 'route', data: planData.route[i - 1] });
      }
    });
    setCombinedList(newCombinedList);

    // scroll
    AdjustPlanScroll();
    // scroll 이벤트 제거
    return () => {
      removePlanScroll();
    };
  }, []);

  // 금액 변경 처리
  const handlePriceChange = (placeId, newPrice) => {
    const updatedPlaces = places.map((place) => {
      if (place.placeId === placeId) {
        // 금액 변경
        return { ...place, price: newPrice };
      }
      return place;
    });

    // places 상태 업데이트
    setPlaces(updatedPlaces);

    // 날짜 금액 업데이트
    const updatedCombinedList = combinedList.map((item) => {
      if (item.type === 'place' && item.data.placeId === placeId) {
        return {
          ...item,
          data: { ...item.data, price: newPrice },
        };
      }
      return item;
    });

    setCombinedList(updatedCombinedList);
  };

  // 금액 수정 활성화
  const toggleeditPrice = (placeId) => {
    setEditPrice((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  };

  // 일정 수정 활성화 및 전체 수정 상태 추적
  const toggleeditPlace = (placeId) => {
    setEditPlace((prevState) => {
      const newEditPlace = { ...prevState, [placeId]: !prevState[placeId] };
      const isAnyEditing = Object.values(newEditPlace).some((isEditing) => isEditing);
      setIsEditing(isAnyEditing); // 하나라도 수정 중이면 true
      return newEditPlace;
    });
  };

  // 탭 클릭 시 일정 수정 상태 초기화
  const handleTabClick = (index) => {
    setSelectedDay(index + 1);
    setEditPlace({});
    setIsEditing(false);
  };

  const findRoute = (currentPlaceId, nextPlaceId) => {
		if (!nextPlaceId) return null;
	
		return plan.route.find(
			(route) => route.startPlaceId === currentPlaceId && route.endPlaceId === nextPlaceId
		);
	};

  // 로딩 페이지
  if (!plan) return <Loading />;

  return (
    <PlanProduce>
      <PlanContainer className="plan_cont">
        <div className="plan_info">
          <span className="size_sm weight_md pt_blue">솔트 AI 플래너</span>
          <h2>
            {userName} 님의 <span className="pt_blue">{plan.area}</span> 여행 플랜
          </h2>

          <div className="price pt_pink">
            <span className="size_sm weight_sb">예상 총 금액</span>
            <strong>
              <span>{places.reduce((acc, place) => acc + place.price, 0).toLocaleString()}</span>원
            </strong>

            {/* 원그래프 */}
            <PieChart data={places} />
          </div>
        </div>

        {/* 날짜 탭 */}
        <ul className="tab_date flex pt_gy size_sm weight_b">
          {days.map((day, index) => (
            <li
              key={index}
              className={selectedDay === index + 1 ? 'active' : ''}
              onClick={() => handleTabClick(index)}
            >
              Day {index + 1}
            </li>
          ))}
        </ul>

        <PlanBox>
          {filteredPlaces.map((place, index) => {
            const nextPlace = filteredPlaces[index + 1];
            const route = nextPlace && findRoute(place.placeId, nextPlace.placeId);

            return (
              <RouteList key={`place-${place.placeId}`} className="flex">
                <span className="place_time pt_blue size_xs weight_b">{planTime(place.startTime)}</span>

                <div className="place_info">
                  <h3 className="size_md">{place.placeName}</h3>
                  <span className="pt_gy size_xs">{place.category}</span>

                  {/* 이동수단 영역 */}
                  {route && (
                    <div className="size_xs weight_md">
                      <img src={transportBus} alt="대중교통" />
                      <span>{route.transport.type}</span>
                      <span>{route.travelTime}분</span>
                      <span>({route.distance}km)</span>
                      <strong className="pt_blue size_xs weight_sb">약 {route.price}원</strong>
                    </div>
                  )}

                  <p className="desc pt_gy size_xs">{place.description}</p>
                </div>

                <div className="place_price">
                  <p className="size_xs weight_md">예상 금액</p>
                  <div className="flex">
                    <input
                      value={place.price}
                      onChange={(e) => handlePriceChange(place.placeId, Number(e.target.value))}
                      disabled={!editPrice[place.placeId] || isEditing} // 수정 모드일 때 비활성화
                    />
                    <span className="pt_pink size_sm weight_b">원</span>
                  </div>
                  <button onClick={() => toggleeditPrice(place.placeId)} className="pt_gy size_xxs" disabled={isEditing}>
                    {editPrice[place.placeId] ? '확인' : '금액 수정'}
                  </button>
                </div>

                {/* 일정 수정 버튼 */}
                <button onClick={() => toggleeditPlace(place.placeId)} disabled={isEditing && !editPlace[place.placeId]}>
                  {editPlace[place.placeId] ? (
                    <img src={PlanModifyActiveBtn} alt="비활성화" />
                  ) : (
                    <img src={PlanModifyBtn} alt="일정 수정" />
                  )}
                </button>

                {/* editPlace가 true일 때만 버튼을 보여줌 */}
                {editPlace[place.placeId] && (
                  <ul className="place_change">
                    <li>
                      <button>직접 쓸래요</button>
                    </li>
                    <li>
                      <button>다른 추천 받을래요</button>
                    </li>
                  </ul>
                )}
              </RouteList>
            );
          })}
        </PlanBox>

        <Button size="xxl" color="white" style={{ borderColor: '#eee' }} className="weight_md" disabled={isEditing}>
          일정 추가하기
        </Button>

        <Button size="xxl" color="blue" className="weight_md" disabled={isEditing}>
          플랜 확정
        </Button>
      </PlanContainer>

      
      {/* 구글 맵 */}
			<LoadScript googleMapsApiKey="AIzaSyBMPGhDUUOre8nHwSGv53Xl6K4UtGVPQfc">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '90vh' }} // 스타일 직접 삽입
        center={{ lat: 37.5665, lng: 126.9780 }} // 서울의 중심 좌표
        zoom={12}
      >
        {places.map((place) => (
          <Marker
            key={place.placeId}
            position={{ lat: place.latitude, lng: place.longitude }} // 위도와 경도 사용
            label={place.placeName} // 마커에 라벨 표시
						className="map"
          />
        ))}
      </GoogleMap>
    </LoadScript>

    </PlanProduce>
  );
};

export default Produce;

const PlanBox = styled.ol``;
const RouteList = styled.li``;
const PlanContainer = styled.div``;
