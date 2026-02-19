# Pomdong Trial Studio Frontend

임상시험 시뮬레이션 SaaS를 위한 프론트엔드 데모 프로젝트입니다.
백엔드 없이도 더미 데이터(Mock Service)로 실제 서비스 흐름처럼 동작하며, 추후 API 연결을 고려한 구조로 구성되어 있습니다.

## 실행 방법

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

3. 브라우저에서 `http://localhost:3000` 접속

## 주요 화면

- `/`: 6개 서비스 대시보드(서비스 카드 + 진입 링크)
- `/services/[serviceId]/scenario`: 조건 설정 폼(검증/미리보기/저장)
- `/services/[serviceId]/simulation`: 시뮬레이션 대시보드(차트/테이블/필터/정렬/페이지네이션/드로어)
- `/services/[serviceId]/report`: 리포트 카드/공유 모달/내보내기 드롭다운

## 구현 포인트

- 리퀴드 글래스 스타일 + 디자인 토큰 기반 UI
- Desktop 우선 반응형 레이아웃
- 공통 컴포넌트 분리
  - 버튼, 입력, 셀렉트, 카드, 모달, 드로어, 툴팁, 페이지네이션
- 인터랙션
  - 필터/검색/정렬/선택/토글/모달/드롭다운/드로어
- 상태 처리
  - 로딩/빈상태/에러(네트워크 오류 가정) 모두 포함

## Mock API 구조

- 타입 정의: `src/lib/api/types.ts`
- API 계약: `src/lib/api/contracts.ts`
- 더미 데이터: `src/lib/api/mockData.ts`
- Mock 서비스 계층: `src/lib/api/mockService.ts`

실제 백엔드 연동 시 `mockService`의 각 함수(`getScenario`, `getSimulation`, `getReport`)를 실제 API 호출로 교체하면 됩니다.
