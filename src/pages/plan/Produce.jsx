import { useEffect, useState } from 'react';
import Loading from './Loading';
import styled from 'styled-components';
import planTime from '../../utils/plan/planTime';
import PieChart from '../../components/Plan/PieChart';
import memberData from '../../mock/member.json'; // 임시 데이터
import planData from '../../mock/planProduce.json'; // 임시 데이터

const Produce = () => {

  // 회원 이름
  const [userName, setUserName] = useState('여행자');
  useEffect(() => {
    setUserName(memberData.firstName);
  }, []);

  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]); // places 초기화
  const [combinedList, setCombinedList] = useState([]); // combinedList 상태 추가
  const [editMode, setEditMode] = useState({}); // 각 장소별로 입력 필드의 활성화 여부 관리
  const [editScheduleMode, setEditScheduleMode] = useState({}); // 일정 수정 버튼 상태 추가

  // 플랜 임시데이터 불러오기
  useEffect(() => {
    setPlan(planData);
    setPlaces(planData.place); // places 상태를 planData.place로 초기화

    // combinedList 생성
    const newCombinedList = [];
    planData.place.forEach((place, i) => {
      newCombinedList.push({ type: 'place', data: place });

      if (i > 0 && i < planData.route.length) {
        newCombinedList.push({ type: 'route', data: planData.route[i - 1] });
      }
    });
    
    setCombinedList(newCombinedList); // combinedList를 상태로 저장
  }, []);

  // 금액 변경 처리 함수
  const handlePriceChange = (placeId, newPrice) => {
    const updatedPlaces = places.map(place => {
      if (place.placeId === placeId) {
        return { ...place, price: newPrice }; // 금액 변경
      }
      return place;
    });

    // places 상태 업데이트
    setPlaces(updatedPlaces);

    // combinedList에서 place 금액을 업데이트
    const updatedCombinedList = combinedList.map(item => {
      if (item.type === 'place' && item.data.placeId === placeId) {
        return {
          ...item,
          data: { ...item.data, price: newPrice } // combinedList에서도 place 금액 변경
        };
      }
      return item;
    });

    setCombinedList(updatedCombinedList); // 업데이트된 combinedList를 상태로 반영
  };

  // 금액 수정 활성화/비활성화 처리 함수
  const toggleEditMode = (placeId) => {
    setEditMode((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId], // 해당 placeId의 editMode 상태 토글
    }));
  };

  // 일정 수정 활성화/비활성화 처리 함수
  const toggleEditScheduleMode = (placeId) => {
    setEditScheduleMode((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId], // 해당 placeId의 일정 수정 상태 토글
    }));
  };

  // 로딩 상태
  if (!plan) return <Loading />;

  return (
    <PlanContainer>
      <>
        <div className="plan_info">
          <span>솔트 AI 플래너</span>
          <h2>{userName} 님의 <span>{plan.area}</span> 여행 플랜</h2>
          <div className="">
            <span>예상 총 금액</span>
            <strong>{places.reduce((acc, place) => acc + place.price, 0).toLocaleString()}원</strong>
          </div>

          {/* 원그래프 */}
          <PieChart data={places} />
        </div>

        <ul className="tab flex">
          <li>DAY 1</li>
          <li>DAY 2</li>
          <li>DAY 3</li>
          <li>DAY 4</li>
          <li>DAY 5</li>
        </ul>
        
        <PlanBox>
          <ul>
            {combinedList.map((item, index) => {
              if (item.type === 'place') {
                const place = item.data;
                return (
                  <RouteList key={`place-${place.placeId}`}>
                    <div>
                      <span>{planTime(place.startTime)}</span>
                      <div>
                        <h3>{place.placeName}</h3>
                        <span>{place.category}</span>

                        {/* 이동수단 정보 표시 */}
                        {plan.route[index] && (
                          <div>
                            {/* 이동 수단이 '도보'일 때와 아닐 때 처리 */}
                            {plan.route[index].transport.type === '도보' ? (
                              <>
                                <span><img alt="대중교통" />{plan.route[index].transport.type}</span>
                                <span>{plan.route[index].travelTime}분</span>
                                <span>({plan.route[index].distance}km)</span>
                                <span className="pt_blue">약 {plan.route[index].price}원</span>
                              </>
                            ) : (
                              <>
                                <span><img alt="도보" />{plan.route[index].transport.type}</span>
                                <span>{plan.route[index].travelTime}분</span>
                                <span>({plan.route[index].distance}km)</span>
                              </>
                            )}
                          </div>
                        )}

                        <p>{place.description}</p>
                      </div>

                      <div className="">
                        <span>예상 금액</span>
                        <div>
                          <input
                            value={place.price}
                            onChange={(e) => handlePriceChange(place.placeId, Number(e.target.value))}
                            disabled={!editMode[place.placeId]} // editMode가 false면 비활성화
                          />
                          원
                        </div>
                        <button onClick={() => toggleEditMode(place.placeId)}>
                          {editMode[place.placeId] ? '취소' : '금액 수정'}
                        </button>

                        {/* 일정 수정 버튼 */}
                        <button onClick={() => toggleEditScheduleMode(place.placeId)}>
                          {editScheduleMode[place.placeId] ? '취소' : '일정 수정'}
                        </button>
                      </div>

                      {/* editScheduleMode가 true일 때만 버튼을 보여줌 */}
                      {editScheduleMode[place.placeId] && (
                        <ul>
                          <li><button>직접 쓸래요</button></li>
                          <li><button>다른 추천 받을래요</button></li>
                        </ul>
                      )}
                    </div>
                  </RouteList>
                );
              } else if (item.type === 'route') {
                const route = item.data;
                return (
                  <RouteList key={`route-${index}`}>
                    <div>
                      <span>{`이동수단: ${route.transport.type}, 거리: ${route.distance}km`}</span>
                    </div>
                  </RouteList>
                );
              }
            })}
          </ul>
        </PlanBox>

        <button>일정 추가하기</button>
        <button>플랜 확정</button>
      </>
    </PlanContainer>
  );
};

export default Produce;

const PlanContainer = styled.div`
  padding: 20px;
	width: 568px;
	position: fixed;
	top: 20px;
	left: 20px;
`;

const PlanBox = styled.ol``;

const RouteList = styled.div`
  margin-bottom: 20px;
`;
