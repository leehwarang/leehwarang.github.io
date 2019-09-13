---
layout: default
title: CRA 없이 리액트 프로젝트 시작하기
parent: React
nav_order: 2
has_children: true
comments: true
date: 2019-08-20
---

# CRA 없이 리액트 프로젝트 시작하기

## 들어가기 전에

리액트 프로젝트를 가장 쉽게 시작할 수 있는 방법은 [Create React App](https://create-react-app.dev/docs/getting-started)을 이용하는 것 이다. 리액트에 필수적인 바벨(Babel)과 웹팩(Webpack)을 복잡한 환경 설정 없이 사용할 수 있으며 바로 build 하여 실행할 수 있기 때문에 편리하다.

하지만 작은 연습용 프로젝트를 여러 개를 만들어 보았을 때, CRA는 지금 나에게 불필요한 코드들이 많아 과하게 복잡하고 무겁게 느껴졌다. 또한 프로젝트를 만들어 가면서 환경 설정을 커스터마이징 해야 할 때, 대체 어떤 파일을 어떻게 건드려야 하는지 감이 오지 않았다. 따라서 CRA 없이도 리액트 프로젝트를 만드는 방법을 익히는 것이 좋다고 생각했다.

> 리액트에 바벨이 필요한 이유

- 리액트는 ES5/ES6 + jsx 로 작성한다. 다만 브러우저마다 호환성이 다르기 때문에 읽을 수 있는 코드로 변경해 주어야 하는데 **바벨이 ES6를 ES5로, jsx를 js로 트랜스 파일링** 해주는 역할을 한다.

> 리액트에 웹팩이 필요한 이유

- 리액트는 첫 로딩시, 최종으로 번들된 js 파일이 연결된 html 파일을 로드한다. 웹팩은 여러 개의 컴포넌트로 분리되어 있는 js 파일을 하나의 번들 파일로 만들어주는 역할을 한다.

---

## 실행 결과

- [레파지토리 링크](https://github.com/leehwarang/react-setting-practice)

- 화면
  - 아주 간단히 hello world 텍스트를 출력한다.

<img width="889" alt="리액트 설정 실행 결과" src="https://user-images.githubusercontent.com/18614517/63333159-e6106400-c373-11e9-907e-589d853b0abc.png">

---

## 필수적인 환경 설정을 따라해보자

1. 새로운 디렉토리를 만들고, 생성한 디렉토리(루트 디렉토리)에서 `npm init` 명령을 실행한다.

- `npm init` : 현재 디렉토리를 Node.js 프로젝트로 초기화하는 명령어로 _package.json_ 파일을 생성한다. package.json 파일은 현재 Node 프로젝트에 대한 정보를 담고 있는 파일이다.

2. `npm install react react-dom` 명령을 실행하여 리액트를 사용하기 위한 모듈을 설치한다.

- package.json 파일의 dependencies에 설치한 node 모듈이 추가 되어 있는지 확인한다. (루트 디렉토리에 node_modules 디렉토리도 생겼을 것!)

3. 루트 디렉토리에 public 디렉토리를 만들고 _index.html_ 파일을 작성한다.

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
    <div id="root"></div>
  </body>
</html>
```

4. 루트 디렉토리에 src 디렉토리를 만들고, src 디렉토리 내에서 components 디렉토리를 만든다. components 디렉토리에서 _App.jsx_ 파일을 작성한다.

```
import React from "react";

const App = () => {
  return <div>hello world!</div>;
};

export default App;
```

5. src 디렉토리 내에서 _index.jsx_ 파일을 작성한다.

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.querySelector("#root"));
```

6. `npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader` 명령을 실행하여 바벨에 필요한 모듈을 설치한다.

- `@babel/core` : 바벨을 사용하기 위한 필수 모듈
- `@babel/preset-env` : 바벨에서 스크립트 코드를 트랜스 파일링 하기 위한 플러그인들을 모아둔 모듈
- `@babel/preset-react` : 바벨에서 리액트 코드를 트랜스 파일링 하기 위한 플러그인들을 모아둔 모듈
- `babel-loader` : 웹팩을 돌릴 시에 바벨을 적용하기 위한 모듈

7. 바벨 설정 파일인 _babel.config.js_ 을 작성한다.

```
module.exports = function(api) {
  api.cache(true);

  const presets = ["@babel/preset-env", "@babel/preset-react"];

  const plugins = [];

  return {
    presets,
    plugins
  };
};
```

8. `npm i -D webpack webpack-cli html-webpack-plugin` 명령을 실행하여 웹팩에 필요한 모듈을 설치한다.

- `webpack` : 웹팩 모듈
- `webpack-cli` : 웹팩 명령어를 커맨드 라인에서 실행할 때 필요한 모듈
- `html-webpack-plugin` : 웹팩 실행이 완료된 번들 파일을 붙인 html 파일을 만들어 주는 모듈

9. 웹팩 설정 파일인 _webpack.config.js_ 을 작성한다.

```
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index",

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, dist에 새로운 html 파일 생성
      template: `./public/index.html`
    })
  ]
};
```

10. _package.json_ 파일의 "script"에 아래와 같이 설정을 추가한다.

```
 "scripts": {
    "start": "webpack"
  },
```

- 웹팩을 실행하기 위해 `npx webpack` 명령을 해야 하지만 위 설정으로 인해 `npm start`로 웹팩을 실행할 수 있다.

11. `npm start` 명령을 실행하여 dist 디렉토리에 생성된 _bundle.js_ 파일과 _index.html_ 파일을 확인한다. index.html 파일을 열어 결과를 확인한다.

---

## 선택이지만 어쩌면 필수(?)인 추가 모듈

프로젝트를 개발할 때, 코드를 수정하고 변경된 실행 결과를 확인하는 것을 계속 반복해야 한다. 하지만 위에서 설명한 필수적인 환경 설정만 따라했다면 코드를 수정한 다음 계속해서 `npm start` 명령을 실행하여 번들을 다시 해주고 확인 해야하기 때문에 여간 불편한게 아니다.. 변경 사항이 있을 때 마다 자동으로 다시 webpack을 실행해주고 결과 화면을 업데이트를 해주는 **webpack-dev-server** 를 이용하면 삶의 질이 200정도 올라가는 것이 학계의 정설.

1. `npm i -D webpack-dev-server` 명령을 실행하여 모듈 설치한다.

2. _package.json_ 파일의 "script"를 아래와 같이 수정한다.

```
  "scripts": {
    "start": "webpack-dev-server --open"
  },
```

3. _webpack.config.js_ 파일에 아래에 "devServer" 설정을 추가한다.

```
devServer: {
    contentBase: path.join(__dirname, "dist"), // 이 경로에 있는 파일이 변경될 때 번들을 다시 컴파일
    compress: true,
    port: 각자의 portNumber 작성
  },
```

4. `npm start` 하면 브라우저가 열리고, _App.jsx_ 에 있는 hello world 텍스트를 변경하였을 때 실시간으로 변경이 반영 되는 것을 확인한다.

<img width="785" alt="라이브 서버 설정 후" src="https://user-images.githubusercontent.com/18614517/63334697-e52d0180-c376-11e9-9261-c504fe735779.png">

---

## 참조

- https://velog.io/@yesdoing/%EB%82%B4%EB%A7%98%EB%8C%80%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-A-to-Z-1-9pjwz1o6ai
