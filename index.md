---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home
nav_order: 1
permalink: /
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/_MCeNcPdyos" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{: .text-grey-dk-100}

# 안녕하세요.

{: .fs-7 }

만들기를 좋아하고 삶에서 일의 의미와 가치를 중요하게 생각하는 _이화랑(Michelle Lee)_ 입니다.

새로운 지식을 배울 때 수동적으로 받아들이기보다는 의문을 가지고 다양한 관점에서 생각해 보려고 노력합니다. 스스로의 학습 방식이 개발하는 과정을 더 풍부하게 만들어 준다고 믿고 있으며 앞으로도 이 여정을 이어 나가기를 소망합니다.

공통된 목적이 있는 사람들과 함께 지낼 때 행복감을 느끼며, 편한 사람들과 마시는 맥주 🍺 와 커피 ☕️ 를 가장 좋아해요. 저에 대해 궁금한 점이 있으시면 <hwrng2@gmail.com>로 연락 주세요. 감사합니다.

{: .fs-4 .fw-300 }

[view Github Account](https://github.com/leehwarang){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }[view LinkedIn Profile](https://www.linkedin.com/in/hwarang-lee-27890a187/){: .btn .fs-5 }

---

{: .fs-6 }

최근 포스트

<!-- 1. date가 있는 모든 post를 가져오기 -->
<!-- 2. 가져온 post를 최신 순으로 정렬하기 -->

{% for post in site.posts %}

<a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
{{ post.date | date_to_long_string }}

{% endfor %}

<!-- ## Getting started -->

<!-- ### Dependencies -->

<!--
Just the Docs is built for [Jekyll](https://jekyllrb.com), a static site generator. View the [quick start guide](https://jekyllrb.com/docs/quickstart/) for more information. Just the Docs requires no special Jekyll plugins and can run on GitHub Pages standard Jekyll compiler. -->

<!--
### Quick start: Use as a GitHub Pages remote theme

1. Add Just the Docs to your Jekyll site's `_config.yml` as a [remote theme](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/)

```yaml
remote_theme: pmarsceill/just-the-docs
```

<small>You must have GitHub pages enabled on your repo, one or more markdown files, and a `_config.yml` file. [See an example repository](https://github.com/pmarsceill/jtd-remote)</small> -->

<!--
### Local installation: Use the gem-based theme

1. Install the Ruby Gem

```bash
$ gem install just-the-docs
```

```yaml
# .. or add it to your your Jekyll site’s Gemfile
gem "just-the-docs"
```

2. Add Just the Docs to your Jekyll site’s `_config.yml`

```yaml
theme: "just-the-docs"
```

3. _Optional:_ Initialize search data (creates `search-data.json`)

```bash
$ bundle exec just-the-docs rake search:init
```

3. Run you local Jekyll server

```bash
$ jekyll serve
```

```bash
# .. or if you're using a Gemfile (bundler)
$ bundle exec jekyll serve
```

4. Point your web browser to [http://localhost:4000](http://localhost:4000)

---

## About the project

Just the Docs is &copy; 2017 by [Patrick Marsceill](http://patrickmarsceill.com).

### License

Just the Docs is distributed by an [MIT license](https://github.com/pmarsceill/just-the-docs/tree/master/LICENSE.txt).

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. Read more about becoming a contributor in [our GitHub repo](https://github.com/pmarsceill/just-the-docs#contributing).

### Code of Conduct

Just the Docs is committed to fostering a welcoming community.

[View our Code of Conduct](https://github.com/pmarsceill/just-the-docs/tree/master/CODE_OF_CONDUCT.md) on our GitHub repository. -->
