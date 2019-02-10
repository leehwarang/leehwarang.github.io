---
layout: default
title: 함수 호출 패턴에 따라 달라지는 this
parent: Basic
grand_parent: Javascript
nav_order: 5
has_children: true
comments: true
---

**_참고:_** 인사이드 자바 스크립트의 4장(함수와 프로토타입 체이닝)과 인프런의 Javascript 핵심 개념 알아보기 - JS Flow를 듣고 헷갈리는 개념을 정리한 글 입니다. 혹시 잘못된 내용이 있다면 댓글이나 hwrng2@gmail.com로 알려주세요. 감사합니다. :)

# javascript의 함수 호출과 this

자바 스크립트에서 함수를 호출하면 호출한 함수에 매개 변수를 인자로 넘겨줄 뿐만 아니라, **arguments객체** 와 **this인자** 도 함께 전달한다. 근데 이 this는 _함수가 호출되는 방식에 따라 다른 객체를 참조_ 하는데 이를 일반적으로 **this 바인딩**이라고 부른다.

- 객체의 메서드로 호출시
- 전역 공간에서 호출시
- 내부 함수에서 호출시
- 생성자 함수에서 호출시
- callback에서 호출시

위 다섯가지의 상황에서 함수를 호출했을 때 this가 어떻게 바인딩 되는지 정리했다.

## [1] 객체의 메서드로 함수 호출시 this 바인딩

```
var obj = {
    name : 'michelle',
    sayhello : function(){
        console.log("Hello? I'm " + this.name);
    }
};

obj.sayhello(); //I'm michelle
```

> 객체의 메서드(sayhello)로 호출했을 때, **this는 자신을 호출한 객체(obj)에 바인딩**된다. 따라서 this.name은 객체(obj)가 가지고 있는 name 프로퍼티를 가져오는 것을 볼 수 있다.

## [2] 전역 공간에서 함수 호출시 this 바인딩

내부 함수에서 함수를 호출했을 때 this가 어떻게 바인딩 되는지 살펴보기 전에, 자바스크립트 전역에 있는 함수를 호출했을 때 this가 어떻게 바인딩 되는지 먼저 알아보겠다.

```
var name = 'michelle'

console.log(name); //michelle
console.log(window.name); //michelle
```

브라우저에서 자바스크립트를 실행하면 전역 객체는 window 객체이고, 사실상 전역 변수는 모두 이 window객체의 프로퍼티들이다.

```
var name = 'michelle'

var sayhello = function(){
    console.log("Hello? I'm " + window.name); //Hello? I'm michelle
    console.log("Hello? I'm " + this.name); //Hello? I'm michelle
}

sayhello();

```

> 전역에서 sayhello() 함수를 호출했을 때 **this는 전역 객체 window에 참조(바인딩)** 된다.

## [3] 내부 함수에서 함수 호출시 this 바인딩

```
var value = 1;

var obj = {
    value : 100,
    func1 : function(){
        this.value += 1;
        console.log("func1()'s value: " + this.value); //func1()'s value: 101

        func2 = function(){
            this.value += 1;
            console.log("func2()'s value: " + this.value); //func2()'s value: 2
        }

        func2();
    }
};

obj.func1();
```

**func1() 함수**는 obj 객체의 메서드로 호출된 것이기 때문에 _func1()의 this인자는 obj 객체에 바인딩_ 된다. 그래서 obj가 가지고 있는 value(:100)를 가리켜 this.value를 101로 출력한다. 반면에 **func2() 함수**는 func1() 함수의 내부에서 호출되는데, 자바 스크립트에서 _내부 함수의 this는 window(전역)객체에 바인딩_ 된다. 전역 변수로 있는 value(:1)를 가리켜 this.value를 2로 출력한다.

> 내부 함수를 호출했을 때 **this는 전역 객체 window에 참조(바인딩)** 된다.

참고로, 내부 함수에서도 obj 객체를 바인딩 하기 위해 func1()의 this를 func2()에서도 접근할 수 있도록 아래와 같은 방식을 사용한다.

```
var value = 1;

var obj = {
    value : 100,
    func1 : function(){
        var that = this;
        this.value += 1;
        console.log("func1()'s value: " + this.value); //func1()'s value: 101

        func2 = function(){
            that.value += 1;
            console.log("func2()'s value: " + that.value); //func2()'s value: 2
        }

        func2();
    }
};

obj.func1();
```

## [4] 생성자 함수에서 함수 호출시 this 바인딩

```
var Person = function(name, age){
    this.name = name;
    this.age = age;
}

var p1 = new Person('michelle', 26);
console.log(p1.name); //michelle
console.log(p1.nage); //26
```

> 생성자 함수를 호출했을 때 **this는 만들어진 인스턴스에 바인딩** 된다.

## [5] callback 함수에서 함수 호출시 this 바인딩

기본적으로는 함수의 this 바인딩과 같은데, 제어권을 가진 함수가 callback의 this를 명시한 경우 그에 따른다.
call, apply, bind 메서드 등을 이용하여 개발자가 별도로 this를 바인딩할 수 있다.

## 아직 call, apply, bind 메서드를 이해하지 못해서 코드는 추후에 추가 예정.ㄴ

## 이어서 학습할 것

- 함수 스코프, 실행 컨텍스트
  - https://poiemaweb.com/js-execution-context
- 전역 객체
  - https://poiemaweb.com/js-global-object
- 함수 호출 방식에 의해 결정되는 this
  - https://poiemaweb.com/js-this
- call,apply,bind 메서드를 사용해서 명시적으로 바인딩 하는 법

---

## 참고한 링크
