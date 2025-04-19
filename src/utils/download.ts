import { exec } from 'child_process';
import { ALLOWED_FORMATS } from '../config';
import { VideoFormat } from '../types';
import path from 'path';
import fs from 'fs';

/**
 * yt-dlp 경로 가져오기
 */
const getYtDlpPath = (): string => {
  // 배포 환경에서는 프로젝트 루트의 bin 디렉토리에 설치된 yt-dlp 사용
  const customPath = path.join(process.cwd(), 'bin', 'yt-dlp');
  
  // 커스텀 경로에 파일이 있는지 확인
  if (fs.existsSync(customPath)) {
    return customPath;
  }
  
  // 없으면 전역 설치된 yt-dlp 사용
  return 'yt-dlp';
};

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

  const ytDlpPath = getYtDlpPath();
  console.log(`Using yt-dlp from: ${ytDlpPath}`);
  
  return `${ytDlpPath} -g ${formatOption} "${url}"`;
};

/**
 * yt-dlp 명령어 실행 및 비디오 URL 추출
 */
export const executeYtDlp = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
    
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