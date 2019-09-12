<!-- ---
layout: default
title: Michelle and Q
parent: Javascript
nav_order: 1
has_children: true
comments: true
--- -->

**_참고:_** MDN에 나와 있는 forEach() 정의를 참고하였습니다. 코드스쿼드의 웹 프론트엔드 클래스에 참여하고 있는 Michelle과 Q가 함께 작성하였어요.:)

# javascript의 forEach()에 대해서 알아봅시다!

**_forEach() 메서드 는 주어진 함수를 배열 요소 각각에 대해 실행합니다._**<br>
먼저 코드로 살펴보시죠. 코드스쿼드 프론트엔드 클래스에 합류한 13명의 멤버들을 출력해볼까요?

```
const members = ['Michelle', 'Q', 'Andole', 'Allen', 'Sage', 'Gren', 'Koon', 'Jin', 'Snow', 'Papico', 'Wook', 'Kaku', 'Seldev']

members.forEach(function(member) {
	console.log(member);
})

//Michell
//Q
//Andole
//Allen
//Sage
//Gren
//Koon
//Jin
//Snow
//Papico
//Wook
//Kaku
//Seldev
```

## 좀 더 자세히 알아볼까요?

- 정의

```
arr.forEach(function(value, index, array){
 //실행 할 함수의 내용
}, thisArg);
```

**forEach()메서드는 반드시 callback함수를 인자로 가져야하며, 이 callback함수는 배열의 값(value)을 반드시 인자로 받아야합니다.** 위의 예시에서는 member 변수로 배열의 값을 받았어요. index와 array는 선택적으로 인자에 포함할 수 있습니다. 아래의 예시에서는 index와 array도 같이 출력해보겠습니다.

```
const members = ['Michelle', 'Q', 'Andole', 'Allen', 'Sage', 'Gren', 'Koon', 'Jin', 'Snow', 'Papico', 'Wook', 'Kaku', 'Seldev']

members.forEach(function(member, index, array) {
	console.log(member, index, array);
})

//Michell 0 ['Michelle', 'Q',...,'Seldev']
//Q 1 ['Michelle', 'Q',...,'Seldev']
//Andole 2 ['Michelle', 'Q',...,'Seldev']
//Allen 3 ['Michelle', 'Q',...,'Seldev']
//Sage 4 ['Michelle', 'Q',...,'Seldev']
//Gren 5 ['Michelle', 'Q',...,'Seldev']
//Koon 6 ['Michelle', 'Q',...,'Seldev']
//Jin 7 ['Michelle', 'Q',...,'Seldev']
//Snow 8 ['Michelle', 'Q',...,'Seldev']
//Papico 9 ['Michelle', 'Q',...,'Seldev']
//Wook 10 ['Michelle', 'Q',...,'Seldev']
//Kaku 11 ['Michelle', 'Q',...,'Seldev']
//Seldev 12 ['Michelle', 'Q',...,'Seldev']
```

thisArg는 필요한 경우에 추가할 수 있는데요. thisArg를 넣지 않은 경우에 callback함수로 넣은 function은 결국 내부 함수이기 때문에 this가 Window 객체에 바인딩 됩니다. 하지만 Window객체가 아닌 다른 객체에 this를 바인딩하고 싶은 경우에 thisArg를 사용할 수 있어요. 이에 대해서는 this에 대한 추가적인 공부가 필요합니다.

- 그 외 주의 사항

1. 리턴값이 없습니다.map과 reduce 같은 메서드들은 새로운 배열 등을 리턴하지만, forEach는 단순히 배열의 값을 순회할 때 주로 사용하기 때문에 리턴값이 없습니다. (return문이 필요 없어요!)

2. 대체적으로 반복 도중에 빠져 나올 수 없습니다. 배열의 값을 순회하면서 빠져 나오고 싶을 때는 some()메서드를 쓴다고 하네요!
