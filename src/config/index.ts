import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

export const PORT = process.env.PORT || 3003;

export const ALLOWED_FORMATS: string[] = ['mp4', 'webm'];

export const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}; 