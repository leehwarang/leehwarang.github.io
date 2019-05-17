---
layout: default
title: this를 변경하는 call(), apply(), bind()
parent: Javascript
nav_order: 8
has_children: true
comments: true
---

참고: 개인적으로 공부하고 있는 내용을 정리한 글입니다. 오해의 소지가 있는 말이 있거나, 잘못된 내용이 있다면 댓글로 알려주세요. 감사합니다. :)

### 이 글을 읽기 전 알고 있어야 하는 개념

- 정적 스코프(Lexical Scope)와 동적 스코프(Dynamic Scope)
- this

# JS - this를 변경하는 call(), apply(), bind()

자바스크립트는 기본적으로 변수나 함수가 선언되었을 때 스코프가 결정되는 정적 스코프 방식을 따릅니다. 하지만 **_this는 전역 스크립트가 실행되거나 함수가 호출될 때 JS 내부 규칙에 따라서 동적으로 결정되기 때문에_** 헷갈리게 되는 것이죠.

자바 스크립트에서는 다양한 종류의 함수(기본 함수, 객체의 메서드, 콜백 함수 등)가 있는데 각 함수의 호출 패턴에 따라 this가 어떻게 달라지는지에 대해서는 아래의 글을 참고하시면 좋습니다.

- [함수 호출 패턴에 따라 달라지는 this](https://leehwarang.github.io//docs/tech/func_this.html)

~~근데 이 this놈은 내가 원하는 것과 다른 객체에 바인딩 되어 있는 경우가 많습니다.~~ this가 바인딩 되는 객체를 변경하고 싶을 때 **_call(), apply(), bind()_** 를 사용합니다.

_참고 :_ 오늘 공부할 세가지 함수는 모두 함수의 프로토타입이 가지고 있는 함수들 입니다. **Function.prototype.call**, **Function.prototype.apply**, **Function.prototype.bind** 에요. 말 그대로 자바 스크립트의 함수라면 모두 이 함수를 사용할 수 있다는 것이죠! Array.prototype.slice 함수와 비슷한 것인데, 처음에 저도 함수가 함수를 호출한다는 개념이 조금 어색했어요.

---

## [1] call

> 구문: func.call(thisArg[, arg1[, arg2[, ...]]])

- example1 : 다른 객체의 메서드를 나의 메서드인 것 처럼 사용하기

```
let obj1 = {
    name : 'michelle',
    speakMyname() {
        console.log(`My name is ${this.name}!`);
    }
}

let obj2 = {
    name : 'frank'
}

obj1.speakMyname(); // My name is michelle!
obj2.speakMyname(); // obj2.speakMyname is not a function
obj1.speakMyname.call(obj2); // My name is frank!
```

obj2는 speakMyname()가 없습니다. 하지만 obj1에 있는 speakMyname()을 호출할 때, call()을 용하여 첫 번재 매개변수로 obj2를 넘겨주면 함수가 정상적으로 실행됩니다. 이처럼 **_call()을 사용하면 다른 객체의 메서드를 자신의 메서드인 것처럼 사용할 수 있게 된다는 것을 기억하시면 됩니다._**

- example2 : 생성자 내부에서 사용하여, 다른 생성자 함수의 멤버를 가져오기

```
const Util = function() {
	this.getName = function() {
		return this.name;
	}

	this.setName = function(name) {
		this.name = name;
	}
}

class Car {
	constructor(name, price) {
        Util.call(this);
        this.name = name;
        this.price = price;
	}
}

const mycar = new Car('ford', 999)

mycar.getName(); // ford
mycar.setName('BMW');
mycar.getName(); // BMW
```

Car 클래스의 생성자 함수를 살펴보세요. 생성자 내부에서 `Util.call(this)`로 전달했을 때, 이 this는 Car 클래스로 만들어진 인스턴스 입니다. 이렇게 **this로 전달된 인스턴스는 Util 생성자 함수가 가지고 있는 멤버(변수와 함수)를 자신의 멤버로 가져올 수 있습니다.**

- example3 : 내부함수의 this가 상위 스코프를 가리키도록 변경하기

```
class Flower{
	constructor(varieties){
		this.varieties = varieties;
		this.height = 0;
	}

	water (ml) {

		function grow(){
			this.height += ml;
			console.log(`꽃에 ${ml}만큼 물을 주어, 꽃의 높이가 ${this.height} 되었습니다.`)
		}

        //grow(); -> Cannot read property 'height' of undefined
		grow.call(this);
	}
}

const rose = new Flower('ROSE');
rose.water(100);
```

water()는 rose 인스턴스에서 호출한 메서드이기 때문에 this는 rose에 바인딩 됩니다. 하지만 rose.water() 함수에서 선언된 grow()는 내부 함수이기 때문에 this는 **Window 객체**에 바인딩 되어, rose 인스턴스의 height에 접근할 수 없게 되는 것이죠. `grow.call(this)`을 이용하여 this에 바인딩 되는 객체를 rose 인스턴스로 변경해 주어야 합니다.

_지금은 내부 함수를 예로 들었지만, 콜백 함수로 넘겨진 함수의 this도 Window 객체에 바인딩 되는 대표적인 예시입니다._ 추가적인 활용법을 꼭 살펴보세요!

- example4 : this와 함께 매개변수 넘겨주기

```
const public = {
    getIdentificationNumber(birthYear, birthMonthandDay){
        birthYear = birthYear.slice(2, birthYear.length)
        return birthYear.concat(birthMonthandDay)
    }
}

const person = {
    name : 'michelle'
}

public.getIdentificationNumber.call(person, '1990', '1225'); // '901225'
```

**call을 사용하여 호출할 함수가 매개 변수를 받는다면, this를 변경할 객체와 함께 필요한 매개변수를 넘겨줘야 합니다.** getIdentificationNumber()는 태어난 년도와 태어난 날짜가 필요한 함수이기 때문에 두 개의 인자를 넘겨주었습니다.

---

## [2] apply

> 구문: func.apply(thisArg, [argsArray])

apply()는 앞서 살펴본 call()과 기능이 동일합니다. 하나의 차이점은 **인자를 전달하는 방식** 입니다. call()은 인자를 하나씩(?) 전달하는 반면, apply()는 각 인자들을 배열로 만들어서 전달합니다.

- example1

```
const public = {
    getIdentificationNumber(inputData){
        const birthYear = inputData[0].slice(2, inputData[0].length);
		const birthMonthandDay = inputData[1];
        return birthYear.concat(birthMonthandDay)

    }
}

const person = {
    name : 'michelle'
}

public.getIdentificationNumber.call(person, ['1990', '1225']);
```

[1]call()의 example4에서 실행한 코드를 apply() 버젼으로 변경하였습니다. 차이점을 확인해보세요.

---

## [3] bind

> 구문: func.bind(thisArg[, arg1[, arg2[, ...]]])

bind() 또한 call()과 apply()처럼 함수 내부에서 this가 바인딩 되는 객체를 변경합니다. 하지만 call()과 apply()는 this가 바인딩 되는 객체를 변경한 후 함수를 실행하는 반면에, **_bind()는 this가 바인딩 되는 객체만 변경하고 함수를 실행하지 않습니다. 그 대신 변경된 새로운 함수를 반환합니다._**

- example1

```
let obj1 = {
    name : 'michelle',
    speakMyname() {
        console.log(`My name is ${this.name}!`);
    }
}

let obj2 = {
    name : 'frank'
}

obj1.speakMyname(); // My name is michelle!
obj1.speakMyname.call(obj2); // My name is frank!

obj1.speakMyname.bind(obj2)
let obj2Func = obj1.speakMyname.bind(obj2)
obj2Func(); // My name is frank! My name is frank!
```

[1]call()의 example4에서 실행한 코드를 bind() 버젼으로 변경하였습니다. obj1.speakMyname.bind(obj2)로 호출 했을 때는 함수가 실행되지 않고, 반환되는 함수를 변수 안에 넣은 뒤에 호출해야 실행되는 것을 볼 수 있습니다.

---

## 마무리

저는 지금까지 call(), apply(), bind() 함수를 내부 함수나 콜백 함수에서의 this를 변경할 때만 사용했습니다. 하지만 ES6에서 등장한 **화살표 함수(arrow function)**를 사용하면 내부, 콜백 함수에서 this에 바인딩 되는 객체가 call, apply, bind를 사용했을 때와 동일해졌지요. ~~그래서 이 어려운 함수들을 대체 왜 써야 하나?~~ 라고 생각했는데.. 알아볼수록 그 활용 방법이 무궁 무진하다는 것을 알게 되었습니다.

아마 다음 글은 call(), apply(), bind() 함수의 심화를 다룰 것 같아요.

- new 와 생성자 함수를 이용해 인스턴스를 생성할 때와 Object 인스턴스, call/apply를 이용해 인스턴스 멤버를 만들었을 때의 어떤 차이가 발생하는지

- bind()에서 두 번째 파라미터를 이용하여 curring(커링)과 비슷한 동작을 구현하는 방법

등이 더 궁금합니다. 더 공부해서 다음 글로 정리해볼게요!

---

## reference

- http://blog.weirdx.io/post/3214
- https://webclub.tistory.com/394
