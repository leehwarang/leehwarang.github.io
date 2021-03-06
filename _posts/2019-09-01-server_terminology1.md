---
layout: default
title: 서버 관련 용어 정리 (로컬 서버, 포트 번호, 호스팅)
parent: Node.js
nav_order: 1
has_children: true
comments: true
date: 2019-09-01
---

# 서버 관련 용어 정리

## 들어가기 전에

최근에 express로 간단한 API를 만들어보기도 하고, 리액트 프로젝트를 heroku에 배포해 보았다. 아직은 서버쪽 지식이 별로 없어서 낯선 용어와 에러에 많이 부딪히고 있다. 그럴 때마다 알게된 것들을 잊지 않으려 정리해보고자 한다. 그리고 누군가에게는 기본적인 내용이겠지만 또다른 누군가에게는 도움이 되었으면 하는 마음에서.

---

### 로컬 서버

<center><img width="500" height="500" src="https://user-images.githubusercontent.com/18614517/64064745-9a499e80-cc40-11e9-9607-59e76e6bfe22.jpg"></center>
<center>이미지 출처: 우현님 인스타그램 (고마워요!)  </center>

_모든 컴퓨터는 서버(Server)의 역할을 할 수 있는 능력을 가지고 있다._ ~~다만 개발자가 아닌 사람들은 그걸 모르고 있을 뿐~~ **로컬 서버 란 말 그대로 내 컴퓨터에서 프로젝트의 서버 환경을 구성한다는 의미**이고, 이렇게 만든 서버를 특정 명령어로 실행할 수 있다. 당연히 서버를 어떤 환경으로 만들었는지에 따라 서버를 실행시키는 명령어가 달라진다.

<center>
<img width="595" alt="local server" src="https://user-images.githubusercontent.com/18614517/64064938-a3d40600-cc42-11e9-8290-96396d1676ad.png">
</center>

위 이미지는 내가 만들고 있는 리액트 프로젝트를 express로 구성한 로컬 서버에 접속해서 띄우는 화면이다. url이 적힌 부분 **127.0.0.1:3000** 을 유심히 보면 좋다. 127.0.0.1은 자기 자신의 컴퓨터를 가리키는 _가상의 ip_ 이고, 이어 붙여진 3000은 _포트 번호_ 이다.

---

### 포트번호

예를 들어 내 컴퓨터에서 여러개의 리액트 프로젝트를 만든다고 가정했을 때, 각 프로젝트별로 다른 서버 환경이 필요하다. A라는 프로젝트에는 포트 번호 3000을, B라는 프로젝트에는 포트 번호 8080을 배정함으로써 서로 다른 서버 환경에 접속할 수 있도록 도와준다. 반면 컴퓨터는 하나의 ip 주소(127.0.0.1)를 가지고 있어서 로컬 서버 환경에 접속 했을 때 프로젝트 별로 뒤에 붙는 포트 번호만 달라지는 것을 볼 수 있다.

<center>
<img width="560" alt="jekyll server" src="https://user-images.githubusercontent.com/18614517/64065447-c701b400-cc48-11e9-84e2-56d094ec9a00.png">
</center>

현재 내 블로그는 jekyll을 이용해서 만들었는데 로컬 서버에서 포트번호 4000번을 배정받아서 접속하고 있다.

---

### 서버 호스팅

내가 만든 웹사이트에 다른 사람들도 접근할 수 있도록 하기 위해서는 **서버 호스팅,** _즉 다른 서버를 빌리는 작업이 필요하다._ 내 로컬 서버에도 다른 사람이 접속할 수는 있지만 ip 주소보다는 url을 생성해서 그럴싸한 홈페이지 주소를 만들어주는 것이 좋고, 얼마나 많은 사람들이 들어올지 모르니 안정적인 서버 환경을 구축해야 한다. AWS, heroku, github-page 등 서버를 호스팅 해주는 서비스들을 이용하면 된다. 다만 각 서비스 별로 배포할 수 있는 프로젝트가 다를 수 있으니 (예를 들어 github-page는 Node로 만든 앱을 배포할 수 없음), 어떤 호스팅 서비스를 선택할지 잘 알아보는 것이 좋다.

---

## 참조

- 없음
