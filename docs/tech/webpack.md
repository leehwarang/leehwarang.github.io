---
layout: default
title: 바벨과 웹팩
parent: Javascript
nav_order: 10
has_children: true
comments: true
---

## 1. 브라우저 호환성 문제와 해결 전략

우리가 만든 웹 애플리케이션은 브라우저에서 실행된다. 그렇다면 내가 작성한 코드는 모든 브라우저에서 정상적으로 동작할까? 아니다. 브라우저의 종류에 따라 css, js 코드를 읽을 때 발생하는 차이 때문에 **브라우저 호환성** 문제가 생긴다. [CanIuse](https://caniuse.com/#) 또는 [kangax](https://kangax.github.io/compat-table/es6/) 사이트에서 내가 작성한 코드가 어떤 브라우저에서 지원 되는지 확인할 수 있다.

~~브라우저마다 동작하는 코드를 다시 짤 수도 없으니..~~ **트랜스 파일링(Transpiling)과 폴리필(Polyfill)** 작업으로 호환성 문제를 해결할 수 있고,
이를 **_바벨(Babel)_**이 도와준다.

## 2. 바벨(Babel)

자바스크립트 컴파일러

### 2-1. 트랜스 파일링(Transpiling)

**문법을 바꿔준다.** 자바 스크립트의 ES6 코드를 ES5 코드로 (() => {…} -> function(){...}), 리액트의 jsx를 자바스크립트 코드로 바꾸어 주어 하위 브라우저에서도 동작하게 한다. 변환할 수 있는 하나의 문법을 **_플러그인(Plugin)_**이라고 한다.

수많은 플러그인들을 하나씩 추가하기 번거로우니, 주로 사용되는 플러그인들을 모아둔 **preset-env**모듈을 필수로 설치하는 것이 좋고, 추가로 필요한 플러그인은 찾아서 추가한다.

```
npm install @babel/core @babel/cli @babel/preset-env --save-dev
```

- preset-env에 들어있는 플러그인 종류

  - @babel/plugin-proposal-dynamic-import
  - @babel/plugin-syntax-dynamic-import
  - @babel/plugin-transform-classes
  - 등등 ...

npm으로 다운로드 받은 후 `babel.config.js`에 업데이트 하면 트랜스 파일링 과정에 적용 된다.
내가 트랜스 파일링으로 호환하고 싶은 브라우저는 `babel.config.js` 내부의 **targets**에 추가한다.

ex)

```
module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
      }
    ]
  ];

  return {
    presets
  };
};

```

설정이 끝나면 `npx babel directoryName/fileName.js` 로 바벨 작업을 수행한다.

### 2-2. 폴리필(Polyfill)

위에서 설명했듯이, 트랜스 파일링은 어떤 문법을 하위의 브라우저에서도 동작하도록 변환해준다. 반면에 **폴리필(Polyfill)**은 _하위 브라우저에서 아예 지원하지 않는 native API(ex: Array.flat)를 프로토타입의 메서드에 동적으로 추가해준다._

> 지금까지 간단히 바벨(Babel)에 대해 살펴 보았다. 물론 바벨을 단독적으로 사용할 수 있지만, 규모가 어느 정도 있을 때에는 바벨과 웹팩을 사용하는 것이 일반적이다.

---

## 3. 웹팩(Webpack)

**자바스크립트 어플리케이션을 위한 모듈 번들러이다.** 여기서 말하는 모듈은 어플리케이션에서 사용하는 모든 자원(html, css, js, jsx, css, sass, image...)을 말하며, **번들링**은 _여러 개의 파일에서 의존되는 모듈들을 하나로 묶어서 브라우저에서 실행될 수 있는 상태로 만들어준다._

웹팩은 크게 모듈 로더(module loader)와 플러그인(plugin)으로 구성되어 있다.

## 3-1. 모듈 로더(module loader)

지금까지 브라우저는 js와 json 파일만 '모듈'로 인식해서 불러올 수 있었다. 바벨이 가지고 있는 여러 가지 모듈 로더를 사용함으로써, 그 이외 형식의 파일도 모듈로 사용할 수 있게 한다.

- 모듈 로더의 종류

  - css-loader : css도 번들링
  - babel-loader : es6 문법의 js를 es5로 변환해서 번들링
  - ts-loader : typescript를 js로 변환해서 번들링
  - 등등 ...

ex)

```
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
```

entry point에서 시작하여 `use`에 정의된 로더를 사용하여 트랜스 파일링하고 웹팩 컴파일러에게 알려준다. 트랜스 파일링 완료된 파일은 `output`에 있는 경로에 저장된다.

## 3-2. 플러그인(plugin)

주로 번들된 결과에 대한 후속 처리를 담당한다. 예를 드르어, html에 트랜스 파일링 및 번들링이 완료된 파일(bundle.js)을 자동으로 업데이트 및 추가해주거나 난독화 작업을 할 수 있다.
