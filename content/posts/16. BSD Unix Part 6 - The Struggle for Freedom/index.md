---
title: "16. BSD Unix, Part 6 - The Struggle for Freedom"
date: "2026-11-21"
image: feature-freedom.webp
description: "BSD's networking releases and license, the effort to replace AT&T's code, and the Unix lawsuit that followed."
tags: AT&T, BSD, CSRG, Unix
draft: false
comicReviewReference: user-request-code
comicTypography:
  desktopRem: 0.93
  mobileRem: 0.93
comicReviewTypography:
  desktopRem: 0.93
  mobileRem: 0.93
comicMaxWidth: 794
comicBreakpoint: 768
comicSpacing:
  panelMargin: "10px"
  adjacentPanelMargin: "10px"
  groupMargin: "10px"
  panelGap: "10px"
  panelPadding: "0"
  textPadding: "12px"
  textBottomPadding: "5px"
  textImageGap: "0"
---

- [BSD Unix, Part 1 - Unix Code Goes to UC Berkeley](/posts/11.%20BSD%20Unix%20Part%201%20-%20Unix%20Code%20Goes%20to%20UC%20Berkeley/)
- [BSD Unix, Part 2 - The Birth of the vi Editor](/posts/12.%20BSD%20Unix%20Part%202%20-%20The%20Birth%20of%20the%20vi%20Editor/)
- [BSD Unix, Part 3 - The Beginning of BSD Unix](/posts/13.%20BSD%20Unix%20Part%203%20-%20The%20Beginning%20of%20BSD%20Unix/)
- [BSD Unix, Part 4 - The Formation of CSRG](/posts/14.%20BSD%20Unix%20Part%204%20-%20The%20Formation%20of%20CSRG/)
- [BSD Unix, Part 5 - Bringing TCP/IP to BSD](/posts/15.%20BSD%20Unix%20Part%205%20-%20The%20Development%20of%20TCP-IP/)

::::panels columns="2" ratios="42:58"
:::panel title="true" rounded="true" style="border-width: 3px;border-color: black;"

# BSD Unix, Part 6
## The Struggle for Freedom

![A helmeted figure and a Unix developer cross red and blue lightsabers.](images/struggle-for-freedom.webp)

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Early Unix licenses cost just $99 a copy, with source code included. This was because of an agreement AT&T and IBM had made in the 1950s: IBM would stay out of the telephone business, and AT&T out of the computer business.

![At an AT&T Unix source-code stand, a customer, a professor, a company representative and a research-lab representative line up for tapes.](images/licensing-unix-en.en.webp "valign:bottom")

<!-- dialogue: licensing-cheap -->
> Too cheap.
<!-- /dialogue -->

<!-- dialogue: licensing-tape -->
> One tape,\
> please.
<!-- /dialogue -->

<!-- dialogue: licensing-schools -->
> Schools\
> too?
<!-- /dialogue -->

<!-- dialogue: licensing-companies -->
> Companies\
> too?
<!-- /dialogue -->

<!-- dialogue: licensing-labs -->
> Research\
> labs too?
<!-- /dialogue -->

:::
::::

::::panels columns="2" ratios="45:55"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

[Defense Advanced Research Projects Agency (DARPA)](https://en.wikipedia.org/wiki/DARPA) also valued Unix's source-code availability. That was why it chose [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) Unix over [DEC](https://en.wikipedia.org/wiki/Digital_Equipment_Corporation)'s [VMS](https://en.wikipedia.org/wiki/OpenVMS) for building the Internet [1].

![A DARPA representative folds his arms over three choices: a DEC VMS installation tape, a BSD installation tape and BSD source code.](images/choosing-bsd.webp)

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

But AT&T's breakup in 1984 opened the way for it to sell Unix commercially. AT&T abruptly raised the price from $99 to $250,000 [1].

![Two users stare at an AT&T Unix price-increase sign showing $99 becoming $250,000.](images/raising-license-prices.webp)

:::
::::

::::panels columns="2" ratios="45:55"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

BSD still required an AT&T license. When fees rose, some companies wanted its networking code separately.

![A user sits at a terminal and considers how to obtain BSD source code.](images/requesting-bsd-code.en.webp)

<!-- dialogue: user-request-code -->
> How can I get just BSD's\
> TCP/IP and vi source code?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Five CSRG researchers discuss a separate networking release around a table.](images/planning-networking-release.en.webp "valign:bottom")

<!-- dialogue: researcher-networking-request -->
> AT&T's raised the fees.\
> Users want just our\
> networking code and tools.
<!-- /dialogue -->

<!-- dialogue: researcher-separate-release -->
> Let's release our\
> networking code\
> and tools separately.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A standing researcher checks on a colleague working at a terminal.](images/checking-release-progress.en.webp)

<!-- dialogue: researcher-release-progress -->
> How's the release\
> coming?
<!-- /dialogue -->

<!-- dialogue: researcher-license-question -->
> Fine. What about\
> the license?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A researcher folds his arms as he proposes a BSD license.](images/proposing-bsd-license.en.webp)

