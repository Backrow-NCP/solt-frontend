// ModifyContainer.jsx

import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import Button from '../../components/Button';
import ModifyData from '../../mock/planModify.json';
import Restaurant from '../../assets/images/bn/plan_produce_restaurant.jpg';

const seoulBounds = {
  north: 37.7015,
  south: 37.4133,
  west: 126.7342,
  east: 127.179,
};

const ModifyContainer = ({
  option,
  placeId,
  autocompleteSelectedPlace,
  selectedRecommendedPlace,
  handleCancelClick,
  handleSelectClick,
  handlePlaceChanged, // 수정된 prop
  handleSelectRecommendedPlace,
  handleSelectOption,
}) => {
  const autocompleteRef = useRef(null);

  const onErrorImg = (e) => {
    e.target.onerror = null;
    e.target.src = Restaurant;
  };

  return (
    <div className="plan_modify">
      {/* 직접 수정 */}
      {option === 'directly' && (
        <div className="directly">
          <h3 className="size_lg weight_b">가고 싶은 곳을 검색해 주세요!</h3>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={() => {
              if (autocompleteRef.current !== null) {
                const place = autocompleteRef.current.getPlace();
                console.log('Selected place:', place); // 디버깅용 로그

                if (place && place.geometry) {
                  const newSelectedPlace = {
                    placeId: place.place_id,
                    name: place.name,
                    address: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                  };
                  handlePlaceChanged(newSelectedPlace); // 선택된 장소 데이터 전달
                } else {
                  alert('서울 안에서 선택해 주세요');
                }
              } else {
                alert('자동 완성이 아직 로드되지 않았습니다');
              }
            }}
            options={{
              bounds: seoulBounds, // 서울의 경계 설정
              strictBounds: true,
              componentRestrictions: { country: 'KR' }, // 한국으로 제한
            }}
          >
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              aria-label="장소 검색 입력"
              className="modify-search-input"
            />
          </Autocomplete>

          {autocompleteSelectedPlace && (
            <div className="selected_place">
              <h4 className="pt_blue size_sm weight_sb">
                {autocompleteSelectedPlace.name}
              </h4>
              <p className="size_xs">{autocompleteSelectedPlace.address}</p>
            </div>
          )}

          <Button
            onClick={handleCancelClick}
            size="xxl"
            color="white"
            style={{ borderColor: '#eee' }}
            className="weight_md"
          >
            취소
          </Button>
          <Button
            onClick={handleSelectClick}
            size="xxl"
            color="blue"
            className="weight_md"
            disabled={!autocompleteSelectedPlace}
          >
            이 장소로 선택
          </Button>
        </div>
      )}
      {/* 추천 수정 */}
      {option === 'recomm' && (
        <div className="recomm">
          <h3 className="size_lg weight_b">추천 장소 선택하기</h3>

          <ul>
            {ModifyData.place.map((place) => (
              <li
                key={place.placeId}
                className={`flex ${
                  selectedRecommendedPlace &&
                  selectedRecommendedPlace.placeId === place.placeId
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleSelectRecommendedPlace(place)}
              >
                {place.category === '음식점' &&
                  (place.image ? (
                    <img
                      src={place.image}
                      alt={place.placeName}
                      onError={onErrorImg}
                    />
                  ) : (
                    <img src={Restaurant} alt="noImage" />
                  ))}
                <div className="place_info">
                  <h4 className="size_md weight_sb">{place.placeName}</h4>
                  <p className="pt_gy">{place.description}</p>
                </div>
                <div className="place_price">
                  <span className="size_xs weight_md">예상 금액</span>
                  <strong className="pt_blue size_sm weight_b">
                    {place.price.toLocaleString()}원
                  </strong>
                </div>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleCancelClick}
            size="xxl"
            color="white"
            style={{ borderColor: '#eee' }}
            className="weight_md"
          >
            취소
          </Button>
          <Button
            onClick={handleSelectClick}
            size="xxl"
            color="blue"
            className="weight_md"
            disabled={!selectedRecommendedPlace}
          >
            이 장소로 선택
          </Button>
        </div>
      )}
      {/* 수정 방법 선택 */}
      {option === 'choose' && (
        <div className="choose">
          <h3 className="size_lg weight_b">수정 방법을 선택하세요</h3>
          <Button
            onClick={() => handleSelectOption('directly', placeId)}
            size="xxl"
            color="white"
            className="weight_md"
          >
            직접 검색
          </Button>
          <Button
            onClick={() => handleSelectOption('recomm', placeId)}
            size="xxl"
            color="white"
            className="weight_md"
          >
            추천 받기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ModifyContainer;