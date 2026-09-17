---
title: 7. MIT Hacker Culture and ITS
date: "2022-12-18"
image: pdf_night_en.webp
description: The hacker culture at MIT had roots in the Tech Model Railroad Club, whose members later programmed computers including the PDP-1. This experimentation fostered the hacker ethos, leading to the development of one of the earliest and most influential computer games, Spacewar!, and the ITS. The open, collaborative nature of ITS at the MIT AI Lab, accessible through ARPAnet, significantly influenced hacker culture and laid the groundwork for the free/open-source software movement...
tags: ITS, Hacker, PDP-1, PDP-6, DEC, ARPAnet, MIT AI Lab, Multics
---

## From Model Trains to Computers

MIT's hacker culture started with the [Tech Model Railroad Club](https://en.wikipedia.org/wiki/Tech_Model_Railroad_Club) at MIT. This club built a model railroad and developed relay systems to keep the trains from colliding with each other[&lbrack;1&rbrack;][1].

![Three TMRC members stand around a model railroad, considering how to prevent collisions.](images/pdf_railroad_en.webp)
> "How do we keep the trains from crashing?"\
> "What if we controlled them with the new PDP-1?"\
> "Hmm..."

![One club member reacts with surprise as another proposes writing a PDP-1 control program.](images/pdf_control_en.webp)
> "Control the trains with the PDP-1?" \
> "Sure. We'd just write a control program."

For reference, the video below shows how a computer can be used to control moving model trains.
<div style="text-align:center">
<iframe src="https://www.youtube.com/embed/dqLUUXWgba4?si=f4QZp3gTxWdDRnrt" title="YouTube video player" style="display:block; width:100%; max-width:560px; aspect-ratio:16 / 9; margin:0 auto; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

