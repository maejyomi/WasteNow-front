# WasteNOW

>  부산광역시 구별 대형폐기물 수수료 검색 및 무료나눔 게시판 웹 서비스입니다. ([프로젝트 시연 영상](https://www.youtube.com/watch?v=qFSmtGsdRBI))

## 개발환경

### 개발기간
2023.11.14 ~ 2023.12.12

### 프로젝트 팀 구성 및 역할

|Frontend|Backend|
|:---:|:---:|
|김혜정|강희진|
|[<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/maejyomi/WasteNow-front)|[<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">](https://github.com/color7921/WasteNow_BE_Project)|

### 개발 환경

- IDE : Visual Studio Code
- 브라우저 : Chrome

|기술|버전|
|:---:|:---:|
|NodeJs|18.17.1|
|React|18.2.0|
|axios|1.6.2|
|react-js-pagination|3.0.3|
|react-router-dom|6.18.0|
|recoil|0.7.7|
|tailwindcss|3.3.5|

### 사용한 기술
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">

## 주요기능

1. 로그인, 회원가입

2. 구별, 카테고리, 키워드로 대형폐기물 수수료 조회

3. 게시판, 댓글 CRUD

## 화면
### 메인페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/2fcc20ed-7450-4528-9f14-07b1f1241e98">

### 수수료 검색 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/ad1dea74-314d-4e88-8b4e-8df512cef403">
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/b5c7c51c-fc89-4ae1-9b70-6edff310b845">

### 로그인, 회원가입 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/4a086799-d1da-4726-bd26-70697588f715">
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/6de81253-b40f-4c6c-84b5-ea5e07fb5cc6">

### 나눔 게시판 리스트 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/fe0acda1-83a9-4d60-90ba-652ef584b721">

### 게시글, 댓글 상세 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/7e157e7e-2c24-42d6-b377-0d5960b35e3c">

### 게시글 작성 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/7b4c939c-b287-407a-80f9-3c2467406833">

### 게시글 수정 페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/fdbb74d9-d1c4-44ec-b00a-2ac375f8271e">

### 마이페이지
<img src="https://github.com/maejyomi/WasteNow-front/assets/141015562/b865076f-7751-4312-8284-39eb8f90cb6f">

## 개발 과정
#### 23.11.16 ~ 23.11.17 : 메인 페이지 및 네비게이션 바 작성

- 전체적인 프레임 구성
- 네비게이션 바, 메인 페이지 구현 및 디자인
- 검색 페이지 (진행중)

#### 23.11.20 : 검색 페이지 완료 및 로그인, 회원가입 페이지 작성

- 검색 페이지 테스트 완료
- 회원가입 페이지 완료
- 로그인 기능 제외 디자인 구현

#### 23.11.21 : 로그인/로그아웃 상태 확인

- 네비게이션 바 로그인/로그아웃 바뀌도록 수정 (recoil)
- 나눔 게시판 이동 버튼 눌렀을 때 로그인 되어있지 않으면 로그인 페이지로 이동
- 로그인/회원가입 실패 처리
- 게시물 페이지 (진행중)

#### 23.11.22 : 게시물 입력 페이지

- 게시물 입력 페이지 레이아웃
- 폐기물 카테고리에 따라 폐기물 종류 고를 수 있는 셀렉트 박스 추가

#### 23.11.23 : 게시물 입력, 리스트 페이지 완료

- 게시물 입력, 게시물 리스트 불러오기 완료
- 상세보기 페이지 구현 진행중

#### 23.11.24 : 상세보기 페이지, 댓글 입력

- 게시물 출력, 댓글 입력 기능 완료

#### 23.11.26 : 상세보기 페이지, 댓글

- 상세보기 페이지 디자인
- 댓글 컴포넌트 분리

#### 23.11.27 : 게시물 입력 수정, 댓글 추가

- 게시물 입력시 시군구명, 사이즈도 입력받도록 수정
- 댓글 추가 기능 구현

#### 23.11.28 : 게시물, 댓글 삭제 추가

- 로그인 엔터키 이벤트 처리
- 게시물, 댓글 삭제 기능 구현
- 이미지 사이즈 고정 처리

#### 23.11.29 : 게시글 작성 업데이트

- 게시글 작성시 헤더에 로그인 정보 토큰 같이 보내기
- 검색 페이지에서 검색할 때 폐기물 이름 데이터 리스트로 보여주기
- 댓글 디자인 변경

#### 23.11.30 : 게시글, 댓글 수정, 검색 기능 구현

- 게시글 수정 기능 추가
- 댓글 수정 기능 추가
- 게시글 리스트 검색 기능 추가

#### 23.12.04 : 마이페이지 구현 , 메인 화면 변경

- 마이페이지에서 게시글 모아보기 구현
- 메인화면 디자인 및 폰트 변경

#### 23.12.05 : 페이징 기능 추가

- 페이징 기능 구현 진행중
- 마이페이지 댓글 모아보기 추가
- 수수료 총합 진행중

#### 23.12.06 : 모달창 구현, 배경 이미지 변경

- 모달창 구현
- 배경 이미지 변경
- 폴더구조 정리

#### 23.12.07 : 업데이트

- 검색할 때 키워드 부분 클릭하면 초기화
- 페이지 넘어갈 때 번호 증가
- 수수료 총합 세자리마다 콤마 추가
- 구, 카테고리 하나라도 바뀌면 폐기물명 받아오도록 수정


#### 23.12.11 : 버튼 이미지 변경, 콘솔 출력 코드 삭제

- 메인 화면 버튼 이미지 변경
- 불필요한 콘솔 출력 코드 삭제

## Ref.
- .gitignore
- [pixabay](https://pixabay.com/images/search/white%20male%203d%20model/)
- [Google Fonts](https://fonts.google.com/)
- [unsplash](https://unsplash.com/ko)
