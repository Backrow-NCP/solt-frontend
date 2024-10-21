import styled from "styled-components";
import transportBus from '../../assets/images/ico/transport_bus.svg';
import transportRun from '../../assets/images/ico/transport_run.svg';

// 확정 일정 컴포넌트
const PlaceComplete = ({ dayPlaces, plan, getDayTotalPrice }) => {

  // dayPlaces가 비어 있으면 일정 없음 메시지 반환
  if (!dayPlaces || dayPlaces.length === 0) {
    return (
      <Complete>
        <h3 className="size_md">일정 없음</h3>
        <p className="day_price pt_blue size_xs">이 날짜에 일정이 없습니다.</p>
      </Complete>
    );
  }

  return (
    <Complete className="plan_day">
      <h3 className="size_md">{dayPlaces[0] ? new Date(dayPlaces[0].startTime).toLocaleDateString() : ''}</h3>
      <p className="day_price pt_blue size_xs">
        총 예상 금액 {getDayTotalPrice(dayPlaces).toLocaleString()}원
      </p>

      <ol>
        {dayPlaces.map((place, index) => {
          const nextPlace = dayPlaces[index + 1];
          const route = nextPlace
            ? plan.route.find(
                (r) => r.startPlaceId === place.placeId && r.endPlaceId === nextPlace.placeId
              )
            : null;

          return (
            <li key={place.placeId} className="flex">
              <div className="place_number size_xxs">{index + 1}</div>
              <div className="place_info">
                <span className="place_time pt_blue size_xxs weight_sb">
                  {new Date(place.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <strong className="place_name size_sm weight_sb">{place.placeName}</strong>
                <span className="place_category size_xxs pt_gy">{place.category}</span>

                {/* 이동수단 영역 */}
                {route && (
                  <div className="transport_info flex size_xxs pt_gy">
                    <img src={route.transport.type === '도보' ? transportRun : transportBus} alt={route.transport.type} />
                    <span>{route.transport.type}</span>
                    <span>{route.travelTime}분</span>
                    <span>({route.distance}km)</span>
                  </div>
                )}
              </div>
              <div className="place_price">
                <p className="size_xxs weight_md">예상 금액</p>
                <span className="pt_pink size_sm weight_sb">{place.price.toLocaleString()}원</span>
              </div>
            </li>
          );
        })}
      </ol>
    </Complete>
  );
};

export default PlaceComplete;

const Complete = styled.div`
  h3 {
    margin-bottom: 12px;
  }

  .day_price {
    padding: 10px 0;
    border: 1px solid rgba(20, 184, 255, 0.16);
    border-radius: 8px;
    background: rgba(20, 184, 255, 0.06);
    text-align: center;
  }

  ol li {
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 32px;

    > div {
      box-sizing: border-box;
    }

    .place_number {
      width: 20px;
      padding: 5px 6px 4px;
      border-radius: 6px;
      background: #14b8ff;
      color: #fff;
      line-height: 1;
    }

    .place_info {
      width: calc(100% - 140px);
      text-align: left;

      .place_time {
        display: block;
        margin-bottom: 4px;
        line-height: 20px;
      }
    }

    .place_price {
      width: 100px;
      margin-top: 28px;
      text-align: right;

      p {
        margin-bottom: 3px;
      }
    }

    .place_name {
      margin-right: 8px;
    }

    .transport_info {
      gap: 2px;
      margin-top: 8px;
    }
  }

  /* media size */
  @media (max-width: 700px) {
    ol li {
    gap: 5px;

    > div {
      box-sizing: border-box;
    }

    .place_info {
      width: calc(100% - 110px);

      .place_time {
        display: block;
        margin-bottom: 4px;
        line-height: 20px;
      }
      
      .place_category {
        display: none;
      }
    }

    .place_price {
      width: 80px;
      margin-top: 20px;
    }

    .transport_info {
      span:last-child {
        display: none;
      }
    }
  }

  @media (max-width: 470px) {
    ol li {
      flex-wrap: wrap;
      gap: 0;

      .place_info {
        width: calc(100% - 30px)
      }
      .place_price {
        width: 100%;
        margin: 0;

        p {
          display: none;
        }
      }
    }
  }
`;
