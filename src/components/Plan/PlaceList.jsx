import styled from 'styled-components';
import PlaceItem from './PlaceItem';
import { scrollbar } from '../../styles/scrollbar';

// 일정 묶음
const PlaceList = ({
  filteredPlaces = [],
  planTime,
  findRoute,
  handlePriceChange,
  editPrice,
  isEditing,
  toggleEditPrice,
  editPlace,
  toggleModifyPlace,
  handleModifyClick,
  displayButtons = true,
  isDetailPage,
}) => {
  console.log('isDetailPage:', isDetailPage);
  return (
    <List isDetailPage={isDetailPage}>
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
            displayButtons={displayButtons}
          />
        );
      })}
    </List>
  );
};

export default PlaceList;

const List = styled.ol`
  height: 36vh;
  overflow-y: auto;
  ${scrollbar}
  padding: ${props => (props.isDetailPage ? '0 30px' : '0')};

  > li {
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    position: relative;
    padding: 28px 0;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 90%;
      height: 1px;
      background: #eee;
    }
    &:last-child::after {
      display: none;
    }
  }

  // isDetailPage 페이지
  ${props =>
    !props.isDetailPage &&
    `
    padding-right: 10px; 
  `}

  /* media size */
  @media (max-width: 700px) {
    height: 22vh;
  }
`;
