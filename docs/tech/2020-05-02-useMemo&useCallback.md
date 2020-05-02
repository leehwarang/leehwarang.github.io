---
layout: default
title: 이제는 사용해보자 useMemo & useCallback
parent: React
nav_order: 4
has_children: true
comments: true
date: 2020-05-02
---


# 이제는 사용해보자 useMemo & useCallback

이제 useState와 useEffect에 완전히 익숙해졌다고 느꼈는데, 컴포넌트 내에서 저 두 개의 hook 만으로도 props나 state를 다루는 로직에 관련된 기본적인 기능을 모두 구현할 수 있기 때문에 굳이 useMemo나 useCallback 을 사용할 필요를 느끼지 못했다. 물론 useMemo와 useCallback 은 리액트의 렌더링 성능 최적화를 위한 hook 이기 때문에 필수적으로 사용할 필요는 없다. 그럼에도 불구하고 사용해 볼 필요를 못 느낀다는 것이 그 기술의 장단점을 파악해서 결정한 것이 아니라 _"단지 익숙하지 않은 기술을 배우지 않으려고 하는 나의 좁은 마음 때문"_ 이라는 생각이 스쳐지나갔다.

공식 문서를 읽어보고 다른 분들이 블로그에 작성한 예제를 따라도 해보고, 나도 직접 example code를 만들어 보며 useMemo와 useCallback를 이해할 수 있었다.


## 이 글을 읽으면 도움이 되시는 분들
- 리액트 hooks 를 배우고 있는 사람
- useState와 useEffect는 사용해봤지만 useMemo, useCallback 은 잘 모르겠는 사람

---


# useMemo와 useCallback을 배우기 전에 알아야 하는 것

1. 함수형 컴포넌트는 그냥 함수다. **다시 한 번 강조하자면 함수형 컴포넌트는 단지 jsx를 반환하는 함수이다.**

2. 컴포넌트가 렌더링 된다는 것은 누군가가 그 함수(컴포넌트)를 호출하여서 실행되는 것을 말한다. **함수가 실행될 때마다 내부에 선언되어 있던 표현식(변수, 또다른 함수 등)도 매번 다시 선언되어 사용된다.**

3. 컴포넌트는 기본적으로 **자신의 state가 변경되거나, 부모에게서 받는 props가 변경되었을 때마다** 리렌더링 된다.


---


# useMemo

<img width="946" alt="useMemo_docs" src="https://user-images.githubusercontent.com/18614517/80810941-d8e48e00-8bff-11ea-8593-c5f8bbc7f970.png">
<center>useMemo 정의 (출처: 리액트 공식 문서)</center><br>

**메모리제이션된 값을 반환한다라는 문장이 핵심이다.** 다음과 같은 상황을 상상해보자. 하위 컴포넌는 상위 컴포넌트로부터 a와 b라는 두 개의 props를 전달 받는다. 하위 컴포넌트에서는 a와 b를 전달 받으면 서로 다른 함수로 각각의 값을 가공한 새로운 값을 보여주는 역할을 한다. 하위 컴포넌트는 props로 넘겨 받는 인자가 하나라도 변경될 때마다 렌더링되는데, props.a 만 변경 되었을 때 이전과 같은 값인 props.b도 다시 함수를 호출해서 계산해야 할까? 그냥 이전에 계산된 값을 쓰면 되는데!

