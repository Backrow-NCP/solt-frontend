import styled from 'styled-components';
import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';
import PlanModifyBtn from '../../assets/images/ico/btn_plan_modify.svg';
import PlanModifyActiveBtn from '../../assets/images/ico/btn_plan_modify_active.svg';

// 일정
const PlaceItem = ({
  place,
  previousPlace,
  route,
  planTime,
  handlePriceChange,
  editPrice,
  isEditing,
  toggleEditPrice,
  editPlace,
  toggleModifyPlace,
  handleModifyClick,
  displayButtons,
}) => {

  return (
    <Item key={`place-${place.placeId}`} className="flex">
      <span className="place_time pt_blue size_xs weight_b">
        {planTime(place.startTime)}
      </span>

      <div className="place_info">
        <h3 className="size_md">{place.placeName}</h3>
        <span className="pt_gy size_xs">{place.category}</span>

        {previousPlace && route && (
          <div className="size_xs weight_md">
            <img
              src={
                route.transport.type === '도보'
                  ? transportRun
                  : transportBus
              }
              alt={route.transport.type}
            />
            <span>{route.transport.type}</span>
            <span>{route.travelTime}분</span>
            <span>({route.distance}km)</span>
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
						onChange={e =>
							handlePriceChange(place.placeId, Number(e.target.value))
						}
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

      {/* 조건에 따라 수정 버튼 표시 */}
      {displayButtons && (
        <button onClick={() => toggleModifyPlace(place.placeId)}>
          {editPlace[place.placeId] ? (
            <img src={PlanModifyActiveBtn} alt="일정 수정" />
          ) : (
            <img src={PlanModifyBtn} alt="비활성화" />
          )}
        </button>
      )}

      {editPlace[place.placeId] && (
        <ul className="place_change">
          <li>
            <button
              onClick={() =>
                handleModifyClick('directly', place.placeId)
              }
            >
              직접 쓸래요
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleModifyClick('recomm', place.placeId)
              }
            >
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
    }

    > span {
      display: inline-block;
      margin-left: 8px;
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
`;