---
layout: default
title: 함수 호이스팅
parent: Basic
grand_parent: Javascript
nav_order: 4
has_children: true
comments: true
---

**_참고:_** 인사이드 자바 스크립트의 4장(함수와 프로토타입 체이닝)과 인프런의 Javascript 핵심 개념 알아보기 - JS Flow를 듣고 헷갈리는 개념을 정리한 글 입니다. 혹시 잘못된 내용이 있다면 댓글이나 hwrng2@gmail.com로 알려주세요. 감사합니다. :)

# javascript의 함수 호이스팅

자바스크립트 엔진은 코드를 실행하기 전에 **호이스팅(hosting)** 을 진행한다. **_호이스팅이란 변수 선언과 함수 선언을 위로 끌어올리는 것_** 을 말한다. 코드로 살펴보자.

```
console.log(Hi()); //hi!
console.log(Hello()); //TypeError: Hello is not a function

function Hi(){
	return 'hi!';
}

var Hello = function(){
	return 'hello!';
}
```

Hi()와 Hello() 두 개의 함수를 선언하기 전에 호출했다. 그런데 Hi()함수는 호출된 반면에 Hello()함수는 'TypeError: Hello is not a function' 오류를 출력한다. 이는 함수의 호이스팅 때문인데, 사실상 위 코드는 아래와 같은 순서로 실행된다.

```
function Hi(){
	return 'hi!';
}

var Hello;

console.log(Hi()); //hi!
console.log(Hello()); //TypeError: Hello is not a function

Hello = function(){
	return 'hello!';
}
```

**Hi()함수는 함수 선언식** 으로 만들어졌기 때문에 자바스크립트 엔진은 코드를 실행하기 전 Hi() 함수를 호이스팅한다. 따라서 함수를 선언하기 전에도 호출하여 사용할 수 있다.
**Hello()함수는 함수 표현식** 으로 만들어졌기 때문에 자바스크립트 엔진은 선언된 변수 var Hello만 호이스팅 할 뿐, 할당된 함수를 호이스팅하지는 않는다.

- ### 결론

  > 코드를 작성할 때 함수 선언식과 함수 표현식을 혼용해서 사용하면 호이스팅 때문에 결과가 꼬이게 되므로, 많은 자바 스크립트 가이드에서는 함수 표현식을 사용하기를 권장한다.

---

## 이어서 학습할 것

- 함수 스코프, 실행 컨텍스트
  - https://poiemaweb.com/js-execution-context

---

## 참고한 링크
