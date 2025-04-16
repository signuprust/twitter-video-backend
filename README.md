# 트위터 비디오 다운로드 백엔드

트위터/X 동영상을 다운로드할 수 있는 API 서버입니다.

## 기능

- 트위터/X 동영상 URL로부터 다운로드 링크 생성
- 다양한 포맷 지원 (mp4, webm)
- 간단한 RESTful API

## 필요 조건

- Node.js 16 이상
- NPM 또는 Yarn
- yt-dlp 설치 필요 (https://github.com/yt-dlp/yt-dlp#installation)

## 설치 및 실행

1. 저장소 클론:
```
git clone https://github.com/yourusername/twitter-video-backend.git
cd twitter-video-backend
```

2. 의존성 설치:
```
npm install
```

3. 환경 변수 설정:
```
cp .env.example .env
```

4. 개발 서버 실행:
```
npm run dev
```

5. 프로덕션용 빌드:
```
npm run build
npm start
```

## API 엔드포인트

### 비디오 다운로드

```
GET /api/download
```

**파라미터**

- `url` (필수): 트위터/X 동영상 URL
- `format` (선택): 다운로드 포맷 (mp4, webm)

**응답 예시**

성공:
```json
{
  "videoUrl": "https://video.twimg.com/ext_tw_video/..."
}
```

실패:
```json
{
  "error": "트위터 주소가 필요합니다."
}
```

## 프로젝트 구조

```
src/
├── config/         # 환경설정
├── controllers/    # 요청 처리 로직
├── routes/         # API 라우트
├── types/          # 타입 정의
├── utils/          # 유틸리티 함수
└── index.ts        # 메인 진입점
```

## 라이센스

MIT 