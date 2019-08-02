---
layout: default
title: 자바스크립트 데이터 타입과 연산자
parent: Javascript
nav_order: 1
has_children: true
comments: true
---

# 자바스크립트 데이터 타입과 연산자

---

## [1] 데이터 타입과 함수 호출 방식

자바스크립트에서 데이터 타입은 크게 2가지로 나뉜다.

1. **기본 타입:** 숫자(Number), 문자열(String), 불린(Boolean), undefined, null
2. **참조 타입:** 객체(Object), 배열(Array), 함수(Function), 정규 표현식

말 그대로 기본 타입의 데이터는 실제값을 가지지만 참조 타입의 데이터는 참조값을 가진다. 이로 인해 **함수의 호출 방식**에서 차이가 나타나는데 기본 타입 데이터는 _call by value_ 를 따르고, 참조 타입의 데이터는 _call by reference_ 를 따르게 된다.

```
//call by value와 call by reference의 차이

var a = 100;
var objA = {
    'value' : 100
};

function change(num, obj){
    num = 200;
    obj.value = 200;

    console.log(num); //200
    console.log(obj.value); 200
};

change(a, objA);

console.log(a); //100
console.log(obj.value) //200
```

기본형 데이터 타입인 **a** 는 change 함수 호출 전과 후에 같은 값을 가지는 반면에 참조형 데이터 타입인 **objA** 는 함수 호출 후, 전과 다른 값을 가지는 걸 볼 수 있다.

---

## [2] 배열과 객체

참조형 데이터 타입의 배열은 _자바스크립트 객체의 특별한 형태_ 로, 일반 객체와는 차이점을 가진다.

```
//fruitArray 생성
var fruitArray = ['apple', 'banana', 'orange'];

//fruitObj 생성
var fruitObj = {
    0 : 'apple',
    1 : 'banana',
    2 : 'orange'
};

console.log(fruitArray.length); //3
console.log(fruitObj.length); // undefined

console.log(typeof fruitArray); // object (not Array)
console.log(typeof fruitObj); // object
```

fruitArray의 부모 객체의 타입은 **Array.prototype 객체**이고, fruitObj의 부모 객체의 타입은 **Object.prototype** 이다. 따라서 fruitObj는 표준 배열 메서드를 사용할 수 없으므로 fruitObj.length를 실행했을 때 undefined를 출력한다. 하지만, 왜 `typeof fruitArray`는 object를 출력할까?

> 자바스크립트에서는 배열도 객체라고 생각하기 때문이다. 배열의 **ㅡprotoㅡ** 는 Array.prototype이며, Array_prototype의 **ㅡprotoㅡ** 는 Object.prototype 이여서 결국 Object로 수렴하는 것이다.

---

## [3] 유사 배열 객체

배열 객체는 **length 프로퍼티** 를 가지는데, 이는 배열의 동작과 관련되어 중요한 의미를 가진다. 일반 객체는 기본적으로 length 프로퍼티를 가지고 있지는 않지만 추가할 수 있으며 length 프로퍼티를 가진 객체를 **_유사 배열 객체_** 라고 한다.

```
var similarArray = {
    name : 'michelle',
    length : 1
};
```

유사 배열 객체도 배열이 아니기 때문에 당연히 push()와 같은 표준 배열 메서드를 사용할 수 없다. 하지만 **apply()** 를 사용하면 표준 배열 메서드를 활용할 수 있다. 이 내용은 추후에 더 자세히 학습하기로 한다.

---

## [4] typeof 연산자

```
console.log(typeof 3) //number
console.log(typeof "3") //string
console.log(typeof true) //boolean
console.log(typeof null) //object
console.log(typeof 객체) //object
console.log(typeof undefined) //undefined
```

---

## 이어서 학습할 것

- 함수와 프로토타입 체이닝
