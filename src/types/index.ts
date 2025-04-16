import { Request } from 'express';

export interface DownloadRequest extends Request {
  query: {
    url?: string;
    format?: string;
  };
}

export interface VideoResponse {
  videoUrl?: string;
  error?: string;
}

export type VideoFormat = 'mp4' | 'webm'; 