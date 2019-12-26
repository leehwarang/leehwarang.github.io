---
layout: default
title: module system
parent: Javascript의 Module System
nav_order: 13
has_children: true
comments: true
date: 2019-12-26
---

# Javascript의 Module System

프로그래밍을 하다보면 하나의 파일에 모든 코드를 다 넣을 수 없다는 것을 알게된다. 물론 아주 작은 프로그램은 가능하겠지만 일반적으로 프로그램이 커지면 특정 기능이나 클래스 등을 기준으로 파일을 나눈다. 따라서 어떤 파일에서 다른 파일의 코드(함수, 변수, 클래스 등)을 불러오는 일은 필수적이다. 내가 짠 코드 뿐만 아니라 수 많은 모듈이나 패키지, 라이브러리를 불러와서 사용해야 하기 때문에, 사용하는 프로그래밍 언어와 환경에서 '모듈화' 방식이 어떻게 동작하는지 잘 알고 있는 것이 좋다. 이번 포스팅 에서는 Javascript 언어가 Node(비브라우저) 환경 또는 브라우저 환경에서 사용될 때, 모듈화 방식에 대해서 정리해보고자 한다.

---

## 1. Node(비브라우저) 환경에서 javascript 모듈 사용하기

<img width="664" alt="스크린샷 2019-12-21 오후 7 03 26" src="https://user-images.githubusercontent.com/18614517/71306610-ebff7a00-2425-11ea-8371-d3a928ca0392.png">

먼저 내 컴퓨터 환경에 node가 설치되어 있는지 확인해보자.

### require

```
// foo.js

function hello(name) {
  return `hello! ${name}`;
}

const age = 20;
```

```
// bar.js

const result = require('./foo.js');
console.log(result) // {}
```

**Node 에서는 하나의 파일을 하나의 모듈로 간주한다.** (이 말이 조금 추상적으로 느껴질 수 있는데, 브라우저와 비교하여 아래에서 더 자세히 알아보겠다.) 불러올 때 **`require`** 이라는 키워드를 사용하고, 불러온 결과를 저장한 변수 module을 확인해보면 _빈 객체 {}_ 를 확인할 수 있다. require로 js 파일을 불러온다고 해서 그 파일에 있는 코드가 불러와지는 건 아니고, 대상 파일(foo.js)에서 불러올 함수나 변수를 **`module.exports`** 또는 **`exports`** 라는 키워드로 선언해줘야 한다. 먼저 `module.exports` 키워드를 사용하는 방법 먼저 확인해보자.

---

### module.exports

```
// foo.js

function hello(name) {
  return `hello! ${name}`;
}

const age = 20;

<-- module.exports 를 이용한 방법 (1) -->
module.exports = {
  hello : hello,
  age : age
}

<-- module.exports 를 이용한 방법 (2) -->

module.exports.hello = hello;
module.exports.age = age;
```

```
// bar.js

const result = require("./foo.js");
console.log(result);

const greeting = result.hello("michelle");
console.log(greeting);
```

<img width="727" alt="스크린샷 2019-12-22 오후 4 55 48" src="https://user-images.githubusercontent.com/18614517/71319050-3cd1aa00-24dc-11ea-9807-ac6c362f7cb3.png">

<center> 실행 결과 </center>

**require는 module.exports = {} 라는 객체를 리턴 받는다.** 따라서 제일 처음에 foo.js 에서 아무것도 module.exports 나 exports로 선언해주지 않았을 때, result의 값이 빈 객체였던 것이다.

이번 예시에서는 module.exports 객체에 hello 라는 _키(key)_ - 변수 hello에 들어있는 *값(value)*을 할당, age 라는 *키(key)*에 변수 age 에 들어있는 *값(value)*을 할당하였기 때문에 result가 위 이미지의 결과처럼 나타난다.

---

### exports

```
//foo.js

function hello(name) {
  return `hello! ${name}`;
}

const age = 20;

exports.hello = hello;
exports.age = age;
```

`exports` 키워드를 사용할 수도 있는데, 이는 `module.exports` 의 _shortcut(줄여서 쓰는 방법)_ 일 뿐이다. Node 공식 문서에서 Module 객체가 어떻게 만들어져 있는지 참고하면 도움이 된다. 아래에 이미지를 첨부했다. ([출처](https://nodejs.org/api/modules.html#modules_require_id))

![스크린샷 2019-12-22 오후 8 37 47](https://user-images.githubusercontent.com/18614517/71321330-2d158e00-24fb-11ea-96ca-140242a65437.png)

![스크린샷 2019-12-22 오후 8 38 07](https://user-images.githubusercontent.com/18614517/71321340-49192f80-24fb-11ea-9fdd-1dd915b59823.png)

### Object destructuring(객체 구조분해할당)에 익숙해지기

Node에서 모듈을 불러올 때 [Object destructuring(객체 구조분해할당)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)이 굉장히 많이 쓰인다. 앞서 말했듯, Node는 require를 통해 객체 타입으로 다른 파일의 데이터를 가져오기 때문이다. 예를 들어 웹팩을 사용하다 보면 아래와 같은 코드를 익숙하게 볼 수 있을 것 이다.

```
// clean-webpack-plugin 모듈에서 CleanWebpackPlugin 이라는 key 를 가진 값만 가지고옴
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack 모듈에서 DefinePlugin 이라는 key 를 가진 값만 가지고옴
const { DefinePlugin } = require('webpack');
```

---

## 2. 비브라우저 환경에서 javascript 모듈 사용하기

### 배경

javascript의 태생은 정적인 웹사이트에서 사용자 인터랙션 같은 동적인 기능을 하기 위해 만들어졌다. `index.html` 파일이 있고 html 내부에 `<script></script>` 태그를 이용하여 javascript 파일을 로드한다.

하나의 index.html에 a.js 와 b.js 가 연결 되고 있고, 실행 결과를 예상해보자.

```
// index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script src="./a.js"></script>
    <script src="./b.js"></script>
  </body>
</html>
```

```
// a.js

const name = "michelle";
let age = 20;
```

```
// b.js

age = 26;
console.log(name);
console.log(age);
```

<img width="670" alt="스크린샷 2019-12-26 오후 11 32 52" src="https://user-images.githubusercontent.com/18614517/71479537-2a3ad600-2838-11ea-9fdf-c8f7e9691f5b.png">

html을 열고 개발자 도구를 확인해보면 name은 michelle, age는 26 이라는 값이 출력된다. 여기서 _b.js 에는 name 변수가 없는데 어떻게 michelle 을 출력할 수 있었을까? age 변수는 왜 20이 아닌 26이 출력 했을까?_ 바로 **우리가 불러온 script 파일은 독립적인 스코프(유효 범위)를 가지고 있지 않기 때문이다.** a.js 와 b.js 파일에서 사용한 변수는 같은 전역 공간에 저장된다. 이 때문에 브라우저에서 사용하는 javascript 는 '모듈화' 개념을 사용할 수 없었다.

'모듈'이란 어떤 코드에 다른 파일의 코드를 불러와야 하는데, 만약 불러온 코드에 내가 사용한 변수와 같은 이름의 변수가 있다면 후자에 할당된 값이 사용되는 등의 문제가 발생하여 독립이 성립하지 않는다.

![IMG_0030](https://user-images.githubusercontent.com/18614517/71479977-3f186900-283a-11ea-9473-c18f79394f96.jpg)

---

### <script type="module"></script>

---

3.

물론 브라우저에서 CommonJS를, 노드에서 ES modules 를 사용할 수도 있다.

https://ui.toast.com/weekly-pick/ko_20190805/
