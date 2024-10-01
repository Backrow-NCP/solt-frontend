import { useEffect, useState } from 'react';
import Loading from './Loading';
import styled from 'styled-components';
import PlanProduce from '../../styles/plan/produce';
import planTime from '../../utils/plan/planTime';
import PieChart from '../../components/Plan/PieChart';
import Button from '../../components/Button';

import memberData from '../../mock/member.json'; // 임시 데이터
import planData from '../../mock/planProduce.json'; // 임시 데이터

import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';

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
    <PlanProduce>

      <PlanContainer className="plan_cont">

        <div className="plan_info">
          <span className="size_sm weight_md pt_blue">솔트 AI 플래너</span>
          <h2>{userName} 님의 <span className="pt_blue">{plan.area}</span> 여행 플랜</h2>

          <div className="price pt_pink">
            <span className="size_sm weight_sb">예상 총 금액</span>
            <strong><span>{places.reduce((acc, place) => acc + place.price, 0).toLocaleString()}</span>원</strong>

						{/* 원그래프 */}
						<PieChart data={places} />
          </div>
        </div>

        <ul className="tab_date flex pt_gy size_sm weight_b">
          <li className="active">Day 1</li>
          <li>Day 2</li>
          <li>Day 3</li>
          <li>Day 4</li>
          <li>Day 5</li>
        </ul>
        
        <PlanBox>
					{combinedList.map((item, index) => {
						if (item.type === 'place') {
							const place = item.data;
							return (
								<RouteList key={`place-${place.placeId}`} className="flex">
									<span className="place_time pt_blue size_xs weight_b">{planTime(place.startTime)}</span>

									<div className="place_info">
										<h3 className="size_md">{place.placeName}</h3>
										<span className="pt_gy size_xs">{place.category}</span>

										{/* 이동수단 정보 표시 */}
										{plan.route[index] && (
											<>
												{/* 이동 수단이 '도보'일 때와 아닐 때 처리 */}
												{plan.route[index].transport.type !== '도보' ? (
													<div className="size_xs weight_md">
														<img src={transportBus} alt="대중교통" />
														<span>{plan.route[index].transport.type}</span>
														<span>{plan.route[index].travelTime}분</span>
														<span>({plan.route[index].distance}km)</span>
														<strong className="pt_blue size_xs weight_sb">약 {plan.route[index].price}원</strong>
													</div>
												) : (
													<div className="size_xs weight_md">
														<img src={transportRun} alt="도보" />
														<span>{plan.route[index].transport.type}</span>
														<span>{plan.route[index].travelTime}분</span>
														<span>({plan.route[index].distance}km)</span>
													</div>
												)}
											</>
										)}

										<p className="desc pt_gy size_xs">{place.description}</p>
									</div>

									<div className="place_price">
										<p className="size_xs weight_md">예상 금액</p>
										<div className="flex">
											<input
												value={place.price}
												onChange={(e) => handlePriceChange(place.placeId, Number(e.target.value))}
												disabled={!editMode[place.placeId]}
											/>
											<span className="pt_pink size_sm weight_b">원</span>
										</div>
										<button onClick={() => toggleEditMode(place.placeId)} className="pt_gy size_xxs">
											{editMode[place.placeId] ? '취소' : '금액 수정'}
										</button>
									</div>

									{/* 일정 수정 버튼 */}
									<button onClick={() => toggleEditScheduleMode(place.placeId)}>
										{editScheduleMode[place.placeId] ? '취소' : '일정 수정'}
									</button>

									{/* editScheduleMode가 true일 때만 버튼을 보여줌 */}
									{editScheduleMode[place.placeId] && (
										<ul className="place_change">
											<li><button>직접 쓸래요</button></li>
											<li><button>다른 추천 받을래요</button></li>
										</ul>
										)}
								</RouteList>
							);
						}
					})}
        </PlanBox>

				<Button
					size="xxl"
					color="white"
					style={{ borderColor: '#eee' }}
				>일정 추가하기</Button>

				<Button
					size="xxl"
					color="blue"
				>플랜 확정</Button>
      </PlanContainer>

			<div className="map" style={{ width: '100%', height: '100vh', background: '#000' }}></div>
    </PlanProduce>
  );
};

export default Produce;

const PlanBox = styled.ol``;
const RouteList = styled.li``;
const PlanContainer = styled.div``;