The [PDP series](https://en.wikipedia.org/wiki/Programmed_Data_Processor), made by Digital Equipment Corporation (DEC), contributed greatly to hacker culture, and later models provided an important environment for the birth of free software. These relatively inexpensive computers were particularly popular at universities and helped establish the minicomputer category. For reference, DEC donated a PDP-1 to MIT in 1961[&lbrack;2&rbrack;][2].

![A club member points out the PDP-1's round display while another looks puzzled.](images/pdf_display_en.webp "size:80%")
> "What's that round thing?" \
> "That? It's the display. It shows you what the computer's doing."

## Late Nights and Spacewar!

Members of the Tech Model Railroad Club spent more time with the TX-0 and, later, the PDP-1.

![Two programmers work at the PDP-1 late at night beside a stack of pizza boxes.](images/pdf_pizza_en.webp "size:70%")

![A manager sits behind a desk marked Dean and frowns at the electric bill.](images/pdf_bill_en.webp "size:70%")
> "How did the electric bill get this high?"

![The manager reads a report and orders the computer room locked.](images/pdf_lock_en.webp "size:80%")
> "Lock the computer room at night." \
> "They don't study... They should just build model trains."

![Three programmers find the Computer Room door marked Closed and No Entry at Night.](images/pdf_door_en.webp "size:90%")
> "Locked out after dinner." \
> "Should've ordered pizza."

![Two students help a reluctant friend climb through a high window.](images/pdf_window_en.webp "size:90%")
> "Do I really have to do this?" \
> "Of course. This is history. One of the first computer games is being made right now!"

![The two programmers continue working at the PDP-1 through the night.](images/pdf_night_en.webp "size:70%")

For fun, the students created one of the earliest and most influential computer games, called [Spacewar!](https://en.wikipedia.org/wiki/Spacewar/)[&lbrack;4&rbrack;][4].

![A student walks away from the PDP-1 as two others keep working at its display.](images/pdf_depart_en.webp "size:80%")
> "Mission accomplished. I'm off to the AI Lab."

## The AI Group and the Birth of ITS

MIT's early hacker community also had close ties to the AI research group led by Marvin Minsky, a pioneer of artificial intelligence, and John McCarthy, the creator of Lisp. Their involvement spanned different periods: McCarthy moved to Stanford in 1962[&lbrack;6&rbrack;][6], while Richard Stallman joined the MIT Artificial Intelligence Laboratory (AI Lab) much later, in 1971[&lbrack;7&rbrack;][7].

:::panels columns="3" label="Richard Stallman, Marvin Minsky, and John McCarthy"
![Richard Stallman holds a reel of tape labeled Pascal.](images/rms.webp "Richard Stallman size:70%")
![Marvin Minsky wears glasses and a suit and gestures with one hand.](images/marvin_minsky.webp "Marvin Minsky size:70%")
![John McCarthy, with glasses and a beard, stands with his arms crossed.](images/john_mccarthy.webp "John McCarthy size:70%")
:::

When [Project MAC](https://www.multicians.org/project-mac.html) began in 1963, Minsky's AI group became part of it[&lbrack;5&rbrack;][5]. Another group within Project MAC was developing an operating system called [Multics](https://en.wikipedia.org/wiki/Multics) with GE and Bell Labs. MIT's initial Multics system used the GE-645[&lbrack;8&rbrack;][8].

![A person stands among rows of large computer cabinets in a Multics machine room.](images/pdf_multics_en.webp "General Electric model GE-645")

But the AI programmers disagreed with the direction of Multics' design and began developing their own operating system, ITS (Incompatible Timesharing System), in 1967[&lbrack;3&rbrack;][3]. In 1970, the group split from Project MAC to become the independent AI Lab[&lbrack;5&rbrack;][5].

![Two AI group programmers discuss building their own operating system instead of Multics.](images/pdf_own_os_en.webp "size:80%")
> "Is Multics ever going to be finished?"\
> "Why don't we build our own operating system?"

MIT hacker [Tom Knight](https://en.wikipedia.org/wiki/Tom_Knight_(scientist)) (right) developed the first kernel for ITS.

![Tom Knight proposes the name ITS to another programmer.](images/pdf_name_en.webp)
> "MIT had the Compatible Time-Sharing System. Let's call this one ITS." \
> "Incompatible Timesharing System?"

Actual development started on the PDP-6, and it was all written in assembly language.

![A programmer writes assembly code beside a PDP-6 console and paper-tape reader.](images/pdf_assembly_en.webp "size:70%")
> "I'm writing ITS in assembly."

## An Open System and a Culture of Sharing

At the time, the ITS operating system had a unique user environment rarely found today. In the early days, people could use the system without logging in, and users who identified themselves did not need a password. All files, including documentation and source code, could be edited by anyone.

![A smiling ITS user sits at a terminal with a loose cable hanging from it.](images/pdf_open_en.webp "size:80%")
> "No password?" \
> "And anyone can edit the files."

In addition, it was possible to access ITS not only inside MIT but also from other institutions or schools through ARPAnet. The wide-open ITS philosophy and collaborative online community had a great impact on hacker culture and the free and open source software movement, and anticipated the open, collaborative knowledge-sharing model later embodied by wikis[&lbrack;3&rbrack;][3].

![A line labeled ARPANET connects the MIT AI Lab's PDP-10 to a user labeled UC Berkeley and ITS access.](images/pdf_arpanet_en.webp "Access to ITS from other universities")

Richard Stallman, who later started the free software movement, also participated in the development of the ITS operating system as a member of the community while working at the MIT AI Lab beginning in 1971, where he was influenced by the hacker culture.

![Richard Stallman stands at a row of large computer cabinets in the MIT AI Lab.](images/7_16.webp "size:80%")

At many institutions, software was treated as part of the hardware package and was shared and used without separate payment. Some companies also distributed their software with source code, allowing users to modify and copy it.

These practices were not universal; commercial software already existed too.

![One programmer hands another a reel containing the ITS source code.](images/pdf_sharing_en.webp "size:80%")
> "Here's the ITS source code." \
> "Thanks. Dinner's on me next time."

## References

1. Hacker, [Wikipedia](https://en.wikipedia.org/wiki/Hacker)
2. PDP-1, [Wikipedia](https://en.wikipedia.org/wiki/PDP-1)
3. Incompatible Timesharing System, [Wikipedia](https://en.wikipedia.org/wiki/Incompatible_Timesharing_System)
4. Spacewar!, [Computer History Museum](https://www.computerhistory.org/pdp-1/spacewar/)
5. Project MAC, [Multics History Project](https://www.multicians.org/project-mac.html)
6. John McCarthy, [Wikipedia](https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist))
7. The GNU Project, [Richard Stallman](https://www.gnu.org/gnu/thegnuproject.en.html)
8. GE-645 Multics System, Artist's Rendition, [MIT, Jerome H. Saltzer](https://web.mit.edu/saltzer/www/multics.html)

[1]: https://en.wikipedia.org/wiki/Hacker "Hacker, Wikipedia"
[2]: https://en.wikipedia.org/wiki/PDP-1 "PDP-1, Wikipedia"
[3]: https://en.wikipedia.org/wiki/Incompatible_Timesharing_System "Incompatible Timesharing System, Wikipedia"
[4]: https://www.computerhistory.org/pdp-1/spacewar/ "Spacewar!, Computer History Museum"
[5]: https://www.multicians.org/project-mac.html "Project MAC, Multics History Project"
[6]: https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist) "John McCarthy, Wikipedia"
[7]: https://www.gnu.org/gnu/thegnuproject.en.html "The GNU Project, Richard Stallman"
[8]: https://web.mit.edu/saltzer/www/multics.html "GE-645 Multics System, Artist's Rendition, MIT, Jerome H. Saltzer"
