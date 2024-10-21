import { jwtDecode } from 'jwt-decode';

const getMemberId = () => {
  const tokenWithBearer = localStorage.getItem('token');
  if (tokenWithBearer == null) return null;

  const token = tokenWithBearer.replace(/^Bearer\s/, '');

  const decodedToken = jwtDecode(token);
  return decodedToken.memberId;
};

export { getMemberId };
