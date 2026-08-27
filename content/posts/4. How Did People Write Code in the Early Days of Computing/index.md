---
title: 4. How Did People Write Code in the Early Days of Computing?
date: "2022-12-03"
image: feature.png
description: Early programmers moved from rewiring machines to stored programs, assembly language, paper tape, and punched-card batch processing.
tags: ENIAC, Machine Code, EDSAC, Assembly Language, Multics, Punch Card, Fortran
---

How did people program the earliest computers? At first, a machine might be built for one particular kind of work, with much of its functionality embodied in its circuits. [ENIAC](https://en.wikipedia.org/wiki/ENIAC) could run different programs, but programmers had to configure switches and reconnect its plugboards. Punched cards were used for input and output, not to store its programs[&#91;1&#93;][1].

![](images/4_1.png "size:80%")
> "This one does arithmetic." \
> "That one breaks German military codes."

![](images/4_2.png "size:80%")
> "Could I build one for ballistic calculations?" \
> "How many relays this time? I'll need vacuum tubes too."

Stored-program computers made it possible to keep instructions in electronic memory and load a different program without rewiring the machine. The Manchester Baby ran a stored program in 1948, and [EDSAC](https://en.wikipedia.org/wiki/EDSAC) entered regular operation in 1949. [EDVAC](https://en.wikipedia.org/wiki/EDVAC) was highly influential in the development of the stored-program design, although it became operational later.

A program consists of instructions a machine can execute. At the lowest level, these instructions are [machine code](https://en.wikipedia.org/wiki/Machine_code), represented as binary numbers that are difficult for people to read and remember.

![Neo scans binary numbers](images/4_3.png "size:70%")

Assembly language made those instructions easier to express with short symbolic codes. EDSAC programmers used single-letter order codes, while a hard-wired bootstrap called the Initial Orders loaded programs from paper tape and translated those codes into instructions[&lbrack;2&rbrack;][2].

![](images/4_4.png "size:80%")

Each short EDSAC instruction occupied 17 bits: a five-bit operation code, one unused bit, a ten-bit address, and a final bit indicating a short or long operand.

For example, `T 0 S` stored the accumulator at memory address 0 and cleared it. `H 2 S` loaded the multiplier register from address 2.

Because raw binary instructions are hard to remember, assembly language represents each low-level operation with a mnemonic. Converting assembly language into machine code is called assembling.

![](images/4_5.png)

Before assembler programs became widely available, programmers sometimes translated mnemonics into machine code by hand using conversion tables, a process known as hand assembly. Symbolic assembly languages were already in use by the late 1940s and early 1950s, before high-level languages became common.

![](images/4_11.png "size:70%")
> "I’m writing code"

Interactive keyboards, displays, and teleprinter terminals existed before Multics, but most programmers still did not have direct, interactive access to a computer. Multics, designed beginning in 1964-65 by MIT Project MAC, Bell Labs, and General Electric, was intended to serve many users through remote terminals. By the 1970s, screen-and-keyboard terminals had become much more common. How did programmers work before then?

![](images/4_6.png "size:70%")
> "At last, a keyboard and a monitor."

Programmers often used punched cards to enter code. Punched cards had been used for data processing since the late nineteenth century, including work for the U.S. Census Bureau. Like a modern [optical mark recognition](https://en.wikipedia.org/wiki/Optical_mark_recognition) sheet, each position on a card represented information. IBM built a major business supplying punched-card equipment around the world.

![](images/4_7.png "Punch card for Fortran programming size:60%")

Programmers commonly drafted code on paper and checked it by working through the instructions in their heads. They or a keypunch operator then transferred the code to cards. Depending on the system and its software, a deck might contain machine code, assembly language, Fortran, or another language.

![](images/4_8.png "IBM 026 keypunch machine size:70%")
> "I'd better get this code onto punched cards."

Programmers submitted their card decks to a computer-room operator, who loaded and ran jobs in batches. They might wait hours to receive a printed result. A single mistake could mean punching replacement cards, returning to the queue, and trying again.

![](images/4_9.png)
> "Could you check this, please?" \
> "Next."

Because a program could be stored as a deck of cards, duplicating the deck with card-reproducing equipment also duplicated the program.

![](images/4_10.png "size:70%")

## References
1. [Celebrating Penn Engineering History: ENIAC](http://www.seas.upenn.edu/about-seas/eniac/operation.php)
2. [EDSAC Initial Orders and Squares Program](http://www.cl.cam.ac.uk/~mr10/edsacposter.pdf)
3. [History of the Computer Keyboard](http://theinventors.org/library/inventors/blcomputer_keyboard.htm)

[1]: http://www.seas.upenn.edu/about-seas/eniac/operation.php "Celebrating Penn Engineering History: ENIAC"

[2]: http://www.cl.cam.ac.uk/~mr10/edsacposter.pdf "EDSAC Initial Orders and Squares Program"

[3]: http://theinventors.org/library/inventors/blcomputer_keyboard.htm "History of the Computer Keyboard"
