import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

export const PORT = process.env.PORT || 3003;

export const ALLOWED_FORMATS: string[] = ['mp4', 'webm'];

// CORS 허용 도메인 목록
const allowedOrigins = [
  'http://localhost:3000',
  'https://twitter-video-downloader-zfb9.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean); // undefined 제거

export const CORS_OPTIONS = {
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // origin이 undefined인 경우(같은 도메인)나 허용된 도메인 목록에 있는 경우 허용
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'), false);
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}; 