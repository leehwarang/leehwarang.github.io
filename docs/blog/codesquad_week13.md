---
layout: default
title: codesquad 13주차
parent: Codesquad
grand_parent: Blogs
nav_order: 13
has_children: true
comments: true
---

# 코드스쿼드 13주차 190624 ~ 190630

## 이번주 목표

- 평일
  - step 11-2 아마존 완성
  - 인스타그램 완성
  - 캐러셀 기능, 모달창 띄우기, 애니메이션 적용
  - 생활 코딩 리액트 강의 다 듣기
- 주말
  - 아마존, 인스타그램 완성 후 배웠던 것 정리 (필수)
  - 리액트 튜토리얼 따라해보기

---

## Day by day 스치던 생각들

### 190624(월)

- 오전
  - 크롱 강의
- 오후
  - 크롱 js 테스트
  - Promise 공부
- 저녁
  - Promise 공부

### 190625(화)

- 오전
  - 크롱 테스트 리뷰
    - 개념에 대한 질문에 대답할 때에는 그에 해당하는 코드를 작성할 수 있어야 함. 또한 코드를 작성하면서 그 개념을 활용했던 사례, 장점까지.
- 오후 & 저녁
  - Promise, Fetch, XMLHTTPRequest 사용법 공부

### 190619(수)

- 오전&오후
  - 생활 코딩 리액트 백지 코딩
- 저녁
  - Promise
  - 리액트 블로그에 정리

### 190620(목)

- 오전
  - 크롱 강의
- 오후

  - Promise 공부
    1. new Promise()로 반환된 promise 객체는 넘겨진 함수의 비동기 코드가 끝나면(비동기 코드던 아니던) 상태가 success로 바뀌고, 실패면 fail, 덜 완료된 상태면 pending
    2. then()은 인자로 받은 콜백 함수를 그냥 어딘가에 넘기고, 1의 비동기 코드가 끝나면 그 결과에 따라 resolve, reject가 실행될 때 호출된다.
    3. 여러 개의 then()은 병렬적으로 실행된다. ex) 너 있잖아, 일단 A를 해보고 혹시 성공하면 B를하고, 혹시 B도 성공하면 C도 하고, C도 성공하면 D도 해. 알겠지?
    4. 이렇게 할 수 있었던 이유는 어떤 request을 보내고, 그 요청에 응답하면 응답을 기반으로 또 요청을 보내고..를 반복. 요청을 보내는 행위는 동일하며 응답을 계속 업데이트 시키는 것이기 때문에. XHR + promise를 fetch 로 바꿀 수 있었음.

- 저녁
  - 휴식

### 190621(금)

- 오전 & 오후
  - step 13 My Promise 코딩
- 저녁
  - fetch API 공부하고, XMLHTTPRequest + Promise 와 비교해보기
    - fetch 내부에 request 보내는게 어떻게 들어가 있는지 확인
  - Promise 병렬 실행에 대해 공부

### 190622(토)

- step 13 My Promise 마무리하고 PR 보내기
- 참고. XMLHTTPRequest 강의 듣기
- 다른 사람들 Promise 코드 보기

### 190623(일)

- step 13 My Promise 만들면서 배웠던 것 정리하기
- 캐러셀 UI 크롱 피드백 이해해보기
- 다음주 주제 Templating이 무엇인지, 어떻게 공부해야 할지 목표 다지기

---

## 이번주 회고

- ### 잘한 점, 아쉬운 점, 개선할 점

잘한 점: 포기하지 않고 계속 도전한 점. 어려워서 힘들었지만 어제보다 오늘 알게 된 것, 어제보다 오늘 짠 코드 3줄의 의미가 무엇인지 집중해서 하루하루 헤쳐나갈 수 있었다.

아쉬운 점: 알고리즘 문제 일주일 동안 하나도 안 풀었다. 이전에는 쉬운거라도 하나씩 꼭 풀려고 했는데 계속 쉬운걸 풀으니 나아지는 것 같지 않아서 그냥 시간을 쓰려고 하지 않았던 것 같다. 어려운 알고리즘을 조금씩 이해할까.. 쉬운걸 반복적으로 풀까 고민이다. 열심히는 한 것 같은데, 계획했던 것들을 모두 하지는 못했다.

개선할 점: 밤에 누워서 스마트폰 보지 말자. 다른 사람의 일이나 사회의 일들에 잠시 신경을 끄고, 내 인생에만 집중해야 하는 시간. 빨리 자고 아침에 좋은 컨디션으로 일어나서 더 집중하기. 엄청난 걸 할 생각하지 말고 loss 를 줄이자.

## 다음주에는