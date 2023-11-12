# Lutweet (nextjs-lutweet)

## Demo Gif

![ezgif com-video-to-gif (1)](https://github.com/hyer0705/nextjs-times-bestseller/assets/50125734/5cdefb75-9713-4dd2-ad8d-0c73b7a6c5c0)

> 개발기간: 2023.11.06 ~ 2023.11.13

## 배포주소 (제출 마감시간 18분전 배포)

https://nextjs-lutweet.vercel.app/

## 프로젝트 소개

미니 트위터 클론 앱

## 기술스택

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 아쉬운 점

- middleware를 사용해서 로그인에 성공 후 `/` 화면으로 리다이렉트 하는 기능이 로컬 환경에서는 에러 없이 잘 됐습니다. 하지만, vercel 환경에 배포 후에는 로그인에 성공한 후 메인 화면이 아닌 `/create-account` 화면으로 리다이렉트를 합니다. 그 상태에서 다시 `/` 화면에 들어가보면 정상적으로 로그인한 상태일 때의 화면이 나옵니다. 해당 에러는 추후에 디버깅을 하여 고쳐보도록 하겠습니다.

* app router 방식을 사용했으나 제대로 사용한 것이 맞는지 좀 더 공부가 필요한 것 같습니다. app router 방식은 server component 를 주로 사용하게 되어 있으나 현재 구현한 코드들은 client component를 주로 사용하여 추후에 공부한 후 변경이 필요합니다.
* 프로젝트를 조금 늦게 시작하여 졸업 작품의 최소 요구사항만 구현한 것이 아쉽습니다. 추후에 댓글 기능, 파일 첨부하여 글 작성 기능, 테마 바꾸기(다크모드, 라이트모드) 등을 구현하고 싶습니다.
