# 프로젝트 설명

![image](https://user-images.githubusercontent.com/18456572/104713606-74eeff00-5767-11eb-8cc5-8cbb40890ea6.png)

[**웹 앱 API 개발을 위한 GraphQL**](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966262533)을 읽고 프로젝트를 진행한 내용입니다.

## 주요 기능

### 1. 사진 업로드

### 2. Github OAuth를 사용한 로그인

### 3. 임시 유저 추가

### 4. 새로 추가된 유저

## 사용 기술

| Area     | Tech Stack                                                                                                                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | ![](https://img.shields.io/badge/React-blue?longCache=true&logo=React) ![](https://img.shields.io/badge/Apollo-blue?color=311C87&longCache=true&logo=Apollo-GraphQL&logoColor=white)                            |
| Backend  | ![](https://img.shields.io/badge/Node.js-blue?color=339933&longCache=true&logo=Node.js&logoColor=white) ![](https://img.shields.io/badge/GraphQL-blue?color=E10098&longCache=true&logo=GraphQL&logoColor=white) |

## Getting Started

1. 프로젝트를 clone 합니다.

```
$ git clone https://github.com/yuda1124/learning-graphql.git
$ cd learning-graphql
```

2. 패키지를 설치합니다.

- 클라이언트 패키지 설치

```
$ cd photo-share-client
$ yarn
```

- 서버 패키지 설치

```
$ cd photo-share-api
$ yarn
```

3. sample.env를 복사해 .env 파일을 만든 뒤 설정합니다.

```
$ mv ./sample.env ./.env
```

```
// server
DB_HOST=<YOUR_MONGODB_HOST>
CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>

// client
REACT_APP_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID_HERE>
```

4. 실행합니다.

- 클라이언트 실행

```
$ cd photo-share-client
$ yarn start
```

- 서버 실행

```
$ cd photo-share-api
$ yarn
```
