import { jwtDecode } from 'jwt-decode';

const getMemberName = () => {
  const tokenWithBearer = localStorage.getItem('token');
  if (tokenWithBearer == null) return null;

  const token = tokenWithBearer.replace(/^Bearer\s/, '');

  const decodedToken = jwtDecode(token);
  return decodedToken.name; // 또는 decodedToken.username
};

export { getMemberName };
