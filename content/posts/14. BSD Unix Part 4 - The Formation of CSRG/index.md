---
title: "14. BSD Unix, Part 4 - CSRG (Computer Systems Research Group)"
date: "2026-11-07"
image: feature.webp
description: "DARPA funding brings Berkeley's CSRG together. After shipping 4BSD and tuning Unix to compete with VMS, the team releases 4.1BSD instead of 5BSD."
tags: BSD
comicReviewReference: user-41bsd-arrived
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

::::panels columns="2"
:::panel title="true" rounded="true" style="border-width: 3px;border-color: black;"
# BSD Unix, Part 4<br>CSRG (Computer Systems Research Group)

![Five researchers gather around a table beneath the title introducing CSRG.](images/csrg-title.webp "valign:bottom zoom:120% align:center")

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

In the late 1970s, the Defense Advanced Research Projects Agency (DARPA) wanted research institutions to share software more easily over [ARPANET][2].

![A DARPA representative in a suit addresses the research institutions.](images/discussing-research-network.en.webp)

<!-- dialogue: darpa-research-cooperation -->
> We need to share software\
> with labs and universities\
> over ARPANET. But that's\
> hard when everyone uses\
> a different OS.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![An official at a desk speaks to a colleague holding a document.](images/choosing-an-operating-system.en.webp)

<!-- dialogue: darpa-os-choice -->
> Let's figure out which\
> operating system best\
> fits our needs.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Representatives from several institutions listen to a speaker around a meeting table.](images/meeting-research-contractors.en.webp)

<!-- dialogue: darpa-meeting-agenda -->
> It's almost time to replace our computers.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![The speaker raises a hand while discussing the institutions' computers.](images/replacing-research-computers.en.webp)

<!-- dialogue: darpa-replacement-cycle -->
> The biggest expense will be porting our\
> research software to the new computers.
<!-- /dialogue -->

<!-- dialogue: darpa-porting-cost -->
> We need an OS that\
> makes it easier to port\
> research software between\
> different computers.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![The same speaker raises a finger to make another point.](images/different-hardware.en.webp)

<!-- dialogue: darpa-software-sharing -->
> Even with ARPANET, sharing software is hard\
> when hardware and operating systems differ.
<!-- /dialogue -->

<!-- dialogue: darpa-single-vendor -->
> But we can't all use\
> the same hardware.\
> Every lab has different needs.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A participant raises his hand to offer an alternative.](images/unifying-operating-systems.en.webp)

<!-- dialogue: researcher-common-os -->
> We need an OS that can\
> be used across\
> research institutions.
<!-- /dialogue -->

<!-- dialogue: researcher-shared-software -->
> That would make it easier\
> to run our research software\
> on different computers.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![The same participant points upward as he proposes Unix.](images/proposing-unix.en.webp)

<!-- dialogue: researcher-unix-proposal -->
> How about Unix?
<!-- /dialogue -->

<!-- dialogue: researcher-unix-portability -->
> It's written in C and easy\
> to port to different computers.\
> It's already used at universities\
> and research labs.
<!-- /dialogue -->

:::
::::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A participant cups a hand beside his mouth for an aside about ARPANET.](images/arpanet-already-connected.en.webp)

<!-- dialogue: researcher-existing-arpanet -->
> By the way, ARPANET\
> will eventually\
> switch to TCP/IP.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![The DARPA representative lifts both hands at the suggestion of Berkeley's BSD.](images/choosing-berkeley.en.webp)

<!-- dialogue: darpa-berkeley-proposal -->
> Good idea! Berkeley's BSD\
> has been well received.\
> Let's ask\
> Professor Fabry's group\
> to take on the project.
<!-- /dialogue -->

:::
::::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Bob Fabry speaks to Bill Joy, who is typing a proposal at his desk.](images/writing-the-proposal.en.webp)

