import axios from 'axios';

// 주소로 위도&경도 반환
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      },
    });

    const location = response.data.results[0]?.geometry.location;
    if (location) {
      return location;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Geocoding 실패: ${address}:`, error);
    return null;
  }
};

export default geocodeAddress;