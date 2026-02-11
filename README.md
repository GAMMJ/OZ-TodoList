# GAMMJ의 Todo 리스트

React와 Vite를 사용한 **Todo List**입니다.
할일 관리 기능에 명언, 스탑워치 등 다양한 기능들을 담은 프로젝트입니다.

## 주요 기능

### 📝 Todo 관리

- **추가**: Enter 키 또는 추가 버튼으로 새로운 할일 등록
- **수정**: 기존 할일 내용 수정 가능
- **삭제**: 할일 삭제
- **완료 표시**: 체크박스로 완료/미완료 상태 관리 (완료 시 취소선 표시)

### ✨ 추가 기능

- **랜덤 명언**: 페이지 로드 시 영감을 주는 명언 표시
- **스탑워치**: 시간 측정 도구

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트들
│   ├── CheckBox.jsx     # 완료 상태 체크박스
│   ├── Clock.jsx        # 시계 (개발 중)
│   ├── RandomQuote.jsx  # 랜덤 명언
│   ├── StopWatch.jsx    # 스탑워치
│   └── Timer.jsx        # 타이머 (개발 중)
├── hook/
│   └── useFetch.jsx     # API 데이터 페칭 커스텀 훅
├── util/
│   └── formatTime.js    # 시간 포맷팅 유틸리티
├── App.jsx              # 메인 애플리케이션 컴포넌트
└── index.css            # 전역 스타일
```

## 기술 스택

| 항목          | 버전     |
| ------------- | -------- |
| **React**     | 19.2.0   |
| **React DOM** | 19.2.0   |
| **Vite**      | 7.2.4    |
| **ESLint**    | 9.39.1   |
| **Node.js**   | 16+ 권장 |

## 설치 및 실행

### 1. 필수 요구사항

- Node.js (16 버전 이상)
- npm 또는 yarn

### 2. 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 백엔드 서버 실행

별도의 터미널에서 로컬 JSON 데이터베이스 서버를 실행합니다:

```bash
json-server --watch db.json --port 3000
```

### 5. 코드 검사

```bash
npm run lint
```

## API 엔드포인트

로컬 Json-Server 기반으로 다음 API를 사용합니다:

| 메서드 | 엔드포인트  | 설명           |
| ------ | ----------- | -------------- |
| GET    | `/todo`     | 모든 Todo 조회 |
| POST   | `/todo`     | 새 Todo 생성   |
| PATCH  | `/todo/:id` | Todo 수정      |
| DELETE | `/todo/:id` | Todo 삭제      |

## 사용 예시

### Todo 추가

1. 입력 필드에 할일 내용 입력
2. Enter 키 또는 "추가" 버튼 클릭

### Todo 완료 표시

- CheckBox를 클릭하여 완료/미완료 토글

### Todo 수정

1. "수정" 버튼 클릭
2. 입력 필드에서 내용 수정
3. Enter 키 또는 "저장" 버튼으로 완료

### Todo 삭제

- "삭제" 버튼 클릭

## 개발 기록

- ✅ Todo CRUD 기능 완료
- ✅ 로컬 데이터 저장 기능
- ✅ 스톱워치 기능 추가
- ✅ 랜덤 명언 기능 추가
- 🔄 타이머/시계 기능 개발 (리팩터링 중)

## 라이선스

MIT License

## 개발자

GAMMJ
