import axios from 'axios';
import { SERVER_URL } from '../config/Constants'; // 서버 URL을 별도의 파일에서 관리

// Named export: 토큰 없이 사용하는 API 인스턴스 (로그인, 회원가입 등에 사용)
export const apiNoToken = axios.create({
  baseURL: SERVER_URL, // 서버 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 쿠키를 함께 전송
});

// Default export: 세션을 사용하는 API 인스턴스 (로그인 이후에 사용)
const apiClient = axios.create({
  baseURL: SERVER_URL, // 서버 URL 설정
  withCredentials: true, // 세션 유지 (쿠키 전송)
});

// 인터셉터 설정 함수
const setupInterceptors = (setLoading) => {
  // 요청 인터셉터
  apiClient.interceptors.request.use(
    (config) => {
      setLoading && setLoading(true); // 로딩 상태 시작 (필요할 경우)

      // 로컬 스토리지에서 JWT 토큰 가져오기
      const token = localStorage.getItem('token');
      
      // 토큰이 있으면 요청 헤더에 Authorization 추가
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
      (error) => {
        setLoading && setLoading(false); // 요청 실패 시 로딩 종료
        return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  apiClient.interceptors.response.use(
    (response) => {
      setLoading && setLoading(false); // 응답 성공 시 로딩 종료
      return response;
    },
    async (error) => {
      setLoading && setLoading(false); // 응답 실패 시 로딩 종료
      // 세션이 만료된 경우 (401 응답)
      if (error.response && error.response.status === 401) {
        console.log('401 에러 발생, 로그아웃 처리'); 
        localStorage.removeItem('token'); // 로그아웃처리, 토큰 삭제
        window.location.href = '/auth/login'; // 로그인 페이지로 리다이렉트
      }
      return Promise.reject(error);
    }
  );
  
};

export { setupInterceptors };
export default apiClient;