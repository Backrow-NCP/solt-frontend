import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import PlanProduce from '../../styles/plan/produce';
import planTime from '../../utils/plan/planTime';
import apiClient from '../../config/AxiosConfig';

// 훅
import usePlanData from '../../hooks/plan/usePlanData';
import useCategoryTotals from '../../hooks/plan/useCategoryTotals';

// 컴포넌트
import Loading from './Loading';
import Button from '../../components/Button';
import PlanInfo from '../../components/Plan/PlanInfo';
import DayTab from '../../components/Plan/DayTabs';
import Map from '../../components/Plan/Map';
import PlaceList from '../../components/Plan/PlaceList';
import ModifyContainer from '../../components/Plan/ModifyContainer';

// 이미지
import Restaurant from '../../assets/images/bn/plan_produce_restaurant.jpg';

// Autocomplete를 위해 'places' 라이브러리 추가
const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '90vh' }; // 맵의 높이를 조정 (필요 시 변경)
const center = { lat: 37.5665, lng: 126.978 }; // 서울의 중심 좌표
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// 서울의 경계 정의
const seoulBounds = {
  north: 37.7015,
  south: 37.4133,
  west: 126.7342,
  east: 127.179,
};

// 고정된 카테고리 목록
const categories = [
  '숙박',
  '음식점',
  '교통비',
  '쇼핑',
  '관광지',
  '레포츠',
  '문화시설',
  '축제',
];

