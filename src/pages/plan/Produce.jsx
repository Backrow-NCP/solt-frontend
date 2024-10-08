import { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Loading from './Loading';
import styled from 'styled-components';
import PlanProduce from '../../styles/plan/produce';
import planTime from '../../utils/plan/planTime';
import { AdjustPlanScroll, removePlanScroll } from '../../utils/plan/planScroll';
import PieChart from '../../components/Plan/PieChart';
import Button from '../../components/Button';
import axios from 'axios';
import planData from '../../mock/planProduce.json'; // 임시 데이터
import ModifyData from '../../mock/planModify.json'; // 임시 데이터

import { useNavigate } from 'react-router-dom';

import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';
import PlanModifyBtn from '../../assets/images/ico/btn_plan_modify.svg';
import PlanModifyActiveBtn from '../../assets/images/ico/btn_plan_modify_active.svg';
import Restaurant from '../../assets/images/bn/plan_produce_restaurant.jpg';

const Produce = () => {
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [editPrice, setEditPrice] = useState({}); // 일정 예상 금액
  const [editPlace, setEditPlace] = useState({}); // 일정 수정 버튼
  const [isEditing, setIsEditing] = useState(false); // 일정 수정 여부
  const [selectedDay, setSelectedDay] = useState(1); // 날짜 선택
  const [selectedOption, setSelectedOption] = useState({ option: null, placeId: null }); // 플랜 수정 방법, 수정 아이디
  const [planConfirmed, setPlanConfirmed] = useState(true); // 플랜 확정
  const [selectedRecommendedPlace, setSelectedRecommendedPlace] = useState(null); // ModifyContainer 선택된 장소
  const [autocompleteSelectedPlace, setAutocompleteSelectedPlace] = useState(null); // Autocomplete 선택된 장소
  const [modifiedPlaces, setModifiedPlaces] = useState([]); // 수정된 장소

  const inputRef = useRef(null); // Autocomplete 입력 필드
  const autocompleteRef = useRef(null); // Autocomplete 객체

  const navigate = useNavigate(); // 페이지 네비게이션

  // 날짜별 일정
  const days = Array.from(new Set(places.map((place) => new Date(place.startTime).toLocaleDateString())));
  // 선택한 날짜 일정만 필터링
  const filteredPlaces = places.filter(
    (place) => new Date(place.startTime).toLocaleDateString() === days[selectedDay - 1]
  );

  // 플랜 임시데이터 불러오기
  useEffect(() => {
    setPlan(planData);
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

  // 구글맵 로드
  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // handleSelectRecommendedPlace 함수 정의
  const handleSelectRecommendedPlace = (place) => {
    setSelectedRecommendedPlace(place);
  };

  // handleAutocompleteSelect 함수 정의 (Autocomplete 선택 시)
  const handleAutocompleteSelect = (place) => {
    setAutocompleteSelectedPlace(place);
  };

  // 구글 장소 자동 완성 설정
  useEffect(() => {
    if (isLoaded && !loadError) {
      const initializeAutocomplete = () => {
        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'KR' },
            fields: ['place_id', 'name', 'formatted_address', 'geometry'],
            // types: ['establishment'], // 필요 시 조정
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            console.log('Autocomplete place changed:', place); // 디버깅용 로그
            if (place && place.geometry) {
              const newSelectedPlace = {
                placeId: place.place_id,
                name: place.name,
                address: place.formatted_address,
                // latitude와 longitude 제거
              };
              console.log('Selected place:', newSelectedPlace); // 디버깅용 로그
              setAutocompleteSelectedPlace(newSelectedPlace);
            } else {
              console.log('No geometry found for the selected place.');
            }
            inputRef.current.value = '';
          });
        } else {
          console.log('Autocomplete not initialized: inputRef.current or window.google is missing.');
        }
      };
      initializeAutocomplete();
    }
  }, [isLoaded, loadError]);

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
  const toggleEditPrice = (placeId) => {
    setEditPrice((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  };

  // 일정 수정 버튼 클릭 시 상태 변경
  const toggleModifyPlace = (placeId) => {
    setEditPlace((prevState) => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  };

  // 각 플랜 수정
  const handleModifyClick = (option, placeId) => {
    setIsEditing(true);
    setSelectedOption({ option, placeId });
  };

  // 플랜 수정 취소
  const handleCancelClick = () => {
    setIsEditing(false);
    setSelectedOption({ option: null, placeId: null }); // 객체로 초기화
    setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
    setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
    setEditPlace({}); // place_change 숨기기
  };

  // ModifyContainer의 "이 장소로 선택" 버튼 클릭 시
  const handleSelectClick = async () => {
    if (selectedOption.option === 'recomm' && selectedRecommendedPlace && selectedOption.placeId) {
      // 해당 placeId의 장소 정보 업데이트
      const updatedPlaces = places.map((place) => {
        if (place.placeId === selectedOption.placeId) {
          return {
            ...place,
            placeName: selectedRecommendedPlace.placeName || selectedRecommendedPlace.name,
            startTime: place.startTime, // startTime 유지
            addr: selectedRecommendedPlace.addr || selectedRecommendedPlace.address || place.addr,
            description: selectedRecommendedPlace.description || place.description, // 필요 시 수정
            // latitude와 longitude 제거 또는 업데이트 필요 시 추가
          };
        }
        return place;
      });

      setPlaces(updatedPlaces); // 상태 업데이트

      // 서버로 변경된 데이터 전송
      try {
        await axios.put('/api/updatePlan', {
          ...plan,
          place: updatedPlaces,
        });
        setIsEditing(false);
        setPlanConfirmed(false);
        setSelectedOption({ option: null, placeId: null }); // 객체로 초기화
        setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
        setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
        setEditPlace({}); // place_change 숨기기

        // 수정된 장소를 추적
        setModifiedPlaces((prev) => [...prev, selectedOption.placeId]);
      } catch (error) {
        console.error('플랜 업데이트 실패:', error);
        // 에러 처리 UI 추가 가능
      }
    } else if (selectedOption.option === 'directly' && autocompleteSelectedPlace && selectedOption.placeId) {
      // 직접 수정 옵션 처리
      // 예: 좌표를 가져와 업데이트 (선택 사항)
      // 현재는 latitude와 longitude를 제거했으므로, 필요 시 추가 로직 구현
      const updatedPlaces = places.map((place) => {
        if (place.placeId === selectedOption.placeId) {
          return {
            ...place,
            placeName: autocompleteSelectedPlace.placeName || autocompleteSelectedPlace.name,
            startTime: place.startTime, // startTime 유지
            addr: autocompleteSelectedPlace.addr || autocompleteSelectedPlace.address || place.addr,
            description: autocompleteSelectedPlace.description || place.description, // 필요 시 수정
            // latitude와 longitude 제거 또는 업데이트 필요 시 추가
          };
        }
        return place;
      });

      setPlaces(updatedPlaces); // 상태 업데이트

      // 서버로 변경된 데이터 전송
      try {
        await axios.put('/api/updatePlan', {
          ...plan,
          place: updatedPlaces,
        });
        setIsEditing(false);
        setPlanConfirmed(false);
        setSelectedOption({ option: null, placeId: null }); // 객체로 초기화
        setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
        setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
        setEditPlace({}); // place_change 숨기기

        // 수정된 장소를 추적
        setModifiedPlaces((prev) => [...prev, selectedOption.placeId]);
      } catch (error) {
        console.error('플랜 업데이트 실패:', error);
        // 에러 처리 UI 추가 가능
      }
    }
  };

  // 플랜 확정/수정 버튼 클릭 핸들러
  const handlePlanButtonClick = async () => {
    if (planConfirmed) {
      // 수정이 없는 경우, 서버에 플랜 확정 메시지를 보내고 /plan/complete로 리디렉션
      try {
        await axios.post('/api/confirmPlan', { planId: plan.id }); // API 엔드포인트에 맞게 조정
        navigate('/plan/complete');
      } catch (error) {
        console.error('플랜 확정 실패:', error);
        alert('플랜 확정에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      // 수정이 있는 경우, 이미 서버로 데이터가 전송되었으므로 알림만
      alert('플랜이 수정되었습니다. 플랜을 다시 확정해 주세요.');
      setPlanConfirmed(true);
    }
  };

  // 플랜 확정 버튼 내용 결정
  const planButtonText = planConfirmed ? '플랜 확정하기' : '플랜 수정하기';

  // 탭 클릭 시 일정 수정 상태 초기화
  const handleTabClick = (index) => {
    setSelectedDay(index + 1);
    setEditPlace({});
    setIsEditing(false);
    setSelectedOption({ option: null, placeId: null }); // 객체로 초기화
    setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
    setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
  };

  const findRoute = (currentPlaceId, nextPlaceId) => {
    if (!nextPlaceId) return null;

    return plan.route.find(
      (route) => route.startPlaceId === currentPlaceId && route.endPlaceId === nextPlaceId
    );
  };

  // 에러 처리
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Loading />;

  // 로딩 페이지
  if (!plan) return <Loading />;

	// 추천 장소 식당 노이미지
	const onErrorImg = (e) => {
		e.target.onerror = null;
		e.target.src = Restaurant;
	};

  return (
    <PlanProduce>
      <PlanContainer className="plan_cont">
        <div className="plan_info">
          <span className="size_sm weight_md pt_blue">솔트 AI 플래너</span>
          <h2>
            {plan.member.name} 님의<br />
            <span className="pt_blue">{plan.area}</span> 여행 플랜
          </h2>

          <div className="price pt_pink">
            <span className="size_sm weight_sb">예상 총 금액</span>
            <strong>
              <span>{places.reduce((acc, place) => acc + (place.price || 0), 0).toLocaleString()}</span>원
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
              <li key={`place-${place.placeId}`} className="flex">
                <span className="place_time pt_blue size_xs weight_b">{planTime(place.startTime)}</span>

                <div className="place_info">
                  <h3 className="size_md">{place.placeName}</h3>
                  <span className="pt_gy size_xs">{place.category}</span>

                  {/* 이동수단 영역 */}
                  {route && (
                    <div className="size_xs weight_md">
                      <img src={route.transport.type === '도보' ? transportRun : transportBus} alt={route.transport.type} />
                      <span>{route.transport.type}</span>
                      <span>{route.travelTime}분</span>
                      <span>({route.distance}km)</span>
                      {route.price !== 0 && (
                        <strong className="pt_blue size_xs weight_sb">약 {route.price.toLocaleString()}원</strong>
                      )}
                    </div>
                  )}

                  <p className="desc pt_gy size_xs">{place.description}</p>
                </div>

                <div className="place_price">
                  <p className="size_xs weight_md">예상 금액</p>
                  <div className="flex">
                    <input
                      value={place.price || ''}
                      onChange={(e) => handlePriceChange(place.placeId, Number(e.target.value))}
                      disabled={!editPrice[place.placeId] || isEditing} // 수정 모드일 때 비활성화
                    />
                    <span className="pt_pink size_sm weight_b">원</span>
                  </div>
                  <button onClick={() => toggleEditPrice(place.placeId)} className="pt_gy size_xxs" disabled={isEditing}>
                    {editPrice[place.placeId] ? '확인' : '금액 수정'}
                  </button>
                </div>

                {/* 일정 수정 버튼 */}
                {!modifiedPlaces.includes(place.placeId) && (
                  <button onClick={() => toggleModifyPlace(place.placeId)}>
                    {editPlace[place.placeId] ? (
                      <img src={PlanModifyActiveBtn} alt="일정 수정" />
                    ) : (
                      <img src={PlanModifyBtn} alt="비활성화" />
                    )}
                  </button>
                )}

                {/* editPlace가 true일 때만 버튼을 보여줌 */}
                {editPlace[place.placeId] && (
                  <ul className="place_change">
                    <li>
                      <button onClick={() => handleModifyClick('directly', place.placeId)}>직접 쓸래요</button>
                    </li>
                    <li>
                      <button onClick={() => handleModifyClick('recomm', place.placeId)}>다른 추천 받을래요</button>
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </PlanBox>

        <Button size="xxl" color="white" style={{ borderColor: '#eee' }} className="weight_md" disabled={isEditing}>
          일정 추가
        </Button>

        <Button
          size="xxl"
          color="blue"
          className="weight_md"
          disabled={isEditing}
          onClick={handlePlanButtonClick} // 핸들러 추가
        >
          {planButtonText}
        </Button>
      </PlanContainer>

      {/* ModifyContainer */}
      {isEditing && selectedOption.option && (
        <ModifyContainer className="plan_modify">
          {/* 직접 수정 */}
          {selectedOption.option === 'directly' && (
            <div className="directly">
              <h3 className="size_lg weight_b">가고 싶은 곳을 검색해 주세요!</h3>
              <input
                ref={inputRef}
                type="text"
                placeholder="검색어를 입력해 주세요"
                aria-label="장소 검색 입력"
                onChange={(e) => {
                  if (e.target.value.length < 3) {
                    // 최소 3자 이상 입력해야 함
                    setAutocompleteSelectedPlace(null);
                  }
                }}
              />

              {autocompleteSelectedPlace && (
                <div className="selected_place">
                  <h4 className="pt_blue size_sm weight_sb">{autocompleteSelectedPlace.name}</h4>
                  <p className="size_xs">{autocompleteSelectedPlace.address}</p>
                </div>
              )}

              <Button
                onClick={handleCancelClick}
                size="xxl"
                color="white"
                style={{ borderColor: '#eee' }}
                className="weight_md"
              >
                취소
              </Button>
              <Button
                onClick={handleSelectClick}
                size="xxl"
                color="blue"
                className="weight_md"
                disabled={!autocompleteSelectedPlace} // 장소가 선택되지 않으면 버튼 비활성화
              >
                이 장소로 선택
              </Button>
            </div>
          )}
          {/* 추천 수정 */}
          {selectedOption.option === 'recomm' && (
            <div className="recomm">
              <h3 className="size_lg weight_b">추천 장소 선택하기</h3>

              <ul>
                {ModifyData.place.map((place) => (
                  <li
                    key={place.placeId}
                    className={`flex ${selectedRecommendedPlace && selectedRecommendedPlace.placeId === place.placeId ? 'selected' : ''}`}
                    onClick={() => handleSelectRecommendedPlace(place)}
                  >
                    {place.category === '음식점' && (
											place.image ? (
												<img src={place.image} alt={place.placeName} onError={onErrorImg} />
											) : (
												<img src={Restaurant} alt="noImage" />
											)
										)}
                    <div className="place_info">
                      <h4 className="size_md weight_sb">{place.placeName}</h4>
                      <p className="pt_gy">{place.description}</p>
                    </div>
                    <div className="place_price">
                      <span className="size_xs weight_md">예상 금액</span>
                      <strong className="pt_blue size_sm weight_b">{place.price.toLocaleString()}원</strong>
                    </div>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleCancelClick}
                size="xxl"
                color="white"
                style={{ borderColor: '#eee' }}
                className="weight_md"
              >
                취소
              </Button>
              <Button
                onClick={handleSelectClick}
                size="xxl"
                color="blue"
                className="weight_md"
                disabled={!selectedRecommendedPlace} // 장소가 선택되지 않으면 버튼 비활성화
              >
                이 장소로 선택
              </Button>
            </div>
          )}
        </ModifyContainer>
      )}

      {/* 구글 맵 */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '90vh' }}
        center={{ lat: 37.5665, lng: 126.9780 }} // 서울의 중심 좌표
        zoom={12}
      >
        {places.map((place) => (
          place.latitude && place.longitude && (
            <Marker
              key={place.placeId}
              position={{ lat: place.latitude, lng: place.longitude }} // 위도와 경도 사용
              label={place.placeName} // 마커에 라벨 표시
              // `className`은 Marker 컴포넌트에서 직접 사용할 수 없습니다.
            />
          )
        ))}
      </GoogleMap>
    </PlanProduce>
  );
};

export default Produce;

// styled-components
const PlanBox = styled.ol``;
const RouteList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .address { /* 스타일 추가 */
    display: block;
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.2rem;
  }
`;
const PlanContainer = styled.div``;
const ModifyContainer = styled.div`
  .recomm img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 4px;
  }

  .place_info {
    flex: 1;
  }

  .place_price {
    margin-left: 1rem;
    text-align: right;
  }

  .directly ul {
    list-style: none;
    padding: 0;
  }

  .directly li {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;

  .selected_place {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #007bff;
    border-radius: 4px;
    background-color: #e6f0ff;
  }
`;
