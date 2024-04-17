---
title: 8. The Origins of Unix and the C Language
date: "2023-09-04"
image: feature.png
description: In the 1960s, while ITS was developed at MIT, AT&T Bell Labs fostered a similar hacker spirit, creating Unix and the C language. Ken Thompson and Dennis Ritchie, transitioning from the Multics project, aimed for simplicity and efficiency, developing Unix on PDP-7 and later porting it to PDP-11. The creation of the C language, evolving from B, allowed Unix to be rewritten in a high-level language, setting a foundational standard for modern computing and operating system development...
tags: UNIX, C Language, Ken Thompson, Dennis Ritchie, B Language, Bell Labs., Multics, PDP-11, 1970s
---

In the 1960's, [the Incompatible Timesharing System (ITS)](https://en.wikipedia.org/wiki/Incompatible_Timesharing_System) was being heavily developed at MIT. Meanwhile, at another location on the east coast of the United States, there was another lab with the same hacker spirit: AT\&T Bell Laboratories.

The groundbreaking Unix and C language, which would go on to change the world, were being developed.

![](images/8_2.png "MIT vs. Bell Lab.")
> "I feel the force somewhere…"

Coincidentally, the people who were working on [Multics](https://en.wikipedia.org/wiki/Multics) were also working on ITS and Unix, including [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) and [Dennis Ritchie](https://en.wikipedia.org/wiki/Dennis_Ritchie) from Bell Labs.

![](images/8_3.png)
> "I think we need to step away from the Multics project now."\
> "Yeah, the development time has become way longer than we expected."

The Multics project began in 1964, but due to the large code size and complexity, the schedule fell far behind Bell Labs' expectations.

![](images/8_4.png "size:80%")
> "Overdesigned and overbuilt and over everything."\
> "It was close to unusable[&lbrack;1&rbrack;][1]"


In 1969, Bell Lab. pulled out of the development of Multics.

![](images/8_5.png "size:80%")
> “We’re leaving because we can't meet our schedule.”

Based on his experience developing Multics, Ken Thompson creates a new operating system by himself at Bell Labs.

![](images/8_6.png)
> “Dennis, I'm building a new operating system, taking some ideas from Multics. I'm making it smaller and simpler.” \
> “That’s a good idea. Shall I join you?”

Ken Thompson reimplemented many of the key features he had developed in Multics in Unix.

![](images/8_7.png)
> “I can't make something out of nothing”

He adapted the file system he had already implemented in Multics in Unix on PDP-7, and Dennis Richie joined him in the development. Once the development was well underway, a team was organized and they began implementing the operating system features we use today, such as the filesystem, process model, device files, and command line interpreter, for the first time on PDP-7.

![](images/8_8.png)
> “First of all, I'm working on a file system. How about we call it Unix?” \
> “How about mapping devices to files?”

Then, [PDP-11](https://en.wikipedia.org/wiki/PDP-11) was introduced, which differed in CPU instructions from the PDP-7.

![](images/8_9.png)
> "Ken, we have a new PDP-11, why don't we port Unix to it?" \
> "That's a great idea, but the problem is that the CPU instructions are different, so we'll have to re-write the Unix code with the PDP-11 assembly language."

![](images/8_10.png "size:90%")
> “Wow, I finally finished porting!" \
> "But we can't rewrite the Unix code in assembly every time we buy a new computer, right?

![](images/8_11.png)
> “Dennis, shall we rewrite Unix in the B language? Now we are able to build an OS kernel without assembly." \

![](images/8_12.png "size:80%")
> "Maybe we can port Unix to PDP-11 using the B language"  

B language was also developed for use in Multics by Ken Thompson and Dennis Ritchie in 1969.

![](images/8_13.png)
> "First we need to port the B language to the PDP-11, but there's a problem."

In 1971, Dennis Ritchie added a character type to the B language and rewrote the compiler code to generate PDP-11 machine code\[3].

![](images/8_14.png)
> “Dennis, how's the B language porting going?” \
> “There are a lot of issues, first of all, it’s hard to access the character data type on PDP-11.”

![](images/8_15.png)
> "Haha, why don't you completely update the B language this time?” \
> "I might have to rewrite it from scratch."

In 1973, basic functionalities were complete, and it was called C, which was just the next version of B.

![](images/8_16.png)
> “How about calling it C?” \
> "Sounds good"

Dennis Richie began rewriting Unix in C that same year.

![](images/8_17.png "size:80%")
> "Hmm, I don't have to code in assembly anymore"

Dennis added the structure type to the C language to define the user's custom data. Now, the C language is powerful enough to write Unix kernels.

![](images/8_18.png "size:80%")

Although Unix and C were created in a short period of time by Ken Thompson and Dennis Richie, most computers, including cell phones, still run on OS based on Unix today. In addition, operating system kernels are still developed in C today.

## References
1. Multics, [wikipedia](https://en.wikipedia.org/wiki/Multics)
2. Unix, [wikipedia](https://en.wikipedia.org/wiki/Unix)
3. History of Unix, [wikipedia](https://en.wikipedia.org/wiki/History\_of\_Unix)
4. The Development of the C Language [bell-labs.com](https://www.bell-labs.com/usr/dmr/www/chist.html)
5. The Evolution of the Unix Time-sharing System [www.read.seas.harvard.edu/~kohler](http://www.read.seas.harvard.edu/~kohler/class/aosref/ritchie84evolution.pdf)


[1]: https://en.wikipedia.org/wiki/Multics "Multics, Wikipedia"