const Produce = () => {
  const navigate = useNavigate(); // 페이지 네비게이션

  // 커스텀 훅 사용
  const {
    plan,
    places,
    combinedList,
    setPlan,
    setPlaces,
    setCombinedList,
    loading,
  } = usePlanData();
  const {
    categoryTotals,
    pieChartData,
    totalPlacePrice,
    totalRoutePrice,
    totalPrice,
  } = useCategoryTotals(places, categories, plan);

  // 상태 관리
  const [editPrice, setEditPrice] = useState({}); // 일정 예상 금액
  const [editPlace, setEditPlace] = useState({}); // 일정 수정 버튼
  const [isEditing, setIsEditing] = useState(false); // 일정 수정 여부
  const [selectedDay, setSelectedDay] = useState(1); // 날짜 선택
  const [selectedOption, setSelectedOption] = useState({
    option: null,
    placeId: null,
  }); // 플랜 수정 방법, 수정 아이디
  const [planConfirmed, setPlanConfirmed] = useState(true); // 플랜 확정
  const [selectedRecommendedPlace, setSelectedRecommendedPlace] =
    useState(null); // ModifyContainer 선택된 장소
  const [autocompleteSelectedPlace, setAutocompleteSelectedPlace] =
    useState(null); // Autocomplete 선택된 장소
  const [modifiedPlaces, setModifiedPlaces] = useState([]); // 수정된 장소
  const [selectedMarker, setSelectedMarker] = useState(null); // 구글맵 마커 선택
  const [mapCenter, setMapCenter] = useState(center); // 맵 중심
  const [isLoading, setIsLoading] = useState(false); // 렌더링

  const inputRef = useRef(null); // Autocomplete 입력 필드
  const autocompleteRef = useRef(null); // Autocomplete 객체
  const mapRef = useRef(null); // 지도 인스턴스 참조

  // onErrorImg 함수 정의
  const onErrorImg = e => {
    e.target.onerror = null;
    e.target.src = Restaurant;
  };

  // 날짜별로 장소를 그룹화하는 로직 추가
const groupedPlaces = useMemo(() => {
    return places.reduce((acc, place) => {
      const date = new Date(place.startTime).toLocaleDateString(); // 날짜 형식 지정
      if (!acc[date]) acc[date] = [];
      acc[date].push(place);
      return acc;
    }, {});
  }, [places]);
  
  // days 배열을 groupedPlaces의 키값으로 생성
  const days = useMemo(() => Object.keys(groupedPlaces), [groupedPlaces]);
  
  // 날짜 선택에 따라 필터된 장소 반환
  const filteredPlaces = useMemo(() => groupedPlaces[days[selectedDay - 1]] || [], [groupedPlaces, days, selectedDay]);

  // 구글맵 로드
  const { isLoaded, loadError: mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Autocomplete 선택 시 처리
  const handlePlaceChanged = useCallback(() => {
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
        setMapCenter({
          lat: newSelectedPlace.latitude,
          lng: newSelectedPlace.longitude,
        });
      } else {
        alert('서울 안에서 선택해 주세요');
      }
    } else {
      alert('자동 완성이 아직 로드되지 않았습니다');
    }
  }, []);

  // handlePlaceSelected 함수 정의
  const handlePlaceSelected = useCallback(place => {
    if (place) {
      setAutocompleteSelectedPlace(place);
      setMapCenter({
        lat: place.latitude,
        lng: place.longitude,
      });
    } else {
      alert('서울 안에서 선택해 주세요');
    }
  }, []);

  // handleSelectRecommendedPlace 함수 정의
  const handleSelectRecommendedPlace = useCallback(place => {
    setSelectedRecommendedPlace(place);
  }, []);

  // 금액 변경 처리
  const handlePriceChange = useCallback(
    (selectedPlace, newPrice) => {
      const updatedPlaces = places.map(place => {
        if (place.startTime === selectedPlace.startTime) {
          // 금액 변경
          return { ...place, price: newPrice };
        }
        return place;
      });

      // places 상태 업데이트
      setPlaces(updatedPlaces);

      // combinedList 업데이트
      const updatedCombinedList = combinedList.map(item => {
        if (
          item.type === 'place' &&
          item.data.startTime === selectedPlace.startTime
        ) {
          return {
            ...item,
            data: { ...item.data, price: newPrice },
          };
        }
        return item;
      });

      setCombinedList(updatedCombinedList);
    },
    [places, combinedList, setPlaces, setCombinedList]
  );

  // 금액 수정 활성화
  const toggleEditPrice = useCallback(placeId => {
    setEditPrice(prevState => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  }, []);

  // 일정 수정 버튼 클릭 시 상태 변경
  const toggleModifyPlace = useCallback(placeId => {
    setEditPlace(prevState => ({
      ...prevState,
      [placeId]: !prevState[placeId],
    }));
  }, []);

  // 각 플랜 수정
  const handleModifyClick = useCallback((option, placeId) => {
    console.log('플랜 수정!!!!', placeId);
    setIsEditing(true);
    setSelectedOption({ option, placeId });
  }, []);

  // 플랜 수정 취소
  const handleCancelClick = useCallback(() => {
    const { placeId } = selectedOption;
    const place = places.find(p => p.placeId === placeId);

    // 일정 추가 place 삭제 (isNew 플래그 사용)
    if (place && place.isNew) {
      // isNew 플래그로 새로 추가된 장소만 제거
      setPlaces(prevPlaces => prevPlaces.filter(p => p.placeId !== placeId));
      console.log('New place removed:', placeId);
    }

    // 기존 상태 업데이트
    setIsEditing(false); // 수정 모드 비활성화
    setSelectedOption({ option: null, placeId: null }); // 선택 옵션 초기화
    setSelectedRecommendedPlace(null); // 선택된 추천 장소 초기화
    setAutocompleteSelectedPlace(null); // Autocomplete 선택된 장소 초기화
    setEditPlace(prev => {
      const updatedEditPlace = { ...prev };
      delete updatedEditPlace[placeId]; // 해당 장소의 수정 버튼 비활성화
      return updatedEditPlace;
    });
  }, [selectedOption, places]);

  // ModifyContainer의 "이 장소로 선택" 버튼 클릭 시
  const handleSelectClick = useCallback(() => {
    const { option, placeId } = selectedOption;
    const selectedPlace = placeId;

    console.log('handleSelectClick called with:', { option, selectedPlace });

    if (option === 'directly' && autocompleteSelectedPlace) {
      const updatedPlaces = places.map(place => {
        if (place.startTime === selectedPlace.startTime) {
          return {
            ...place,
            latitude: autocompleteSelectedPlace.latitude,
            longitude: autocompleteSelectedPlace.longitude,
            addr: autocompleteSelectedPlace.address,
            isNew: false,
            price: 0, // 직접 수정 시 가격 0으로 설정
          };
        }
        return place;
      });

      setPlaces(updatedPlaces);
    }

    if (option === 'recomm' && selectedRecommendedPlace) {
      // 추천 수정
      const updatedPlaces = places.map(place => {
        if (place.startTime === selectedPlace.startTime) {
          return {
            ...place,
            placeName:
              selectedRecommendedPlace.placeName ||
              selectedRecommendedPlace.name,
            startTime: place.startTime, // startTime 유지
            addr:
              selectedRecommendedPlace.addr ||
              selectedRecommendedPlace.address ||
              place.addr,
            description:
              selectedRecommendedPlace.description || place.description, // 필요 시 수정
            isNew: false, // 수정 완료 후 isNew 플래그 제거
            price: selectedRecommendedPlace.price || place.price, // 추천 수정 시 가격 업데이트
          };
        }
        return place;
      });

      setPlaces(updatedPlaces);

      // 해당 장소와 연결된 경로(route) 제거
      const updatedPlanRoute = plan.routes.filter(route => {
        return (
          route.startTime !== selectedPlace.endTime &&
          route.endTime !== selectedPlace.startTime
        );
      });

      setPlan({
        ...plan,
        route: updatedPlanRoute,
      });

      // 수정된 장소를 추적
      setModifiedPlaces(prev => [...prev, selectedPlace.startTime]);
    } else if (option === 'directly' && autocompleteSelectedPlace) {
      // "직접 쓸래요"
      const updatedPlaces = places.map(place => {
        if (place.startTime === selectedPlace.startTime) {
          return {
            ...place,
            placeName:
              autocompleteSelectedPlace.placeName ||
              autocompleteSelectedPlace.name,
            startTime: place.startTime,
            addr:
              autocompleteSelectedPlace.addr ||
              autocompleteSelectedPlace.address ||
              place.addr,
            description: null,
            isNew: false,
            price: 0, // 가격 0원
          };
        }
        return place;
      });

      setPlaces(updatedPlaces);

      // 해당 장소와 연결된 경로(route) 제거
      const updatedPlanRoute = plan.routes.filter(route => {
        return (
          route.startTime !== selectedPlace.endTime &&
          route.endTime !== selectedPlace.startTime
        );
      });

      setPlan({
        ...plan,
        route: updatedPlanRoute,
      });

      // 수정된 장소를 추적
      setModifiedPlaces(prev => [...prev, selectedPlace.startTime]);
    }

    setIsEditing(false);
    setPlanConfirmed(false);
    setSelectedOption({ option: null, placeId: null });
    setSelectedRecommendedPlace(null);
    setAutocompleteSelectedPlace(null);
    setEditPlace(prev => {
      const updatedEditPlace = { ...prev };
      delete updatedEditPlace[selectedPlace.startTime];
      return updatedEditPlace;
    });

    console.log('After setIsEditing:', isEditing);
  }, [
    selectedOption,
    autocompleteSelectedPlace,
    selectedRecommendedPlace,
    places,
    plan,
    setPlaces,
    setPlan,
    setModifiedPlaces,
    isEditing, // 추가: isEditing을 useCallback 의존성에 추가
  ]);

  // 플랜 확정/수정 버튼 클릭 핸들러
  const handlePlanButtonClick = useCallback(async () => {
    if (planConfirmed) {
      // 수정 없이 확정하기
      navigate('/plan/complete');
    } else {
      // 수정이 있을 때 서버로 데이터 전송
      try {
        setIsLoading(true); // 로딩 시작
        const themes = plan.themes.map(theme => theme.themeId);
        // const updatedPlan = {
        // 		...plan,
        // 		themes,
        // };

        const updatedPlan = {
          title: plan.title || '맞춤 플랜',
          memberId: plan.member.memberId || null,
          places: plan.places.map(place => ({
            placeName: place.placeName,
          })),
          themes: themes,
          location: plan.location || '서울특별시',
          startDate: plan.startDate,
          endDate: plan.endDate,
        };

        console.log('업데이트 플랜:', updatedPlan);

        // 서버로 전송
        const response = await apiClient.post('/plans/recom', updatedPlan, {
          withCredentials: false,
        });

        console.log('서버 응답:', response.data);

        // 서버 응답 데이터를 세션 스토리지에 저장
        response.data.places.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        response.data.routes.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        sessionStorage.setItem('planData', JSON.stringify(response.data));

        alert('플랜이 수정되었습니다.');

        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error('저장 오류:', error);
        alert('저장 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  }, [planConfirmed, plan, places, combinedList, navigate]);

  // 플랜 확정 버튼 내용 결정
  const planButtonText = useMemo(
    () => (planConfirmed ? '플랜 확정하기' : '플랜 수정하기'),
    [planConfirmed]
  );

  // 탭 클릭 시 일정 수정 상태 초기화
  const handleTabClick = useCallback(index => {
    setSelectedDay(index + 1);
    setEditPlace({});
    setIsEditing(false);
    setSelectedOption({ option: null, placeId: null });
    setSelectedRecommendedPlace(null);
    setAutocompleteSelectedPlace(null);
  }, []);

  // 일정 추가
  const handleAddPlace = useCallback(() => {
    // 선택한 날짜에 해당하는 장소들 필터링
    const placesOnSelectedDay = places.filter(
      place =>
        new Date(place.startTime).toISOString().split('T')[0] ===
        days[selectedDay - 1]
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
      // 해당 날짜에 장소가 없을 경우
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
      isNew: true,
    };

    // 새로운 장소 추가
    setPlaces(prevPlaces => [...prevPlaces, newPlace]);

    // 수정 모드 활성화 및 새로운 장소 선택
    setIsEditing(true);
    setSelectedOption({ option: 'choose', placeId: newPlace });

    // ModifyContainer를 열기 위해 modifyPlace 상태도 업데이트
    setEditPlace(prevState => ({
      ...prevState,
      [newPlace.placeId]: true,
    }));
  }, [places, days, selectedDay]);

  // 일정 추가 시 버튼
  const handleSelectOption = useCallback((option, placeId) => {
    setSelectedOption({ option, placeId });
  }, []);

  // combinedList 동기화
  useEffect(() => {
    if (!plan) return;

    // combinedList 생성
    const newCombinedList = [];
    places.forEach((place, i) => {
      newCombinedList.push({ type: 'place', data: place });

      const nextPlace = places[i + 1];
      if (nextPlace) {
        const route = plan.routes.find(
          r =>
            r.startPlaceId === place.placeId &&
            r.endPlaceId === nextPlace.placeId
        );
        if (route) {
          newCombinedList.push({ type: 'route', data: route });
        }
      }
    });
    setCombinedList(newCombinedList);
  }, [places, plan, setCombinedList]);

  // 렌더링
  if (mapLoadError) return <div>Error loading maps</div>;
  if (!isLoaded || isLoading || loading) return <Loading />;
  if (!plan) return <Loading />;

  return (
    <PlanProduce>
      <div className="plan_cont">
        {/* 플랜 상단 */}
        <PlanInfo
          memberName={plan.member.name}
          location={plan.location}
          totalPrice={totalPrice}
          pieChartData={pieChartData}
          isDetailPage={false}
        />

        {/* 날짜 탭 */}
        <DayTab
          days={days}
          selectedDay={selectedDay}
          onTabClick={handleTabClick}
        />

        {/* 장소 목록 */}
        <PlaceList
          filteredPlaces={filteredPlaces}
          planTime={planTime}
          isDetailPage={false}
          findRoute={nextPlace =>
            plan.routes.find(route => route.endTime === nextPlace.startTime)
          }
          handlePriceChange={handlePriceChange}
          editPrice={editPrice}
          isEditing={isEditing}
          toggleEditPrice={toggleEditPrice}
          editPlace={editPlace}
          toggleModifyPlace={toggleModifyPlace}
          handleModifyClick={handleModifyClick}
        />

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
          onClick={handlePlanButtonClick}
        >
          {planButtonText}
        </Button>
      </div>

      {/* ModifyContainer */}
      {isEditing && selectedOption.option && (
        <ModifyContainer
          option={selectedOption.option}
          placeId={selectedOption.placeId}
          autocompleteSelectedPlace={autocompleteSelectedPlace}
          selectedRecommendedPlace={selectedRecommendedPlace}
          handleCancelClick={handleCancelClick}
          handleSelectClick={handleSelectClick}
          handlePlaceChanged={handlePlaceSelected}
          handleSelectRecommendedPlace={handleSelectRecommendedPlace}
          handleSelectOption={handleSelectOption}
        />
      )}

      {/* Google Map */}
      <Map
        isLoaded={isLoaded}
        loadError={mapLoadError}
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        options={options}
        filteredPlaces={filteredPlaces}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
    </PlanProduce>
  );
};

export default Produce;
