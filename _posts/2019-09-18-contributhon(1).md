---
layout: default
title: 오픈소스 컨트리뷰터가 될 수 있을까? (feat. 2019 컨트리뷰톤)
parent: Opensource
grand_parent: Blog
nav_order: 1
has_children: true
comments: true
---

# 공개 SW 컨트리뷰톤에 참가하다! 게다가 Mocha 프로젝트라니

제목 그대로 [2019 공개 SW 컨트리뷰톤](https://www.oss.kr/notice/show/ee15de47-7adc-48a5-b4bc-039ba04192af)에 참가하게 되었다. 이 프로그램은 약 6주 동안 오픈 소스를 개발하고 기여하는 프로그램인데 20개의 프로젝트와 각 프로젝트의 멘토님이 정해져 있고, 신청자(멘티)가 원하는 프로젝트를 선택하여 지원서를 작성하면 선발되는 방식이다.

## 지원 동기와 곧바로 엄습한 위기 상황

일단 나는 보자마자 무조건 Mocha에 지원해야 겠다고 다짐했다. 몇 달 동안 자바스크립트와 리액트를 집중적으로 공부하면서 최근에는 **안정성 있는 코드를 만들고 싶다** 는 마음이 스물스물 올라오고 있었고, 자연스럽게 _'테스트 코드를 짜볼까? Mocha를 해볼까?'_ 라는 생각으로 가득차 있었기 때문이다. 그리고 매번 도움만 받는 오픈 소스에 기여 해보고 싶은 마음 한 스푼까지.

하지만 얼마 지나지 않아 `Mocha를 배우고 싶다! vs Mocha 오픈소스에 기여하겠다!` 는 완전히 다른 맥락인 것을 깨닫게 되었다. 난 전자 >> 후자였는데, 이 프로젝트는 당연히 전자 <<<< 후자에 초점이 맞춰진 것. (그나마 이 차이를 시작할 때 눈치채서 다행이다.)

## 오픈소스 기여의 의미를 이해하다

방향을 어떻게 잡을지 고민하던 또 어느 날. 아웃사이더님(멘토님)이 **"개발을 하면서 오픈소스 생태계를 어떻게 바라보고 기여해야 하는지"** 에 대해 이야기 해주신 [발표 영상](https://www.youtube.com/watch?v=uq0k3kUHcBs)을 보았는데 적지 않은 충격을 받았다. 개발자, 그들이 속한 IT 회사들은 오픈 소스에 의존하여 코딩하는데 오픈 소스 생태계가 이렇게 척박하다고? 프론트엔드 개발자라면 대부분 사용하는 webpack, babel, express가 이렇게 소수의 컨트리뷰터에 의존해서 만들고 있는지 처음 알았고 그들이 얼마나 큰 가치를 책임지며 살고 있으신지 상상도 하지 못할 정도였다.

> 다른 사람보다 조금 느리더라도 내가 이 프로젝트를 통해 얻어 갈 수 있는 것은 분명해졌다.

- **'얼마나 많은 기여를 하는지'에 대해서는 개의치 말기.**
- **오픈 소스가 어떻게 만들어지는지 배워서 이 프로젝트가 끝나더라도 다른 오픈 소스에 기여할 수 있는 씨앗 가지기.**
- **내가 할 수 있는 작은 이슈라도 찾아서 끝까지 해보기.**

그리고 내가 첫 주에 한 것은 딱 세가지였다.

1. 일단 Mocha로 테스트 코드를 짜보자.
2. Mocha에서 사용중인 도구에 익숙해지자.
3. Mocha 개발 환경에서 코드가 어떻게 실행되는지 슬쩍 봐보자.

---

## 1. 일단 Mocha로 테스트 코드를 짜보자.

지금까지 테스트 코드를 한 번도 안짜봤기 때문에 일단 어떻게 작성하는지에 대해 알아보는게 필요했다. 가장 이해하기 쉬웠던 벨로퍼트님의 [TDD의 소개](https://velog.io/@velopert/TDD%EC%9D%98-%EC%86%8C%EA%B0%9C)라는 포스트를 참고했다. 이 포스트에서는 _jest_ 로 **최댓값, 최솟값, 평균값, 중앙값, 최빈값을 구하는 테스트 케이스** 짜는 방법이 나와있어서 난 이걸 *Mocha*로 다시 따라해보았다. Assertion은 **Chai** 라이브러리의 _should_ 스타일을 선택했다.

- 테스트 코드의 assertion 부분에서 사용하는 함수

```
exports.max = arr => Math.max(...arr);

exports.min = arr => Math.min(...arr);

exports.average = arr => {
  const sum = arr.reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);
  return sum / arr.length;
};

exports.sort = arr => arr.sort();

exports.medium = arr => {
  const { length } = arr;
  const middle = Math.floor(length / 2);
  return length % 2 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
};

exports.mode = arr => {
  const counts = new Map();
  arr.forEach(n => {
    const count = counts.get(n) || 0;
    counts.set(n, count + 1);
  });
  const maxCount = Math.max(...counts.values());
  const modes = [...counts.keys()].filter(arr => counts.get(arr) === maxCount);

  if (modes.length === arr.length) return null;

  if (modes.length > 1) return modes;

  return modes[0];
};
```

- 테스트 코드 실행부

```
const should = require("chai").should();
const stats = require("./stats");

describe("Basic Mocha Array Test", function() {
  it("gets maximum value in array", function() {
    stats.max([1, 2, 3, 4]).should.equal(4);
  });

  it("gets minimum value in array", function() {
    stats.min([1, 2, 3, 4]).should.equal(1);
  });

  it("gets average value in array", function() {
    stats.average([1, 2, 3, 4, 5]).should.equal(3);
  });

  describe("gets medium value in array", function() {
    it("sorts the array", function() {
      stats.sort([5, 4, 3, 2, 1]).should.deep.equal([1, 2, 3, 4, 5]);
    });

    it("gets the median for odd length", function() {
      stats.medium([1, 2, 3, 4, 5]).should.equal(3);
    });

    it("gets the median for even length", function() {
      stats.medium([1, 2, 3, 4, 5, 6]).should.equal(3.5);
    });
  });

  describe("gets mode value in array", function() {
    it("has one mode", () => {
      stats.mode([1, 2, 2, 2, 3]).should.equal(2);
    });
    it("has no mode", () => {
      should.equal(stats.mode([1, 2, 3]), null);
    });
    it("has multiple mode", () => {
      stats.mode([1, 2, 2, 3, 3, 4]).should.deep.equal([2, 3]);
    });
  });
});
```

- 테스트 코드 실행 결과

<img width="838" alt="테스트 코드 실행 결과" src="https://user-images.githubusercontent.com/18614517/65153526-debca300-da64-11e9-839e-1ef348060e58.png">

벨로퍼트님의 도움을 많이 받았지만 그래도 내 생애 첫 테스트 코드다. 당연히 익숙하지 않았고, 실패 테스트를 먼저 만들고 이 케이스를 통과시키는 성공 케이스를 짜라는 말을 아직 이해하지 못하겠다. 그리고 지금은 계산이 간단한 함수여서 내가 답을 알고 있으니 _should.equal()_ 로 실행 결과가 정확한지 판단할 수 있는데.. 난 어떤 함수를 만들 때 input과 output을 정확히 생각하지 않고 짜면서(?) 리팩토링 하는 편이여서 예상한 결과가 나오도록 짜는 테스트 코드가 더 어색하게 느껴졌던 것 같다. input, output을 명확하게 정하고 코딩하는 연습을 의식적으로 해야겠다. **리팩토링 했을 때 여전히 잘 돌아가는지 수동으로 확인할 필요 없이 테스트 돌려서 확인하는 경험은 정말 좋았다.**

---

## 2. Mocha(넓게는 오픈 소스)에서 사용하는 도구와 용어에 익숙해지자.

- Mocha의 **CI** 도구: [Travis](https://travis-ci.org/mochajs/mocha)
  - CI란? Build , Test를 실시하는 프로세스를 말하며 이러한 통합 프로세스를 상시로 실시해 주는 것. (출처: [우아한 형제들 기술 블로그](http://woowabros.github.io/experience/2018/06/26/bros-cicd.html))
  - CI의 과정
    - 1.Smoke Test란? test 를 실시하기 전 test가 가능한지를 먼저 판단하는 검사
    - 2.Precache: 성능을 빠르게 하기 위한 작업
    - 3.Lint: 코드 스타일 검사
    - 4.Test

오픈 소스는 전세계에 있는 다양한 사람들이 같이 만드는 것이기 때문에 코드의 완결성(?)이 중요하다. 어떤 한 사람이 PR을 올리면 이 코드의 스타일이 통일성 있는지, 기존에 있던 테스트 코드는 잘 돌아가는지 등을 체크하는 작업이라고 생각하면 쉽다.

<img width="849" alt="before merge" src="https://user-images.githubusercontent.com/18614517/65156180-95228700-da69-11e9-8127-306dd206cd89.png">

이건 Mocha 프로젝트에서 캡쳐해 온 사진인데 PR이 **appveyor, travis-ci, coveralls, netlify..** 등 모든 체크항목에 대해 정상적으로 동작해야 merge 될 수 있다.

- Mocha

  - Mocha는 단지 **테스트 러너**이다. 내가 어떤 함수에 대해 테스트 코드를 짜면 assertion을 받아서 실행해주고 결과를 보여줄 뿐이다.

- 브라우저 테스팅

  - Mocha는 node와 브라우저에서의 테스트를 지원하기 때문에 브라우저 테스팅도 해줘야 한다. [karma](https://karma-runner.github.io/latest/index.html)와 [saucelabs](https://saucelabs.com/)은 둘 다 브라우저 테스팅 도구인데 karma는 로컬에서 saucelabs은 클라우드에서 테스팅을 돌린다.

---

## 3. Mocha 개발 환경에서 코드가 어떻게 실행되는지 슬쩍 봐보자.

- 테스트가 돌아가는 방식 이해하기

  ```
  "scripts": {
      "prepublishOnly": "nps test clean build",
      "start": "nps",
      "test": "nps test",
      "version": "nps version"
  },
  ```

package.json에 있는 script 명령이 뭘 의미하는지 보고싶을 때는 **package-script.js** 를 확인하면 된다. [nps](https://www.npmjs.com/package/nps)은 scripts 파일이 너무 길어지거나 복잡해질 때 script를 분리해서 관리할 수 있도록 도와주는 라이브러리라고 이해하고 있다. `npm test` 명령을 실행하면 package-script.js에 있는 `'nps lint test.node test.browser test.bundle',` 요런 명령이 순차적으로 실행된다.

npm test는 모든 test를 돌리는 것인데 `only` 같은 명령어를 붙여 일부 테스트만 돌릴 수 있다.

---

### 출처 및 도움을 받은 글

- https://velog.io/@velopert/TDD%EC%9D%98-%EC%86%8C%EA%B0%9C
- https://rinae.dev/posts/journey-to-contribute-to-visbug-1
- https://imasoftwareengineer.tistory.com/5
- http://woowabros.github.io/experience/2018/06/26/bros-cicd.html
