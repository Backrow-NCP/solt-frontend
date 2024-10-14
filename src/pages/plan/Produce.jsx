import { useEffect, useState, useRef } from 'react';
import { GoogleMap, MarkerF, useLoadScript, Autocomplete, InfoWindow } from '@react-google-maps/api';
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
import MarkerBg from '../../assets/images/ico/ico_plan_marker.png';

// Autocomplete를 위해 'places' 라이브러리 추가
const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '90vh' }; // 맵의 높이를 조정 (필요 시 변경)
const center = { lat: 37.5665, lng: 126.9780 }; // 서울의 중심 좌표
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// 서울의 경계 정의
const seoulBounds = {
  north: 37.7015,
  south: 37.4133,
  west: 126.7342,
  east: 127.1790,
};

// 고정된 카테고리 목록
const categories = ['숙박', '음식점', '교통비', '쇼핑', '관광지', '레포츠', '문화시설', '축제'];

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
	const [selectedMarker, setSelectedMarker] = useState(null); // 구글맵 마커 선택

  const inputRef = useRef(null); // Autocomplete 입력 필드
  const autocompleteRef = useRef(null); // Autocomplete 객체
  const mapRef = useRef(null); // 지도 인스턴스 참조

  const navigate = useNavigate(); // 페이지 네비게이션

  // 날짜별 일정 (ISO 형식으로 일관성 유지 및 정렬)
  const days = Array.from(new Set(places.map((place) => new Date(place.startTime).toISOString().split('T')[0])))
    .sort((a, b) => new Date(a) - new Date(b));

  // 선택한 날짜 일정만 필터링
  const filteredPlaces = places.filter(
    (place) => new Date(place.startTime).toISOString().split('T')[0] === days[selectedDay - 1]
  );

  // 플랜 임시데이터 불러오기
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        // 실제 API 호출 시 주석 해제
        // const response = await axios.get('/api/getPlanData');
        // const fetchedPlan = response.data;
        const fetchedPlan = planData; // 임시 데이터 사용

        // 지오코딩을 통해 위도와 경도 추가
        const placesWithCoordinates = await Promise.all(fetchedPlan.place.map(async (place) => {
					if (!place.latitude || !place.longitude) {
						// Geocoding API 호출
						try {
							const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
								params: {
									address: place.addr,
									key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
								},
							});
							const location = geocodeResponse.data.results[0]?.geometry.location;
							if (location) {
								return {
									...place,
									latitude: location.lat,
									longitude: location.lng,
									price: Number(place.price) || 0, // price가 숫자가 아니면 0으로 설정
								};
							} else {
								console.warn(`Geocoding 결과 없음 for placeId ${place.placeId}`);
								return { ...place, latitude: null, longitude: null, price: Number(place.price) || 0 };
							}
						} catch (error) {
							console.error(`Geocoding 실패 for placeId ${place.placeId}:`, error);
							return { ...place, latitude: null, longitude: null, price: Number(place.price) || 0 };
						}
					}
					return { ...place, price: Number(place.price) || 0 }; // 이미 위도와 경도가 있는 경우에도 price 변환
				}));

				// console.log(JSON.stringify(placesWithCoordinates, null, 2));

        setPlan(fetchedPlan);
        setPlaces(placesWithCoordinates);

        // combinedList 생성
        const newCombinedList = [];
        fetchedPlan.place.forEach((place, i) => {
          newCombinedList.push({ type: 'place', data: place });
          // Route가 place.placeId와 일치하는지 확인
          const route = fetchedPlan.route.find(r => r.startPlaceId === place.placeId);
          if (route) {
            newCombinedList.push({ type: 'route', data: route });
          }
        });
        setCombinedList(newCombinedList);

        // scroll
        AdjustPlanScroll();
      } catch (error) {
        console.error('플랜 데이터 로드 실패:', error);
      }
    };

    fetchPlanData();

    return () => {
      removePlanScroll();
    };
  }, []);

  // 구글맵 로드
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // mapRef를 설정하기 위한 함수
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Autocomplete 선택 시 처리
  const handlePlaceChanged = () => {
		if (autocompleteRef.current !== null) {
			const place = autocompleteRef.current.getPlace();
			
			// 'place'가 유효한지 확인
			if (place && place.geometry) {
				const newSelectedPlace = {
					placeId: place.place_id,
					name: place.name,
					address: place.formatted_address,
					latitude: place.geometry.location.lat(),
					longitude: place.geometry.location.lng(),
				};
				setAutocompleteSelectedPlace(newSelectedPlace);
				
				// 지도 중심을 선택한 장소로 이동
				if (mapRef.current) {
					mapRef.current.panTo({
						lat: newSelectedPlace.latitude,
						lng: newSelectedPlace.longitude,
					});
					mapRef.current.setZoom(14);
				}
			} else {
				alert("서울 안에서 선택해 주세요");
			}
		} else {
			alert("자동 완성이 아직 로드되지 않았습니다");
		}
	};

  // handleSelectRecommendedPlace 함수 정의
  const handleSelectRecommendedPlace = (place) => {
    setSelectedRecommendedPlace(place);
  };

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
    const { placeId } = selectedOption;
    const place = places.find(p => p.placeId === placeId);

    // 일정 추가 place 삭제 (isNew 플래그 사용)
    if (place && place.isNew) { // isNew 플래그로 새로 추가된 장소만 제거
      setPlaces(prevPlaces => prevPlaces.filter(p => p.placeId !== placeId));
      console.log('New place removed:', placeId);
    }

    // 기존 상태 업데이트
    setIsEditing(false); // 수정 모드 비활성화
    setSelectedOption({ option: null, placeId: null }); // 선택 옵션 초기화
    setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
    setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
    setEditPlace((prev) => {
      const updatedEditPlace = { ...prev };
      delete updatedEditPlace[placeId]; // 해당 장소의 수정 버튼 비활성화
      return updatedEditPlace;
    });
  };

  // ModifyContainer의 "이 장소로 선택" 버튼 클릭 시
  const handleSelectClick = async () => {
    const { option, placeId } = selectedOption;
		
    console.log('handleSelectClick called with:', { option, placeId });

		// 지도
		if (option === 'directly' && autocompleteSelectedPlace) {
			const coordinates = await fetchCoordinates(autocompleteSelectedPlace.address);
			
			if (coordinates) {
				const updatedPlaces = places.map((place) => {
					if (place.placeId === placeId) {
						return {
							...place,
							latitude: coordinates.latitude,
							longitude: coordinates.longitude,
							addr: autocompleteSelectedPlace.address,
							isNew: false, // 수정 완료 후 isNew 플래그 제거
						};
					}
					return place;
				});
	
				setPlaces(updatedPlaces);
			}
		}

    if (option === 'recomm' && selectedRecommendedPlace) {
      // 추천 받은 장소로 업데이트
      const updatedPlaces = places.map((place) => {
        if (place.placeId === placeId) {
          return {
            ...place,
            placeName: selectedRecommendedPlace.placeName || selectedRecommendedPlace.name,
            startTime: place.startTime, // startTime 유지
            addr: selectedRecommendedPlace.addr || selectedRecommendedPlace.address || place.addr,
            description: selectedRecommendedPlace.description || place.description, // 필요 시 수정
            isNew: false, // 수정 완료 후 isNew 플래그 제거
          };
        }
        return place;
      });

      setPlaces(updatedPlaces);

      // 해당 장소와 연결된 경로(route) 제거
      const updatedPlanRoute = plan.route.filter((route) => {
        return route.startPlaceId !== placeId && route.endPlaceId !== placeId;
      });

      setPlan({
        ...plan,
        route: updatedPlanRoute,
      });

      // combinedList는 useEffect에서 자동으로 업데이트됨

      // 수정된 장소를 추적
      setModifiedPlaces((prev) => [...prev, placeId]);

      // 상태 초기화
      setIsEditing(false); // 수정 모드 비활성화
      setPlanConfirmed(false); // 플랜 수정됨 표시
      setSelectedOption({ option: null, placeId: null }); // 선택 옵션 초기화
      setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
      setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
      setEditPlace((prev) => {
        const updatedEditPlace = { ...prev };
        delete updatedEditPlace[placeId]; // 해당 장소의 수정 버튼 비활성화
        return updatedEditPlace;
      });
    } else if (option === 'directly' && autocompleteSelectedPlace) {
      // 직접 검색한 장소로 업데이트
      const updatedPlaces = places.map((place) => {
        if (place.placeId === placeId) {
          return {
            ...place,
            placeName: autocompleteSelectedPlace.placeName || autocompleteSelectedPlace.name,
            startTime: place.startTime, // startTime 유지
            addr: autocompleteSelectedPlace.addr || autocompleteSelectedPlace.address || place.addr,
            description: null, // description을 null로 설정
            isNew: false, // 수정 완료 후 isNew 플래그 제거
          };
        }
        return place;
      });

      setPlaces(updatedPlaces);

      // 해당 장소와 연결된 경로(route) 제거
      const updatedPlanRoute = plan.route.filter((route) => {
        return route.startPlaceId !== placeId && route.endPlaceId !== placeId;
      });

      setPlan({
        ...plan,
        route: updatedPlanRoute,
      });

      // combinedList는 useEffect에서 자동으로 업데이트됨

      // 수정된 장소를 추적
      setModifiedPlaces((prev) => [...prev, placeId]);

      // 상태 초기화
      setIsEditing(false); // 수정 모드 비활성화
      setPlanConfirmed(false); // 플랜 수정됨 표시
      setSelectedOption({ option: null, placeId: null }); // 선택 옵션 초기화
      setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
      setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
      setEditPlace((prev) => {
        const updatedEditPlace = { ...prev };
        delete updatedEditPlace[placeId]; // 해당 장소의 수정 버튼 비활성화
        return updatedEditPlace;
      });
    }
  };

  // 플랜 확정/수정 버튼 클릭 핸들러
  const handlePlanButtonClick = async () => {
    if (planConfirmed) {
      // 수정이 없는 경우, 서버에 플랜 확정 메시지를 보내고 /plan/complete로 리디렉션
      /*
      try {
        await axios.post('/api/confirmPlan', { planId: plan.planId }); // API 엔드포인트에 맞게 조정
        navigate('/plan/complete');
      } catch (error) {
        console.error('플랜 확정 실패:', error);
        alert('플랜 확정에 실패했습니다. 다시 시도해 주세요.');
      }
      */

      // 대신, Axios 요청을 주석 처리하고 리디렉션 수행
      navigate('/plan/complete');
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
    return plan.route.find(
      (route) => route.startPlaceId === currentPlaceId && route.endPlaceId === nextPlaceId
    );
  };

  // 추천 장소 식당 노이미지
  const onErrorImg = (e) => {
    e.target.onerror = null;
    e.target.src = Restaurant;
  };

  // 일정 추가
  const handleAddPlace = () => {
    // 선택한 날짜에 해당하는 장소들 필터링
    const placesOnSelectedDay = places.filter(
      (place) => new Date(place.startTime).toISOString().split('T')[0] === days[selectedDay - 1]
    );

    let newStartTime;

    if (placesOnSelectedDay.length > 0) {
      // 마지막 장소의 endTime을 기준으로 새로운 startTime 설정
      const lastPlace = placesOnSelectedDay[placesOnSelectedDay.length - 1];
      const lastEndTime = new Date(lastPlace.endTime);

      // 마지막 endTime에 1시간 추가
      lastEndTime.setHours(lastEndTime.getHours() + 1);

      newStartTime = lastEndTime.toISOString();
    } else {
      // 해당 날짜에 장소가 없을 경우, 기본 시작 시간 설정 (예: 오전 9시)
      const selectedDate = new Date(days[selectedDay - 1]);
      selectedDate.setHours(9, 0, 0, 0); // 오전 9시로 설정
      newStartTime = selectedDate.toISOString();
    }

    const newPlace = {
      placeId: Date.now(), // 임시 ID, (서버에서 ID 생성해야할듯)
      placeName: '새로운 장소',
      description: '',
      price: 0,
      addr: '',
      category: '',
      startTime: newStartTime,
      endTime: newStartTime,
      checker: false,
      isNew: true, // 새로 추가된 장소다
    };

    // 새로운 장소 추가
    setPlaces((prevPlaces) => [...prevPlaces, newPlace]);

    // 수정 모드 활성화 및 새로운 장소 선택
    setIsEditing(true);
    setSelectedOption({ option: 'choose', placeId: newPlace.placeId });

    // ModifyContainer를 열기 위해 modifyPlace 상태도 업데이트
    setEditPlace((prevState) => ({
      ...prevState,
      [newPlace.placeId]: true, // 새로운 장소의 modify 버튼을 활성화
    }));
  };

  // combinedList 동기화
  useEffect(() => {
    if (!plan) return;

    // combinedList 생성
    const newCombinedList = [];
    places.forEach((place, i) => {
      newCombinedList.push({ type: 'place', data: place });

      const nextPlace = places[i + 1];
      if (nextPlace) {
        const route = plan.route.find(r => r.startPlaceId === place.placeId && r.endPlaceId === nextPlace.placeId);
        if (route) {
          newCombinedList.push({ type: 'route', data: route });
        }
      }
    });
    setCombinedList(newCombinedList);
  }, [places, plan]);

  // 에러 처리 및 로딩 상태
  if (loadError) return <div>Error loading maps</div>;
	if (!isLoaded) return <Loading />;

  // 로딩 페이지
  if (!plan) return <Loading />;

  // 총 금액 계산 (장소 가격 + 교통비)
  const totalPlacePrice = places.reduce((acc, place) => acc + (place.price || 0), 0);
  const totalRoutePrice = plan.route.reduce((acc, route) => acc + (route.price || 0), 0);
  const totalPrice = totalPlacePrice + totalRoutePrice;

  // 카테고리별 총 금액 계산
  const categoryTotals = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  places.forEach(place => {
    if (categories.includes(place.category)) {
      categoryTotals[place.category] += place.price || 0;
    }
  });

  // 교통비 합산
  const totalTransportCost = plan.route.reduce((acc, route) => acc + (route.price || 0), 0);
  categoryTotals['교통비'] = totalTransportCost;

  // 원그래프 데이터 생성 (고정된 카테고리만 포함)
  const pieChartData = categories.map(category => ({
    label: category,
    value: categoryTotals[category],
  }));

	// 네이버 api 위도/경도
	const fetchCoordinates = async (address) => {
		try {
			const response = await axios.get('https://openapi.naver.com/v1/map/geocode.json', {
				params: { query: address },
				headers: {
					'X-Naver-Client-Id': 'wl601tw1a7',
					'X-Naver-Client-Secret': '7M2MI3ihJMiDDZvPZhegoIbXqQQ0j7PPDiBv6FzN', // 네이버 API Client Secret
				},
			});
			const { items } = response.data;
			if (items.length > 0) {
				const { point } = items[0]; // 첫 번째 결과의 좌표를 사용
				return {
					latitude: point.y,
					longitude: point.x,
				};
			} else {
				console.warn('주소에 대한 결과가 없습니다.');
				return null;
			}
		} catch (error) {
			console.error('위도, 경도 가져오기 실패:', error);
			return null;
		}
	};

	// 마커 일정 설명
	const handleInfoWindowOpen = () => {
		const infoWindows = document.querySelectorAll('.gm-style-iw-tc');
		infoWindows.forEach((window) => {
			if (!window.innerHTML.trim() && !window.style.content) {
				window.parentElement.remove();
			}
		});
	};

	// console.log(places);

  return (
    <PlanProduce>
      <div className="plan_cont">
        <div className="plan_info">
          <span className="size_sm weight_md pt_blue">솔트 AI 플래너</span>
          <h2>
            {plan.member.name} 님의<br />
            <span className="pt_blue">{plan.area}</span> 여행 플랜
          </h2>

          <div className="price pt_pink">
            <span className="size_sm weight_sb">예상 총 금액</span>
            <strong>
              <span>{totalPrice.toLocaleString()}</span>원
            </strong>

            {/* 원그래프 */}
            <PieChart data={pieChartData} />
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

        <ol>
        {filteredPlaces.map((place, index) => {
          const previousPlace = filteredPlaces[index - 1]; // 이전 일정
					const route = previousPlace ? findRoute(previousPlace.placeId, place.placeId) : null; // 이전 일정과 현재 일정 간의 경로

            return (
              <li key={`place-${place.placeId}`} className="flex">
              <span className="place_time pt_blue size_xs weight_b">{planTime(place.startTime)}</span>

              <div className="place_info">
								<h3 className="size_md">{place.placeName}</h3>
								<span className="pt_gy size_xs">{place.category}</span>

								{/* 이동수단 영역 */}
								{previousPlace && route && ( // route가 존재하는 경우 이동 수단 표시
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
                      type="number"
                      min="0"
                      value={place.price}
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
                <button onClick={() => toggleModifyPlace(place.placeId)}>
                  {editPlace[place.placeId] ? (
                    <img src={PlanModifyActiveBtn} alt="일정 수정" />
                  ) : (
                    <img src={PlanModifyBtn} alt="비활성화" />
                  )}
                </button>

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
        </ol>

        <Button
          size="xxl"
          color="white"
          style={{ borderColor: '#eee' }}
          className="weight_md"
          disabled={isEditing}
          onClick={handleAddPlace}
        >
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
      </div>

      {/* ModifyContainer */}
      {isEditing && selectedOption.option && (
        <ModifyContainer className="plan_modify">
          {/* 직접 수정 */}
          {selectedOption.option === 'directly' && (
            <div className="directly">
              <h3 className="size_lg weight_b">가고 싶은 곳을 검색해 주세요!</h3>
              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
                options={{
                  bounds: seoulBounds, // 서울의 경계 설정
                  strictBounds: true,
                  componentRestrictions: { country: 'KR' }, // 한국으로 제한
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="검색어를 입력해 주세요"
                  aria-label="장소 검색 입력"
                  onChange={(e) => {
                    if (e.target.value.length < 3) { // 최소 3자 이상 입력
                      setAutocompleteSelectedPlace(null);
                    }
                  }}
                  className="modify-search-input"
                />
              </Autocomplete>

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
          {/* 수정 방법 선택 */}
          {selectedOption.option === 'choose' && (
            <div className="choose">
              <h3 className="size_lg weight_b">수정 방법을 선택하세요</h3>
              <Button
                onClick={() => setSelectedOption({ option: 'directly', placeId: selectedOption.placeId })}
                size="xxl"
                color="white"
                className="weight_md"
              >
                직접 검색
              </Button>
              <Button
                onClick={() => setSelectedOption({ option: 'recomm', placeId: selectedOption.placeId })}
                size="xxl"
                color="white"
                className="weight_md"
              >
                추천 받기
              </Button>
            </div>
          )}
        </ModifyContainer>
      )}

      {/* Google Map */}
      <GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={12}
				options={options}
				onLoad={onMapLoad}
			>
				{/* 마커 표시 */}
				{filteredPlaces.map((place, index) =>
					place.latitude && place.longitude ? (
						<MarkerF
							key={place.placeId}
							position={{ lat: place.latitude, lng: place.longitude }}
							onClick={() => setSelectedMarker(place)}
							icon={{
								url: MarkerBg,
								scaledSize: new window.google.maps.Size(40, 50),
							}}
							label={{
								text: `${index + 1}`,
								color: "#FFFFFF",
								fontWeight: "600",
								fontSize: "13px",
							}}
						/>
					) : null
				)}

				{/* 선택된 마커에 대한 인포윈도우 */}
				{selectedMarker && (
					<InfoWindow
						position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
						onCloseClick={() => setSelectedMarker(null)}
						onLoad={handleInfoWindowOpen} // 인포 윈도우가 열릴 때마다 체크
					>
						<div className="marker_desc">
							<strong>{selectedMarker.placeName}</strong>
							<p>주소: {selectedMarker.addr}</p>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
    </PlanProduce>
  );
};

export default Produce;

const ModifyContainer = styled.div``;
