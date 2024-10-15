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
}) => {

  return (
    <li key={`place-${place.placeId}`} className="flex">
      <span className="place_time pt_blue size_xs weight_b">
        {planTime(place.startTime)}
      </span>

      <div className="place_info">
        <h3 className="size_md">{place.placeName}</h3>
        <span className="pt_gy size_xs">{place.category}</span>

        {/* 이동수단 영역 */}
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
        <button
          onClick={() => toggleEditPrice(place.placeId)}
          className="pt_gy size_xxs"
          disabled={isEditing}
        >
          {editPrice[place.placeId] ? '확인' : '금액 수정'}
        </button>
      </div>

      {/* 일정 수정 버튼 */}
      <button onClick={() => toggleModifyPlace(place.placeId)}>
        {editPlace[place.placeId] ? (
          <img src={PlanModifyActiveBtn} alt="일정 수정" />
        ) : (
          <img src={PlanModifyBtn} alt="비활성화" />
        )}
      </button>

      {/* 수정 방법 */}
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
    </li>
  );
};

export default PlaceItem;