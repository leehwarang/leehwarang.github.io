---
layout: default
title: for in 과 for of의 차이점
parent: Javascript
nav_order: 3
has_children: true
comments: true
---

# for in 과 for of의 차이점

## [0] 문제 상황

<img width="167" alt="default" src="https://user-images.githubusercontent.com/18614517/50885150-3dd70c00-1430-11e9-9045-25790255065b.png">

```
<div>
    <button class='btn-num'>1</button>
    <button class='btn-num'>2</button>
    <button class='btn-num'>3</button>
    <button class='btn-num'>4</button>
    <button class='btn-num'>5</button>
</div>
```

5개의 버튼이 있는 상황에서, 각 버튼 안에 있는 텍스트(1,2,3,4,5)를 가져오고자 했다.

```
var btns = document.getElementsByClassName('btn-num');
console.log(btns)
//HTMLCollection(5) [button.btn-num, button.btn-num, button.btn-num, button.btn-num,button.btn-num]
console.log(btns[0]) //<button class='btn-num'>1</button>
console.log(btns[0].innerHTML) //1
```

위의 코드가 의도대로 잘 실행되었기 때문에 내가 아는 자바스크립트 반복문인 **for/in** 을 사용해봤다.

```
for (var btn in btns){
    console.log(btn.innerHTML); // undifinedx8
}
```

그 결과 8개의 _**undefined**_ 가 출력되었으며 **for/in** 에 대해 더 알아보는 과정에서, **for/of**을 새로 배웠다.

---

## [1] for/in으로 반복하기

for/in 은 반복 변수에 **객체의 모든 _iterable한 속성_ 을 반환** 한다.

```
var btns = document.getElementsByClassName('btn-num');

for (var prop in btns){
    console.log(prop, btns[prop].innerHTML);
}
```

<img width="193" alt="forin" src="https://user-images.githubusercontent.com/18614517/50900178-c61cd780-1457-11e9-94d6-dc76982c7305.png">

그 결과 내가 원했던 버튼의 텍스트는 가져올 수 있었지만 _length, item, namedItem_ 과 같은 내가 원하지 않았던 속성들도 출력되는 것을 볼 수 있다. **HTMLCollection 객체** 나 **nodeList 객체** 들은 인덱스 값 외에도 다른 속성들을 포함하고 있기 때문에 for/in문을 사용해서 해당 값을 순회하고자 할 때는 적합하지 않다.

> > HTMLCollection 객체와 nodeList 객체는 무엇일까?

---

- ### HTMLCollection 객체

모든 html 요소는 객체인데 **_document.getElementBy~_** 메서드를 실행했을 때 리턴되는 값에 따라 객체의 종류가 구분된다.

```
<body>
    <ul>
        <li id='me'>Michelle</li>
        <li>Frank</li>
        <li>Ruru</li>
    </ul>
    <script>
        var li = document.getElementById('me');
        console.log(li.constructor.name); // HTMLLIElement

        var lis = document.getElementsByTagName('li');
        console.log(lis.constructor.name); // HTMLCollection
    </script>
</body>
```

리턴값이 하나인 경우에는 **HTMLElement** 객체에 속하고, 여러개인 경우에는 **HTMLCollection** 객체에 속한다. HTMLCollection 객체는 유사 배열(!=array)이며 HTMLCollection의 목록이 실시간으로 변경&반영되는 장점이 있다.(==Live nodeList)

- ### nodeList 객체

DOM 환경에서 모든 것은 노드(Node)이며, 모든 노드는 객체이다. HTMLCollection 객체와 nodeList 객체의 공통점은 노드들의 리스트를 말하는 것이다. 다만, **nodeList** 는 _Node.childNodes_ 속성을 제외하고는 실시간으로 반영되지 않는 정적인 nodeList이다.

일반적으로 **_element.childNodes_**와 같은 속성과 **_document.querySelectorAll_** 와 같은 메서드에 의해 반환된다.

---

## [2] for of

for/of 은 컬렉션 객체의 전용(==컬렉션 객체가 [Symbol.iterator] 속성을 가져야 함) 반복 구문으로 반복 변수에 **객체의 _값_ 을 반환** 한다.

다시 처음에 있는 5개의 버튼 코드에 적용해보면..

```
var btns = document.getElementsByClassName('btn-num');

for (var btn in btns){
    console.log(btn, btn.innerHTML);
}
```

<img width="358" alt="forof" src="https://user-images.githubusercontent.com/18614517/50903697-d1750080-1461-11e9-8012-6407dde654aa.png">

내가 원했던 각 객체 안에 있는 텍스트를 쉽게 가져오는 것을 볼 수 있다.

---

## 이어서 학습할 것

- 객체, array 등을 순회 시키는 방법들
  - ex) ES6에서의 for/each
- DOM에 대해서 더 자세히 공부
  - 어떤 객체들이 있고, 각 개체들은 어떻게 다룰 수 있는지

---

## 참고한 링크

- https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
- https://opentutorials.org/module/904/6665
- https://developer.mozilla.org/ko/docs/Web/API/NodeList
