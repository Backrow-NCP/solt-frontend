import { useEffect, useState } from 'react';
// import planData from '../../mock/planProduce.json';
import geocodeAddress from '../../utils/plan/geocodeAddress';

const usePlanData = () => {
  const [plan, setPlan] = useState(null);
  const [places, setPlaces] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        // 실제 API 호출 시 주석 해제
        // const response = await axios.get('/api/getPlanData');
        // const fetchedPlan = response.data;
        // const fetchedPlan = planData; // 임시 데이터 사용
        const fetchedPlan = JSON.parse(sessionStorage.getItem('planData'));

        // 지오코딩을 통해 위도와 경도 추가
        const placesWithCoordinates = await Promise.all(
          fetchedPlan.places.map(async place => {
            if (!place.latitude || !place.longitude) {
              // Geocoding을 통한 주소 변환
              const location = await geocodeAddress(place.addr);
              if (location) {
                return {
                  ...place,
                  latitude: location.lat,
                  longitude: location.lng,
                  price: Number(place.price) || 0,
                };
              } else {
                console.warn(
                  `Geocoding 결과 없음 for placeId ${place.placeId}`
                );
                return {
                  ...place,
                  latitude: null,
                  longitude: null,
                  price: Number(place.price) || 0,
                };
              }
            }
            return { ...place, price: Number(place.price) || 0 };
          })
        );

        setPlan(fetchedPlan);
        setPlaces(placesWithCoordinates);

        // combinedList 생성
        const newCombinedList = [];
        fetchedPlan.places.forEach(place => {
          newCombinedList.push({ type: 'place', data: place });
          const route = fetchedPlan.routes.find(
            r => r.startPlaceId === place.placeId
          );
          if (route) {
            newCombinedList.push({ type: 'route', data: route });
          }
        });
        setCombinedList(newCombinedList);

        setLoading(false);
      } catch (error) {
        console.error('플랜 데이터 로드 실패:', error);
        setLoading(false);
      }
    };

    fetchPlanData();
  }, []);

  return {
    plan,
    places,
    combinedList,
    setPlan,
    setPlaces,
    setCombinedList,
    loading,
  };
};

export default usePlanData;
