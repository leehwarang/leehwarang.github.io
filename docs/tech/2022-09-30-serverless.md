---
layout: default
title: 프론트엔드 개발자가 설명하는 서버리스(Serverless)
parent: React
nav_order: 10
has_children: true
comments: true
date: 2022-09-30
image: /assets/images/thumbnails/2022-09-30-serverless(2)?123.png
summary: 서버리스(Serverless) 라는 말을 처음 들었을 때, 의미를 알잘딱깔센으로 이해하기는 쉽지 않은 것 같아요. 프론트엔드 개발자의 입장에서 서버가 없다는건 요청이 왔을 때 응답을 내려주는 그 서버가 없다는건지, 백엔드 개발자를 서버 개발자라고도 많이 부르는데 백엔드의 코드가 필요 없다는건지 모호합니다. 
---

# 프론트엔드 개발자가 설명하는 서버리스(Serverless)

![2022-09-30-serverless](https://user-images.githubusercontent.com/18614517/193252338-1444bb71-c82f-4549-a3aa-29c0132bb2e9.png)


이전 포스트인 [배포 하면서 배우는 CSR(React)과 SSR(Next.js)](https://leehwarang.github.io/2022/09/11/frontend-deploy.html) 라는 글의 말미에, **Vercel 은 내부적으로 서버리스(Serverless) 아키텍쳐로 동작한다** 는 이야기를 했습니다. 서버리스(Serverless) 라는 말을 처음 들었을 때, 의미를 알잘딱깔센으로 이해하기는 쉽지 않은 것 같아요. 프론트엔드 개발자의 입장에서 서버가 없다는건 요청이 왔을 때 응답을 내려주는 그 서버가 없다는건지, 백엔드 개발자를 서버 개발자라고도 많이 부르는데 백엔드의 코드가 필요 없다는건지 모호합니다. 

단어를 그대로 해석하지 않고 이해하기 위해서는 아래 3가지를 먼저 알고 있는게 필요해요. 

> 1. IaaS(Infrastructure as a Service)
> 2. FaaS (Function as a Service)
> 3. BaaS (Backend as a Service)

그 다음에 우리가 Next.js 로 만든 앱을 배포할 때 사용하는 Vercel이 어떤 부분에서 서버리스 아키텍쳐를 사용하고 있는지 살펴보겠습니다. 

---

## IaaS(Infrastructure as a Service)

먼저 IaaS 는 컴퓨터의 클라우드 기능들을 서비스로 제공하는 것을 말하며, 이를 위해 필요한 인프라를 쉽게 구축할 수 있도록 도와줍니다. AWS 같은 공급업체가 IaaS 를 제공하는 플랫폼입니다. IaaS 덕분에 우리가 서버용 컴퓨터를 직접 구입해서 구축하지 않고도 웹 사이트를 쉽게 배포할 수 있게 되었어요. _하지만 IaaS 에 배포하더라도, 요청이 갑자기 몰려왔을 때에 컴퓨팅 파워를 늘려야 하는 등 관리의 이슈 등은 여전히 개발자들의 몫입니다._ 그리고 IaaS 를 통해 배포를 하면, 그 코드는 24시간 돌아가고 있어요. 배포한 서비스에 접속하는 사용자가 얼마나 있든 없든 상관없이 빌린 비용을 지불합니다. 삐빅 ❌. **IaaS 는 서버리스라고 불리지는 않아요.**

## FaaS (Function as a Service)

FaaS, 서비스로의 함수라는 말이 잘 와닿지 않을 수 있어요. IaaS 는 개발자가 코드를 클라우드에 몽땅 올리지만, FaaS 의 방식은 코드를 한 번에 올리지 않고 여러 개의 '함수'로 쪼개서 분산된 클라우드에 등록합니다. 만약 어떤 코드에 요청이 많이 오면 그 함수를 여러개로 만들어서 실행하고, 또 다른 어떤 코드에 요청이 오지 않는다면 그 함수는 실행하지 않습니다. (함수가 잠을 자고 있다가 요청이 오면 깨어나는 것으로 이야기하더라구요) 그리고 이러한 함수들이 실행되는 만큼 비용을 지불합니다. _IaaS 와 달리 개발자가 인프라에 대해서 전혀 관리할 필요가 없어지고 비즈니스 로직, 즉 코드 자체에만 신경을 쓸 수 있게 됩니다._ **FaaS 에 해당하는 기능들을 서버리스라고 부릅니다.** ⭕️ 대표적으로 AWS 의 Lambda Function이 여기에 속해요.

## BaaS (Backend as a Service)

마지막으로 BaaS 입니다. _우리가 일반적으로 백엔드 개발자가 구현하는 것으로 알고 있는 기능들(데이터 베이스 생성/관리, 인증 등)을 서비스의 형태로 제공하는 것_ 을 말합니다. AWS의 Amplify 나 Firebase 등의 서비스가 BaaS이에요. FaaS 를 제공하는 대부분의 업체들이 BaaS 기능들도 같이 제공하는 경우가 많기 때문에, **BaaS 도 서버리스 컴퓨팅 중 하나라고 볼 수 있어요.** ⭕️ 

> 결론적으로 서버리스(Serverless)는 서버가 없다기 보다는 관리할 서버(인프라, 백엔드의 특정 기능)가 없다는 의미로 사용됩니다. 

--- 

## Next.js on Vercel

<img width="1075" alt="image" src="https://user-images.githubusercontent.com/18614517/192397276-9960d14c-dfa6-48b4-90d1-7915f9bb17e1.png">

Vercel [공식 문서](https://vercel.com/docs/concepts/next.js/overview)에서 정의한 Next.js는 `정적 자산과 서버리스 기능으로 구축된` 하이브리드 애플리케이션을 위한 솔루션이라고 적혀있습니다. <br />

<img width="1153" alt="image" src="https://user-images.githubusercontent.com/18614517/192398125-520bbe14-0ccc-4147-b3f3-60b43312bdbe.png">

Supported Next.js Features 섹션의 하단에 하이라이팅한 부분에서는 조금 더 자세히 설명하고 있는데요. **Vercel 도 결국 AWS 처럼 웹사이트를 호스팅해주는 서비스이기 때문에 IaaS 를 제공하는 플랫폼에 속하지만, Next.js 의 API routes 기능과 Server-side Rendering 으로 페이지를 생성할 때는 독립적인 Serverless Function(FaaS)으로 만들어져 동작합니다.** 

```javascript
//page/server-side.js

function ServerSidePage({ data }) {
    return (
        <>
        <h1>Server-Side Page</h1>
        <div>id: {data.title}</div>
        </>
    )
}


export async function getServerSideProps(context) {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const data = await res.json()
    return {
        props: { data } 
    }
}

export default ServerSidePage
```

```javascript
//page/api/user.js

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
}
```

getServerSideProps를 활용해서 ServerSidePage dummy Data인 사용자의 이름을 내려주는 API route를 하나씩 만들었습니다. 

<img width="854" alt="image" src="https://user-images.githubusercontent.com/18614517/192400295-b027e912-b599-49d6-9271-0b5d219d24d3.png">

그리고 build 를 해보면 위 두파일은 server-side renders at runtime 에서 실행된다는 것을 알 수 있습니다. Vercel 은 참 편리하지만 무료 요금제인 Hobby Plan 에서는 배포당 만들어지는 Serverless Function 함수의 개수에 제한이 있으니, 공식 문서의 [가이드라인](https://vercel.com/docs/concepts/limits/overview#general-limits)을 잘 살펴보시는 것이 좋겠습니다. :) 

