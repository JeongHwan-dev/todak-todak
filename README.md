<div align="center">
  <br />
  <img src="./readme_assets/todak_logo.png" alt="토닥토닥" height="150px" />
  <br />
  <h1>토닥토닥 (Todak-Todak)</h1>
  <a href="https://blackpink.fashion-scanner.site/">
    <img src="https://img.shields.io/badge/NGINX-Deactivate-ff7f00?&logo=nginx&logoColor=white" alt="NGINX" />
  </a>
  <br />
</div>

## 목차

1. [**웹 서비스 소개**](#1)
2. [**웹 서비스 목표**](#2)
3. [**기술 스택**](#3)
4. [**주요 기능**](#4)
5. [**프로젝트 구성도**](#5)
6. [**데모 영상**](#6)
7. [**서비스 차별점 및 기대 효과**](#7)
8. [**개발 팀 소개**](#8)
9. [**개발 기간 및 일정**](#9)
10. [**실행 방법**](#9)
11. [**FAQ**](#10)

<br />

<div id="1"></div>

## 💁🏻‍♂ 웹 서비스 소개

&nbsp;&nbsp;동병상련의 아픔을 가진 유저들의 사회적 연대 강화를 목적으로 하는 `지역 기반 커뮤니티 서비스`

<br />

> [🔗 79개의 1차 데이터세트](https://www.notion.so/778b4912ba9541d3b580ea0456b216b0?v=4d328bd617f44c65af188114148bf23b)

<br />

<div id="2"></div>

## 🎯 웹 서비스 목표

&nbsp;&nbsp;사회적 연결망의 강화가 `의료 사각지대를 해소`하는 데 도움을 줄 수 있다.

<details>
<summary>문제의 인식</summary>
<div>
  <ol>
    <li>의료 사각지대에 놓인 사람들의 실질적 데이터는 집계되지 않는다.</li>
    <li>의료 사각지대의 해소를 위해 범정부적 차원에서 많은 리소스들이 이미 투입되고 있다.</li>
    <li>실질적 의료 사각지대의 해소에는 오프라인의 도움이 필요하다.</li>
    <li>상시적으로 의료 사각지대 해소의 욕구와 해소가 순환할 수 있는 시스템이 필요하다.</li>
    <li>현대사회에서 지역 커뮤니티의 사회적 연결성이 약화되어 있다.</li>
  </ol>
</div>
</details>

<details>
<summary>데이터를 통한 가설 검증 방법</summary>
<div>
  <ol>
    <li>실질적 의료 사각지대의 데이터 검증은 서비스 실행으로 집게된 유저 데이터를 통해 분석하여 검증한다.</li>
    <li>지역별 종합요소[독립변수]와 지역별 미충족의료률[종속변수]를 회귀/인공신경망 분석을 통해 주요 독립변수를 찾을 수 있을 것이다.</li>
    <li>도출된 주요 독립변수에 질환 분류를 추가한 회귀/인공신경망 분석 결과는 불일치도가 높은지 확인한다.</li>
    <li>사회적 활동요소[독립변수]와 지역별 사회적만족도[종속변수]를 회귀분석한 결과는 낮은 손실함수 값을 가지는 지 확인한다.</li>
    <li>의료 서비스 개선을 위해 투입된 예산과 의료 서비스 만족도, 미충족의료률[전국 시계열데이터] 분석 결과 예산 상승 분에 비해 낮은 지표 개선을 보이는지 확인한다.</li>
    <li>지역별 사회적 연결망과 지역별 의료 서비스 만족도, 미충족의료율[지역별 시계열데이터] 분석 결과 양의 상관관계를 가지는 지 확인한다.</li>
  </ol>
</div>
</details>

<details>
<summary>문제 해결을 위한 자료 해석과 가설 제시</summary>
<div>
  <ol>
    <li>실질적 의료 사각지대는 통계 데이터로 집계되지 않는다.</li>
    <li>명목적 의료 사각지대의 통계는 지역별 미충족의료률로 가늠할 수 있다.</li>
    <li>지역별 [소득/경제활동유형/교육/혼인/주거형태/사회적만족도 등]의 데이터를 회귀분석/인공신경망분석하여 주요 독립변수를 찾을 수 있다.</li>
    <li>질환별 의료 사각지대는 서로 다른 범주로 나타날 것이다.</li>
    <li>사회적 활동 [지역 내 단체활동/지역 커뮤니티 시설의 수/봉사활동]이 활발한 지역일수록 사회적 만족도가 높을 것이다.</li>
    <li>범정부 차원에서 투입되는 많은 리소스들은 정보 불균형 및 정보 미수집의 요인으로 확산되지 못해 불균형을 초래한다.</li>
    <li>사회적 연결망의 강화가 정보 불균형 및 정보 미수집의 문제를 해결할 수 있을 것이다.</li>
    <li>사회적 연결망의 강화가 의료 사각지대를 해소하는 데 도움을 줄 수 있다.</li>
  </ol>
</div>
</details>

<br />

> [🔗 데이터 분석 결과](https://www.notion.so/DataAnalysis-Result-52edbbb430ee40a7834a60283746834f)

<br />

<div id="3"></div>

## 🛠 기술 스택

### **Front-end**

| <img src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" width="50px" height="50px" /> |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|                                                             HTML5                                                              |                                                             CSS3                                                             |                                                         JavaScript(ES6)                                                         |

| <img src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React.js" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" width="50px" height="50px" /> | <img src="https://mui.com/static/logo.png" alt="Material UI" width="50px" height="50px" /> |
| :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                                                             React.js                                                              |                                                         Bootstrap                                                          |                                        Material UI                                         |

### **Back-end**

| <img src="https://profilinator.rishav.dev/skills-assets/python-original.svg" alt="Python" width="50px" height="50px" /> |
| :---------------------------------------------------------------------------------------------------------------------: |
|                                                         Python                                                          |

| <img src="https://profilinator.rishav.dev/skills-assets/flask.png" alt="Flask" width="50px" height="50px" /> | <img src="https://cdn.worldvectorlogo.com/logos/socket-io-1.svg" alt="socket io" width="50px" height="50px" /> |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                    Flask                                                     |                                                   socket.io                                                    |

| <img src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="MySQL" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="mongoDB" width="50px" height="50px" /> |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|                                                             MySQL                                                              |                                                              mongoDB                                                               |

### **Data Analysis**

| <img src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg" alt="Pandas" width="50px" height="50px" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit learn" width="50px" height="50px" /> | <img src="https://cdn.freebiesupply.com/logos/large/2x/neo4j-logo-png-transparent.png" alt="Neo4j" width="50px" height="50px" /> | <img src="https://avatars1.githubusercontent.com/u/1562726?s=200&v=4" alt="D3.js" width="50px" height="50px" /> | <img src="https://python-visualization.github.io/folium/_images/folium_logo.jpg" alt="Folium" width="50px" height="50px" /> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
|                                                                                       Pandas                                                                                       |                                                                Scikit learn                                                                 |                                                              Neo4j                                                               |                                                      D3.js                                                      |                                                           Folium                                                            |

### **DevOps**

| <img src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/nginx-original.svg" alt="NGiNX" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/microsoft_azure-icon.svg" alt="Azure" width="50px" height="50px" /> |
| :------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
|                                                              Docker                                                              |                                                         NGiNX                                                         |                                                            Azure                                                            |

### **Version Control**

| <img src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" width="50px" height="50px" /> | <img src="https://profilinator.rishav.dev/skills-assets/gitlab.svg" alt="GitLab" width="50px" height="50px" /> |
| :---------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
|                                                        Git                                                        |                                                     GitLab                                                     |

<br />

<div id="4"></div>

## 💡 주요 기능

| 기능               | 내용                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------------ |
| 커뮤니티 기능      | 자신과 같은 유형으로 분류된 혹은 유사 유형으로 분류된 인근 지역 유저들과의 게시물 포스팅을 통한 커뮤니티 구축 |
| 같이해요 기능      | 지역 내에서 1회성 운동 모임을 개최하고 참가신청 할 수 있는 기능                                               |
| 채팅 기능          | 유저간 1:1 채팅 기능                                                                                          |
| 지역 데이터 시각화 | 지역의 유저 데이터와 의료 정보 데이터를 시각화하여 제공                                                       |
| 유저 사회망 시각화 | 자신과 네트워킹이 발생하고 있는 유저들과의 사회적 연결망을 시각화하여 제공                                    |

### 상세 기능

- 로그인 및 회원가입
- 커뮤니티 게시글 CRUD(Create, Read, Update, Delete)
- 커뮤니티 게시글 댓글 및 좋아요 기능
- 유저 간의 1:1 채팅 기능
- 유저 사회망 시각화 맵 기능

<br />

<div id="5"></div>

## 📂 프로젝트 구성도

| [🔗와이어프레임(Wireframe)](https://www.figma.com/file/CluTmxhDDigtZG9rCeXKkE/Storyboard-Draft-Ver0.1?node-id=0%3A1) |
| :------------------------------------------------------------------------------------------------------------------: |
|                      <img src="./readme_assets/wireframe.png" alt="Wireframe" width="1200px" />                      |

| [🔗아키텍처(Architecture)](https://whimsical.com/codename-wesick-SXPvCHJqfSwQZwzPUPm6z) |
| :-------------------------------------------------------------------------------------: |
|    <img src="./readme_assets/overall_flow.png" alt="Overall Flow" width="1200px" />     |
|   <img src="./readme_assets/sequence_flow.png" alt="Sequence Flow" width="1200px" />    |

<br />

<div id="6"></div>

## 🎥 데모 영상

|                           회원가입 & 프로필 작성 페이지                           |
| :-------------------------------------------------------------------------------: |
| <img src="./readme_assets/signup-page.gif" alt="회원가입 & 프로필 작성 페이지" /> |

|                              로그인 & 메인 페이지                               |
| :-----------------------------------------------------------------------------: |
| <img src="./readme_assets/signin-main-page.gif" alt="로그인 & 메인 페이지  " /> |

|                           게시물 댓글 및 좋아요 기능                            |
| :-----------------------------------------------------------------------------: |
| <img src="./readme_assets/comment-like.gif" alt="게시물 댓글 및 좋아요 기능" /> |

|                             새 게시물 작성 기능                             |
| :-------------------------------------------------------------------------: |
| <img src="./readme_assets/create-posting.gif" alt="새 게시물 작성 기능 " /> |

|                            실시간 채팅 기능                            |
| :--------------------------------------------------------------------: |
| <img src="./readme_assets/live-chatting.gif" alt="실시간 채팅 기능" /> |

|                           유저 사회망 기능                            |
| :-------------------------------------------------------------------: |
| <img src="./readme_assets/user-network.gif" alt="유저 사회망 기능" /> |

<br />

<div id="7"></div>

## 🔆 서비스 차별점 및 기대 효과

1. 지속적으로 집계되는 유저들의 데이터와 공공데이터를 분석하여 제공하는 우리동네 이슈 투표 기능은 정책 의사 결정 과정에 근거로 작용할 수 있습니다. 이를 통해 집계되지 않은 데이터를 공론화 할 수 있습니다.

> _예시) 흡연률이 높은 지역, 금연 욕구가 있으나 지원 시설이 없음 >> 지역내 금연 지원 시설 설치 의견 수렴_

2. 유저들의 서비스 내 활동 결과를 분석하여(neo4j) 나의 우리동네 네트워크 시각화 기능을 제공하여 심리적으로 사회적 안전망을 체감하게 해줍니다.

3. 가능한 많은 연령대의 참여가 중요하므로 온라인 서비스에 익숙하지 않은 노령세대를 위한 UI/UX를 제공합니다.

<br />

<div id="8"></div>

## 👪 개발 팀 소개

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ltxctdbnn">
        <img src="https://avatars.githubusercontent.com/u/69500903?v=4" alt="황정우 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JeongHwan-dev">
        <img src="https://avatars.githubusercontent.com/u/68452755?v=4" alt="박정환 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ksy9926">
        <img src="https://avatars.githubusercontent.com/u/72131649?v=4" alt="김수영 프로필" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/insun-kang">
        <img src="https://avatars.githubusercontent.com/u/82890721?v=4" alt="강인선 프로필" />
      </a>
    </td>
    <td align="center">
      <img src="./readme_assets/profile_sample.jpg" alt="윤수진 프로필" width="100%" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/ltxctdbnn">
        황정우<br />(PM&Data Analysis)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JeongHwan-dev">
        박정환<br />(Front-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ksy9926">
        김수영<br />(Front-end)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/insun-kang">
        강인선<br />(Back-end)
      </a>
    </td>
    <td align="center">
        윤수진<br />(Back-end)
    </td>
  </tr>
</table>

<br />

|  이름  |         역할          |                                                              개발 내용                                                               |
| :----: | :-------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| 황정우 | PM<br />Data Analysis | 와이어 프레임 및 아키텍처 작성<br />데이터 분석<br />실시간 데이터 시각화<br /> 유저 사회망 시각화 서비스 개발<br />웹 스타일링 작업 |
| 박정환 |       Front-end       |              로그인&회원가입&프로필 작성 페이지 구현<br />커뮤니티 게시물 및 댓글 기능 구현(CRUD)<br />웹 스타일링 작업              |
| 김수영 |       Front-end       |                                         1:1 채팅 기능 구현<br />채팅 페이지 웹 스타일링 작업                                         |
| 강인선 |       Back-end        |                       로그인&회원가입&프로필 작성 API 구현<br />커뮤니티 게시물 및 댓글 API 구현<br />DB 설계                        |
| 윤수진 |       Back-end        |                                                          1:1 채팅 기능 구현                                                          |

### 멤버별 responsibility(R&R, Role and Responsibilities)

<details>
  <summary>PM</summary>
  <div>
    <ul>
      <li>
        <strong>기획 단계</strong> : 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
      </li>
      <li>
        <strong>개발 단계</strong> : 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
      </li>
      <li>
        <strong>수정 단계</strong> : 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>Front-end</summary>
  <div>
    <ul>
      <li>
        <strong>기획 단계</strong> : 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
      </li>
      <li>
        <strong>개발 단계</strong> : 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
      </li>
      <li>
        <strong>수정 단계</strong> : 피드백 반영해서 프론트 디자인 수정
      </li>
    </ul>
  </div>
</details>

<details>
  <summary>Back-end & Data Analysis</summary>
  <div>
    <ul>
      <li>
        <strong>기획 단계</strong> : 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
      </li>
      <li>
        <strong>개발 단계</strong> : 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
      </li>
      <li>
        <strong>수정 단계</strong> : 코치님 피드백 반영해서 분석/ 시각화 방식 수정
      </li>
    </ul>
  </div>
</details>

<br />

<div id="9"></div>

## 📅 개발 기간 및 일정

### 개발 기간

21.03.30 ~ 21.04.16 (3주)

### 개발 일정

| 주차  |                                                                                  내용                                                                                   |
| :---: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 1주차 |                                                 프로젝트 기획<br />스토리보드&시나리오 작성<br />데이터 분석 및 시각화                                                  |
| 2주차 |                               회원가입&프로필 작성 페이지 구현<br />로그인&로그아웃 구현<br />커뮤니티 게시물(CREATE, READ, DELETE) 구현                                |
| 3주차 | 커뮤니티 게시물(UPDATE) 및 댓글 구현<br />게시물 등록 일자, 댓글 수, 좋아요 정보 출력<br />1:1 채팅 기능 구현<br />유저 사회망 시각화 서비스 개발<br />웹 스타일링 작업 |

<br />

<div id="10"></div>

## 💻 실행 방법

1. **원격 저장소 복제**

```bash
$ git clone https://github.com/todak-todak/todak-todak.git
```

2. **프로젝트 폴더로 이동 후 서버 폴더로 이동**

```bash
$ cd todak-todak
$ cd medical
```

3. **Flask 서버 실행**

```bash
$ export FLASK_APP=medical
$ export FLASK_ENV=development
$ flask run

```

4. **MongoDB 설치** (새 터미널 오픈)

```bash
$ curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```

5. **MongoDB 설정 및 실행** (project 폴더에 data/db 생성)

```bash
$ mongod --dbpath data/db/
$ mongo
```

6. **client 폴더로 이동** (새 터미널 오픈)

```bash
$ cd client
```

7. **필요한 node_modules 설치**

```bash
$ npm install
```

8. **리액트 앱 실행**

```bash
$ npm start
```

<br />

<div id="11"></div>

## 📢 FAQ

### 환경설정 및 에러 대응

**_Ubuntu 18.04 LTS를 기준으로 작성되었습니다_**

- #### Flask 서버 구동 시 설정 사항
  > _Bash Script에 포함되어 있습니다._

```
~ % export FLASK_APP=medical
~ % export FLASK_ENV=development
~ % flask run
```

<br/>

- #### MongoDB 설치 및 설정사항
  > _MongoDB 설치 및 실행 설정_

```
~ % curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
~ % sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/~ % mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
~ % sudo apt-get update
~ % sudo apt-get install -y mongodb-org
~ % mkdir data
~ % cd data
~ data % mkdir db
~ data % cd ..
~ % mongod --dbpath=data/db/
```

<br/>

- #### MySQL 관련 이슈
  > _MySQL 실행법_

```
~ % mysql -u root -r
# 위 코드 실행 시 root@localhost permission denied 에러가 발생한다면 아래 스크립트를 실행해주세요
```

```
~ % sudo mysql -u root

mysql> USE mysql;
mysql> SELECT User, Host, plugin FROM mysql.user;
mysql> UPDATE user SET PLUGIN='mysql_native_password' WHERE user='root';
mysql> FLUSH PRIVILEGES;
mysql> SELECT user, host, plugin FROM user;
```

<br/>

> _git pull 이후 실행 시_

```
~ % service mysql restart
# 새로 git pull 후에 위 스크립트를 실행해주세요
```

<br/>

> _ERROR 2002 (HY000): Can’t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock’ 에러 발생 시_

```
~ % service mysql restart
# 위 코드로 에러가 해결 되지 않을 시 아래 스크립트를 실행해주세요
```

```
~ % service mysql stop
~ % chmod 755 -R /var/lib/mysql
~ % chown mysql:mysql -R /var/lib/mysql
~ % service mysql start
```

<br/>

> SQLalchemy 실행 설정

```
# SQLalchemy 실행 전 MySQL에서 database를 생성한 뒤 실행해주세요

# 최초 1회 실행
~ % flask db init

# 모델링 이후 1회
~ % flask db migrate

# 이후 실행 시 모델이 생성됩니다
~ % flask db upgrade
```

<br/>

> _SQLalchemy 리모델링_

```
# 이미 만든 모델을 다시 만들어야 할 경우 아래 스크립트를 실행해주세요

mysql> DROP DATABASE medical;
mysql> CREATE DATABASE medical;

~ % flask upgrade

# 리모델링이 안된다면 migration 디렉토리를 삭제 후 SQLalchemy를 최초 실행해주세요
```
