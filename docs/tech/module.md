---
layout: default
title: 나의 자바스크립트 모듈 체험기(feat. require와 import)
parent: Javascript
nav_order: 8
has_children: true
comments: true
---

# 나의 자바스크립트 모듈 체험기(feat. require와 import)

나는 **_노드 기반_** 에서 몇 가지 프로그램(todo, ArrayParser 등)을 만들거나 **_브라우저_** 에서 동작하는 UI(캐러셀, 검색 자동완성 등) 요소를 만들며 자바스크립트를 익혔다. 문법을 익히는 완전 초보 수준을 벗어나면서 스크립트 파일을 여러 개로 분리하기 시작했는데, 이것이 **모듈라 프로그래밍(Modular programming)**의 시작이었다.

## 1. 노드 기반에서의 모듈라 프로그래밍

- [todo 프로그램 깃헙 링크](https://github.com/code-squad/javascript-todo/tree/eugene94/oop)

<img width="1097" alt="todo 파일 구조" src="https://user-images.githubusercontent.com/18614517/62304801-b3342800-b4b9-11e9-904b-54cadcddf717.png">

생성자 함수(후에는 클래스로 변경)를 역할에 의해 분리하였고 엔트리 포인트인 `index.js` 에서 분리한 모듈들을 불러와서 사용하는 구조이다. `require`을 통해 사용할 모듈을 불러올 수 있는데, 어딘가에서 불려지는 '모듈'로서 동작하기 위해서는 `module.exports = 함수, 클래스, 변수 등` 형식으로 내보내주어야 한다. 이는 _NodeJS에서 표준적으로 사용하는 모듈 관리 방법으로 **CommandJS** 라고 한다._

```
const data = require('../data');
const ManagingTodo = require('./managingTodo');
const msgObj = require('./msg');`
const TodoError = require('./todoError');
const readline = require('readline');

const inputPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todoError = new TodoError();
const managingTodo = new ManagingTodo(data, inputPrompt, msgObj, todoError);
```

<center>필요한 모듈을 불러오는 코드 예시</center><br>

```
module.exports = ManagingTodo; // managingTodo.js
module.exports = Todo; // todo.js
```

<center>각 파일 내에서 모듈을 내보내는 코드 예시</center><br>

## 2. 브라우저 기반에서의 모듈라 프로그래밍

일반적인 웹사이트 개발할 때 당연히 여러 개의 자바스크립트 파일이 필요할 것이다. html의 body 태그 안에 `<script src=""></script>` 스크립트를 불러오는 코드를 많이 쓸 수 있기는 하지만 각 파일의 관계도 표현이 안되고, 로드 될 때의 속도가 느려지는 등 많은 단점이 있다. ES6 이전에 브라우저 환경에서 사용 가능한 모듈 관리 방법이 없었는데, ES6에서 **ES6 module system(ES Modules)**가 등장했다. ~~이거슨 혁명~~

- [캐러셀 UI 깃헙 링크](https://github.com/code-squad/javascript-amazon/tree/leehwarang/UI_component/carouselUI)
- [데모 링크](https://leehwarang.github.io//docs/tech/demo/step14/index.html)

<img width="1120" alt="캐러셀 파일 구조" src="https://user-images.githubusercontent.com/18614517/62306246-70c01a80-b4bc-11e9-8aea-b5b436536cbc.png">

캐러셀 UI 역시 클래스를 역할에 의해 분리하였고 엔트리 포인트인 `app.js` 에서 분리한 모듈들을 불러와서 사용한다. CommandJS와 다르게 모듈을 불러 올 때 `import moduleName from "filename.js";`, 모듈로서 내보내기 위해서는 `export default 함수, 클래스, 변수 등;`로 동작한다.

```
import Carousel from "./carousel.js";
import Pagination from "./pagination.js";
import Controller from "./controller.js";
```

<center>필요한 모듈을 불러오는 코드 예시</center><br>

```
export default Carousel; // carousel.js
export default Controller; // controller.js
export default Pagination; // pagination.js
```

<center>각 파일 내에서 모듈을 내보내는 코드 예시</center><br>

참고로 브라우저에서 모듈로된 스크립트 파일을 불러오기 위해서는 `<script src="" type="module"></script>`로 타입을 반드시 선언해줘야 한다.

## 3. 의문점

> 노드에서 동작하는 프로그램을 만들 때 import(ES Modules)를, 브라우저에서 동작하는 프로그램을 만들 때 require(CommandJS)를 사용할 수 없나요?

최신 노드에서는 ES6 문법을 사용할 수 있지만, 노드는 CommandJS 기반의 모듈 시스템을 사용하기 때문에 ES Modules을 지원하지 않는다. 다만 **바벨(Babel)** 을 통해 ES Modules를 CommandJS로 트랜스 파일링하여 사용할 수 있다.
마찬가지로 브라우저에서도 CommandJS를 기본적으로 지원하지는 않지만 바벨로 트랜스 파일링하여 사용할 수 있다.

## 4. 차이점

_**모듈을 불러올 때 CommandJS는 동기적으로 로드하는 반면, ES Modules는 비동기적으로 로드한다.**_ 따라서 CommandJS와 ES Modules을 같이 사용할 수는 있겠지만 원론적인 차이 때문에 같이 사용하면 제어하기 까다로운 상황을 대치할 수 있다.
