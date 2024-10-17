import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import BoardDetailContainer from '../../components/Board/BoardDetailContainer';
import Map from '../../components/Plan/Map';
import usePlanData from '../../hooks/plan/usePlanData';
import useCategoryTotals from '../../hooks/plan/useCategoryTotals';
import { useLoadScript } from '@react-google-maps/api';

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const libraries = ['places']; // 필요에 따라 라이브러리를 정의하세요

const Detail = () => {
  const { plan, places, loading } = usePlanData();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜 상태 추가

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

  // Google Maps API 로드
  const { isLoaded, loadError: mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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

  // 선택된 날짜에 따라 필터링된 장소 목록 생성
  const filteredPlaces = useMemo(
    () =>
      places.filter(
        place =>
          new Date(place.startTime).toISOString().split('T')[0] ===
          days[selectedDay - 1]
      ),
    [places, days, selectedDay]
  );

  const handleTabClick = useCallback(index => {
    setSelectedDay(index + 1);
  }, []);

  const mapContainerStyle = { width: '100%', height: '400px' };
  const center = { lat: 37.5665, lng: 126.978 }; // 중심 좌표 설정
  const options = {}; // 필요한 옵션 설정

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  }

  if (mapLoadError) {
    return <div>Error loading maps</div>; // 지도 로드 에러 처리
  }

  if (!isLoaded) {
    return <div>Loading map...</div>; // 지도 로딩 중 UI
  }

  if (filteredPlaces.length === 0) {
    return <div>No places available</div>; // 또는 원하는 UI
  }

  console.log('places, 디테일페이지', places);
  console.log('필터링 플레이스 디테일 페이지:', filteredPlaces);
  console.log('days 디테일 페이지:', days);
  console.log('plan 디테일 페이지', plan);

  return (
    <Container>
      {/* 지도 컴포넌트 */}
      <Map
        isLoaded={isLoaded}
        loadError={mapLoadError}
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={options}
        filteredPlaces={filteredPlaces}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />

      {/* BoardDetailContainer로 분리된 오버레이 박스 */}
      <BoardDetailContainer
        planData={plan}
        days={days}
        filteredPlaces={filteredPlaces}
        places={places}
        selectedDay={selectedDay} // 선택된 날짜도 전달
        setSelectedDay={setSelectedDay} // 선택된 날짜를 설정하는 함수도 전달
        handleTabClick={handleTabClick}
      />
    </Container>
  );
};

export default Detail;
