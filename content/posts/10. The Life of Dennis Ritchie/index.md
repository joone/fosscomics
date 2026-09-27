---
title: "10. The Life of Dennis Ritchie"
date: "2026-09-26"
image: feature.webp
description: "From Harvard to Bell Labs: the life of Dennis Ritchie, creator of C and co-developer of Unix, and his later work on Plan 9 and Inferno."
tags: C Language, Plan9, Unix
---

:::panel rounded="true" style="width: 80%; align:center;"

**The man who built an operating system, using a language he created.**

![A young Ritchie works at a large computer.](images/feature.webp "size:80%")

:::

## An unexpected call in 1999

:::panel

At the time, Dennis Ritchie led the research group developing the Inferno operating system and the Limbo programming language.[&lbrack;1&rbrack;][1]

![An older Ritchie sits at his desk, looking at a monitor.](images/inferno.webp "size:80%")

> Will Inferno ever be able to compete with Java?

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A telephone rings on the desk.](images/phone.webp "size:60%")

> Ring ring!

:::

:::panel rounded="true"

Ritchie and Ken Thompson were named recipients of the 1998 National Medal of Technology and received their medals at the White House in April 1999.[&lbrack;11&rbrack;][11]

![Ritchie stands beside his computer, taking the call.](images/medal.webp "size:80%")

> President Clinton is giving us the National Medal of Technology? Congratulations, Ken. It looks like we'll have to go to Washington.

:::

::::panels columns="2" label=""

:::panel rounded="true"

![Ken Thompson at the other end of the line.](images/awards.webp "size:100%")

> Aren't we getting too many awards?

:::

:::panel rounded="true"

![Ritchie smiles into the receiver.](images/turing_award.webp "size:100%")

> Yeah. I was happy with just the Turing Award.

:::

::::

:::panel rounded="true"

