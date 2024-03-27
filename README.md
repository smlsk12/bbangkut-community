## 탄소중립 정보 공유 커뮤니티 플랫폼 '빵끗'


### 프로젝트 소개

![표지](https://github.com/iiingkeep/community/assets/151604087/f16f36d1-49a6-4118-8baa-ff869a10d605)

***
### 개발 일정
* 기획 및 설계 시작 : 2024.02.05  
* 개발 시작 : 2024.02.19  
* 검증 시작 : 2024.03.18  
* 발표 및 평가 : 2024.03.28  
* 프로젝트 종료 : 2024.04.09  
***
### 기획 의도
![기획의도](https://github.com/iiingkeep/community/assets/151603893/cca4882d-52be-4f80-b01b-ad97c4f96cd6)
***
### 팀원
* 곽별이 : MyPage, WordCloud
 
* 김민규 : Community

* 김민호 : Login, Membership-Register

* 김연진 : Main, Community

* 이주호 : News-Feed, Web-Crawling
***
### 기술 스택
![기술스택](https://github.com/iiingkeep/community/assets/151604087/a63e3882-a6f1-4127-a40e-ae1f6c4b6925)
***
### 주요 기능
* 로그인
  * 등록된 정보와 일치여부 확인을 통한 유효성 검사
  * 로그인 시 MySQLStore를 통한 세션 테이블 생성하여 관리
  * 로그인 시 세션에 유저 데이터 저장하 만료시간을 지정하여 1시간 후 또는 로그아웃 시 데이터 삭제
 ![로그인](https://github.com/iiingkeep/community/assets/151604087/f8289786-20ad-4c89-962e-138e071ec791)
  * 
* 회원가입
  * 정규표현식과 중복 확인을 통한 유효성 검사
  * bcrypt와 hash를 사용한 비밀번호 암호화
  * 비밀번호와 비밀번호 확인 항목은 타이핑 시 동적 유효성 검사 진행
* 메인페이지
  * 첫 번째 섹션의 로그인 기능
  * 두 번째 섹션의 각 메뉴별 소개 및 이동 기능
  * 세 번째 섹션의 최신 환경 뉴스 기재, 그에 기반한 워드 클라우드 표시 및 다운로드 기능, 커뮤니티 인기글 기재
* 환경이슈
  * 네이버 검색 API 이용
  * 지정한 시간에 최신 환경 뉴스를 크롤링하여 데이터 목록 표시
  * 검색 기능
  * 최신순 / 오래된 순 / 조회수 높은 순 정렬
  * 목록에서 기사 클릭 시 해당 기사의 url로 이동하며 조회수 1 증가
  * 기사 좋아요 토글 시 로그인 안 된 유저는 로그인 페이지로 이동, 로그인 된 유저는 좋아요 표시
  * 페이지네이션
* 커뮤니티 글 목록
  * 유저가 등록한 글 목록으로 표시
  * 게시글 카테고라이징
  * 제목 / 본문 / 제목+본문 검색
  * 게시글 클릭하여 접속 시 조회수 1 증가
  * 페이지네이션  
<img width="80%" src="https://github.com/iiingkeep/community/assets/143868975/919391ae-9621-4d30-8fff-7c593d4a235d" />

   
* 커뮤니티 글 쓰기 / 수정
  * 로그인 한 유저만 글쓰기
  * Quill 에디터 사용으로 다양한 기능 이용 가능
  * 사진 등록, 크기 조절 가능
* 커뮤니티 게시글 상세
  * 게시글 작성자 본인만 수정/ 삭제
  * 로그인 한 유저는 좋아요 등록 및 등록 해제 가능
  * 로그인 한 유저는 댓글 및 답글 등록
  * 댓글 작성자 본인만 댓글 수정 / 삭제
* 마이페이지 프로필
  * 프로필 사진 등록 및 삭제
* 마이페이지 나의 정보 수정
  * 회원 정보 수정 시 비밀번호 확인 후 페이지 이동
  * 회원 정보 수정 시 정규표현식과 중복검사를 통한 유효성 검사
* 마이페이지 나의 활동
  * 내가 쓴 글 / 내가 쓴 댓글 표시 및 클릭 시 해당 페이지로 이동
* 마이페이지 좋아요
  * 좋아요 한 뉴스 / 좋아요 한 게시글 표시 및 클릭 시 해당 페이지로 동
