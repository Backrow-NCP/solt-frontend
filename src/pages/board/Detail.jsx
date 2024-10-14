import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import BoardDetail from '../../components/Board/BoardDetail';
import planData from '../../mock/planProduce.json';

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
  z-index: 0; // 맵 위에 표시되도록
`;

const MapContainer = styled.div`
  flex: 1;
`;

const Detail = () => {
  const [places, setPlaces] = useState([]); // 장소 목록 상태
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // 중심 좌표 상태

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const placesWithCoordinates = await Promise.all(
          planData.place.map(async place => {
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
                  };
                } else {
                  console.warn(
                    `Geocoding 결과 없음 for placeId ${place.placeId}`
                  );
                  return {
                    ...place,
                    latitude: null,
                    longitude: null,
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
                };
              }
            }
            return place;
          })
        );

        setPlaces(placesWithCoordinates);

        // 중심 좌표 계산 (유효한 장소들의 평균 좌표)
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
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchPlanData();
  }, []);

  return (
    <Container>
      {/* 구글 맵 */}
      <MapContainer>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
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