<!-- dialogue: fabry-proposal-question -->
> Thanks to BSD, we've landed a\
> great opportunity! So, Bill...\
> finished that proposal?
<!-- /dialogue -->

<!-- dialogue: bill-proposal-answer -->
> Working on it.
<!-- /dialogue -->

<!-- dialogue: bill-proposal-aside -->
> Coding, shipping tapes...\
> and now proposals? I've got\
> to get out of here...
<!-- /dialogue -->

:::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

In April 1980, Professor Bob Fabry signed a contract with DARPA to improve Unix.

![The DARPA representative shakes hands with Bob Fabry, who carries a folder.](images/signing-the-darpa-contract.en.webp)

<!-- dialogue: darpa-contract-congratulations -->
> Congratulations,\
> Professor!
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Bob Fabry raises a loosely clenched fist as he talks about building the team.](images/recruiting-the-team.en.webp)

<!-- dialogue: fabry-recruit-team -->
> Bill, let's build a team.\
> Find us some good people.
<!-- /dialogue -->

:::
::::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

[Bob Fabry](https://en.wikipedia.org/wiki/Bob_Fabry) established the Computer Systems Research Group (CSRG) at UC Berkeley to carry out the work. Over time, its contributors included [Keith Bostic](https://en.wikipedia.org/wiki/Keith_Bostic_(software_engineer)), [Bill Joy](https://en.wikipedia.org/wiki/Bill_Joy), [Marshall Kirk McKusick](https://en.wikipedia.org/wiki/Marshall_Kirk_McKusick), [Samuel J. Leffler](https://en.wikipedia.org/wiki/Sam_Leffler), and [Michael J. Karels](https://en.wikipedia.org/wiki/Mike_Karels)—researchers who would play leading roles in CSRG.

![Five CSRG researchers sit around a table with papers in front of them.](images/csrg-researchers.webp "desktop-size:60%")

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Keeping the work going wasn't easy. Fabry dealt with university bureaucracy and disputes with AT&T, and helped keep DARPA funding coming so the researchers could concentrate on development.

![On the left, Fabry blocks a black-cloaked figure with a glowing sword; on the right, he reaches for research money flying away.](images/supporting-the-research.en.webp)

<!-- dialogue: fabry-administration-and-licensing -->
> University red tape!\
> AT&T disputes!
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Released in October 1980, 4BSD added job control, automatic rebooting, and a filesystem with 1 KB blocks. Under an agreement with AT&T, Unix source code was included in the distribution. Nearly 150 copies shipped in about nine months.

![Five people pack BSD tapes and envelopes around a table.](images/shipping-4bsd.en.webp)

<!-- dialogue: researcher-unix-included -->
> Now that we're including the\
> Unix source, BSD should be\
> easier to install.
<!-- /dialogue -->

<!-- dialogue: fabry-pack-tapes -->
> Come on, we've got 150 tapes to pack!
<!-- /dialogue -->

<!-- dialogue: bill-shared-work -->
> Much easier\
> with a team.
<!-- /dialogue -->

:::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A blond colleague brings news of a benchmark paper, startling Bill Joy.](images/hearing-about-vms.en.webp)

<!-- dialogue: colleague-vms-benchmark -->
> Hey Bill, this paper says\
> Unix is slower than\
> VMS on the VAX.
<!-- /dialogue -->

<!-- dialogue: bill-benchmark-surprise -->
> What?!
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Bill Joy reads a paper beside a small portrait of VMS developer Dave Cutler.](images/reading-the-benchmark.en.webp)

<!-- dialogue: dave-cutler-taunt -->
> Ha! Unix has a long way to go!
<!-- /dialogue -->

<!-- dialogue: dave-cutler-label -->
> Dave Cutler\
> (VMS developer)
<!-- /dialogue -->

<!-- dialogue: bill-read-benchmark -->
> Looks like they're right. I'd\
> better take a look at the kernel.
<!-- /dialogue -->

