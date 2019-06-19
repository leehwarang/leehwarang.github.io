---
layout: default
title: React 공부를 시작하면서
parent: React
nav_order: 1
has_children: true
comments: true
---

### React 공부를 시작하면서

매주 수요일마다 코드스쿼드 친구들과 **_리액트_** 공부를 시작했다. 코드스쿼드 과정의 후반부에 리액트가 포함되어 있어서, 조금 일찍 공부해야 그 때쯤이면 프로젝트를 해볼만 하지 않을까 싶었다. 아래의 두 가지 자료로 기반으로 학습 중이다.

- [생활 코딩 리액트 강의](https://www.youtube.com/watch?v=XMb0w3KMw00&list=PLuHgQVnccGMCRv6f8H9K5Xwsdyg4sFSdi)
- [리액트 공식 도큐먼트](https://reactjs.org/docs/hello-world.html)

# 내가 생각하는 '왜 리액트를 사용해야 할까?'

- 으아아아!! 파일이 점점 복잡해진다!!

<img width="606" alt="파일구조1" src="https://user-images.githubusercontent.com/18614517/59777000-bfd83480-92ee-11e9-97aa-a24f7c3c36d1.png">

프론트엔드 부분을 처음 공부할 때는 index.html 파일 하나, style.css 파일 하나, script.js 파일 하나를 만들어서 코딩했다. **하지만 js의 기능이 점점 복잡해지면서 script.js 하나의 파일 안에 스크립트 코드를 모두 넣기가 힘들어지는 것을 느꼈다.** 이 코드가 어떤 element를 제어하고 있는지 잘 보이지 않았고, 가독성이 안좋아졌다.

---

<img width="602" alt="파일 구조2" src="https://user-images.githubusercontent.com/18614517/59777549-d9c64700-92ef-11e9-8e42-20d8cbc1f026.png">

그래서 js 파일을 여러개로 분리해서 코딩하기 시작했다. 예를 들어, a.js는 상단에 있는 navigation을 제어하는 코드, b.js는 중앙에 있는 캐러셀 컨텐츠를 제어하는 코드, c.js는 또 다른 어떤 것을 제어한다. **지금은 이 부분에서 js의 클래스를 어떻게 나눠야 하는지 엄청 고민하고 있는 단계지만 왜 이렇게 파일을 분리해서 작성해야 하는지는 절실히 깨달았다.** (일반적으로 js에서 분리한 클래스는 하나의 파일로 만든다.)

또 다른 측면의 고민은 **_성능의 문제_**이다. 만약 index.html 파일 중 작은 일부에 해당하는 css가 변경되거나, data가 바뀌거나, 이벤트가 발생하면 브라우저는 DOM tree를 다시 그린다. 또한 브라우저가 DOM을 탐색할 때도 상단의 노드부터 하나씩 탐색하기 때문에 DOM tree가 복잡하다면 느려진다.

---

<img width="606" alt="파일 구조3" src="https://user-images.githubusercontent.com/18614517/59779031-7db0f200-92f2-11e9-8751-f1de249a479c.png">

앞서 설명한 문제들 때문에 **"UI 컴포넌트 별로 분리하면 어떨까?"** 라는 아이디어가 등장했고, 이 아이디어가 리액트를 만든 것이 아닐까 라고 생각한다. 컴포넌트별로 분리되어 있기 때문에 변경이 일어난 컴포넌트만 업데이트 되도록 하면 다른 컴포넌트는 다시 render할 필요도 없고 DOM tree를 처음부터 새로 그려야 할 필요가 없기 때문이다.

> 따라서 리액트를 _상태를 관리할 때 사용한다_,라고 하고 _페이지를 다시 load 하지 않으면서 변경 되는 상태를 화면에 변경해서 보여줄 수 있기 때문에 SPA를 만들 때 좋다고 하는게 아닐까?_

---

## reference

- http://blog.weirdx.io/post/3214
- https://webclub.tistory.com/394
