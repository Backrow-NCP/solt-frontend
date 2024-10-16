import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import Button from '../../components/Button';
import styled from 'styled-components';
import { scrollbar } from '../../styles/scrollbar';
import ModifyData from '../../mock/planModify.json';
import Restaurant from '../../assets/images/bn/plan_produce_restaurant.jpg';

const seoulBounds = {
  north: 37.7015,
  south: 37.4133,
  west: 126.7342,
  east: 127.179,
};

// 수정 선택 영역
const ModifyContainer = ({
  option,
  placeId,
  autocompleteSelectedPlace,
  selectedRecommendedPlace,
  handleCancelClick,
  handleSelectClick,
  handlePlaceChanged,
  handleSelectRecommendedPlace,
  handleSelectOption,
}) => {
  const autocompleteRef = useRef(null);

  const onErrorImg = (e) => {
    e.target.onerror = null;
    e.target.src = Restaurant;
  };

  return (
    <Modify className="plan_modify">
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
    </Modify>
  );
};

export default ModifyContainer;

const Modify = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 600px;
  width: 500px;
  padding: 40px 30px 40px 40px;
  background: #fff;
  border-radius: 32px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-50%);
  transition: 0.3s ease;

  h3 {
    margin-bottom: 40px;
  }

  button {
    width: 100%;

    &:first-of-type {
      margin: 40px 0 10px;
    }
  }

  // 직접 수정
  .directly {
    input {
      width: 100%;
      height: 72px;
      padding: 0 40px;
      border: 1px solid #ddd;
      border-radius: 16px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      font-size: 18px;
      color: #121212;

      &::placeholder {
        color: #888;
      }
    }

    .selected_place {
      margin-top: 10px;
      padding: 16px;
      border: 1px solid #14b8ff;
      border-radius: 16px;
      background: rgba(20, 184, 255, 0.06);

      h4 {
        margin-bottom: 5px;
      }
    }
  }

  // 추천 수정
  .recomm {
    ul {
      overflow-y: auto;
      height: 30vh;
      padding-right: 10px;
      ${scrollbar}

      li {
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 16px;
        background: #fff;
        transition: 0.2s;
        cursor: pointer;

        &:last-child {
          margin-bottom: 4px;
        }
        &:hover {
          border-color: #14b8ff;
        }
        &.selected {
          border-color: #14b8ff;
          background: rgba(20, 184, 255, 0.06);
        }

        img {
          width: 70px;
          margin-right: 15px;
          border-radius: 12px;
        }

        .place_info {
          width: calc(100% - 185px);

          p {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: 30px;
            margin-top: 6px;
            font-size: 13px;
            line-height: 15px;
            text-overflow: ellipsis;
          }
        }

        .place_price {
          width: 100px;
          text-align: right;

          strong {
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
  }
`;