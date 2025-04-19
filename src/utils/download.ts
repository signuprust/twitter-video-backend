import { exec } from 'child_process';
import { ALLOWED_FORMATS } from '../config';
import { VideoFormat } from '../types';

/**
 * 주어진 포맷이 허용된 포맷인지 확인하는 함수
 */
export const isValidFormat = (format: string | undefined): boolean => {
  return !!format && ALLOWED_FORMATS.includes(format);
};

/**
 * yt-dlp 명령어 생성
 */
export const buildYtDlpCommand = (url: string, format?: string): string => {
  // 요청한 포맷이 없는 경우를 대비한 fallback 포맷 구성
  const formatOption = format
    ? `-f "bestvideo[ext=${format}]+bestaudio[ext=m4a]/best[ext=${format}]/best"`
    : '-f best';

  return `yt-dlp -g ${formatOption} "${url}"`;
};

/**
 * yt-dlp 명령어 실행 및 비디오 URL 추출
 */
export const executeYtDlp = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error('yt-dlp 실행 중 에러:', stderr);
        reject(new Error('요청한 포맷이 지원되지 않거나 영상을 가져올 수 없습니다.'));
        return;
      }

      const urls = stdout.trim().split('\n');
      const videoUrl = urls.find((url: string) => url.includes('.mp4') || url.includes('.webm') || url.startsWith('http'));

      if (!videoUrl) {
        reject(new Error('다운로드 가능한 영상 링크를 찾을 수 없습니다.'));
        return;
      }

      resolve(videoUrl);
    });
  });
}; 