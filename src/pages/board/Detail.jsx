import React, { useState } from 'react';
import styled from 'styled-components';
import BoardDetailContainer from '../../components/Board/BoardDetailContainer';
import Map from '../../components/Plan/Map';
import usePlanData from '../../hooks/plan/usePlanData';
import { useLoadScript } from '@react-google-maps/api';

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const libraries = ['places']; // 필요에 따라 라이브러리를 정의하세요

const Detail = () => {
  const { plan, places = [], loading } = usePlanData();
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Google Maps API 로드
  const { isLoaded, loadError: mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const filteredPlaces =
    places.filter(place => place.latitude && place.longitude) || []; // 빈 배열로 대체

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

  console.log('필터링 플레이스:', filteredPlaces);
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
      <BoardDetailContainer planData={plan} />
    </Container>
  );
};

export default Detail;
