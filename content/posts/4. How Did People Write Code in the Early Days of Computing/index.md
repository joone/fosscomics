---
title: 4. How Did People Write Code in the Early Days of Computing?
date: "2022-12-03"
image: feature.png
description: Early programmers moved from rewiring machines to stored programs, assembly language, paper tape, and punched-card batch processing.
tags: ENIAC, Machine Code, EDSAC, Assembly Language, Multics, Punch Card, Fortran
---

When computers were first introduced, how did people write code for them? In fact, there was no software similar to what we have today. Many functions were implemented as separate functional units in circuits. [ENIAC](https://en.wikipedia.org/wiki/ENIAC) could run different programs by wiring those units together and setting switches, a process that could take days. Punched cards were used for input and output, not to store its programs[&#91;1&#93;][1][&#91;4&#93;][4].

![Two engineers stand beside separate room-sized computers and gesture toward their control panels.](images/4_1.png "size:80%")
> "This one does arithmetic." \
> "That one breaks German military codes."

![An engineer studies two banks of wartime computing equipment while considering a purpose-built computer for ballistic calculations.](images/4_2.png "size:80%")
> "Could I build one for ballistic calculations?" \
> "How many relays and vacuum tubes would it need?"

Programming became much more practical when stored-program computers were introduced. A program could be loaded into electronic memory and executed without rewiring the machine. The Manchester Baby ran a stored program in 1948, and [EDSAC](https://en.wikipedia.org/wiki/EDSAC) entered regular operation in 1949. [EDVAC](https://en.wikipedia.org/wiki/EDVAC) was highly influential in the development of the stored-program design, although it became operational later.

A program is made up of instructions that a machine can understand and execute. At the lowest level, these instructions are called [machine code](https://en.wikipedia.org/wiki/Machine_code). Machine code is encoded as patterns of binary digits, or zeros and ones, which are difficult for people to read and remember.

![A programmer in dark glasses stares at rows of binary digits with an exclamation mark overhead.](images/4_3.png "size:70%")

That is why assembly language appeared early in the history of computer programming. Assembly language made machine instructions easier to express with short symbolic codes called mnemonics. EDSAC programmers used single-letter order codes, while a hard-wired bootstrap called the Initial Orders loaded programs from paper tape and translated those codes into instructions[&lbrack;2&rbrack;][2].

![A diagram divides two 17-bit EDSAC instructions into an operation code, an unused bit, a ten-bit operand, and a length bit, alongside the mnemonics T0S and H2S.](images/4_4.png "size:80%")

Each EDSAC instruction occupied a 17-bit word: a five-bit operation code, one unused bit, a ten-bit address, and a final bit selecting a short or long operand.

The two EDSAC assembly instructions shown above can be explained as follows:

- `T 0 S`: Store the value in the accumulator at memory address `0`, then clear the accumulator by resetting it to `0`.
- `H 2 S`: Load the value stored at memory address `2` into the multiplier register, preparing it for a multiplication operation.
- The final `S` indicates that the instruction uses EDSAC's short-word format.

As you can see, raw binary instructions are difficult for people to understand and remember. Assembly language therefore represents each low-level instruction, or operation code, with a mnemonic. Converting assembly language into machine code is called assembling.

![A programmer writes T0S and H2S on one board while a machine writes the corresponding binary instructions on another.](images/4_5.png)

In the early days, programmers sometimes did this work by hand, so the process was called hand assembly. Without an assembler, they had to translate assembly code into machine code manually by consulting mnemonic conversion tables. Symbolic assembly languages were already in use by the late 1940s and early 1950s, before high-level languages became common.

![A programmer writes code on paper at a desk beside a model rocket.](images/4_11.png "size:70%")
> "I'm writing code."

Interactive terminals with keyboards and displays remained uncommon in the early 1960s. [Multics](https://en.wikipedia.org/wiki/Multics), whose design began in 1964-65 as a joint project of MIT Project MAC, Bell Labs, and General Electric, was intended to let many users work interactively through remote terminals[&lbrack;3&rbrack;][3]. By the 1970s, screen-and-keyboard terminals had become much more common. But before such terminals became common, how did programmers write code and check the results?

![A smiling programmer uses a keyboard beside a large computer with tape reels, a display, and a printer.](images/4_6.png "size:70%")
> "At last, a keyboard and a monitor."

Early programmers often used punched cards to write code. Since the late nineteenth century, punched cards had been used to record and store data for machine processing, including work for the U.S. Census Bureau. The basic idea is loosely comparable to a modern OMR ([optical mark recognition](https://en.wikipedia.org/wiki/Optical_mark_recognition)) sheet: information is encoded by marking, or in this case punching, specific positions.

IBM standardized its widely adopted 80-column card in 1928 and supplied cards, keypunches, readers, and tabulating equipment around the world. Punched cards later became an important medium for entering programs and data into computers[&lbrack;5&rbrack;][5].

![A hand holds a yellow punched card labeled as a Fortran program.](images/4_7.png "Punch card for Fortran programming size:60%")

Programmers first wrote source code on coding sheets and checked it by hand. They or a keypunch operator then punched the program onto cards, usually with one source statement per card. Depending on the language and computer, an assembler or compiler translated the submitted program into machine code.

![A programmer types at a keypunch machine while a punched card feeds through it.](images/4_8.png "IBM 026 keypunch machine size:70%")
> "I'd better get this code onto punched cards."

Programmers submitted their card decks to a computer-room operator, who loaded each job into a card reader. They often waited in line to submit a deck and might not receive the printed results until much later. If the program failed, they had to correct or replace the affected cards and submit the deck again.

![Four programmers queue with punched cards while an operator accepts jobs at the machine-room window.](images/4_9.png)
> "Could you check this, please?" \
> "Next."

Before a program was punched onto cards, copying it could be as simple as transcribing someone else's handwritten source code.

![Joone glances sideways and secretly copies another programmer's handwritten code before it is entered onto a punched card.](images/4_10.png "size:70%")

## References
1. [Celebrating Penn Engineering History: ENIAC](http://www.seas.upenn.edu/about-seas/eniac/operation.php)
2. [EDSAC Initial Orders and Squares Program](http://www.cl.cam.ac.uk/~mr10/edsacposter.pdf)
3. [History of Multics](https://www.multicians.org/history.html)
4. [ENIAC, Computer History Museum](https://www.computerhistory.org/revolution/birth-of-the-computer/4/78)
5. [The IBM Punched Card](https://www.ibm.com/history/punched-card)

[1]: http://www.seas.upenn.edu/about-seas/eniac/operation.php "Celebrating Penn Engineering History: ENIAC"

[2]: http://www.cl.cam.ac.uk/~mr10/edsacposter.pdf "EDSAC Initial Orders and Squares Program"

[3]: https://www.multicians.org/history.html "History of Multics"

[4]: https://www.computerhistory.org/revolution/birth-of-the-computer/4/78 "ENIAC, Computer History Museum"

[5]: https://www.ibm.com/history/punched-card "The IBM Punched Card"
