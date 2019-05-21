---
layout: default
title: 프런트엔드 개발자를 위한 HTTP 프로토콜 기초
parent: Web/Network
nav_order: 3
has_children: true
comments: true
---

### 이 글을 읽기 전 알고 있어야 하는 개념

- 클라이언트와 웹 서버

# WEB - 프런트엔드 개발자를 위한 HTTP 프로토콜 기초

## [1] HTTP 란 무엇인지 이해한다.

<img width="813" alt="http image" src="https://user-images.githubusercontent.com/18614517/58032145-ed4d8900-7b5c-11e9-8e38-cbf501eafb9e.png">
<center>HTTP의 기본 흐름</center><br>

**클라이언트측 컴퓨터(이하 클라이언트)**는 브라우저라는 웹 어플리케이션을 이용해서 웹 서버를 가지고 있는 컴퓨터(이하 웹서버)에게 무언가를 **_요청(request)_**한다. 요청을 받은 **웹 서버**는 해당 요청에 대한 **_응답(response)_**을 클라이언트에게 보내준다. 이것이 HTTP의 기본적인 흐름이다.

많은 클라이언트(크롬, 사파리, 인터넷 익스플로어 등)와 웹 서버(아파치, AWS 등)간에 데이터를 교환하고 통신하기 위해서는 표준이 필요한데, 표준 규칙을 TCP/IP라고 한다. **HTTP**는 _TCP/IP의 하위 항목 중 하나로 html과 같은 **문서** 를 주고 받을 때 사용하는 규칙_ 이다.<br>

