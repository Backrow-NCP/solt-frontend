import { useRef } from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import Loading from '../../pages/plan/Loading';
import MarkerBg from '../../assets/images/ico/ico_plan_marker.png';

// 지도의 렌더링과 마커 표시
const Map = ({
  isLoaded,
  loadError,
  mapContainerStyle,
  center,
  options,
  filteredPlaces,
  selectedMarker,
  setSelectedMarker,
  handleInfoWindowOpen,
}) => {
  const mapRef = useRef(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Loading />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      options={options}
      onLoad={map => {
        mapRef.current = map;
      }}
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
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '13px',
            }}
          />
        ) : null
      )}

      {/* 선택된 마커 설명 */}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.latitude,
            lng: selectedMarker.longitude,
          }}
          onCloseClick={() => setSelectedMarker(null)}
          onLoad={handleInfoWindowOpen}
        >
          <div className="marker_desc">
            <strong>{selectedMarker.placeName}</strong>
            <p>주소: {selectedMarker.addr}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
