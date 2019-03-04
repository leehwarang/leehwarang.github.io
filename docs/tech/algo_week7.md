---
layout: default
title: 백준 2455, 1057, 9012
parent: Algorithm(Python)
nav_order: 3
has_children: true
comments: true
---

# 백준 2455, 1057, 9012

- [백준 2455](https://www.acmicpc.net/problem/2455) (해결)
- [백준 2231](https://www.acmicpc.net/problem/2232) (미해결)
- [백준 1057](https://www.acmicpc.net/problem/1057) (해결)
- [백준 9012](https://www.acmicpc.net/problem/9012) (해결)
- [백준 11266](https://www.acmicpc.net/problem/11266) (미해결)

이번 주도 두시간 내에 세 문제를 풀었다. 언제쯤 네 문제를 풀 수 있을까나 ~~~ 이제 반복문, 조건문 등을 요리조리 써서 해결할 수 있는건 풀겠는데 조금만 알고리즘스러운(?) 문제가 나오면 못 푸는 것 같아서 틈틈히 자료구조와 기초&심화 알고리즘을 공부중이다. 꾸준히 재밌게 하기!

## [1] 백준 2455

- **문제**:

<img width="1179" alt="2455 1" src="https://user-images.githubusercontent.com/18614517/53739775-f328bc00-3ed5-11e9-8963-29c3219a17ef.png">
<img width="1178" alt="2455 2" src="https://user-images.githubusercontent.com/18614517/53739787-ffad1480-3ed5-11e9-8c92-edb54ba99aed.png">

- **아이디어**: 입력 받은 네 개의 행을 각각의 리스트로 만들어서, 비어있는 리스트에 넣었다. (리스트 안에 리스트가 있는 구조) 이렇게 하면 기차의 역 번호 순서대로 저장할 수 있고, 각 리스트의 0번 째 데이터는 내린 사람, 1번 째 데이터는 탄 사람의 수를 의미하기 때문에 기차역에서 내리고 탄 사람의 수를 쉽게 계산할 수 있다.

- **코드**:

```
train = []
for _ in range(4):
    s = input()
    train.append(s.split(" "))

person = 0
answer = []
for i in range(len(train)):
    down = train[i][0]
    person -= int(down)
    up = train[i][1]
    person += int(up)
    answer.append(person)
print(max(answer))
```

---

## [2] 백준 1057

- **문제**:

<img width="1071" alt="1057" src="https://user-images.githubusercontent.com/18614517/53739812-0dfb3080-3ed6-11e9-8191-c4b93079334d.png">

- **아이디어**: 김지민(8번째)과 임한수(9번째)는 서로 대결하기 전까지 항상 이긴다는 가정이 있다. 따라서 라운드가 진행될 때마다 김지민과 임한수가 몇 번째 팀에 속하는지 계산하였고, 같은 팀에 속했을 때의 라운드 수를 출력했다. 만약 김지민과 임한수의 번호(n)이 **짝수라면 '2로 나누었을 때의 몫' 번째 그룹**, **홀수라면 '2'로 나누었을 때의 몫+1' 번째 그룹**에 속한다고 할 수 있다.

- **코드**:

```
ars = input()
ars = ars.split(" ")
n = int(ars[0])
person1 = int(ars[1])
person2 = int(ars[2])
round = 1

while True:
    if person1 == person2:
        break
    if person1 % 2 == 0:
        person1 = person1 // 2
    else:
        person1 = (person1 // 2) + 1
    if person2 % 2 == 0:
        person2 = (person2 // 2)
    else:
        person2 = (person2 // 2) + 1
    round += 1

print(round - 1)
```

---

## [3] 백준 9012

- **문제**:

<img width="961" alt="9012" src="https://user-images.githubusercontent.com/18614517/53739832-19e6f280-3ed6-11e9-8b1c-f379ba90b47f.png">

- **아이디어**: 알맞은 괄호 문자열이 주어졌는지 검사하는 문제이다. 0으로 초기화한 변수(cnt)를 하나 만들고, 문자열에 **'('가 있으면 +1,** **')'가 있으면 -1** 시킨 다음 cnt가 0이라면 True, 0이 아니라면 False를 출력하면 된다. 여기까지 했을 때, (((())))는 참이지만 ))))((((도 참이 될 수 있어서 만약 cnt가 -1이 되는 순간에=닫힌 괄호가 먼저 나온 순간에 바로 False를 출력하는 코드도 추가했다.

- **코드**:

```
n = int(input())
for _ in range(n):
    base_str = input()
    cnt = 0
    for s in base_str:
        if s == '(':
            cnt += 1
        elif s == ')':
            cnt -= 1
            if cnt < 0:
                break
    if cnt == 0:
        print("YES")
    else:
        print("NO")
```
