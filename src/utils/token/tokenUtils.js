import { jwtDecode } from 'jwt-decode';

const getToken = () => {
  return localStorage.getItem('token'); // 로컬 스토리지에서 토큰 반환
};

const getMemberId = () => {
  const tokenWithBearer = localStorage.getItem('token');
  if (tokenWithBearer == null) return null;

  const token = tokenWithBearer.replace(/^Bearer\s/, '');

  const decodedToken = jwtDecode(token);
  return decodedToken.memberId;
};

export { getMemberId, getToken };
