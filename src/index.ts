import express from 'express';
import cors from 'cors';
import { PORT, CORS_OPTIONS } from './config';
import downloadRoutes from './routes/downloadRoutes';
import { errorLogger, errorResponder, notFoundHandler } from './utils/errorHandler';

// Express 앱 초기화
const app = express();

// 미들웨어 설정
app.use(cors(CORS_OPTIONS));
app.use(express.json());

// 라우트 설정
app.use('/api', downloadRoutes);

// API 상태 확인용 엔드포인트
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 에러 핸들링 미들웨어
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorResponder);

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
