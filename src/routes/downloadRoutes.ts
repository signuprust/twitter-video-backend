import express from 'express';
import { downloadVideo } from '../controllers/downloadController';

const router = express.Router();

/**
 * 비디오 다운로드 엔드포인트
 * @route GET /api/download
 * @query {string} url - 트위터 동영상 URL
 * @query {string} format - 다운로드 포맷 (mp4, webm)
 */
router.get('/download', downloadVideo);

export default router; 