import PlaceItem from './PlaceItem';

// 일정 묶음
const PlaceList = ({
  filteredPlaces,
  planTime,
  findRoute,
  handlePriceChange,
  editPrice,
  isEditing,
  toggleEditPrice,
  editPlace,
  toggleModifyPlace,
  handleModifyClick,
}) => {

  return (
    <ol>
      {filteredPlaces.map((place, index) => {
        const previousPlace = filteredPlaces[index - 1]; // 이전 일정
        const route = previousPlace
          ? findRoute(previousPlace.placeId, place.placeId)
          : null; // 이전 일정과 현재 일정 간의 경로

        return (
          <PlaceItem
            key={`place-${place.placeId}`}
            place={place}
            previousPlace={previousPlace}
            route={route}
            planTime={planTime}
            handlePriceChange={handlePriceChange}
            editPrice={editPrice}
            isEditing={isEditing}
            toggleEditPrice={toggleEditPrice}
            editPlace={editPlace}
            toggleModifyPlace={toggleModifyPlace}
            handleModifyClick={handleModifyClick}
          />
        );
      })}
    </ol>
  );
};

export default PlaceList;