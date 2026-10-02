---
title: "11. BSD Unix, Part 1 - Unix Code Goes to UC Berkeley"
date: "2026-09-30"
image: feature_en.webp
description: "How did Unix spread from Bell Labs to universities and companies? One clue lies in Ken Thompson's visit to UC Berkeley, with Unix source code in hand."
tags: BSD, Unix
---

:::panel

![Ken Thompson holds a reel of magnetic tape labeled AT&T UNIX.](images/feature_en.webp "size:55%")

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

In 1973, Ken Thompson and Dennis Ritchie presented Unix at the Symposium on Operating Systems Principles (SOSP).[&lbrack;1&rbrack;][1]

![The moderator holds his notes as he introduces the speakers.](images/conference_en.webp "size:100%")

> Next, Ken Thompson and Dennis Ritchie from Bell Labs will introduce their operating system, Unix.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Dennis Ritchie speaks beside a screen headed Unix Operating System.](images/presentation_en.webp "size:100%")

> Unix is an interactive, multi-user operating system. We've rewritten it mostly in C, a high-level language, rather than assembly.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Two audience members react with surprise, one adjusting his glasses and the other folding his arms.](images/questions_en.webp "size:90%")

> What's C?\
> Wait—you can write an OS in a high-level language?

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;padding: 0;"

![Ritchie points to a board listing Unix's main features.](images/features_en.webp "size:100%")

> Unix has features rare even in larger systems. It runs on a PDP-11.\
> Today we'll discuss the file system and the command interface.
>
> Main features shown on the board, using the original wording from the 1974 paper's abstract:[&lbrack;1&rbrack;][1]
> 1. A hierarchical file system incorporating demountable volumes
> 2. Compatible file, device, and inter-process I/O
> 3. The ability to initiate asynchronous processes
> 4. System command language selectable on a per-user basis
> 5. Over 100 subsystems including a dozen languages

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Members of the audience turn to one another and begin talking.](images/audience_en.webp "size:85%")

> murmur murmur\
> All that on a PDP-11? Impressive...

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

After the talk, Professor Bob Fabry of the University of California, Berkeley approached the two speakers.

![Bob Fabry, on the left, introduces himself to Dennis Ritchie and Ken Thompson.](images/request_en.webp "size:100%")

> I'm Bob Fabry from Berkeley. We'd like to try Unix. Could we get a copy?\
> For research? That should be possible. Do you have a PDP-11/45?

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Fabry gestures with an open hand as he explains what computers Berkeley has.](images/mainframe_en.webp "size:90%")

> We only have mainframes. We're planning to buy a PDP-11. I'll be in touch once we have it.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Berkeley's computer science, mathematics, and statistics departments jointly purchased a PDP-11/45. A tape containing Unix Version 4 arrived in January 1974, and graduate student Keith Standiford installed it.[&lbrack;2&rbrack;][2]

![Standiford holds the package containing the tape while Fabry throws his arms open.](images/delivery_en.webp "size:100%")

> Professor! The Unix tape is here!\
> Great! Let's get it running.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Standiford works at a terminal while Fabry watches from behind him.](images/errors_en.webp "size:100%")

> We'd better ask Ken Thompson for help.\
> It runs, but it keeps crashing.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Thompson dialed in by modem to help. The trouble came when both disks tried to seek at once—their shared controller couldn't handle it reliably. With his help, Unix was finally running smoothly.[&lbrack;2&rbrack;][2]

![Thompson raises both arms in celebration at his computer, with a telephone connected by a cable on the desk.](images/running_en.webp "size:85%")

> Now it's working!

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

The computer science students liked Unix, but the mathematics and statistics departments wanted DEC's RSTS. The compromise: eight hours a day for Unix, sixteen for RSTS. To keep things fair, the shifts rotated daily. Every third day, Unix got midnight to 8 a.m.[&lbrack;2&rbrack;][2]

![Students wait outside a computer room reserved for the statistics department, with a sign barring computer science students.](images/shared_en.webp "size:100%")

> But we're the ones who installed Unix...
>
> Door signs: Computer Room. In use by Statistics. No CS students.

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

There still wasn't enough computer time. Berkeley bought a newer model, the PDP-11/70, which arrived in the fall of 1975.[&lbrack;2&rbrack;][2]

![Two people stand on either side of the newly arrived PDP-11/70.](images/pdp1170_en.webp "size:100%")

:::

::::panels columns="2" label=""

:::panel rounded="true" style="border-width: 3px;border-color: black;padding: 0;"

![Fabry calls Thompson on the telephone.](images/call_en.webp "size:100%")

> Ken, our PDP-11/70 is here. Can you help us install the latest Unix?

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;padding: 0;"

![Thompson answers the phone with one hand on his hip.](images/sabbatical_en.webp "size:100%")

> Good timing! I'm taking my sabbatical at Berkeley. I'll install Version 6 when I get there.

:::

::::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

In 1975, Thompson returned to his alma mater, Berkeley, for a sabbatical as a visiting professor. Together with Jeff Schriebman and Bob Kridle, he got Unix Version 6 running on the new PDP-11/70. The work that followed at Berkeley would eventually grow into BSD Unix.[&lbrack;2&rbrack;][2]

![Wearing sunglasses, Thompson walks with a suitcase carrying a Unix source tape.](images/arrival_en.webp "size:80%")

> Unix source code on tape

:::

**Next: the story of vi, the editor born at Berkeley.**

This comic is based on Marshall Kirk McKusick's "Twenty Years of Berkeley Unix." The dialogue is dramatized, not a verbatim record of what the participants said.

## References

1. D. M. Ritchie and K. Thompson, [The UNIX Time-Sharing System](https://people.eecs.berkeley.edu/~prabal/resources/osprelim/RT74.pdf), 1974.
2. Marshall Kirk McKusick, [Twenty Years of Berkeley Unix](https://www.oreilly.com/openbook/opensources/book/kirkmck.html), 1999.
3. Andrew Leonard, [BSD Unix: Power to the people, from the code](https://www.salon.com/2000/05/16/chapter_2_part_one/), 2000.
4. Marshall Kirk McKusick, "Twenty Years of Berkeley Unix," in the Korean edition of [Open Sources: Voices from the Open Source Revolution](http://www.hanbit.co.kr/store/books/look.php?p_code=E5329835060), Hanbit Media, 2013.

[1]: https://people.eecs.berkeley.edu/~prabal/resources/osprelim/RT74.pdf
[2]: https://www.oreilly.com/openbook/opensources/book/kirkmck.html
