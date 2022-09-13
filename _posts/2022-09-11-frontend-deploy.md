---
layout: default
title: 배포 하면서 배우는 CSR(React)과 SSR(Next.js)
parent: React
nav_order: 9
has_children: true
comments: true
date: 2022-09-11
image: /assets/images/thumbnails/2022-09-11-frontend-deploy.png
summary: 렌더링(DOM을 그리는 행위)을 Client 단에서 하는지, Server 단에서 하는지의 차이 때문에 React 로 만든 앱과 Next.js 로 만든 앱의 배포 방식에서도 차이가 있습니다. 프론트엔드 서버가 해야 하는 일이 다르기 때문입니다.
---

# 배포 하면서 배우는 CSR(React)과 SSR(Next.js)

![2022-09-11-frontend-deploy](https://user-images.githubusercontent.com/18614517/189784896-cb89bb12-55e3-4593-b1e3-73227a8cb209.png)

CSR(Client-Side Rendering)과 SSR(Server-Side Rendering) 에 대해서는 많이 들어보셨을거라고 생각합니다. React 는 기본적으로 CSR 방식으로 동작하는 UI 라이브러리이고, Next.js 는 SSR 과 Static Generation 을 지원하는 React Framework 이지요. 

_렌더링(DOM을 그리는 행위)을 Client 단에서 하는지, Server 단에서 하는지의 차이 때문에 React 로 만든 앱과 Next.js 로 만든 앱의 배포 방식에서도 차이가 있습니다. 프론트엔드 서버가 해야 하는 일이 다르기 때문입니다._ 요즘 부쩍 devops 쪽에 관심이 생겨서, React 와 Next.js 로 만든 앱을 연습삼아 배포해 보았는데 이 과정에서 CSR 과 SSR 에 대해서도 이해가 조금 더 깊어진 것 같아 기록해봅니다. 

---

## React의 동작 방식(CSR)

`npx create-react-app my-react-app` 명령어로 React 앱을 만들어서 `npm run start` 을 실행해봅시다. 그리고 개발자 도구에서 Network 탭을 열어, localhost:3000 에 진입했을 때 Webpack의 개발용 서버가 어떤 파일들을 응답해주는지 확인해보세요.

<img width="1288" alt="react(1)" src="https://user-images.githubusercontent.com/18614517/189515554-bb2dc97b-9f1a-42e4-ae2c-089b50791862.png">

이 중에서 응답받은 파일 중 제일 처음에 있는 HTML 파일 부터 살펴보겠습니다. 

<img width="803" alt="react(2-1)" src="https://user-images.githubusercontent.com/18614517/189773453-69a1c9d3-2e22-4fa0-af3b-ae02feea76bf.png">

Elements 탭에서 root 라는 id를 가지고 있는 div 태그 안에 여러개의 element 들이 포함되어 있습니다.
그에 반해 응답 받은 HTML 을 살펴보면 root 라는 id를 가지고 있는 div 태그 안에는 비어있습니다. 네트워크 응답 화면에서 HTML 파일 아래에 bundle.js 라는 javascript 파일도 받았는데, 이 javascript 파일을 통해 element 들을 그립니다. Client-Side Rendering 의 동작하는 원리인데요, 이를 통해 React 앱을 어떻게 배포해야 할지 생각해봅시다. 

## React 앱 배포

React 앱을 배포 했을 때, 프론트엔드 서버는 우리가 이전에 확인한 Webpack의 개발용 서버가 응답해주던 파일들을 그대로 내려주면 됩니다. 즉, **build 를 통해서 만들어진 정적 파일들(.html, .js, image 등)을 호스팅 해주는 서비스에 업로드 하기만 하면 끝이나요.**

`create-react-app`으로 만든 React 앱의 개발용 서버는 작업하면서 우리의 코드가 변경될 때 마다, 업데이트 된 `bundle.js` 파일을 응답해주었는데요. **배포한 후에 내가 사용자에게 다른 화면을 보여주고 싶다면 변경된 build 결과물을 호스팅 해주는 서비스에 다시 업로드 하면 되는거죠.** 

여기서 프론트엔드 서버는 요청이 왔을 때 동적으로 build 를 해서 결과물을 응답해주는 것이 아니기 때문에, 모든 유저는 같은 화면을 보게 됩니다. 최종적으로 React 는 CSR 로 동작하는 정적 웹사이트를 만들어주는 라이브러리라고 정리할 수 있습니다. 


## 배포 도구는 어떤걸 써야 할까요?

"정적 웹사이트 호스팅" 이라는 키워드로 구글링을 해보면 정말 많은 글들이 나옵니다. 대표적으로 AWS S3 + CloudFront (optional), Netlify, Vercel, Github Page 등의 도구들이 있습니다. 

실 서비스를 배포할 때 Github Page 를 사용하는 경우는 많지 않기 때문에 제외하고, 배포 난이도는 Vercel = Netlify < AWS S3 + CloudFront 입니다. Vercel 과 Netlify 는 정말 버튼 몇 번만 클릭하면 배포가 완료 되고, AWS S3 + CloudFront 를 이용한 배포는 42서울에서 작성해주신 [글](https://42place.innovationacademy.kr/archives/9784)을 참고해서 구축할 수 있었습니다. 개인적으로 Vercel 과 Netlify 가 쉽지만, 내부적으로 CloudFront 와 같은 CDN 의 역할을 해주고 있어서 단순화 된 것이기 때문에 S3 + CloudFront 조합으로 배포해보시는 걸을 추천합니다. 

<img width="1077" alt="react(3)" src="https://user-images.githubusercontent.com/18614517/189517670-8372616c-f0eb-4e8d-b919-3ec8f0c73fa1.png">

<center>S3에 올라가 있는 React 앱의 build 결과물</center>

---

## Next.js의 동작 방식(Static Generation/SSR)

SSR 에 대한 니즈를 가지게 되면서 Next.js 를 선택하는 프론트엔드 개발자들이 늘고 있습니다. Next.js 가 어떻게 동작하는지 이해하기 위해서는 공식 문서의 [Pages](https://nextjs.org/docs/basic-features/pages)섹션에 자세히 나와있으니 해당 포스팅에서는 배포 방식과 관련된 정보를 요약해보겠습니다. 

<img width="961" alt="nextjs(1)" src="https://user-images.githubusercontent.com/18614517/189519842-7cdbb234-36ff-4a52-bac6-3ab68b629e13.png">

- Static Generation: build time에 각 페이지에서 해당하는 HTML 파일을 미리 만들어두고, 요청에 대해 HTML 을 재사용한다. 
- Server-Side Rendeging: 요청이 오면 동적으로 HTML 파일을 만들어서 응답해준다. 



(현실에서 그럴 일은 드물지만) `외부 API 호출이 필요 없는 상황`이라고 가정해보면 Next.js 로 만든 앱은 기본적으로 Static Generation 으로 동작하기 때문에, 배포한 후에 프론트엔드 서버가 해야 할 일이 거의 없습니다. React 로 만든 앱 처럼요! build 한 시점에서의 정적인 결과물들을 호스팅해주는 서비스에 올려두기만 하면 되는 거죠. 

`반면 외부 API 호출을 해야 하지만, 이 API 가 응답해주는 데이터가 실시간성이 중요하지 않을 수도 있습니다.` 지난주에 API 호출 했을 때의 데이터와 오늘 API 호출 했을 때의 데이터가 달라지지 않다면 어떨까요? 요청이 올 때마다 API 를 호출하는 것 보다 build 하는 시점에 API 호출을 해서 데이터가 포함된 HTML 을 만들어 두고, 이 HTML 을 재사용하는게 이득일거에요.(Next.js의 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) 활용) 외부 API 호출이 필요 없는 상황처럼, build 한 시점에서의 결과물들을 호스팅해주는 서비스에 올려두기만 하면 되겠지요. 

마지막으로 `외부 API 호출을 해야하고, 이 API 는 실시간으로 데이터가 달라질 수 있다면` 두 가지 옵션을 선택할 수 있습니다. 우리가 React 에서 부터 적용해오던 [Client-Side Rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side) 방식을 사용하거나, Next.js의 getServerSideProps로 [Server-Side Rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) 방식을 사용하면 됩니다. 

<img width="625" alt="nextjs(4)" src="https://user-images.githubusercontent.com/18614517/189783029-39c4720d-a756-4112-adb9-7b1e3bfcd7ff.png">

<img width="667" alt="nextjs(5)" src="https://user-images.githubusercontent.com/18614517/189783051-ff28ff12-05cc-4b96-a393-a4f2b1c6c8a7.png">

Next.js 공식 문서에서는 데이터를 빈번하게 업데이트해야 하는 페이지라면 굳이 pre-render 할 필요 없이 Client-Side 에서 데이터를 호출하고, 인증 정보를 요청하는 API 등 요청할 때  전체의 데이터가 포함된 페이지를 보여주어야 하는 경우에 getServerSideProps 를 사용하여 SSR 로 pre-render 하라고 설명하고 있습니다. 

**CSR 방식을 택하면 앞선 케이스들처럼 프론트엔드 서버가 해야할 일이 거의 없고, SSR 방식을 선택하면 요청이 올 때 마다 "API 를 호출해서 HTML을 동적으로 생성" 해주는 일을 추가로 해야 합니다.**

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

<img width="1496" alt="nextjs(6)" src="https://user-images.githubusercontent.com/18614517/189783162-b638d626-90c4-4a08-8476-69fa4cc7e213.png">
<center>getServerSideProps를 활용해서 데이터를 호출했을 때, HTML에 데이터가 포함되어 내려오는 화면</center>


## Next.js 앱 배포

Next.js 로 앱을 만들면서 SSR 기능을 사용할 수도, 사용하지 않을 수도 있지만 사용한다는 것을 가정하고 배포 환경을 구성해야겠지요. 즉, Server-Side 에서 클라이언트의 요청에 대해 동적인 응답을 만드는 Server-Side 의 processing 처리를 위한 “웹 애플리케이션 서버”가 필요합니다. 

> 웹 서버와 웹 애플리케이션 서버

지금까지 해당 글에서는 “프론트엔드 서버” 라는 용어를 사용했는데요. 사실 프론트엔드 서버라는 단어에는 웹 서버와 웹 애플리케이션(Web Application Server)로 역할이 다른 두 서버를 포함하고 있었습니다.
웹 서버는 클라이언트에서 HTTP 프로토콜로 요청을 받고 정적인 파일들을 응답으로 전달합니다. 웹 애플리케이션 서버는 Server-Side에서 코드 실행을 통해 동적인 응답을 만들어주는 역할을 합니다. 내가 사용하는 언어/필요한 상황에 맞게 서버 환경을 구성할 수 있습니다. 

이 쯤에서 앞서 잠깐 소개한 AWS의 [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) 문서도 한 번 읽어볼까요? 

<img width="1315" alt="s3" src="https://user-images.githubusercontent.com/18614517/189521426-a6135c05-e852-44a1-9fba-742270fc9fba.png">

S3는 정적인 웹사이트를 호스팅할 수 있지 PHP, JSP, ASP.NET 등 Servier-Side의 코드 실행이 필요한 동적인 웹사이트는 지원할 수 없다고 설명합니다. 웹 서버 이외에 웹 애플리케이션 서버가 필요하다는 것을 여기에서도 이야기 하고 있습니다. 


<img width="1018" alt="nextjs(2)" src="https://user-images.githubusercontent.com/18614517/189522147-885f08d1-49d5-46ab-89a9-26c68a768110.png">

다시 Next.js 의 공식 문서 중 [Deployment](https://nextjs.org/docs/deployment) 글로 돌아와볼게요. 
Vercel 을 사용하면 Next.js 앱을 zero-configuration 으로 배포할 수 있습니다. 

<img width="1188" alt="vercel" src="https://user-images.githubusercontent.com/18614517/189522279-e0d496f8-aa26-46e2-af42-7b7ead84d703.png">

저도 Vercel 을 사용해서 Next.js 앱을 배포해보았는데 이 또한 마우스 클릭 몇 번으로 배포 환경을 구성할 수 있었습니다. 

<img width="966" alt="nextjs(3)" src="https://user-images.githubusercontent.com/18614517/189522166-a4c1184a-b745-47d5-a976-607085592eba.png">

Vercel 말고 직접 프론트엔드 서버 환경을 구축하기 위해서는 Node.js 진영으로 만들어진 feature 들을 선택하거나 Docker 를 사용해서 만들 수 있다고 합니다. 

Vercel 은 쉽고 빠르지만, 사용자가 많은 서비스라면 운영 비용이 높아져서 직접 구축하는게 더 좋다고 해요. 그리고 Vercel 은 내부적으로 서버리스(Serverless) 아키텍쳐로 동작합니다. 다음 글에서는 서버리스가 무엇인데 이렇게 프론트엔드 서버를 쉽게 구축할 수 있는지에 대해 적어보겠습니다. :)
