---
layout: default
title: Javascript의 Module System
parent: Javascript
nav_order: 12
has_children: true
comments: true
date: 2019-12-30
---

최근 수정일: 2020-01-11

# Javascript의 Module System

프로그래밍을 하다보면 하나의 파일에 모든 코드를 다 넣을 수 없다는 것을 알게된다. 물론 아주 작은 프로그램은 가능하겠지만 일반적으로 프로그램이 커지면 특정 기능이나 클래스 등을 기준으로 파일을 나눈다. 따라서 **어떤 파일에서 다른 파일의 코드(함수, 변수, 클래스 등)을 불러오는 일은 필수적이다.** 내가 짠 코드 뿐만 아니라 수 많은 패키지, 라이브러리를 불러와서 사용해야 하기 때문에 _사용하는 프로그래밍 언어와 환경에서 '모듈 시스템'이 어떻게 동작하는지 잘 알고 있는 것이 좋다._

이 글에서 내가 표현하는 '모듈'은 단지 프로그램(코드)의 일부이다. 어떻게 프로그램을 잘 분리할지(모듈화 시킬지)는 또 다른 문제이지만 이번 포스팅 에서는 Javascript 언어가 Node(비브라우저) 환경 또는 브라우저 환경에서 사용될 때, 어떻게 서로 다른 파일을 불러오고 사용하는지에 대해 이야기 해보고자 한다.

---

# 1. Node(비브라우저) 환경에서 다른 javascript 파일의 코드 사용하기

<img width="664" alt="스크린샷 2019-12-21 오후 7 03 26" src="https://user-images.githubusercontent.com/18614517/71306610-ebff7a00-2425-11ea-8371-d3a928ca0392.png">

먼저 내 컴퓨터 환경에 node가 설치되어 있는지 확인해보자.

## require

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

**Node 에서는 하나의 파일을 하나의 모듈로 간주한다.** (이 말이 조금 추상적으로 느껴질 수 있는데, 브라우저와 비교하여 아래에서 더 자세히 알아보겠다.) 불러올 때 **`require`** 이라는 키워드를 사용하고, 불러온 결과를 저장한 변수 result을 확인해보면 _빈 객체 {}_ 를 확인할 수 있다. require로 js 파일을 불러온다고 해서 그 파일에 있는 코드가 불러와지는 건 아니고, 대상 파일(foo.js)에서 불러올 함수나 변수를 **`module.exports`** 또는 **`exports`** 라는 키워드로 선언해줘야 한다. 먼저 `module.exports` 키워드를 사용하는 방법 먼저 확인해보자.

---

## module.exports

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

<br>
<img width="727" alt="스크린샷 2019-12-22 오후 4 55 48" src="https://user-images.githubusercontent.com/18614517/71319050-3cd1aa00-24dc-11ea-9807-ac6c362f7cb3.png">

<center> 실행 결과 </center><br>

**require는 module.exports = {} 라는 객체를 리턴 받는다.** 따라서 제일 처음에 foo.js 에서 아무것도 module.exports 로 선언해주지 않았을 때, result의 값이 빈 객체였던 것이다. _어떤 변수나 함수를 외부에서 불러올 수 있는 상태로 만들기 위해서는 module.exports 라는 객체에 key와 value 형식으로 넣어줘야 한다._

이번 예시에서는 module.exports 객체에 hello 라는 _키(key)_ - 변수 hello에 들어있는 *값(value)*을 할당, age 라는 *키(key)*에 변수 age 에 들어있는 *값(value)*을 할당하였기 때문에 result가 위 이미지의 결과처럼 나타난다. 사용할 때는 `result.hello('string')`, `result.age` 처럼 key로 값에 접근할 수 있다.

---

## exports

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

---

## 번외: Object destructuring(객체 구조분해할당)에 익숙해지기

Node에서 모듈을 불러올 때 [Object destructuring(객체 구조분해할당)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)이 굉장히 많이 쓰인다. **왜냐하면 우리는 require로 불러온 결과가 객체라는 것을 이미 알고 있기 때문이다.** 앞서 설명한 예시에서 `const result = require("./foo.js");`로 불러왔을 때 `result.hello()`, `result.age` 처럼 사용했는데, 구조분해할당에 익숙해지면 `const {hello, age} = require("./foo.js")`로 불러오고 `hello()`, `age`로 간단히 사용할 수 있다.

리액트 프로젝트에서 웹팩을 사용하다 보면 아래와 같은 코드를 익숙하게 볼 수 있을 것이다. (이제 무섭지 않으셨으면!)

