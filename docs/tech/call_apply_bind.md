---
layout: default
title: this를 변경하는 call(), apply(), bind()
parent: Javascript
nav_order: 8
has_children: true
comments: true
---

참고: 개인적으로 공부하고 있는 내용을 정리한 글입니다. 오해의 소지가 있는 말이 있거나, 잘못된 내용이 있다면 댓글로 알려주세요. 감사합니다. :)

# 자바스크립트의 call, apply 메서드

this는 전역 스크립트가 실행되거나 함수가 호출될 때 JS 내부 규칙에 따라서 동적으로 결정됩니다.
하지만 프로그래밍을 하다보면 이 this를 변경해야 할 때가 있는데, 이러한 경우에 **_call, apply, bind_** 메서드를 사용합니다.

---

## [1] call

> 구문: func.call(thisArg[, arg1[, arg2[, ...]]])

- example1

```
let test = function(a, b, c) {
  console.dir(this); // Window
  return a+ b + c;
};

let result = test(1, 2, 3);
console.log(result); //6
```

example1에서 실행한 test()의 this는 **Window 객체**입니다. test()는 전역 컨텍스트에 호출한 함수이기때문에 this가 Window 객체에 바인딩 되는 것이죠. this가 가리키는 객체를 다른 객체로 바꿔볼까요?

- example2

```
let obj = {
    sum : 0
}

let test = function(a, b, c) {
  console.dir(this); // Object
  return a + b + c;
};

let result = test.call(obj, 1, 2, 3);
console.log(result); //6
```

맥락이 없는 코드이기는 하지만, 어쨌든 함수를 호출할 때 call()을 사용함으로써 test()의 this를 **Object(call의 첫 번째 인자로 전달한 객체)**로 변경한 것을 볼 수 있습니다. 조금 더 실용적인 예시를 들어보도록 하죠.

- example3

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

obj2는 speakMyname()가 없습니다. 하지만 obj1에 있는 speakMyname()을 호출할 때, call()을 용하여 첫 번재 매개변수로 obj2를 넘겨주면 함수가 정상적으로 실행됩니다. 이처럼 **_call()을 사용하면 다른 객체의 함수를 자신의 함수인 것처럼 사용할 수 있게 된다는 것을 기억하시면 됩니다._**

- example4

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
		this.name = name;
		this.price = price;
	}
}

class Toy {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

Util.call(Car.prototype)
Util.call(Toy.prototype)

const mycar = new Car('ford', 999)
const mytoy = new Toy('lego', 20)

mycar.getName(); // ford
mytoy.setName('RCcar')
mytoy.getName(); // RCcar
```

다른 객체의 함수를 자신의 것처럼 사용할 수 있다는 특징으로, **상속**과 비스무리하게 사용할 수도 있습니다.

- example5

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

[1]call()의 example5에서 실행한 코드를 apply() 버젼으로 변경하였습니다. 차이점을 확인해보세요.

---

## [3] bind

> 구문: func.bind(thisArg[, arg1[, arg2[, ...]]])

bind() 또한 call()과 apply()처럼 함수 내부에서 this가 참조하는 객체를 변경합니다. 하지만 call()과 apply()는 this가 참조하는 객체를 변경한 후 함수를 실행하는 반면에, bind()는 this가 참조하는 객체만 변경하고 함수를 실행하지 않습니다. 그 대신 변경된 새로운 함수를 반환합니다.

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

[1]call()의 example3에서 실행한 코드를 bind() 버젼으로 변경하였습니다. obj1.speakMyname.bind(obj2)로 호출 했을 때는 함수가 실행되지 않고, 반환되는 함수를 변수 안에 넣은 뒤에 호출해야 실행되는 것을 볼 수 있습니다.

---

## 마무리

this를 변경하는 다양한 방법을 알아봤습니다. 하지만 ES6에서 **화살표 함수(arrow function)**가 등장함으로써, **_함수 내부에서 this에 바인딩 되는 객체가 기존과 조금 달라졌습니다._** 예를 들어, 함수 표현식으로 선언한 함수의 내부 함수의 this는 Window 객체를 참조했습니다. 혼란을 주던 요인이였죠. 하지만 화살표 함수로 내부 함수를 선언하면 this는 상위 스코프를 참조합니다.

이처럼 함수를 어떻게 선언하느냐에 따라 this가 또 달라지기 때문에.. 자신 혹은 협업하고 있는 코드에서 함수의 선언 방식을 통일 시키는 것이 좋을 것 같습니다.