<!-- dialogue: researcher-bsd-license -->
> Let's write our own BSD\
> license. Do what you like\
> with our code. Just put\
> the copyright notice in\
> the manual if you make a\
> product or redistribute\
> the source. That'll\
> throw AT&T off.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A researcher smiles up at his colleague from a terminal.](images/welcoming-freedom.en.webp "valign:bottom")

<!-- dialogue: researcher-too-free -->
> Anything goes, huh? Well, we don't want to put\
> restrictions on people like AT&T does.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

[CSRG](https://en.wikipedia.org/wiki/Computer_Systems_Research_Group) released its networking code and utilities as Networking Release 1 (Net/1) in June 1989. Its new BSD license allowed use without an AT&T source license. People could modify the code or redistribute it as source or binaries without paying Berkeley royalties. They had to retain the source copyright notices and credit UC Berkeley and its contributors in product documentation.

![Large red letters spell BSD against a white background.](images/releasing-net1.webp "size:60% align:center")

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A woman holds up a tape marked BSD while a man beside her raises a finger to ask a question.](images/receiving-net1.en.webp)

<!-- dialogue: user-received-net1 -->
> BSD's networking release\
> is finally here.
<!-- /dialogue -->

<!-- dialogue: user-net1-price -->
> How\
> much?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A user holds a tape in one hand as she explains how the release is distributed.](images/explaining-distribution.en.webp)

<!-- dialogue: user-tape-and-ftp -->
> They'll mail you a tape\
> for $1,000. Or download it\
> free by FTP. We can even\
> change and redistribute\
> the code without royalties.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

## Meanwhile, at CSRG

![A researcher in a BSD shirt speaks cheerfully while a colleague in a suit raises a hand to reply.](images/funding-development.en.webp)

<!-- dialogue: researcher-release-sales -->
> Professor, the networking\
> release is selling well.
<!-- /dialogue -->

<!-- dialogue: professor-development-funds -->
> Grants, tape sales...\
> Development's funded\
> for a while.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![CSRG researchers sit around a table as the bearded man in the middle opens the meeting.](images/starting-weekly-meeting.en.webp "valign:bottom")

<!-- dialogue: professor-weekly-meeting -->
> Time for the weekly meeting.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A researcher with a short beard extends a hand as he makes a proposal.](images/proposing-free-bsd.en.webp)

<!-- dialogue: researcher-free-bsd -->
> Professor, why don't we make a version of BSD\
> that doesn't require an AT&T Unix license?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![The bearded meeting chair sits with his hands together on the table.](images/considering-reimplementation.en.webp)

<!-- dialogue: professor-reimplementation-time -->
> We can't keep depending on AT&T.\
> We've already changed much of the kernel.\
> It's the tools and C library we need to rewrite.\
> Can we do it quickly?
<!-- /dialogue -->

:::
::::

::::panels columns="2" ratios="40:60"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A long-haired researcher raises a finger as he suggests seeking outside contributions.](images/inviting-contributions.en.webp)

<!-- dialogue: researcher-external-contributors -->
> Let's try. With help from\
> outside contributors, we can\
> rewrite the AT&T code.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

CSRG decided to rewrite AT&T's tools and C library. With help from outside contributors, most of the code was rewritten in eighteen months.

![Contributors work at terminals in four separate locations.](images/rewriting-unix-tools.webp)

:::
::::

::::panels columns="2"
:::panel narration="boxed" rounded="true" style="border-width: 3px;border-color: black;"

With most of AT&T's Unix code removed, a completely free BSD Unix was finally released in June 1991. The source was still available on tape for the $1,000 copying fee, or as a free download by FTP.

