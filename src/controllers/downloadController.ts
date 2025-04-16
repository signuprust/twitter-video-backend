import { Response } from 'express';
import { DownloadRequest, VideoResponse } from '../types';
import { isValidFormat, buildYtDlpCommand, executeYtDlp } from '../utils/download';

/**
 * 트위터 비디오 다운로드 컨트롤러
 */
export const downloadVideo = async (req: DownloadRequest, res: Response): Promise<void> => {
  try {
    const tweetUrl = req.query.url;
    const format = req.query.format;

    // URL이 없는 경우 오류 반환
    if (!tweetUrl) {
      res.status(400).json({ error: '트위터 주소가 필요합니다.' });
      return;
    }

    // 지원하지 않는 포맷인 경우 오류 반환
    if (format && !isValidFormat(format)) {
      res.status(400).json({ error: '지원되지 않는 포맷입니다. (mp4, webm만 가능)' });
      return;
    }

    // yt-dlp 명령어 생성 및 실행
    const command = buildYtDlpCommand(tweetUrl, format);
    
    try {
      const videoUrl = await executeYtDlp(command);
      const response: VideoResponse = { videoUrl };
      res.json(response);
    } catch (error) {
      console.error('다운로드 처리 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      res.status(500).json({ error: errorMessage });
    }
  } catch (error) {
    console.error('컨트롤러 실행 중 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}; 