```
// webpack 모듈에서 DefinePlugin 이라는 key 를 가진 값만 가지고옴
const { DefinePlugin } = require('webpack');
```

---

# 2. 브라우저 환경에서 다른 javascript 파일의 코드 사용하기

## 배경 지식

javascript의 태생은 정적인 웹사이트에서 사용자 인터랙션 같은 동적인 기능을 하기 위해 만들어졌다. `index.html` 파일이 있고 html 내부에 `<script></script>` 태그를 이용하여 javascript 파일을 로드한다.

하나의 index.html에 a.js 와 b.js 두 파일을 로드했다. 실행 결과를 예상해보자.

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
```

```
// b.js

const name = "frank";
console.log(name);
```

![image](https://user-images.githubusercontent.com/18614517/71585843-579ac300-2b5b-11ea-8389-7e315264c42d.png)

<center> 실행 결과 </center><br>

분명 변수 `name`은 a.js와 b.js 서로 다른 파일에서 선언했는데, html을 열고 개발자 도구를 확인해보면 'name 식별자는 이미 선언 되어 있습니다.' 라고 에러 메세지가 나온다. 비슷하고 쉬운 예시를 또 하나 살펴보자. index.html 파일은 위와 같다.

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
<center> 실행 결과 </center><br>

name은 michelle, age는 26 이라는 값이 출력된다. 여기서 _b.js 에는 name 변수가 없는데 어떻게 michelle 을 출력할 수 있었을까? age 변수는 왜 20이 아닌 26이 출력 했을까?_ 바로 **우리가 불러온 script 파일은 독립적인 스코프(유효 범위)를 가지고 있지 않기 때문이다.** a.js 와 b.js 파일에서 사용한 변수는 같은 전역 공간에 저장된다.

여기까지 글을 읽고 누군가는 _각 파일이 독립적인 스코프를 가지지 않는게 뭐가 문제야? ☹️_ 라 할 수도 있겠지만 사실 이건 굉장히 크리티컬한 문제다. "우린 다른 파일에 있긴 하지만 브라우저에서 불러온다면 같은 전역 공간을 공유해"가 아니라 "각 파일은 기본적으로 독립적인 공간을 가지고 있고 필요할 때만 서로를 불러오도록 하자!" 로 가치관이 달라져야 했다.

---

## script type="module"

_브라우저에서 로드하는 script 파일도 독립적인 스코프를 가지는 하나의 모듈로써 동작하게 하자!_ 를 위한 첫 번째 방법은 script의 type을 **module** 로 설정하는 것이다.
**Node 에서는 하나의 파일을 하나의 모듈로 간주한다.** 고 했던 말의 의미는 하나의 파일이 독립적인 스코프를 가진다는 의미였다.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script src="./a.js" type="module"></script>
    <script src="./b.js" type="module"></script>
  </body>
</html>
```

```
// a.js

const name = "michelle";
```

```
// b.js

const name = "frank";
console.log(name);
```