![A bearded man in glasses sits at a table and talks about selling BSD Unix.](images/releasing-net2.en.webp)

<!-- dialogue: professor-selling-bsd -->
> Now we can sell\
> BSD Unix too.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

[CSRG](https://en.wikipedia.org/wiki/Computer_Systems_Research_Group) founded a company called [BSDi](https://en.wikipedia.org/wiki/Berkeley_Software_Design) to sell BSD Unix commercially. The University of California also began selling BSD Unix in the early 1990s. An advertisement claimed it was 95% cheaper than AT&T Unix. That did not go down well with AT&T.

![A cloaked figure sits in a high-backed chair, reading an advertisement that says BSD Unix is 95% cheaper.](images/advertising-bsd.webp)

:::
::::

::::panels columns="2"
:::panel narration="boxed" rounded="true" style="border-width: 3px;border-color: black;"

## The Empire Strikes Back

In April 1992, AT&T subsidiary USL sued BSDi. UC Berkeley was added to the lawsuit later.

![A bearded man reads a document headed Complaint.](images/receiving-lawsuit.en.webp)

<!-- dialogue: researcher-lawsuit-surprise -->
> I thought we'd removed\
> all the AT&T code...\
> What's this?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

But AT&T's [Unix System V](https://en.wikipedia.org/wiki/UNIX_System_V) also included plenty of BSD code, such as virtual memory, TCP/IP and vi. The BSD license allowed anyone to use the code if they kept the copyright notices. AT&T removed those notices from the source and sold Unix as though it had written all the code itself.

![A slice labeled TCP/IP, Virtual Memory and VI is marked BSD code within a diagram of AT&T Unix source code.](images/bsd-in-system-v.webp)

:::
::::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A researcher on the left raises a finger in protest, the man in the middle explains, and the researcher on the right spills his coffee.](images/discussing-countersuit.en.webp)

<!-- dialogue: professor-att-lawsuit -->
> AT&T's suing us for distributing\
> Unix code without permission.
<!-- /dialogue -->

<!-- dialogue: researcher-bsd-in-system-v -->
> That's absurd. System V includes\
> our virtual memory, TCP/IP\
> and vi code.
<!-- /dialogue -->

<!-- dialogue: researcher-countersuit -->
> Exactly. We should\
> countersue.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

The BSD side filed a countersuit against AT&T.

![The cloaked figure in the high-backed chair now reads a complaint.](images/receiving-countersuit.webp "size:50%")

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

In February 1994, the two sides agreed that each could sell Unix, provided CSRG removed some remaining AT&T Unix code.

![A judge compares documents between piles of BSD Unix and AT&T Unix source code while a man on the right comments on his work.](images/settling-lawsuit-en.webp)

> It's the same code...\
> Wouldn't want his job.

Although BSD Unix began with AT&T's code, much of it had been rewritten, and evidence had emerged that AT&T had incorporated BSD's TCP/IP, virtual memory and vi code while removing copyright notices. But legal uncertainty hung over BSD distribution during the lawsuit, and the two years lost before a completely free BSD Unix appeared gave Linux room to grow.

:::

:::panel style="width:412px;align:center;"

![Linus Torvalds raises one hand as he speaks.](images/linus-on-bsd.en.webp "Linus Torvalds")

<!-- dialogue: linus-no-linux -->
> If I could have installed BSD Unix\
> on my Intel 386 PC,\
> I wouldn't have needed to write Linux.
<!-- /dialogue -->

:::

**That wraps up our six-part story of BSD Unix!**

# References

1. Andrew Leonard, [BSD Unix: Power to the people, from the code](https://www.salon.com/2000/05/16/chapter_2_part_one/), 2000
2. Marshall Kirk McKusick, [Twenty Years of Berkeley Unix, in Open Sources: Voices from the Open Source Revolution](http://www.hanbit.co.kr/store/books/look.php?p_code=E5329835060), Korean edition, Hanbit Media, 2013
3. [Computer Systems Research Group](https://en.wikipedia.org/wiki/Computer_Systems_Research_Group)
4. [The Design and Implementation of the 4.4BSD Operating System: Network Implementation](https://www.freebsd.org/doc/en/books/design-44bsd/overview-network-implementation.html)
5. Mike Linksvayer, [Interview with Linus Torvalds](https://gondwanaland.com/meta/history/interview.html), Meta Magazine, 1993
