import React, { useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'; // useParams 훅 임포트
import BoardDetailContainer from '../../components/Board/BoardDetailContainer';
import Map from '../../components/Plan/Map';
import usePlanData from '../../hooks/plan/usePlanData';
import useCategoryTotals from '../../hooks/plan/useCategoryTotals';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios'; // axios 임포트

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const libraries = ['places']; // 필요에 따라 라이브러리를 정의하세요

const Detail = ({ isDetailPage }) => {
  const url = process.env.REACT_APP_API_URL;
  const { boardId } = useParams(); // URL에서 boardId 가져오기
  const [boardData, setBoardData] = useState(null); // boardData 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`${url}/boards/${boardId}`); // API 요청
        setBoardData(response.data); // 응답 데이터 상태로 저장
        console.log('응답 데이터 @@@@@@@@', response.data);
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('게시글 데이터를 가져오는 데 실패했습니다:', error);
        setLoading(false); // 로딩 완료
      }
    };

    fetchBoardData(); // 데이터 가져오기 호출
  }, [url, boardId]); // 의존성 배열에 url과 boardId 추가

  const { plan, places } = usePlanData();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태 추가
  const [filteredPlaces, setFilteredPlaces] = useState([]);

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

  const {
    categoryTotals,
    pieChartData,
    totalPlacePrice,
    totalRoutePrice,
    totalPrice,
  } = useCategoryTotals(places, categories, plan);

  useEffect(() => {
    // TabContainer에 첫 번째 날짜의 장소를 필터링하여 업데이트하는 로직
    const initialDayIndex = 0; // 기본적으로 첫 번째 날짜의 인덱스
    setFilteredPlaces(places => {
      if (!places || places.length === 0) return [];
      const filtered = places.filter(
        place =>
          new Date(place.startTime).toISOString().split('T')[0] ===
          new Date(places[initialDayIndex].startTime)
            .toISOString()
            .split('T')[0]
      );
      return filtered;
    });
  }, [places]);

  // Google Maps API 로드
  const { isLoaded, loadError: mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const center = { lat: 37.5665, lng: 126.978 }; // 서울의 중심 좌표
  const [mapCenter, setMapCenter] = useState(center); // 맵 중심
  const mapContainerStyle = { width: '100%', height: '90vh' };
  const [editPlace, setEditPlace] = useState({}); // 일정 수정 버튼
  const [isEditing, setIsEditing] = useState(false); // 일정 수정 여부
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const [selectedRecommendedPlace, setSelectedRecommendedPlace] =
    useState(null); // ModifyContainer 선택된 장소
  const [autocompleteSelectedPlace, setAutocompleteSelectedPlace] =
    useState(null); // Autocomplete 선택된 장소
  const [selectedOption, setSelectedOption] = useState({
    option: null,
    placeId: null,
  }); // 플랜 수정 방법, 수정 아이디

  // 고유한 날짜 목록 생성
  const days = useMemo(
    () =>
      Array.from(
        new Set(
          places.map(
            place => new Date(place.startTime).toISOString().split('T')[0]
          )
        )
      ).sort((a, b) => new Date(a) - new Date(b)),
    [places]
  );

  const handleTabClick = useCallback(index => {
    setSelectedDay(index + 1);
    setEditPlace({});
    setIsEditing(false);
    setSelectedOption({ option: null, placeId: null });
    setSelectedRecommendedPlace(null);
    setAutocompleteSelectedPlace(null);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (mapLoadError) {
    return <div>Error loading maps</div>; // 지도 로드 에러 처리
  }

  if (!isLoaded) {
    return <div>Loading map...</div>; // 지도 로딩 중 UI
  }

  console.log('필터링 플레이스 디테일 페이지', filteredPlaces);

  return (
    <Container>
      {/* 지도 컴포넌트 */}
      <Map
        isLoaded={isLoaded}
        loadError={mapLoadError}
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        options={options}
        filteredPlaces={filteredPlaces}
        setFilteredPlaces={setFilteredPlaces}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />

      {/* BoardDetailContainer로 분리된 오버레이 박스 */}
      <BoardDetailContainer
        planData={plan}
        days={days}
        filteredPlaces={filteredPlaces}
        setFilteredPlaces={setFilteredPlaces}
        places={places}
        selectedDay={selectedDay} // 선택된 날짜도 전달
        setSelectedDay={setSelectedDay} // 선택된 날짜를 설정하는 함수도 전달
        handleTabClick={handleTabClick}
        totalPrice={totalPrice}
        pieChartData={pieChartData}
        isDetailPage={isDetailPage}
        boardData={boardData} // 보드 데이터도 전달
      />
    </Container>
  );
};

export default Detail;
