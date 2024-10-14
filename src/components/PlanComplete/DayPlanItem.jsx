import React from 'react';
import styled from 'styled-components';
import transportBus from '../../assets/images/ico/transport_bus.svg';
import transporRun from '../../assets/images/ico/transport_run.svg';

const DayPlanItem = ({ dayIndex, dayPlaces, getDayTotalPrice, plan }) => {
  return (
    <PlanItem>
      <h3 className="size_md">Day {dayIndex + 1}</h3>
      <p className="day_price pt_blue size_xs">총 예상 금액 {getDayTotalPrice(dayPlaces).toLocaleString()}원</p>
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
                <strong className="place_name size_md weight_sb">{place.placeName}</strong>
                <span className="place_category size_xxs pt_gy">{place.category}</span>
                {route && (
                  <div className="transport_info size_xxs pt_gy">
                    <img src={route.transport.type === '도보' ? transporRun : transportBus} alt={route.transport.type} />
                    <span>{route.transport.type}</span>
                    <span>{route.travelTime}분</span>
                    <span>({route.distance}km)</span>
                  </div>
                )}
              </div>
              <div className="place_price">
                <p className="size_xs weight_md">예상 금액</p>
                <span>{place.price.toLocaleString()}원</span>
              </div>
            </li>
          );
        })}
      </ol>
    </PlanItem>
  );
};

const PlanItem = styled.div`
  /* 필요한 스타일 정의 */
`;

export default DayPlanItem;

