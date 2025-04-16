import { Request, Response, NextFunction } from 'express';

/**
 * 에러 로깅 미들웨어
 */
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] 에러 발생:`, err);
  next(err);
};

/**
 * 에러 응답 미들웨어
 */
export const errorResponder = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  res.status(statusCode).json({
    error: err.message || '서버 오류가 발생했습니다.',
  });
};

/**
 * 404 Not Found 미들웨어
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: '요청한 리소스를 찾을 수 없습니다.',
  });
}; 