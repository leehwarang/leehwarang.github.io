---
layout: default
title: 자바스크립트의 객체지향 프로그래밍
parent: Javascript
nav_order: 6
has_children: true
comments: true
---

# 자바스크립트의 객체지향 프로그래밍

자바스크립트의 객체 지향 프로그래밍은 _prototype_ 을 기반으로 이루어진다. 따라서 객체를 만들었을 때 prototype이 어떻게 연결되는지 알아보고, 객체를 만드는 여러 가지의 방법과 그 차이에 대해서 공부했다.

## 프로토타입(prototype)

<img width="708" alt="prototype" src="https://user-images.githubusercontent.com/18614517/56627898-b3cf4e00-6682-11e9-84b1-0547d37adb9d.png">

1. **함수를 만들면 자동으로 그 함수의 프로토타입 객체(prototype object)가 생긴다.**
   **_foo 함수_**는 foo.prototype으로 프로토타입 객체에 접근할 수 있고, **_프로토타입 객체의 constructor_**는 foo 함수를 가리키고 있다. 함수와 프로토타입 객체가 서로를 바라보고(?) 있는 것.

   ```
   function foo() { }
   console.log(foo) // ƒ foo() { }
   console.log(foo.prototype) // {constructor: ƒ}
   ```

2. **new 키워드를 사용해서 함수를 호출하면, 그 함수는 생성자 함수가 된다.** _(함수 이름을 대문자로 선언한다고 생성자 함수가 되는 것이 아니다!)_ 생성자 함수를 호출한 결과 만들어진 **인스턴스 f1**은 foo의 프로토타입 객체를 **f1.\_ _proto_ \_** 로써 참조할 수 있기 때문에, **f1은 자신을 만든 함수의 프로토타입 객체에 있는 속성과 메서드를 사용할 수 있다.** (객체 지향의 개념 등장) 결론적으로 foo.prototype과 f1.\_ _proto_ \_는 같은 프로토타입 객체를 가리킨다.

   ```
   const f1 = new foo()
   console.log(f1)
   ```

   > 따라서 같은 생성자 함수를 사용해 여러 개의 인스턴스를 만들 것이고, 그 인스턴스들이 공통적으로 가지고 싶은 무언가가 있을 경우에, 프로토타입 객체의 속성 또는 함수로 만들면 된다.

3. **모든 생성자 함수는 `return this;` 를 생략하고 있다.** 생성자 함수를 호출한 결과 만들어진 인스턴스의 this는 자기 자신을 가리킨다.

   > this가 어떻게 바인딩 되는지는 조금 더 알아봐야함

- 참고
  <img width="1038" alt="object prototype" src="https://user-images.githubusercontent.com/18614517/56628676-a7002980-6685-11e9-8ae5-d3ffc32c7331.png">

  foo()의 프로토타입 객체도 Object 생성자 함수의 인스턴스이다. foo()의 프로토타입 객체는 Object 프로토타입 객체에 연결되기 때문에, **프로토타입 체이닝(prototype chaning)**이 일어나 연결된 속성과 메서드를 사용할 수 있다.

## 객체를 생성하는 방법

각각의 방법들은 객체를 만든다는 결과를 같지만 과정이 다르다. 어떤 부분이 다른지, 따라서 왜 이 방법이 더 좋은지에 초점을 맞추며 알아보겠다.

1. constructor pattern
1. prototype pattern
1. Class - ES2015

---

#### constructor pattern

```
const Health = function(name,healthTime) {
  this.name = name;
  this.healthTime = healthTime;
  this.showHealth = function() {
  console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = new Health("crong", "12:12");
ho.showHealth(); // crong님, 오늘은 12:12에 운동을 하셨네요
```

constructor pattern을 통해 만들어진 인스턴스 ho 내부에는 name, healthTime, showHealth()에 대한 공간이 할당되어 있다.

```
const ho = new Health("crong", "12:12");
const ha = new Health("michelle", "15:15");
console.log(ho.showHealth === ha.showHealth) // false
```

하지만 같은 생성자 함수로 여러개의 인스턴스를 만들었을 때는 단점이 있다. showHealth()는 인스턴스 내에서 같은 기능을 하는 함수인데, **각 인스턴스 내에 공간이 할당되어 메모리가 낭비된다.**

    <img width="496" alt="constructor pattern" src="https://user-images.githubusercontent.com/18614517/56629651-057ad700-6689-11e9-9419-2564b337bbd4.png">

console.dir()로 각 인스턴스를 살펴보면 **_name, healthTime, showHealth 모두 프로퍼티로 들어가 있는 것을 볼 수 있다._**

---

#### prototype pattern

```
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
}

const ho = new Health("crong", "12:12");
const ha = new Health("michelle", "15:15");
console.log(ho.showHealth === ha.showHealth) // true
```

prototype pattern을 통해 만들어진 인스턴스 ho 내부에는 name, healthTime만 있고, showHealth()는 프로토타입 객체에만 존재한다. **굳이 인스턴스 내부에 공간을 할당하지 않고 프로토타입 객체를 가리키며 함수를 사용하는 것이다.** 따라서 ho에 showHealth 저장된 위치와 ha에 showHealth가 저장된 위치는 같다.

  <img width="461" alt="prototype pattern" src="https://user-images.githubusercontent.com/18614517/56629721-496ddc00-6689-11e9-8cca-89d78c36a89d.png">

console.dir()로 각 인스턴스를 살펴보면 **_name, healthTime는 인스턴스의 프로퍼티로 들어가 있고, Health의 프로토타입 객체에 showHealth가 들어가있다._**

#### Class - ES2015

```
const Health = class {
  constructor(name, healthTime) {
    this.name = name;
    this.healthTime = healthTime;
  }

  showHealth(){
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = new Health("crong", "12:12");
const ha = new Health("michelle", "15:15");
console.log(ho.showHealth === ha.showHealth) // true
```

**prototype pattern과 내부적으로 동일하다.** 하지만 ES2015에서 간편하게 만들기 위해서 등장한 syntatic sugar이다.

<img width="421" alt="class" src="https://user-images.githubusercontent.com/18614517/56629933-550dd280-668a-11e9-8b9b-50300052a994.png">