:::
::::

Note: SRI's David Kashtan compared Unix and VMS performance on the VAX. Bill Joy responded by improving the kernel, reaching performance comparable to VMS on the same benchmark. See [reference 1](#reference-1).

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![With the moon outside his window, Bill Joy works on kernel code at a terminal.](images/tuning-the-kernel.en.webp)

<!-- dialogue: bill-tuning-goal -->
> BSD has to be\
> faster than VMS.
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A colleague watches from behind as Bill Joy discusses his changes at the terminal.](images/planning-5bsd.en.webp)

<!-- dialogue: colleague-bill-working -->
> What are you\
> doing, Bill?
<!-- /dialogue -->

<!-- dialogue: bill-kernel-performance -->
> I tweaked the kernel a bit. Looks like BSD can\
> keep up with VMS now.
<!-- /dialogue -->

<!-- dialogue: bill-next-release -->
> Time to release 5BSD!
<!-- /dialogue -->

:::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

![Bob Fabry frowns while holding a telephone receiver.](images/hearing-the-naming-objection.en.webp)

<!-- dialogue: fabry-5bsd-objection -->
> We can't call\
> it 5BSD?
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

![A cloaked figure with AT&T written on his back speaks on the phone from an armchair.](images/att-naming-objection.en.webp)

<!-- dialogue: att-customer-confusion -->
> It could be confused with\
> our upcoming System V.
<!-- /dialogue -->

:::
::::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

BSD added and changed a great deal of code, but it still included AT&T's Unix code. Distribution and use therefore remained subject to AT&T's license terms.

![A blond colleague asks a question as Bill Joy clenches a fist over the rejected release name.](images/bill-and-the-release-name.en.webp)

<!-- dialogue: colleague-bill-frustrated -->
> Why so upset?
<!-- /dialogue -->

<!-- dialogue: bill-name-rejected -->
> Just saw Fabry.\
> AT&T says we\
> can't call it 5BSD.
<!-- /dialogue -->

:::

::::panels columns="2"
:::panel rounded="true" style="border-width: 3px;border-color: black;"

The faster release finally arrived in June 1981 as 4.1BSD, not 5BSD.<sup>[1][1]</sup>

![A long-haired user holds up a tape labeled 4.1BSD.](images/receiving-41bsd.en.webp)

<!-- dialogue: user-41bsd-arrived -->
> 4.1BSD is\
> finally here!
<!-- /dialogue -->

:::

:::panel rounded="true" style="border-width: 3px;border-color: black;"

Unix began at Bell Labs, but distributing its source let users study and modify the code. Many outside contributors added new features and improvements, helping Unix evolve rapidly.

![The same user tries 4.1BSD at a terminal.](images/trying-41bsd.en.webp)

<!-- dialogue: user-41bsd-faster -->
> Wow! Much faster\
> than 4BSD!
<!-- /dialogue -->

:::
::::

**References**

1. <span id="reference-1"></span>Marshall Kirk McKusick, [Twenty Years of Berkeley Unix][1], in *Open Sources: Voices from the Open Source Revolution*, 1999. DARPA's contract, CSRG, and the development and distribution of 4BSD and 4.1BSD. [Korean edition, Hanbit Media](http://www.hanbit.co.kr/store/books/look.php?p_code=E5329835060), 2013.
2. SRI International, [ARPANET][2]. The first connection in 1969 and the network linking research institutions.
3. Andrew Leonard, [BSD Unix: Power to the people, from the code][3], *Salon*, 2000.
4. The Unix Heritage Society, [System V][4]. System V Release 1 first shipped in January 1983.

[1]: https://www.oreilly.com/openbook/opensources/book/kirkmck.html
[2]: https://www.sri.com/hoi/arpanet/
[3]: https://www.salon.com/2000/05/16/chapter_2_part_one/
[4]: https://wiki.tuhs.org/doku.php?id=systems:sys5
