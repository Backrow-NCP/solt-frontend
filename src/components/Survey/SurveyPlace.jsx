import { useEffect, useRef, useState, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

import Place01 from '../../assets/images/bn/survey_place_01.jpg';
import Place02 from '../../assets/images/bn/survey_place_02.jpg';
import Place03 from '../../assets/images/bn/survey_place_03.jpg';
import Place04 from '../../assets/images/bn/survey_place_04.jpg';
import DelBtn from '../../assets/images/ico/btn_survey_place_del.svg';

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

  // 자동 완성
  useEffect(() => {
    if (isLoaded && !loadError) {
      const initializeAutocomplete = () => {
        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: 'KR' },
            fields: ['place_id', 'name', 'geometry'],
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
              const newPlace = {
                placeId: place.place_id,
                name: place.name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
              };

              // 중복 체크
              setSelectedPlaces((prevPlaces) => {
                const isAlreadyAdded = prevPlaces.some(p => p.placeId === newPlace.placeId);
                if (!isAlreadyAdded) {
                  const updatedPlaces = [...prevPlaces, newPlace];
                  onPlaceSelect(updatedPlaces);
                  return updatedPlaces;
                }
                return prevPlaces;
              });
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
    { id: '1', name: '북촌 한옥마을', imgSrc: Place01 },
    { id: '2', name: '국립중앙박물관', imgSrc: Place02 },
    { id: '3', name: '동대문디자인플라자', imgSrc: Place03 },
    { id: '4', name: '청계천', imgSrc: Place04 },
  ];

  // 추천 장소 클릭
  const handleRecommendPlace = useCallback((place) => {
    setSelectedPlaces((prevPlaces) => {
      const isAlreadyAdded = prevPlaces.some(p => p.placeId === place.id);
      if (!isAlreadyAdded) {
        const newPlace = {
          placeId: place.id,
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
`;