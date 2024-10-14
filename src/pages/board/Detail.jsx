import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import planData from '../../mock/planProduce.json'; // 임시 데이터 임포트 코드
import BoardDetail from '../../components/Board/BoardDetail';
import Produce from '../../styles/plan/produce'; // 스타일 임포트

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 10; // 맵 위에 표시되도록
`;

const MapContainer = styled.div`
  flex: 1;
`;

const PlanCont = styled.div`
  ${Produce.plan_cont}
`;

const Detail = () => {
  const [plan, setPlan] = useState(planData); // 임시 데이터 사용
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 날짜
  const [filteredPlaces, setFilteredPlaces] = useState([]); // 필터링된 장소 상태
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 맵 로딩 상태

  const handleMapLoad = () => {
    setIsMapLoaded(true); // 맵이 로드되면 상태 업데이트
  };

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const placesWithCoordinates = await Promise.all(
          plan.place.map(async place => {
            if (!place.latitude || !place.longitude) {
              try {
                const geocodeResponse = await axios.get(
                  'https://maps.googleapis.com/maps/api/geocode/json',
                  {
                    params: {
                      address: place.addr,
                      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    },
                  }
                );
                const location =
                  geocodeResponse.data.results[0]?.geometry.location;
                if (location) {
                  return {
                    ...place,
                    latitude: location.lat,
                    longitude: location.lng,
                    price: Number(place.price) || 0, // price가 숫자가 아니면 0으로 설정
                  };
                } else {
                  console.warn(
                    `Geocoding 결과 없음 for placeId ${place.placeId}`
                  );
                  return {
                    ...place,
                    latitude: null,
                    longitude: null,
                    price: Number(place.price) || 0,
                  };
                }
              } catch (error) {
                console.error(
                  `Geocoding 실패 for placeId ${place.placeId}:`,
                  error
                );
                return {
                  ...place,
                  latitude: null,
                  longitude: null,
                  price: Number(place.price) || 0,
                };
              }
            }
            return { ...place, price: Number(place.price) || 0 }; // 이미 위도와 경도가 있는 경우에도 price 변환
          })
        );

        setPlaces(placesWithCoordinates);

        // 중심 좌표 계산 (평균 내기)
        const validPlaces = placesWithCoordinates.filter(
          place => place.latitude && place.longitude
        );
        if (validPlaces.length > 0) {
          const avgLat =
            validPlaces.reduce((acc, place) => acc + place.latitude, 0) /
            validPlaces.length;
          const avgLng =
            validPlaces.reduce((acc, place) => acc + place.longitude, 0) /
            validPlaces.length;
          setCenter({ lat: avgLat, lng: avgLng });
        }

        // 총 가격 계산
        const total = placesWithCoordinates.reduce(
          (acc, place) => acc + (place.price || 0),
          0
        );
        setTotalPrice(total);

        // 첫 번째 날짜의 장소 필터링 (가정)
        setFilteredPlaces(
          placesWithCoordinates.filter(place => place.day === selectedDay)
        );
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchPlanData();
  }, [selectedDay]);

  const handleTabClick = index => {
    setSelectedDay(index + 1);
    setFilteredPlaces(places.filter(place => place.day === index + 1)); // 필터링된 장소 업데이트
  };

  return (
    <Container>
      {/* 구글 맵 */}
      <MapContainer>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onLoad={handleMapLoad}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            {/* 마커 표시 */}
            {places.map(
              (place, index) =>
                place.latitude &&
                place.longitude && (
                  <Marker
                    key={index}
                    position={{ lat: place.latitude, lng: place.longitude }}
                    title={place.addr}
                  />
                )
            )}
          </GoogleMap>
        </LoadScript>
      </MapContainer>

      {/* 구글 맵 위에 오버레이로 표시할 내용 */}
      <OverlayContainer
        style={{
          width: '568px',
          height: '962px',
          marginTop: '50px',
          marginLeft: '10px',
          backgroundColor: 'white',
          borderRadius: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          zIndex: 10,
        }}
      >
        <BoardDetail /> {/* 여기에 BoardDetail을 포함 */}
      </OverlayContainer>
    </Container>
  );
};

export default Detail;
