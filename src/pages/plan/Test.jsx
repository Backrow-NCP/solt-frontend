import React from 'react';
import { GoogleMap, LoadScript, MarkerF, useLoadScript } from '@react-google-maps/api';

const Test = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // API 키를 환경 변수로부터 가져옴
    });

    const mapContainerStyle = {
        height: "400px",
        width: "100%"
    };

    const center = {
        lat: 37.550867, // 서울의 위도
        lng: 126.993567 // 서울의 경도
    };

    const markers = [
        {
            id: 1,
            position: { lat: 37.550867, lng: 126.993567 },
            title: "마커 1: 서울"
        },
        {
            id: 2,
            position: { lat: 37.5705, lng: 126.977 }, // 다른 위치
            title: "마커 2: 다른 위치"
        }
    ];

    if (loadError) return <div>Map can't be loaded right now, sorry.</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
        >
            {markers.map(marker => (
                <MarkerF
                    key={marker.id}
                    position={marker.position}
                    title={marker.title} // 기본 마커 아이콘 사용
                />
            ))}
        </GoogleMap>
    );
};

export default Test;
