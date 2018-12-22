---
layout: default
title: GUI 계산기 구현하기
parent: Javascript
grand_parent: Tech
nav_order: 1
has_children: true
---

# javascript로 GUI 계산기 구현하기

## 무엇을 만들었나요?

<iframe width="560" height="315" src="https://www.youtube.com/embed/zkKruen-TNQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

**버튼을 클릭하여 사칙 연산을 수행할 식을 만들고 계산하는 GUI 계산기** 를 만들었습니다. 여기서 연산을 수행할 식은 '문자열'로 만들어서 숫자와 연산자는 공백으로 구분하였습니다. _다만 연산자의 우선 순위를 고려하지 않고, 수행할 식에서 먼저 등장 하는 연산자부터 계산합니다._

예시)
3+5*2를 연산자의 우선 순위를 고려하여 계산 했을 때의 결과: 13<br>
3+5*2를 식의 앞에서 부터 순서대로 계산 했을 때의 결과: 16

---

## 기능과 구현 방법

0. 0부터 9까지의 숫자, 사칙 연산자(+,-,*,/), 백 스페이스(BS), 계산을 하는 = 버튼까지 **총 16개의 버튼**으로 구성한다. 
<br/>
<br/>
<img width="980" alt="16" src="https://user-images.githubusercontent.com/18614517/50376635-06581980-0653-11e9-9386-3d67ce711516.png">
1. 버튼을 클릭하면 **이벤트를 발생시킨 태그**의 innerHTML 값을 가져온 후, 리스트에 더한다.
    1. 만약 이벤트를 발생시킨 태그가 _숫자_ 라면? 숫자만 리스트에 더한다. 
    2. 만약 이벤트를 발생시킨 태그가 _사칙연산자_ 라면? 사칙 연산자를 공백으로 감싸서 더한다. 
    3. 만약 이벤트를 발생시킨 태그가 _BS키_ 라면? 리스트에서 pop한다. 
<br/>
<br/>
<img width="495" alt="push" src="https://user-images.githubusercontent.com/18614517/50376684-d9f0cd00-0653-11e9-863d-0d43121c7ed3.png">

2. 리스트의 값이 변할 때 마다, 화면에서 보여줘야 하는 식을 업데이트한다. 
3. 계산을 하기 전에 입력받은 문자들로 만든 리스트를 문자열로 바꾼 후, 다시 공백을 기준으로 리스트로 만든다.
<br/>
<br/>
<img width="426" alt="default" src="https://user-images.githubusercontent.com/18614517/50376792-d78f7280-0655-11e9-81c4-93ce4af4e0b6.png">

    1. ```input.array```버튼으로 입력 받은 문자는 input객체의 array 리스트에 들어가 있다. (자세히 보면 숫자는 단독으로, 연산자는 좌우로 공백이 포함되어있다.)
    2. ```input.array.join("")```입력 받은 문자의 리스트를 join해주면 문자열로 변경된다.
    3. ```input.array.join("").split(" ")```공백을 기준으로 문자열을 다시 리스트로 쪼갠다.
<br/>
<br/>
<img width="378" alt="default" src="https://user-images.githubusercontent.com/18614517/50376796-e37b3480-0655-11e9-9600-a4584a275105.png">
<br/>
<br/>
4. 리스트의 제일 처음에 있는 값은 계산을 위한 첫 번째 숫자로 저장한다. 
5. 그 이후로 리스트가 비어 있을 때까지 연산자 -> 두 번째 숫자의 순으로 계산하는 것을 반복한다. 
<br/>
<br/>
<img width="570" alt="1" src="https://user-images.githubusercontent.com/18614517/50376850-de6ab500-0656-11e9-8796-cfac580b7b9d.png">
<br/>
<br/>
<img width="507" alt="2" src="https://user-images.githubusercontent.com/18614517/50376855-f17d8500-0656-11e9-8dbe-b0b8b85eabf0.png">




---

## 사용한 개념
* 객체
    * 객체 변수, 메서드
* 이벤트
* DOM
* 리스트와 문자열을 다루는 함수들
* while문, swich-case문

---

## 사용한 기술
* html 
* javascript

---

## 향후 보완해야 할 점
* 이 GUI 계산기를 구현할 당시(약 한달 전)에는 이벤트의 핸들러를 등록하는 방식 중 인라인 이벤트 핸들러 방식 밖에 몰랐다. 하지만 최근에 이 방식이 html과 javascript를 너무 의존시키기 때문에 좋지 않다는 것을 알게 되었다. *addEventListener* 메소드 방식으로 변경해 볼 예정이다.






