---
layout: default
title: 객체를 생성하는 3가지 방법
parent: Javascript
nav_order: 2
has_children: true
comments: true
---

# javascript로 객체를 생성하는 3가지 방법

자바스크립트에서 객체를 생성하는 방법은 3가지가 있는데, 그 방식들은 무엇인지 어떤 차이점이 있는지 알아보고자 한다.

## [1] Object() 객체 생성자 함수를 사용하기

첫 번째 방법은 자바스크립트에 내장되어 있는 **Object() 생성자 함수** 를 사용하는 방법이다.

```
//비어있는 객체 생성
var person1 = new Object();

//person1객체의 프로퍼티를 할당
person1.name = 'michelle'
person1.age = 27
person1.sayHello = function(){
    console.log(this.name + 'Hello!');
}

console.log(person1);
```

추후에 추가하고 싶은 프로터디가 생긴다면 곧바로 추가할 수 있다.

```
person1.job = 'developer';
person1.hobby = 'movie';
```

---

## [2] 객체 리터럴 방식 사용하기

두 번째 방법은 객체 리터럴 방식으로 **{}** 를 사용하여 객체를 생성한다.

```
var person1 = {
    name : 'michelle',
    age : 27,
    sayHello : function(){
        console.log(this.name + 'Hello!');
    }
};

console.log(person1);
```

- ### 여기서 잠깐, 첫 번째 방식과 두 번째 방식 중 어떤 방식이 더 좋을까?
  > > > 결론부터 이야기하자면 **두 번째 방식-객체 리터널 방식** 이 첫 번째 방식-Object() 생성자 함수를 사용하는 것보다 더 좋다.
  > > > 왜냐하면

0. 직관적이다. 객체 리터럴 방식은 객체의 프로퍼티(변수, 메서드)들이 한 곳에 모아져있기 때문에 한 눈에 보고 파악할 수 있다. 만약 Object() 생성자 방식으로 선언했을 때 여러줄의 코드 중 내가 만든 객체의 프로퍼티들이 모두 흩어져 있다면..?

1. Object() 생성자 방식은 비어있는 객체를 생성한 후 프로퍼티를 할당한다. 즉, 생성 후 할당한다. 객체 리터럴 방식은 객체를 생성함과 동시에 프로퍼티를 할당한다. ~~속도 측면에서 빠르다고 하는데 직접 테스트해보지는 못했다.~~

---

## [3] 생성자 함수 사용하기

함수를 통해서 객체를 생성하는 방식이다. 이 방식은 java에서 클래스를 만들고 해당 클래스의 객체를 만드는 방식과 유사하다.

```
function Person(name, age){
	this.name = name;
	this.age = age;
	this.sayHello = function(){
		console.log(this.name + 'Hello!');
	}
};

var person1 = new Person('michelle', 27);
var person2 = new Person('frank', 36);
var person3 = new Person('demi', 27);

```

이 방식의 하나의 생성자 함수(Person)을 만들어 놓으면 그 함수를 가리키는(?) _여러 개의 객체를 만들 수 있는 것_ 이 장점이고, 그러기 위해서 이 방식을 사용한다. 객체 생성시 필요한 값들을 함수의 매개변수로 주면 된다.

- ### prototype을 사용하여 메모리를 아껴보자!

하지만 세 번째 방식-생성자 함수 에서 사용한 코드는 **메모리 효율 측면에서 좋지 않다.** person1, person2, person3...객체를 만들 때마다 해당 프로퍼티(변수, 메서드)의 공간이 메모리에 만들어지기 때문이다. Person() 생성자 함수로 만들어진 모든 객체는 자신의 이름을 말하는 sayHello() 메서드를 가지고 있는데, 이 메서드의 기능은 완전히 같다. 따라서 이렇게 공용으로 사용되는 부분들은 선언시 한 번만 메모리에 할당되도록 할 수 있도록 **prototype**으로 선언하는 것이 좋다.
(상황에 따라서는 변수도 prototype으로 만들기도 한다고 한다.)

```
function Person(name, age){
	this.name = name;
	this.age = age;
	Person.prototype.sayHello = function(){
		console.log(this.name + 'Hello!');
	}
};

var person1 = new Person('michelle', 27);
var person2 = new Person('frank', 36);
```

---

## 이어서 학습할 것

- 자바 스크립트 컬렉션과 데이터 처리 방법
  _ 자바 스크립트의 **가비지 컬렉션** 에 대해 공부하다가 좋은 글이 있어 첨부합니다.
  _ http://theeye.pe.kr/archives/2872
- miniproject: 로또 번호 생성기 만들어보기

---

## 참고한 링크

- http://blog.kazikai.net/?p=45