useMemo 를 설명할 수 있는 [간단한 예제](https://codesandbox.io/s/upbeat-margulis-v8k51?file=/src/Info.js)를 만들어 보았다. App 컴포넌트는 Info 컴포넌트에게 사용자로부터 입력 받은 color와 movie값을 props로 넘겨주고, Info 컴포넌트는 전달 받은 color와 movie를 적절한 한글로 바꾸어서 문장으로 보여준다.

```
// App.js

import Info from "./Info";

const App = () => {
  const [color, setColor] = useState("");
  const [movie, setMovie] = useState("");

  const onChangeHandler = e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <label>
          What is your favorite color of rainbow ?
          <input id="color" value={color} onChange={onChangeHandler} />
        </label>
      </div>
      <div>
        What is your favorite movie among these ?
        <label>
          <input
            type="radio"
            name="movie"
            value="Marriage Story"
            onChange={onChangeHandler}
          />
          Marriage Story
        </label>
        <label>
          <input
            type="radio"
            name="movie"
            value="The Fast And The Furious"
            onChange={onChangeHandler}
          />
          The Fast And The Furious
        </label>
        <label>
          <input
            type="radio"
            name="movie"
            value="Avengers"
            onChange={onChangeHandler}
          />
          Avengers
        </label>
      </div>
      <Info color={color} movie={movie} />
    </div>
  );
};

export default App;
```

```
// Info.js

const getColorKor = color => {
    console.log("getColorKor");
    switch (color) {
      case "red":
        return "빨강";
      case "orange":
        return "주황";
      case "yellow":
        return "노랑";
      case "green":
        return "초록";
      case "blue":
        return "파랑";
      case "navy":
        return "남";
      case "purple":
        return "보라";
      default:
        return "레인보우";
    }
  };

  const getMovieGenreKor = movie => {
    console.log("getMovieGenreKor");
    switch (movie) {
      case "Marriage Story":
        return "드라마";
      case "The Fast And The Furious":
        return "액션";
      case "Avengers":
        return "슈퍼히어로";
      default:
        return "아직 잘 모름";
    }
  };


const Info = ({ color, movie }) => {
  const colorKor = getColorKor(color);
  const movieGenreKor = getMovieGenreKor(movie);

  return (
    <div className="info-wrapper">
      제가 가장 좋아하는 색은 {colorKor} 이고, <br />
      즐겨보는 영화 장르는 {movieGenreKor} 입니다.
    </div>
  );
};

export default Info;
```

![image](https://user-images.githubusercontent.com/18614517/80869400-2bdf4380-8cdb-11ea-8cad-373429ca8962.png)
<center>예제의 실행 화면</center><br>

App 컴포넌트의 입력창에서 color값만 바꾸어도 getColorKor, getMovieGenreKor 두 함수가 모두 실행되고 movie 값만 바꾸어도 마찬가지로 두 함수가 모두 실행된다. **useMemo**를 import 해서 Info 컴포넌트의 코드에서 colorKor과 movieGenroKor을 계산하는 부분을 아래와 같이 바꿔보자. 

```
import React, { useMemo } from "react";

const colorKor = useMemo(() => getColorKor(color), [color]);
const movieGenreKor = useMemo(() => getMovieGenreKor(movie), [movie]);
```

useMemo를 사용하면 의존성 배열에 넘겨준 값이 변경되었을 때만 메모리제이션된 값을 다시 계산한다. 예제 코드를 직접 변경하여 color값이 바뀔 때는 getColorKor함수만, movie값이 바뀔 때는 getMovieGenreKor함수만 호출되는 것을 확인할 수 있다. **지금 처럼 재계산하는 함수가 아주 간단하다면 성능상의 차이는 아주 미미하겠지만 만약 재계산하는 로직이 복잡하다면 불필요하게 비싼 계산을 하는 것을 막을 수 있다.** (공식 문서에서도 useMemo에 넘겨주는 콜백 함수의 이름이 computeExpensiveValue() 라고 되어 있다는 것을 주목하자)

지금 나는 부모 컴포넌트에게 props를 전달 받는 상황으로 설명했지만, 하나의 컴포넌트에서 두 개 이상의 state가 있을 때도 활용할 수 있다. 

---

# useCallback

<img width="932" alt="useCallback_docs" src="https://user-images.githubusercontent.com/18614517/80856972-7041f380-8c89-11ea-9be7-d910826bcdbc.png">
<center>useCallback 정의 (출처: 리액트 공식 문서)</center><br>

**메모리제이션된 함수를 반환한다라는 문장이 핵심이다.** 서론에서 useMemo와 useCallback을 배우기 전에 알아야 하는 것들 중 두 번째로 _컴포넌트가 렌더링 될 때마다 내부에 선언되어 있던 표현식(변수, 또다른 함수 등)도 매번 다시 선언되어 사용된다._ 라고 이야기했다. useMemo를 설명하고 있는 같은 예제에서 App.js의 onChangeHandler 함수는 내부의 color, movie 상태값이 변경될 때마다 재선언된다는 것을 의미한다. 하지만 onChangeHandler 함수는 파라미터로 전달받은 이벤트 객체(e)의 target.id 값에 따라 setState를 실행해주기만 하면 되기 때문에, 첫 마운트 될 때 한 번만 선언하고 재사용하면 되지 않을까? 

```
// App.js

import React, { useState, useCallback } from "react";

const onChangeHandler = useCallback(e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);
```

App.js에서 useCallback을 import 하고 onChangeHandler함수의 선언부를 위와 같이 바꿔보자. 첫 마운트 될 때만 메모리에 할당되었는지 아닌지 확인하기는 어렵겠지만 위와 같이 사용한다. 현업에서는 예시와 같은 이벤트 핸들러 함수나 api를 요청하는 함수를 주로 useCallback 으로 선언하는 코드를 꽤 많이 보았다. 

하지만, 비싼 계산이 아니라면 useMemo사용을 권장하지 않는 것처럼 이정도 수준의 함수 재선언을 막기 위해 useCallback을 사용하는 것도 크게 의미있어 보이지는 않는다. 다시 공식 문서를 꼼꼼히 읽어보면... 

> This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

와 같은 말이 나온다. 만약 하위 컴포넌트가 **React.memo()** 같은 것으로 최적화 되어 있고 그 하위 컴포넌트에게 callback 함수를 props로 넘길 때, 상위 컴포넌트에서 해당 함수를 useCallback 으로 선언하는 것이 유용하다라는 말로 이해했다. 함수가 매번 재선언되면 하위 컴포넌트는 넘겨 받은 함수가 달라졌다고 인식하기 때문인 것 같다. 

---

# 글을 마치며

머지 않아 React.memo와 useCallback 을 함께 사용해서 실질적인 렌더링 최적화를 해보기, 컴포넌트가 렌더링 되는지 console.log()로 찍어 보는 것이 아니라 react devtool의 Profiler로 어떻게 확인해보는지에 대한 내용으로 다음 이야기를 채워가고자 한다. 또한 글에서 조금씩 언급했던 굳이 성능 최적화를 해야하나? 에 대한 논의를 스스로 조금 더 고민해보고 녹여 낼 수 있기를!  