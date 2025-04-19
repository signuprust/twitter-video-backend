#!/bin/bash

# 디렉토리 생성
mkdir -p ./bin

# yt-dlp 다운로드 및 설치
echo "yt-dlp 다운로드 중..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./bin/yt-dlp
chmod a+rx ./bin/yt-dlp

# 설치 확인
echo "yt-dlp 버전 확인:"
./bin/yt-dlp --version

# TypeScript 컴파일
echo "TypeScript 컴파일 중..."
npm run tsc 