![image](https://user-images.githubusercontent.com/18614517/71586687-68990380-2b5e-11ea-9c09-19fba7729e7c.png)

<center> 실행 결과 </center><br>

script의 type만 module로 적어주고, a.js 와 b.js 는 배경 지식에 사용한 코드를 그대로 사용했는데 이번엔 에러 메세지가 나오지 않는다. 이전에는 a.js 와 b.js 가 같은 공간을 공유했고 const는 재선언할 수 없는 식별자이기 때문에 에러가 발생했다. 하지만 지금은 두 번째로 불러온 b.js에 있는 name 값이 나오는 것을 볼 수 있다. 브라우저 입장에서 a.js 보다 b.js 가 나중에 로드 되었기 때문에 _console.log(name)를 찍으려고 할 때, 어떤 name 을 불러와야 하지?_ 라고 고민하게 되는데 **더 가까운 스코프**에 있는 b.js의 name 을 출력하게 된다.

다만, 이 방식까지만 사용했을 때 각 파일이 독립적인 스코프를 가지긴 하지만 앞서 불러온 a.js가 b.js의 코드를 사용할 수 없다는 단점이 있다.

---

## ES6 Modules

script type="module" 방법을 더 개선하여 자바스크립트 ES6에 Modules 가 등장했고 표준으로 자리 잡았다. 여러 개의 객체를 모듈로써 내보낼 때는 **export**, 하나의 객체를 내보낼 때는 **export default** / 불러올 때는 동일하게 **import** 를 사용한다.

### export를 통해 내보내고 import 를 통해 불러오기

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script src="./a.js" type="module"></script>
    <script src="./b.js" type="module"></script>
  </body>
</html>
```

```
// a.js

export const name = "michelle";
export const job = "programmer";
const age = 30; // age 는 내보내지 않는다!
export function greeting() {
console.log("hello!");
}
```

```
// b.js

import * as result from "./a.js";

console.log(result);
console.log(result.name);
```

![image](https://user-images.githubusercontent.com/18614517/72203276-bdb50d80-34ac-11ea-99df-4bc8b1286cb1.png)

<center> 실행 결과 </center><br>

- 내보낼 때 헷갈리는 문법: Node 에서는 export.name 처럼 export 키워드 다음에 _._ 을 사용했지만, ES Modules 에서는 export 키워드 다음에 _띄어쓰기_ 를 사용한다.

- 불러올 때 헷갈리는 문법: 대상 파일(a.js) 에서 내보낸 모든 것을 불러오고자 할 때, Node 에서는 `import 받을 변수이름 from '대상 파일'` 을 사용했지만 ES Modules 에서는 그렇게 사용하면 에러가 발생한다. (직접 실행해서 어떤 에러가 나는지 확인해보자.) ES Modules 에서는 b.js 처럼 모든 것을 불러온다는 의미인 _\*_, 불러온 모든 것을 어떤 변수에 담아 사용한다는 의미인 _as_ 를 사용한다.

```
// b.js

import { name, greeting } from "./a.js";
console.log(name);
console.log(greeting());
```

그래도 불러오고 싶은 것만 골라서 가져오는 **Object destructuring(객체 구조분해할당)** 은 사용할 수 있다. 정말 헷갈린다... 🤯

### export default를 통해 내보내고 import 를 통해 불러오기

이번 예시에서는 내보내는 코드를 b.js 에, 불러오는 코드를 a.js에 넣어보겠다.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <script src="./a.js" type="module"></script>
    <script src="./b.js" type="module"></script>
  </body>
</html>
```

```
// b.js

export default {
  name: "michelle",
  petName: "ruru"
};

```

```
// a.js

import result from "./b.js";

console.log(result);
```

![image](https://user-images.githubusercontent.com/18614517/72203624-62394e80-34b1-11ea-9299-b73ccde6b84a.png)

<center> 실행 결과 </center><br>

_export default_ 는 하나의 객체로만 내보낼 때 사용한다. 만약 여러개의 export default 를 사용했다면 아래와 같은 에러를 볼 수 있다.

```
// b.js

export default {
  name: "michelle",
  petName: "ruru"
};

export default function hello() {
  console.log('ruru like sweet potato');
}
```

![image](https://user-images.githubusercontent.com/18614517/72203657-cbb95d00-34b1-11ea-8e9b-4777d752333a.png)

<center> 실행 결과 </center><br>

- 불러올 때 헷갈리는 문법: ES6 Modules 에서 export 로 내보냈을 때는 `import 받을 변수이름 from '대상 파일'` 처럼 불러올 수 없었는데, export default 로 내보냈을 때는 위 문법처럼 불러오는게 가능하다. 아마 export 로 내보낼 걸 불러왔을 때는 타입이 Module 이였고, export default 로 내보내는 걸 불러왔을 때는 타입이 object 였는데 그 차이 때문이 아닐까 싶다..

추가로 export default 로 내보낼 때는 이름(변수명)을 붙이지 않고 내보내는게 일반적이며, 불러올 때 어떤 변수 이름으로든지 불러올 수 있다. export default 라는게 이 파일에서 하나의 객체만 내보낸다는 것을 명시하기 때문에 받는 쪽에서 마음대로 선언해서 사용할 수 있도록 하는 것이다.

---

## 마무리

지금까지 Javascript 언어가 Node(비브라우저) 환경 또는 브라우저 환경에서 사용될 때, 어떻게 서로 다른 파일을 불러오고 사용하는지에 관한 Module System을 알아보았다.
특히 브라우저 환경에서 ES Modules 이 어떤 배경으로 등장하게 되었는지 그 history 를 자세히 설명하려고 노력했다. 기술을 잘 배우고 활용할 수 있는 방법은 이 기술이 왜 등장했는지를 이해하는 것이라 생각했다.

아마 비슷하면서도 문법이 조금씩 달라서 익숙하지 않은 사람들은 굉장히 헷갈릴 거라고 생각한다. (아직 헷갈리는 1인 = me.) 잘못 사용할 때마다 다시 살펴보고 익숙해져도 되지만,이렇게 한 번 정리해놓으면 큰 도움이 될 것 같다!

<!-- 물론 브라우저에서 CommonJS를, 노드에서 ES modules 를 사용할 수도 있다. 요건 나중에.
참고: https://ui.toast.com/weekly-pick/ko_20190805/ -->
