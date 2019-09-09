---
layout: default
title: 이벤트 버블링, 캡쳐링과 위임
parent: Javascript
nav_order: 9
has_children: true
comments: true
---

# 이벤트 버블링, 캡쳐링과 위임

브라우저에서 동작하는 자바스크립트 코드에서 이벤트의 중요성은 가히 말할 필요도 없다. 자바스크립트의 다른 역할들도 많지만 사용자가 키보드를 눌렀을 때, 마우스를 클릭했을 때, 스크롤의 위치가 변했을 때 등 브라우저에서 사용자 동작으로 일어나는 거의 모든 일들은 event 객체에 의해 제어된다.

이벤트 제어의 기본적인 메커니즘은 _**1) DOM 요소에 이벤트를 등록**_ 하고, _**2) 등록한 이벤트가 발생했을 때 실행할 콜백 함수를 정의**_ 해주면 된다.

<img width="1225" alt="event basic" src="https://user-images.githubusercontent.com/18614517/64487762-46127000-d279-11e9-9449-c1d459f85cf0.png">

위 예시에서는 button 태그에 click 이벤트가 발생했을 때, alert을 띄우는 콜백 함수를 등록했다.

---

## 이벤트 제어가 복잡해지는 이유는 무엇일까?

_굉장히 간단해보이지만 이벤트 제어가 복잡해지는 이유 중 하나는 **html 태그들의 중첩된 구조** 때문이다._

<img width="500" alt="중첩" src="https://user-images.githubusercontent.com/18614517/64487880-62afa780-d27b-11e9-9c9e-11c3afa713b9.png">

> 다이어리 위에 책, 책 위에 마우스가 올려져 있을 때 사람이 마우스를 눌렀다면.. 마우스가 눌린 것인가? 책이 눌린 것인가? 다이어리가 눌린 것인가? 아니면 마우스와 책과 다이어리가 모두 눌린 것인가?

<img width="1220" alt="tag" src="https://user-images.githubusercontent.com/18614517/64488005-1e250b80-d27d-11e9-8d2e-8fead1dec381.png">

> 세 개의 div 태그가 중첩되어 있는 상황에서 특정 이벤트가 발생했을 때 브라우저 입장에서 어떻게 생각하는지 알아보자.

---

## 이벤트 버블링(Event Bubbling)

<img width="1220" alt="result1" src="https://user-images.githubusercontent.com/18614517/64488260-f5067a00-d280-11e9-96b8-230954a032b4.png">

세 개의 div 태그에 click 이벤트가 발생했을 때, _이벤트가 발생한 태그(currentTarget)_ 의 클래스 이름을 출력하는 콜백함수를 등록했다. 그리고 나는 세 번째 div 태그만 클릭했는데 콘솔창을 보면 `div3 div2 div1`이 출력된 것을 볼 수 있다.

브라우저는 일단 확실하게 이벤트가 발생한 div3의 콜백함수를 실행하고, 상위에 있는 요소에 동일한 이벤트(click)가 등록 되어 있는지 탐색한다. 탐색 중 동일한 이벤트가 등록 되어 있는 요소가 있다면 해당 콜백 함수를 실행한다.

**_이벤트 버블링이란 특정한 요소에서 어떤 이벤트가 발생했을 때, 상위에 있는 요소까지 이벤트가 전파 되는 것을 말한다._**

- [데모 링크](https://codesandbox.io/s/jovial-pond-bb9fk?fontsize=14)를 수정하면서 직접 확인해보기
  - div2를 클릭했을 때
  - div1을 클릭했을 때
  - div2의 이벤트를 focus로 바꾸고, div3을 클릭했을 때
  - div2의 이벤트를 focus, div1의 이벤트를 blur로 바꾸고 div3을 클릭했을 때

---

## 이벤트 캡쳐링(Event Capturing)

버블링은 이벤트가 발생한 currentTarget 요소를 기준으로 가까운 상위 요소부터 하나씩 탐색한다면, **_캡쳐링은 이벤트가 발생한 currentTarget 요소의 최상위 요소부터 currentTarget 요소까지 탐색한다._**

또한 이벤트 전파에서 버블링은 기본적으로 true여서 아무 설정 없이 발생한다. 이 흐름을 캡쳐링으로 변경하려면 이벤트 등록시 세 번째 인자로 `{ capture: false }` 를 줘야 한다.

<img width="1365" alt="capturing" src="https://user-images.githubusercontent.com/18614517/64488848-74974780-d287-11e9-89c7-302eee2ec0f6.png">

세 번째 div 태그를 클릭했을 때의 실행 결과를 보면 `div3`이 먼저 출력되지 않는다. 최상위 요소인 태그부터 currentTarget 요소까지 다시 내려오면서 발생한 이벤트(click)와 동일한 이벤트가 등록 되어 있는 요소가 있는지 확인하고 콜백 함수를 실행한다.

- [데모 링크](https://codesandbox.io/s/recursing-grass-xw7d6?fontsize=14)

---

## Event.stopPropagation()

이벤트 버블링이든 캡쳐링이든 html 요소가 복잡하게 중첩되어 있고, 동일한 요소에 이벤트가 여러 개 등록되어 있다면 전파가 어떻게 흘러가는지 파악하기 어렵다. 특정한 요소에 특정한 이벤트만 실행하고 전파되는 것을 막고 싶을 때, `Event.stopPropagation()` 함수를 사용하면 된다.

- 이벤트 버블링에 stopPropagation() 적용하기

<img width="641" alt="propagation1" src="https://user-images.githubusercontent.com/18614517/64489206-4d427980-d28b-11e9-8410-49e6022fca20.png">

- 이벤트 캡쳐링에 stopPropagation() 적용하기

<img width="644" alt="propagation2" src="https://user-images.githubusercontent.com/18614517/64489213-65b29400-d28b-11e9-8ac2-afcbb2c39f50.png">

---

## 이벤트 위임(Event Delegation)

하나의 div 태그 안에 여러 개의 button 태그가 있다고 상상해보자. button 태그를 클릭하면 자신의 innerHTML을 콘솔창에 출력하고 싶을 때, 아래와 같이 코드를 짤 수 있다.
이미지는 세 번째 button 태그를 클릭했을 때 이다.

<img width="1064" alt="delegation1" src="https://user-images.githubusercontent.com/18614517/64489653-9c3edd80-d290-11e9-9100-d2ba0a772271.png">

하지만 만약 button 태그가 100개, 1000개 라면 이렇게 반복문을 돌려서 태그 하나하나에 이벤트를 등록하는 방법은 효율적이지 않다. 또한 브라우저에 같은 기능을 하는 button 태그가 **동적으로** 추가 되었다면 추가된 태그는 해당 이벤트가 등록되지 않아서 자신의 innerHTML 을 콘솔창에 출력하지 못한다.

앞서 설명한 이벤트 전파의 특성으로 이 문제를 해결할 수 있다.

<img width="1059" alt="delegation2" src="https://user-images.githubusercontent.com/18614517/64489774-e07ead80-d291-11e9-8bf5-4cf568a7e08e.png">

button 하나하나에 이벤트를 등록하지 않고, button을 감싸고 있는 div 태그에만 이벤트를 등록하였다. _만약 사용자가 button을 클릭하면 **이벤트 버블링** 때문에 상위에 있는 요소까지 이벤트가 전파되어 콜백 함수가 실행된다._ 처음으로 이벤트 위임에 대해 알았을 때, 아래에서 위로 전파되는 버블링 특성을 이용해 가장 상위 태그에 이벤트를 등록하여 해결하는 생각의 전환이 참신하다고 느꼈다.
