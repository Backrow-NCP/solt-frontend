```bash
src/
  ├── assets/
  │     └── images/                    # 이미지 파일 저장 폴더
  ├── components/                      # 재사용 가능한 컴포넌트들을 저장하는 폴더
  │     ├── Board/                     # 게시판 기능 관련 컴포넌트
  │     │     ├── BoardForm.jsx        # 게시글 작성 및 수정 폼 컴포넌트
  │     │     ├── BoardItem.jsx        # 게시글 목록에서 개별 게시글을 표시하는 컴포넌트
  │     │     └── BoardList.jsx        # 게시글 목록을 보여주는 컴포넌트
  │     ├── Plan/                      # 여행 플랜 관련 컴포넌트
  │     │     ├── DateTabs.jsx         # 날짜별 일정 선택 탭 컴포넌트
  │     │     ├── MapWithMarkers.jsx   # 구글 맵에 마커를 표시하는 컴포넌트
  │     │     ├── PlaceItem.jsx        # 개별 장소 정보를 표시하는 컴포넌트
  │     └── PlanComplete/              # 플랜 완료 페이지 관련 컴포넌트
  │           ├── DayPlanItem.jsx      # 날짜별 일정 항목을 표시하는 컴포넌트
  │     ├── Survey/                    # 사전 조사 및 플랜 추천 관련 컴포넌트
  │           ├── DateSelection.jsx    # 기간 선택 컴포넌트 (달력 API 사용)
  │           ├── KeywordSelection.jsx # 키워드 선택 (최소 3개 선택 가능)
  │           ├── PlaceSearch.jsx      # 장소 검색 (Google API 사용 예정)
  │           ├── RegionSelection.jsx  # 지역 선택 (버튼으로 1개 선택 가능)
  │     └── Footer.jsx                 # 공통 푸터 컴포넌트
  │     └── Header.jsx                 # 공통 헤더 컴포넌트
  ├── hooks/                           # 커스텀 훅을 저장하는 폴더 (현재 비어 있음)
  ├── pages/                           # 페이지별 컴포넌트를 저장하는 폴더
  │     ├── auth/                      # 인증 관련 페이지 컴포넌트 (로그인, 회원가입 등)
  │     │     ├── Login.jsx            # 로그인 페이지
  │     │     ├── MyPage.jsx           # 마이페이지
  │     │     ├── PasswordReset.jsx    # 비밀번호 재설정 페이지
  │     │     └── Signup.jsx           # 회원가입 페이지
  │     ├── board/                     # 게시판 관련 페이지 컴포넌트
  │     │     ├── Detail.jsx           # 게시글 상세 페이지
  │     │     ├── Edit.jsx           # 게시글 수정 페이지
  │     │     ├── List.jsx           # 게시글 목록 페이지
  │     │     └── Write.jsx           # 게시글 작성 페이지
  │     ├── plan/                      # 여행 플랜 관련 페이지 컴포넌트
  │     │     ├── Editn.jsx            # 플랜 수정 페이지 (기존 데이터를 편집 가능)
  │     │     ├── Produce.jsx          # 새 플랜 작성 페이지
  │     │     ├── Complete.jsx         # 플랜 완료 페이지 (PDF 저장, 마이페이지 저장 기능 포함)
  │     │     └── Survey.jsx           # 사전 조사 페이지 (플랜 추천 전 단계)
  │     └── Home.jsx                   # 홈 페이지
  ├── services/                        # API 호출 및 데이터 처리 관련 로직을 관리하는 폴더
  │     ├── googleApi.js               # 구글 API 관련 서비스 로직 (장소 검색, 지도 등)
  │     ├── pdf.js                     # PDF 생성 관련 로직
  │     └── plan.js                    # 여행 플랜 저장 및 수정 관련 API 요청 처리
  ├── styles/                          # 스타일 파일을 관리하는 폴더
  │     ├── auth/                      # 회원 가입 관련 스타일 폴더
  │     ├── board/                     # 게시판 관련 스타일 폴더
  │     ├── plan/                      # 여행 플랜 관련 스타일 폴더
  │     └── global.js                  # 사전 조사 페이지 스타일
  ├── App.js                           # 전체 앱의 진입점
  ├── index.js                         # 리액트 렌더링을 처리하는 메인 파일
  ├── App.css                          # 기본 스타일 시트
  └── index.css                        # 기본 스타일 시트
```