![A small image of Thompson's face appears beside Ritchie as they talk.](images/same_here.webp "size:80%")

> Ha, same here.

:::

## His father and Bell Labs

:::panel

In the 1940s, Dennis Ritchie’s father, Alistair E. Ritchie, studied switching circuit theory at Bell Labs.[&lbrack;2&rbrack;][2] Automatic telephone exchanges were already in use, but many calls still needed an operator to connect them.[&lbrack;12&rbrack;][12] Bell Labs, the Bell System's research organization, continued developing automatic switching technology in the postwar years.[&lbrack;13&rbrack;][13]

![Young Dennis walks beside his father, who carries a briefcase.](images/father.webp "size:100%")

> What do you do, Dad?\
> I study switching circuits. They're used to connect phone calls.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![His father explains his research.](images/switches.webp "size:70%")

> We can combine switches to make circuits that do calculations. Some colleagues and I are writing a book about it.

:::

## Discovering computers at Harvard

:::panel

A decade or so later.

![An older Dennis holds his acceptance letter.](images/harvard.webp "size:80%")

> Dad, I've been accepted to Harvard.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![His father asks a question; Dennis hesitates over his answer.](images/subjects.webp "size:100%")

> Congratulations. Have you decided whether to study physics or mathematics?\
> I can't decide. I like both.

:::

:::panel style="margin-bottom: 5rem;"

![Dennis walks past a university building, carrying books.](images/campus.webp "size:100%")

> Math and physics, both are intriguing.

:::

::::panels columns="2" label="An introductory computing course and Dennis's idea"

:::panel rounded="true"

Around 1960.

![He stops to read a notice about a computing course.](images/notice.webp "size:100%")

> Introduction to Computing Learn about computers and programming Inquiries: ...

:::

:::panel rounded="true"

![Dennis raises a hand as an idea takes shape.](images/calculations.webp "size:100%")

> With a computer, I could do the math much faster.

:::

::::

:::panel rounded="true"

A talk about computers caught Ritchie’s interest, and he took an introductory course. After learning about analog computers and punched-card equipment, his class wrote a program to run on a UNIVAC I.[&lbrack;3&rbrack;][3]

![An instructor lectures to a group of students.](images/first_class.webp "size:100%")

:::

:::panel style="margin-top: 5rem;"

Although his undergraduate major was physics, Ritchie grew increasingly interested in both the theory and practice of computing.[&lbrack;3&rbrack;][3]

![Dennis works at a large computer.](images/computing.webp "size:100%")

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![Dennis sits across the desk from a professor.](images/professor.webp "size:100%")

> You studied physics, but your research is about computation...\
> It all comes back to math.

:::

:::panel rounded="true"

His graduate thesis concerned hierarchies of recursive functions, a topic now associated with computer science. He studied it as a graduate student in applied mathematics, while computer science was still emerging as a distinct discipline.[&lbrack;2&rbrack;][2][&lbrack;3&rbrack;][3]

![Ritchie's thesis manuscript appears as a bound volume.](images/thesis.webp "Subrecursive Hierarchies of Functions, Dennis M. Ritchie, 1968 size:80%")

:::

:::panel style="margin-top: 2rem;margin-bottom: 5rem;"

Ritchie was also interested in the practical side of computing. For three years, he taught as a teaching assistant in the introductory course he had taken. By then, the course used an IBM 7094.[&lbrack;3&rbrack;][3]

![Dennis teaches a computing class.](images/teaching.webp "size:80%")

:::

## Bell Labs and the birth of Unix

:::panel

In 1967, Ritchie joined Bell Labs.[&lbrack;2&rbrack;][2]

![An older researcher welcomes the new arrival.](images/welcome.webp "size:100%")

> Oh, are you Alistair's son?\
> Yes, I am.\
> I know your father well.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A colleague introduces the operating system the team is developing.](images/multics.webp "size:100%")

> Welcome to Bell Labs. Our team is co-developing an operating system called Multics with MIT and GE. Are you interested?\
> A new operating system? Sounds fun.

:::

:::panel

![Thompson adds a thought, his hand on his chin.](images/collaboration.webp "size:80%")

> Not always. We're working with several organizations...

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

In 1969, Bell Labs withdrew from the Multics project.[&lbrack;2&rbrack;][2]

![Dennis and Thompson discuss what comes next.](images/withdrawal.webp "size:100%")

> Finally, we withdrew from the Multics project. But now, what system are we going to use?\
> Don't worry, I'm working on a new operating system. Interested?

:::

:::panel style="margin-bottom: 5rem;"

![Dennis repeats the idea, touching his chin.](images/new_os.webp "size:80%")

> A new operating system?

:::

:::panel

Ken Thompson was building a new operating system that drew on some ideas from Multics. Ritchie and their colleagues joined the effort, and the system became Unix.[&lbrack;2&rbrack;][2][&lbrack;4&rbrack;][4]

![A researcher works at a large computer.](images/unix.webp "size:100%")

:::

## From B to C

:::panel

Bell Labs, around 1972.

During Unix development, the team moved from the PDP-7 to the PDP-11. Their incompatible instruction sets meant rewriting the assembly code. Ritchie tried to implement Unix in Thompson’s B language, but B had limitations on the PDP-11.[&lbrack;4&rbrack;][4]

![Thompson stands beside Ritchie's desk and asks what he's doing.](images/b_language.webp "size:100%")

> What are you doing now?\
> I'm trying to write Unix in B, but it's tough. The language itself needs quite a few changes.

:::

:::panel rounded="true"

B could not fully use the PDP-11’s features. Ritchie added types and reworked the compiler, creating C. In the summer of 1973, the Unix kernel was rewritten in C.[&lbrack;4&rbrack;][4]

![Ritchie smiles as he codes at a terminal.](images/c_kernel.webp "size:100%")

> Now we can write most of the OS kernel in C.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A developer sits at the computer while Ritchie looks on, pleased.](images/reaction.webp "size:100%")

> Wow, an OS kernel in C!\
> Pleased

:::

:::panel rounded="true" style="margin-bottom: 5rem;"

Unix and C spread from Bell Labs to universities and other institutions. Later, companies such as HP and Sun Microsystems built their own operating systems based on Unix code, helping make Unix a major industry standard.

![The AT&T logo and UNIX System V lettering.](images/system_v.webp "size:55%")

:::

## Learning C through a book

:::panel

Brian Kernighan, who worked at Bell Labs, wrote a B tutorial for in-house training. After C was developed, he wrote a C tutorial too. It later became the basis for a book.[&lbrack;1&rbrack;][1]

![Brian Kernighan writes at a computer.](images/tutorial.webp "size:100%")

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![Kernighan makes a suggestion; Ritchie smiles with his arms folded.](images/book.webp "size:100%")

> Dennis, remember my C tutorial? Want to turn it into a book together?\
> Good idea!

:::

:::panel rounded="true" style="margin-bottom: 5rem;"

The C Programming Language was first published in 1978, with a second edition following in 1988. Translated into many languages, it became widely read by people learning C.[&lbrack;4&rbrack;][4][&lbrack;5&rbrack;][5]

Second-edition cover. Image source: [Wikipedia](https://en.wikipedia.org/wiki/The_C_Programming_Language#/media/File:The_C_Programming_Language_cover.svg).

![The cover of the second edition of The C Programming Language.](images/book_cover.webp "size:70%")

:::

## Beyond Unix: Plan 9

:::panel style="margin-top: 3rem;margin-bottom: 5rem;"

![Ritchie stands alone, thinking.](images/after_unix.webp "size:100%")

> Hmm... What comes after Unix?

:::

:::panel rounded="true"

Bell Labs began developing an operating system called Plan 9 in the late 1980s as a successor to Unix. This research system rethought how computers could share resources.[&lbrack;6&rbrack;][6]

![A researcher points to a board labeled 'Why Plan 9?'](images/plan9.webp "size:100%")

:::

:::panel style="margin-top: 3rem;margin-bottom: 5rem;"

As the research group’s leader, Ritchie mainly managed and advised the team. He joked that his contribution was signing paychecks, though he also admitted to writing a little code himself.[&lbrack;1&rbrack;][1]

![A colleague approaches Ritchie at his computer.](images/caught_coding.webp "size:100%")

> Are you coding?\
> Ah. You caught me.

:::

:::panel

Plan 9 was used inside Bell Labs, but finding outside customers was difficult. It did not widely replace Unix.

![Ritchie walks with his head lowered.](images/customers.webp "size:100%")

> It's hard to find customers for Plan 9.

:::

## Inferno and the ideas that lived on

:::panel

In the 1990s, Bell Labs began developing Inferno and the Limbo programming language for a wide range of devices and networks. Limbo programs ran on the Dis virtual machine, making them less dependent on particular hardware.[&lbrack;7&rbrack;][7][&lbrack;8&rbrack;][8]

![A researcher presents Inferno and Limbo at a board, beside a modest aside from Ritchie.](images/limbo.webp "size:100%")

> All I did was sign the paychecks...

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A colleague and Ritchie stand talking.](images/java.webp "size:100%")

> Sun announced Java. Like Inferno, it uses a virtual machine.\
> Yes, I heard.

:::

:::panel

Although Ritchie contributed to and advised on their development, Plan 9 and Inferno did not spread as widely as Unix. Vita Nuova later continued Inferno’s development and distribution.[&lbrack;1&rbrack;][1][&lbrack;8&rbrack;][8]

![A manager talks to Ritchie across a desk.](images/handover.webp "size:100%")

> We're struggling to find customers for Inferno too. We'll have to hand it over to another company.\
> I'm glad someone can keep it going.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

There were various obstacles, including marketing difficulties. Eric Raymond pointed to another in The Art of Unix Programming: users already had a usable system in Unix. His discussion of Plan 9 is paraphrased below.[&lbrack;9&rbrack;][9]

![Eric S. Raymond addresses the reader.](images/raymond.webp "size:100%")

> Even a better system has a tough rival: the code people already have that works well enough.

:::

:::panel rounded="true" style="margin-bottom: 5rem;"

Some ideas from Plan 9 influenced other systems. UTF-8, implemented in Plan 9 by Ken Thompson and Rob Pike, is one example.[&lbrack;10&rbrack;][10] The system itself did not become widespread, but its ideas lived on.

![The BSD daemon and the Linux penguin take labeled sheets from a Plan 9 box.](images/ideas.webp "size:100%")

> File interfaces

:::

## Life after retirement in 2007

:::panel style="margin-top: 5rem;"

![Colleagues gather around a cake to celebrate Ritchie's retirement.](images/retirement.webp "size:100%")

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A colleague holding a glass says goodbye to Ritchie.](images/plans.webp "size:100%")

> We'll miss you around here.\
> Time to do some traveling.

:::

:::panel

![A colleague and Ritchie talk on the phone from separate locations.](images/health.webp "size:100%")

> How's your health these days? You've lost so much weight since the surgery.\
> Ha, don't worry. There's still so much to explore.

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![A worried colleague holds the phone.](images/no_answer.webp "size:80%")

> Dennis isn't answering. I'd better go check on him.

:::

## A quiet farewell in October 2011

:::panel

Dennis Ritchie died at his home in New Jersey in October 2011.[&lbrack;1&rbrack;][1]

![A dramatized scene of a colleague finding Ritchie at home.](images/goodbye.webp "size:100%")

> Dennis!

:::

:::panel style="margin-top: 5rem;margin-bottom: 5rem;"

![Mourners stand beside a flower-covered coffin in a symbolic farewell.](images/memorial.webp "size:100%")

:::

:::panel

![Two people walk away, seen from behind.](images/legacy.webp "size:100%")

> He accomplished so much, but lived so quietly.\
> He developed a language, then built an operating system with his colleagues...

:::

:::panel rounded="true" style="margin-top: 5rem;margin-bottom: 5rem;"

![Ritchie's portrait surrounded by white space.](images/portrait.webp "Dennis Ritchie, 1941-2011 size:70%")

:::

**End**

The dialogue is dramatized from historical sources, not a record of actual conversations. The discovery and funeral scenes are imagined, not eyewitness reconstructions. Please leave a comment if you spot an error.

## References

1. [Dennis M. Ritchie homepage and family memorial](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/)
2. [Dennis M. Ritchie, autobiographical sketch](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/bigbio1st.html)
3. [Interview with Dennis Ritchie (2003)](https://anders.unix.se/2015/10/26/interview-with-dennis-ritchie-2003/)
4. [Dennis M. Ritchie, The Development of the C Language](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html)
5. [Brian Kernighan, The C Programming Language](https://www.cs.princeton.edu/~bwk/cbook.html)
6. [Plan 9 from Bell Labs: Overview](https://9p.io/plan9/about.html)
7. [Phil Winterbottom and Rob Pike, The Design of the Inferno Virtual Machine](https://www.vitanuova.com/inferno/papers/hotchips.html)
8. [Vita Nuova, Inferno](https://www.vitanuova.com/inferno/)
9. [Eric S. Raymond, The Art of Unix Programming: Plan 9](http://catb.org/~esr/writings/taoup/html/plan9.html)
10. [Rob Pike and Ken Thompson, Hello World](https://9p.io/sys/doc/utf.html)
11. [Dennis M. Ritchie, Letter from Washington](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/medal.html)
12. [David A. Price, Goodbye, Operator](https://www.richmondfed.org/publications/research/econ_focus/2019/q4/economic_history)
13. [Nokia Bell Labs, History](https://www.nokia.com/bell-labs/about/history/)

[1]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/
[2]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/bigbio1st.html
[3]: https://anders.unix.se/2015/10/26/interview-with-dennis-ritchie-2003/
[4]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html
[5]: https://www.cs.princeton.edu/~bwk/cbook.html
[6]: https://9p.io/plan9/about.html
[7]: https://www.vitanuova.com/inferno/papers/hotchips.html
[8]: https://www.vitanuova.com/inferno/
[9]: http://catb.org/~esr/writings/taoup/html/plan9.html
[10]: https://9p.io/sys/doc/utf.html
[11]: https://www.nokia.com/bell-labs/about/dennis-m-ritchie/medal.html
[12]: https://www.richmondfed.org/publications/research/econ_focus/2019/q4/economic_history
[13]: https://www.nokia.com/bell-labs/about/history/
