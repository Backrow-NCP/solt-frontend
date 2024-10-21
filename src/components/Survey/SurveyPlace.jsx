import { useEffect, useRef, useState, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

import Place01 from '../../assets/images/bn/survey_place_01.jpg';
import Place02 from '../../assets/images/bn/survey_place_02.jpg';
import Place03 from '../../assets/images/bn/survey_place_03.jpg';
import Place04 from '../../assets/images/bn/survey_place_04.jpg';
import DelBtn from '../../assets/images/ico/btn_survey_place_del.svg';

const seoulBounds = {
  north: 37.7015,
  south: 37.4133,
  west: 126.7342,
  east: 127.179,
};

const SurveyPlace = ({ onPlaceSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  // 구글맵 로드
  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // 장소 주소 가져오기
  const getAddressFromComponents = (addressComponents) => {
    // 번지, 도로명, 건물 번호, 구, 시/도, 국가
    let streetNumber = '';
    let route = '';
    let subpremise = '';
    let locality = '';
    let administrativeAreaLevel1 = '';
    let country = '';
  
    addressComponents.forEach(component => {
      const types = component.types;
  
      if (types.includes('subpremise')) {
        subpremise = component.long_name;
      } else if (types.includes('premise')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        route = component.long_name;
      } else if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
        locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        administrativeAreaLevel1 = component.long_name;
      } else if (types.includes('country')) {
        country = component.long_name;
      }
    });
  
    // 최종 주소
    let fullAddress = `${country} ${administrativeAreaLevel1} ${locality} ${route} ${streetNumber} ${subpremise}`.trim();
  
    // 공백 정리
    return fullAddress.replace(/\s+/g, ' ').trim();
  };
  
  // 자동 완성
  useEffect(() => {
    if (isLoaded && !loadError) {
      const initializeAutocomplete = () => {
        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'KR' },
            bounds: seoulBounds,
            strictBounds: true,
            fields: ['place_id', 'name', 'geometry', 'address_components'],
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
              // 서울특별시만 선택 가능
              const isSeoul = place.address_components.some(
                (component) => component.long_name === '서울특별시'
              );
          
              if (!isSeoul) {
                alert('서울특별시만 선택할 수 있습니다.');
                return;
              }
          
              const address = getAddressFromComponents(place.address_components);
              const newPlace = {
                placeId: place.place_id,
                name: place.name,
                address: address || place.formatted_address, // 주소가 없으면 formatted_address 사용
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
              };
          
              // 중복 체크 후 상태 업데이트
              setSelectedPlaces((prevPlaces) => {
                const isAlreadyAdded = prevPlaces.some(p => p.placeId === newPlace.placeId);
                if (!isAlreadyAdded) {
                  const updatedPlaces = [...prevPlaces, newPlace];
                  onPlaceSelect(updatedPlaces);
                  return updatedPlaces;
                }
                return prevPlaces;
              });
            } else {
              alert('구글맵에서 현재 주소를 찾을 수 없습니다.');
            }
            inputRef.current.value = '';
          });
          
        }
      };

      initializeAutocomplete();
    }
  }, [isLoaded, loadError, onPlaceSelect]);

  // 장소 삭제
  const handleClearPlace = useCallback((placeId) => {
    const updatedPlaces = selectedPlaces.filter((place) => place.placeId !== placeId);
    setSelectedPlaces(updatedPlaces);
    onPlaceSelect(updatedPlaces);
  }, [selectedPlaces, onPlaceSelect]);

  // 요즘 많이 찾아요
  const placeRecomms = [
    { id: '1', name: '북촌 한옥마을', imgSrc: Place01, placeId: 'ChIJT8H4r9qifDURmuXJ_6m6vM0' },
    { id: '2', name: '국립중앙박물관', imgSrc: Place02, placeId: 'ChIJN2x0fu2ifDUR51BupseGYmE' },
    { id: '3', name: '동대문디자인플라자', imgSrc: Place03, placeId:'ChIJ8xRYr29FezUR3AtFqx2pIlw' },
    { id: '4', name: '청계천', imgSrc: Place04, placeId:'ChIJIwCT4-yifDUR1E63iG76hr0' },
  ];

  // 추천 장소 클릭
  const handleRecommendPlace = useCallback((place) => {
    setSelectedPlaces((prevPlaces) => {
      const isAlreadyAdded = prevPlaces.some(p => p.placeId === place.placeId);
      if (!isAlreadyAdded) {
        const newPlace = {
          placeId: place.placeId,
          name: place.name,
        };
        const updatedPlaces = [...prevPlaces, newPlace];
        onPlaceSelect(updatedPlaces);
        return updatedPlaces;
      }
      return prevPlaces;
    });
  }, [onPlaceSelect]);

  return (
    <Place className="survey_cont">
      <div className="place_search">
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력해 주세요"
          aria-label="장소 검색 입력"
        />

        {selectedPlaces.length > 0 && (
          <ul className="flex">
            {selectedPlaces.map((place) => (
              <li key={place.placeId} className="selected-place-item">
                {place.name}
                <button onClick={() => handleClearPlace(place.placeId)}>
                  <img src={DelBtn} alt="삭제" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="place_recomm">
        <h3 className="pt_blue size_md weight_sb">요즘 많이 찾아요!</h3>

        <ul className="flex">
          {placeRecomms.map((place) => (
            <li key={place.id} className="recomm-place-item">
              <button onClick={() => handleRecommendPlace(place)}>
                <img src={place.imgSrc} alt={place.name} />
                <span>{place.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Place>
  );
};

export default SurveyPlace;

const Place = styled.div`
  .place_search {
    width: 638px;
    margin: 0 auto;

    input {
      width: 100%;
      height: 72px;
      padding: 0 40px;
      border: 1px solid #ddd;
      border-radius: 16px;
      box-sizing: border-box;
      font-size: 18px;
      color: #121212;

      &::placeholder {
        color: #888;
      }
    }

    ul {
      gap: 12px;
      justify-content: center;
      margin-top: 16px;

      li {
        padding: 12px 16px;
        border: 1px solid #14B8FF;
        border-radius: 8px;
        background: #fff;
        font-size: 18px;
        font-weight: 600;
        color: #14B8FF;

        button {
          margin-left: 8px;
          vertical-align: bottom;
        }
      }
    }
  }

  .place_recomm {
    margin-top: 40px;

    h3 {
      margin-bottom: 16px;
    }

    ul {
      justify-content: center;
      gap: 12px;

      li {
        button {
          display: block;
          overflow: hidden;
          border: 1px solid #ddd;
          border-radius: 8px;

          &.active {
            border-color: #14B8FF;
            color: #14B8FF;
          }
        }

        img {
          width: 100%;
        }

        span {
          display: block;
          padding: 12px 0;
          background: #fff;
        }
      }
    }
  }

  /* media size */
  @media (max-width: 800px) {
    .place_search {
      width: 90%;

      input {
        height: 60px;
        padding: 0 30px;
        font-size: 16px;
      }
    }

    .place_recomm ul {
      gap: 8px;
      flex-wrap: nowrap;
    }
  }

  @media (max-width: 700px) {
    .place_search {
      width: 90%;

      input {
        height: 50px;
        padding: 0 25px;
        border-radius: 12px;
        font-size: 14px;
      }
    }

    .place_recomm {
      ul {
        flex-wrap: wrap;

        li {
          width: calc(50% - 4px);

          button {
            margin: 0 auto;
          }

          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  }
`;