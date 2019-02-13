---
layout: default
title: 백준 11721, 1085, 1193
parent: Algorithm
nav_order: 1
has_children: true
comments: true
---

# 알고리즘 스터디(CrushAlgo) 시작

지인들과 함께 알고리즘 스터디를 시작했다.
[레파지토리는 여기.](https://github.com/leehwarang/WeeklyAlgo)
일주일에 한 번씩 만나서 **1~5개**의 문제를 푸는데 난이도와 배치는 **쉬움-2, 중간-1, 어려움-2** 정도로 구성한다. 이 그룹에서 내가 제일 개발 쪼랩이기 때문에(다들 초고수임) 난 3개 + a를 푸는게 목표이다. 잘 할 욕심 내지말고 꾸준히만 하자. 지금 단계에서는 꾸준히 하는게 잘하는거다.

아래 세 개의 문제를 풀었다.

- [백준 11721](https://www.acmicpc.net/problem/11721)
- [백준 1085](https://www.acmicpc.net/problem/1085)
- [백준 1193](https://www.acmicpc.net/problem/1193)

---

## [1] 백준 11721

- **문제**:

![11721](https://user-images.githubusercontent.com/18614517/52721683-86fd1b80-2fed-11e9-8658-445fbd2d6d57.png)

- **아이디어**: 비어 있는 문자열(base)을 만든다. 1) 주어진 문자열을 10개씩 잘라서 2) base 문자열에 더하고 3) 더한 문자열을 주어진 문자열에서 삭제해나간다. 이 과정을 행의 갯수 만큼 반복한 뒤에 4) 남은 문자열도 base 문자열에 더하면 된다.

아이디어 자체는 쉽게 생각했는데, 더한 문자열을 주어진 문자열에서 삭제할 때 어떻게 할지 잠깐 고민했다.
파이썬에서 문자열을 다룰 때, split이나 slice 같은 것들을 많이 쓰다보니 그새 replace를 까먹고 있었음. 멍충멍충.

- **코드**:

```
s = input()
answer = ''
row = len(s) // 10

for i in range(row):
    answer += s[0:10]
    answer += '\n'
    for char in s[0:10]:
        s = s.replace(char, "", 1)

answer += s
print(answer)
```

---

## [2] 백준 1085

- **문제**:

![1085](https://user-images.githubusercontent.com/18614517/52721706-93817400-2fed-11e9-9622-7155942985cc.png)

- **아이디어**:

- **코드**:

```
# 6 2 10 3 -> 1

s = input()
s = s.split(" ")

answer = []

x = int(s[0])
y = int(s[1])
w = int(s[2])
h = int(s[3])

answer.append(x)
answer.append(y)
answer.append(w-x)
answer.append(h-y)

print(min(answer))
```

---

## [2] 백준 1193

- **문제**:

![1193](https://user-images.githubusercontent.com/18614517/52721717-9e3c0900-2fed-11e9-8680-22e84cee5621.png)

- **아이디어**:

- **코드**:

```
#14 -> 2/4

n = int(input())
sum = 0
i = 1
while(True):
    sum += i
    if sum == n or n < sum:
        # print("{}는{}번째 줄입니다.".format(n, i))
        line = i
        break
    i += 1
if line % 2 == 0: #line이 짝수라면
    end = sum
    parent = 1
    child = line
    while (True):
        if end == n:
            print("{}/{}".format(child, parent))
            break
        parent += 1
        child -= 1
        end -= 1
else: #line이 홀수라면
    start = sum - line + 1
    parent = 1
    child = line
    while (True):
        if start == n:
            print("{}/{}".format(child, parent))
            break
        parent += 1
        child -= 1
        start += 1
```