![Fetching_a_page](https://user-images.githubusercontent.com/18614517/58030848-4831b100-7b5a-11e9-8384-010da9bb403a.png)

<center>이미지 출처: MDN HTTP 개요</center><br>

`www.google.co.kr`과 같이 웹 서버에게 url을 넘기며 요청하면, 미리 지정된 html 파일이 브라우저에서 보여지는 것은 쉽게 생각할 수 있다. 그 뿐만 아니라, 위의 이미지에서도 볼 수 있듯이 **_하나의 html 파일에서도 웹 서버에 여러 개의 요청을 보낸다._** 예를 들어 또 다른 링크로 연결된 문서를 클릭했을 때, css 파일이나 이미지, 비디오 파일 등을 불러오기 위해서 요청이 필요하다. HTTP에서 _각 요청은 독립적_ 이여서 같은 컨텍스트 임에도 불구하고 계속해서 새로운 연결을 시도하기 때문에 성능의 문제로 이어질 수 있고, 이에 대한 해결책으로 cookie 등을 사용한다.

참고로 HTTP는 단순히 규약이기 때문에, 브라우저 개발사 & 서버 개발사들이 반드시 지켜야 하는 의무가 없다. 범용적인 규칙은 당연히 지키고 있기 때문에 문제가 없어 보이는 것 뿐이다.

---

## [2] STATUS code(상태 코드)가 왜 필요한고, 어떤 것이 있는지 안다.

**STATUS code(이하 상태 코드)**란 **_클라이언트가 웹 서버에게 요청을 보냈을 때, 웹 서버가 요청이 어떻게 처리 되었는지 알려주는 역할_** 을 한다.<br>

| 상태 코드 분류 |    클래스     | 설명                                      |
| :------------: | :-----------: | :---------------------------------------- |
|      1xx       | Informational | 요청을 처리중                             |
|      2xx       |    Success    | 요청을 정상적으로 처리 완료               |
|      3xx       |  Redirection  | 요청을 완료하기 위해 추가적인 동작이 필요 |
|      4xx       | Client Error  | 서버가 처리할 수 없는 잘못된 요청         |
|      5xx       | Server Error  | 서버가 요청을 처리할 수 없음              |

<br>

놀라운 것은 요청에 대해 성공했는지 실패했는지 알려주는 것을 넘어서 이 요청이 클라이언트 측의 문제인지, 웹 서버에서 처리할 수 없는 문제인지, 추가적으로 어떤 작업이 필요한지 알려준다. 개발자는 상태 코드를 보면서 내가 의도한 대로 동작하고 있는지 파악해야 한다.

---

## [3] HTTP headers( 헤더)가 왜 필요한지, 어떤 속성이 있는지 안다.

**_클라이언트와 웹 서버는 요청 및 응답을 주고 받기 위해 메시지를 사용하는데, 이 메시지에는 herder(이하 헤더)가 포함되어 있다._** 서로에게 알려야 하는 정보를 담아 전달하는 역할이다.

- 일반적 헤더 필드(General Header Fields)

- 요청 헤더 필드(Request Header Fields)

- 응답 헤더 필드(Response Header Fields)

- 엔티티 헤더 필드(Entity Header Fields)

각 헤더 필드에 어떤 속성들이 있는지는 heejeong Kwon님의 [HTTP 헤더의 종류 및 항목](https://gmlwjd9405.github.io/2019/01/28/http-header-types.html) 잘 정리된 글을 참고하면 좋다.

---

## [4] HTTP Method가 왜 필요한지 어떤 것이 있는지 안다.

클라이언트가 웹 서버에게 요청할 때, 요청 사항에 대한 정보를 **메시지**로 넘긴다. 그리고 _이 메시지로 무엇을 하라고 알리는 일은_ **Method(메서드)**가 수행한다. `"내가 주는 정보로 이걸해!"` `"내가 주는 정보로 저걸해!"` 라고 말하는 것과 같다.

<img width="828" alt="upgrade http" src="https://user-images.githubusercontent.com/18614517/58065769-c5444100-7bc1-11e9-9c31-1bcec617ab02.png">

<center>HTTP의 기본 흐름을 조금 더 구체적으로 표현해보았다.</center><br>

| 메서드 | 설명                                                                                                  |
| :----: | :---------------------------------------------------------------------------------------------------- |
|  GET   | 특정 자원에 대한 정보를 요청                                                                          |
|  HEAD  | GET과 동일하지만 서버에서 응답 메시지의 Body를 반환하지 않음 (화면 변화 없음)                         |
|  POST  | html form이나 XMLHttp​Request 등을 통해 특정 자원(데이터)를 서버에 보내서 생성                        |
|  PUT   | 특정 자원을 업데이트. Location:URI을 추가적으로 보내지 않아도 됨                                      |
| DELETE | 특정 자원을 삭제.                                                                                     |
| TRACE  | 전송한 자원과 최종 목적지 서버에 도달했을 때의 자원을 비교하기 위해 요청. 서버의 응답을 Body에서 확인 |
| OPTION | 웹서버에서 지원하는 메소드의 종류를 확인 요청                                                         |

---

## [5] URL 어떤 구조로 되어 있는지 안다.

**_URL은 웹 상에 있는 자원의 위치를 나타내며._** _1)프로토콜 2)웹서버 3)경로 4)파일 이름 5)쿼리_ 로 구성되어 있다.

```
https://www.google.co.kr/
https://www.google.com/doodles/
https://www.google.com/doodles/international-womens-day-2019
https://www.google.co.kr/maps
https://www.google.co.kr/maps?hl=ko&tab=wl
```

<center>url 예시</center>

---

## 마무리

**_웹에 있는 모든 것은 자원이다._** 어떤 자원에 접근 하거나, 자원을 추가하거나, 수정하는 등 모두 웹에 있는 자원을 다루는 일이며, HTTP는 그것을 위한 규칙이다. 막 웹 개발을 배우기 시작할 때 방대한 HTTP를 이해하는 것은 쉽지 않지만 웹을 만들고 관리하는 사람이라면 내부적인 동작 방식과 흐름을 이해하기 위해 노력해야 한다고 생각한다.

---

## reference

- https://developer.mozilla.org/ko/docs/Web/HTTP/Overview
- https://joshua1988.github.io/web-development/http-part1/
- https://gmlwjd9405.github.io/2019/01/28/http-header-types.html
- https://javaplant.tistory.com/18
