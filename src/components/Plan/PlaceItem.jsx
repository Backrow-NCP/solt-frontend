import { useState } from 'react';
import styled from 'styled-components';
import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';
import PlanModifyBtn from '../../assets/images/ico/btn_plan_modify.svg';
import PlanModifyActiveBtn from '../../assets/images/ico/btn_plan_modify_active.svg';

// 일정
const PlaceItem = ({
  place,
  route,
  planTime,
  handlePriceChange,
  editPrice,
  isEditing,
  toggleEditPrice,
  handleModifyClick,
  displayButtons,
}) => {
  const [isModified, setIsModified] = useState(false); // 개별 PlaceItem의 수정 상태를 관리

  // 수정 버튼 클릭 시 수정 상태 변경
  const toggleModify = () => {
    setIsModified(!isModified);
  };

  return (
    <Item key={`place-${place.startTime}`} className="flex">
      <span className="place_time pt_blue size_xs weight_b">
        {planTime(place.startTime)}
      </span>

      <div className="place_info">
        <h3 className="size_md">{place.placeName}</h3>
        <span className="pt_gy size_xs">{place.category}</span>

        {route && (
          <div className="size_xs weight_md">
            <img
              src={
                route.transportation.type === '도보'
                  ? transportRun
                  : transportBus
              }
              alt={route.transportation.type}
            />
            <span>{route.transportation.type}</span>
            <span>{route.travelTime}분</span>
            <span>
              (
              {route.distance < 1000
                ? route.distance + 'm'
                : (route.distance / 1000).toFixed(2) + 'km'}
              )
            </span>
            {route.price !== 0 && (
              <strong className="pt_blue size_xs weight_sb">
                약 {route.price.toLocaleString()}원
              </strong>
            )}
          </div>
        )}

        <p className="desc pt_gy size_xs">{place.description}</p>
      </div>

      <div className="place_price">
        <p className="size_xs weight_md">예상 금액</p>
        <div className="flex">
          <input
            type="number"
            min="0"
            value={place.price}
            onChange={e => handlePriceChange(place, Number(e.target.value))}
            disabled={!editPrice[place.placeId] || isEditing}
          />
          <span className="pt_pink size_sm weight_b">원</span>
        </div>
        {displayButtons && (
          <button
            onClick={() => toggleEditPrice(place.placeId)}
            className="pt_gy size_xxs"
            disabled={isEditing}
          >
            {editPrice[place.placeId] ? '확인' : '금액 수정'}
          </button>
        )}
      </div>

      {/* 수정 버튼 */}
      {displayButtons && (
        <button onClick={toggleModify}>
          {isModified ? (
            <img src={PlanModifyActiveBtn} alt="일정 수정" />
          ) : (
            <img src={PlanModifyBtn} alt="비활성화" />
          )}
        </button>
      )}

      {/* 클릭된 곳만 수정 가능하도록 처리 */}
      {isModified && (
        <ul className="place_change">
          <li>
            <button onClick={() => handleModifyClick('directly', place)}>
              직접 쓸래요
            </button>
          </li>
          <li>
            <button onClick={() => handleModifyClick('recomm', place)}>
              다른 추천 받을래요
            </button>
          </li>
        </ul>
      )}
    </Item>
  );
};

export default PlaceItem;

const Item = styled.li`
  // 시간
  .place_time {
    position: relative;
    width: 40px;
  }

  // 일정 설명
  .place_info {
    width: calc(100% - 234px);

    h3 {
      display: inline-block;
      margin-right: 5px;
    }

    > span {
      display: inline-block;
      vertical-align: text-top;
    }

    > div {
      margin: 8px 0;

      span {
        margin-left: 4px;
      }

      strong {
        margin-left: 10px;
      }
    }
  }

  // 예상 금액
  .place_price {
    width: 110px;
    text-align: right;

    div {
      flex-wrap: nowrap;
      align-items: flex-end;
      justify-content: flex-end;
      margin-top: 7px;
    }

    input {
      width: 75px;
      border: 0;
      background: #fff;
      font-size: 18px;
      font-weight: 700;
      color: #121212;
      text-align: right;

      &:disabled {
        color: #f78c9f;
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
    }

    span {
      vertical-align: text-bottom;
    }

    button {
      text-decoration: underline;
    }
  }

  // 더보기 버튼
  > button {
    width: 24px;

    img {
      width: 100%;
    }
  }

  // 수정 선택 버튼
  .place_change {
    overflow: hidden;
    position: absolute;
    top: 50%;
    right: 10%;
    width: 160px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
    transform: translateY(-50%);

    li:first-child {
      border-bottom: 1px solid #ddd;
    }

    button,
    button.active {
      width: 100%;
      padding: 12px 0;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      transition: 0.2s;

      &:hover {
        background: #14b8ff;
        color: #fff;
      }
    }
  }

  /* media size */
  @media (max-width: 700px) {
    .place_info {
      width: calc(100% - 214px);

      > span {
        display: none;
      }

      > div {
        span:last-of-type {
          display: none;
        }

        strong {
          display: block;
          margin: 2px 0 0;
        }
      }
    }

    .place_price {
      width: 90px;

      input {
        width: 70px;
        font-size: 14px;
      }
    }

    .place_change {
      width: 130px;

      button,
      button.active {
        padding: 10px 0;
        font-size: 13px;
      }
    }
  }
`;
