import { useEffect, useRef, useState } from 'react';

import Place01 from '../../assets/images/bn/survey_place_01.jpg';
import Place02 from '../../assets/images/bn/survey_place_02.jpg';
import Place03 from '../../assets/images/bn/survey_place_03.jpg';
import Place04 from '../../assets/images/bn/survey_place_04.jpg';
import DelBtn from '../../assets/images/ico/btn_survey_place_del.svg';

const SurveyPlace = ({ onPlaceSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
			// Google Maps API가 이미 로드되었는지 확인
      if (!window.google) {
        const googleScript = document.createElement('script');
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMPGhDUUOre8nHwSGv53Xl6K4UtGVPQfc&libraries=places`;
        window.document.body.appendChild(googleScript);

        googleScript.addEventListener('load', initializeAutocomplete);
      } else {
        initializeAutocomplete();
      }
    };

    const initializeAutocomplete = () => {
      const input = inputRef.current;
      autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'KR' },
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry) {
          setSelectedPlaces((prevPlaces) => [...prevPlaces, place]);
        }
        inputRef.current.value = '';
        onPlaceSelect([...selectedPlaces, place]);
      });
    };

    loadGoogleMapsAPI();
  }, [selectedPlaces, onPlaceSelect]);

  const handleClearPlace = (placeIndex) => {
    const updatedPlaces = selectedPlaces.filter((_, index) => index !== placeIndex);
    setSelectedPlaces(updatedPlaces);
    onPlaceSelect(updatedPlaces);
  };

  // list
  const placeRecomms = [
    { id: 1, name: '북촌 한옥마을', imgSrc: Place01 },
    { id: 2, name: '국립중앙박물관', imgSrc: Place02 },
    { id: 3, name: '동대문디자인플라자', imgSrc: Place03 },
    { id: 4, name: '청계천', imgSrc: Place04 },
  ];

  return (
    <div className="survey_cont">
      <div className="place_search">
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력해 주세요"
        />

        {selectedPlaces.length > 0 && (
          <ul className="flex">
            {selectedPlaces.map((place, index) => (
              <li key={index}>
                {place.name}
                <button onClick={() => handleClearPlace(index)}><img src={DelBtn} alt="삭제" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="place_recomm">
        <h3 className="pt_blue size_md weight_sb">요즘 많이 찾아요!</h3>

        <ul className="flex">
          {placeRecomms.map((place) => (
            <li key={place.id}>
              <button onClick={() => setSelectedPlaces([...selectedPlaces, place])}>
                <img src={place.imgSrc} alt={place.name} />
                <span>{place.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SurveyPlace;
