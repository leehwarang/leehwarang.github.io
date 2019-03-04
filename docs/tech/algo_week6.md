---
layout: default
title: 백준 1427, 2577, 1181
parent: Algorithm(Python)
nav_order: 2
has_children: true
comments: true
---

# 백준 1427, 2577, 1181

- [백준 1427](https://www.acmicpc.net/problem/1427) (해결)
- [백준 2577](https://www.acmicpc.net/problem/2577) (해결)
- [백준 1181](https://www.acmicpc.net/problem/1181) (해결)
- [백준 2309](https://www.acmicpc.net/problem/2309) (미해결)
- [백준 5430](https://www.acmicpc.net/problem/5430) (미해결)

---

## [1] 백준 1427

- **문제**:

<img width="1295" alt="1427" src="https://user-images.githubusercontent.com/18614517/53731207-5e19c900-3ebd-11e9-9551-bc5dce794bef.png">

- **아이디어**: 주어진 수의 각 자리수를 정렬해야 하기 때문에, 일단 각 자리수로 쪼개는 것이 중요하다. 이 때 수학적으로 접근한다면 주어진 수의 1의 자리, 10의 자리, 100의 자리, 1000의 자리의 몫으로 계산하여 구할 수 있다. 하지만 난 **주어진 수를 str으로 변환한 다음에 쪼개서 정렬하는 방법** 을 사용했다.

- **코드**:

```
n = int(input())

answer = []

for i in str(n):
    answer.append(i)

answer.sort(reverse = True)
answer = "".join(answer)
print(answer)
```

---

## [2] 백준 2577

- **문제**:

<img width="1056" alt="2577" src="https://user-images.githubusercontent.com/18614517/53731258-8275a580-3ebd-11e9-8ada-7d1328f8d905.png">

- **아이디어**: 주어진 세 개의 수를 곱해서 str으로 변환하고, 이 str에 0~9까지의 숫자가 몇 번 사용되었는지 구하는 문제이다. 별 다른 아이디어랄 것 없이 python의 **count 함수** 를 사용했다.

- **코드**:

```
a = int(input())
b = int(input())
c = int(input())
result = a * b * c
# print(result)

answer = str(result)

for i in range(0, 10):
    print(answer.count(str(i)))
```

---

## [3] 백준 1181

- **문제**:

<img width="1080" alt="1181" src="https://user-images.githubusercontent.com/18614517/53731287-98836600-3ebd-11e9-9ba4-be902c5936a6.png">

- **아이디어**: 문제에서 같은 단어는 한 번씩만 출력하라고 했기 때문에 1)먼저 중복을 제거했다. 입력받은 문자열이 담긴 리스트를 set으로 변환하여 중복을 제거하고, 다시 list로 변환시켰다. 2)각 문자열과 문자열의 길이를 **튜플로 감싼 리스트**를 만들고, 3)이 리스트를 **sort() 함수** 를 사용하여 정렬했다.

_**리스트가 정렬하는 각 원소들이 튜플(값1, 값2)이라면 값1을 기준으로 먼저 정렬한 후, 값1이 같은 경우에 값2를 기준으로 다시 정렬해준다.**_ 파이썬 최고시다.

- **코드**:

```

n = int(input())
vocas = []
for _ in range(n):
    vocas.append(input())
print(vocas)

set_vocas = list(set(vocas))
print(set_vocas)

sort_vocas = []
for i in set_vocas:
    sort_vocas.append((len(i), i))

sort_vocas.sort()
print(sort_vocas)

for len_voca, voca in sort_vocas:
    print(voca)
```
