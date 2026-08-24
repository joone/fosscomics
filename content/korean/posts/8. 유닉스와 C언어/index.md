---
title: 8. 유닉스와 C언어
date: "2017-02-18"
image: image15.png
description: 멀틱스 프로젝트에서 물러난 벨 연구소의 연구자들이 PDP-7에서 유닉스를 만들고, B 언어의 한계를 넘어 NB와 C를 개발해 유닉스 커널을 다시 작성하기까지의 이야기입니다.
tags: 유닉스, C 언어, 켄 톰프슨, 데니스 리치, B 언어, 벨 연구소, 멀틱스, PDP-11, 1970년대
---

1960년대 MIT에서 [ITS(Incompatible Timesharing System)](https://ko.wikipedia.org/wiki/호환_시분할_시스템)가 한창 개발되고 있는 동안, 미 동부의 다른 곳에서도 해커의 기운이 물씬 풍기는 곳이 있었는데, 바로 벨 연구소(AT\&T Bell Laboratories)였다. 여기서 앞으로 세상을 바꿀 유닉스와 C언어가 개발되고 있었다.

MIT에서는 ITS가 만들어지고 있었고, 공교롭게도 벨 연구소에서는 [멀틱스(Multics)](https://ko.wikipedia.org/wiki/멀틱스) 개발에 참여했던 사람들이 나와 유닉스를 만들기 시작했다. 그 중심에는 [켄 톰프슨](https://ko.wikipedia.org/wiki/켄_톰프슨), [데니스 리치](https://ko.wikipedia.org/wiki/데니스_리치), 조 오산나가 있었다.

![](image1.png)

멀틱스 프로젝트는 1964년에 시작되었으나, 코드 크기가 커지고 복잡도가 높아지면서 벨 연구소에서 예상했던 것보다 일정이 많이 지연되고 있었다.

![](image4.png)

결국 벨 연구소는 1969년 멀틱스 개발에서 손을 뗀다. 이후에도 멀틱스 개발은 계속되어 실제 서비스와 상용 시스템으로 운영되었지만, 벨 연구소가 기다리기에는 개발이 너무 늦어지고 비용도 많이 들었다.

![](image12.png)

벨 연구소로 돌아온 켄 톰프슨은 멀틱스 개발 경험을 토대로 좀 더 작고 단순한 운영체제를 만드는 작업을 주도했다.

![](image11.png)

켄 톰프슨은 멀틱스에서 익힌 주요 아이디어를 가져와 더 단순한 형태로 유닉스에 구현했다.

![](image6.png)

우선 켄 톰프슨, 러드 캐너데이, 데니스 리치가 함께 구상한 파일 시스템을 사용되지 않던 PDP-7에 구현했다. 설계의 대부분은 톰프슨이 맡았고, 리치는 디바이스 파일 아이디어를 보탰다. 이어서 프로세스, 유틸리티, 커맨드 라인 해석기를 추가했고, 조 오산나를 비롯한 동료들도 개발에 참여했다.[&lbrack;1&rbrack;][1]

![](image14.png)

처음부터 이 운영체제를 유닉스라고 부른 것은 아니었다. 1970년이 상당히 지난 뒤에야 브라이언 커니핸이 멀틱스라는 이름을 비튼 “Unix”라는 이름을 제안했다.[&lbrack;1&rbrack;][1]

그 후 [PDP-11](https://ko.wikipedia.org/wiki/PDP-11)이 도입되었는데, PDP-7과 CPU 명령어가 달랐다. 유닉스는 어셈블리어로 개발되었기 때문에 PDP-11용으로 코드를 다시 짜야 했다.

![](image2.png)

![](image9.png)

하지만 새 컴퓨터가 들어올 때마다 어셈블리 코드를 다시 짤 수는 없는 노릇이었다. 그렇다면 B언어로 유닉스를 다시 만들 수 있을까?

![](image8.png)

당시에는 아직 어려웠다. B언어는 켄 톰프슨이 1969~70년 무렵 초기 유닉스 환경을 위해 만든 언어로, BCPL에서 발전한 작고 단순한 언어였다. 하지만 B 컴파일러가 만든 코드는 어셈블리 코드보다 훨씬 느렸고, 모든 데이터를 하나의 기계어 워드로 다루는 방식도 바이트 단위로 메모리에 접근하는 PDP-11과 잘 맞지 않았다. 그래서 유닉스 전체를 B언어로 다시 쓰는 방안은 잠시 검토되었을 뿐이었다.[&lbrack;2&rbrack;][2]

![](image5.png)

1971년 데니스 리치는 B언어에 문자 타입을 추가하고, `int`와 `char`를 명시하는 타입 체계를 만들기 시작했다. 또한 스레드 코드 대신 PDP-11 기계어를 생성하도록 컴파일러를 다시 작성했다. 그는 잠시 존재했던 이 언어를 “New B”라는 뜻의 NB라고 불렀다.[&lbrack;2&rbrack;][2]

![](image10.png)

![](image13.png)

리치는 B언어를 싹 뜯어고치기 시작했다. 1972년에는 타입 체계를 확장하고 배열과 포인터의 동작을 새로 정리했으며, 구조체와 새로운 컴파일러를 만들었다. 새로운 언어가 모습을 갖추자 C언어라고 이름 붙였다. B의 다음 글자를 따른 것인지, BCPL의 글자를 이어 간 것인지는 리치도 명확히 정하지 않았다. 1973년 초에는 오늘날 C언어의 핵심 기능이 거의 완성되었다.[&lbrack;2&rbrack;][2]

![](image3.png)

1973년 여름, 톰프슨과 리치를 비롯한 동료들은 C언어로 유닉스 커널을 다시 작성했다. 특히 구조체 타입을 추가하면서 디렉터리 항목 같은 데이터를 메모리 구조에 맞게 표현할 수 있게 되었다. 이제 C언어는 유닉스 커널을 작성할 수 있을 정도로 강력해졌다.

![](image7.png)

![](image16.png)

이처럼 유닉스와 C언어는 켄 톰프슨과 데니스 리치를 비롯한 벨 연구소 동료들의 손에서 짧은 기간에 탄생했다. 오늘날에도 유닉스와 유닉스 계열 운영체제는 수많은 서버와 개인용 컴퓨터, 핸드폰에서 동작하고 있다. 또한 C언어는 여전히 운영체제 커널과 시스템 소프트웨어를 개발하는 중요한 언어로 사용되고 있다.

## 참고 자료

1. Dennis M. Ritchie, [The Evolution of the Unix Time-sharing System](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html)
2. Dennis M. Ritchie, [The Development of the C Language](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html)
3. David C. Brock, [The Earliest Unix Code: An Anniversary Source Code Release](https://computerhistory.org/blog/the-earliest-unix-code-an-anniversary-source-code-release/)

[1]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html "The Evolution of the Unix Time-sharing System, Dennis M. Ritchie"
[2]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html "The Development of the C Language, Dennis M. Ritchie"