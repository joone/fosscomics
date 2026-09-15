---
title: 2. Alan Turing and Von Neumann
date: "2019-05-29"
image: feature.webp
description: Alan Turing described an abstract machine that clarified what computation could mean. From wartime codebreaking and ENIAC's plugboards to the stored-program designs of EDVAC, ACE, and EDSAC, this episode traces how Turing, John von Neumann, and several engineering teams contributed to the architecture of modern computers.
tags: Alan Turing, Von Neumann, Kurt Gödel, EDVAC, EDSAC, Automatic Computing Engine
---

:::panels columns="2" label="Alan Turing and John von Neumann"
![Portrait of Alan Turing.](images/alan_turing.webp "Alan Turing (1912-1954) size:80%")
![Portrait of John von Neumann.](images/john_von_neumann.webp "John von Neumann (1903-1957) size:80%")
:::

Who first built a computer like the ones we use today?

During World War II, teams in several countries began developing electronic computers to speed up wartime calculations such as codebreaking and artillery tables.

## The Turing machine: possibilities and limits of computation

But before physical computers appeared, British mathematician [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) was thinking about a different question.

In 1928, mathematicians David Hilbert and Wilhelm Ackermann posed what became known as the Entscheidungsproblem, or decision problem:

![David Hilbert stands with his arms folded beside a speech bubble.](images/David_Hilbert_en.webp "David Hilbert (1862-1943)")
> "Could every problem in logic be solved automatically by a fixed procedure?"

More precisely, they asked whether an algorithm could determine whether any statement in first-order logic is valid. But answering that question first required a precise definition of what it means to calculate by following a fixed procedure.

In 1936, Turing proposed a remarkably simple imaginary machine: it would read one symbol at a time from a long tape, write or erase symbols according to a finite set of rules, and move left or right along the tape.

![Alan Turing walks with his hands behind his back, deep in thought.](images/pdf_walking_en.webp "size:80%")
> "Can a machine decide whether any statement in logic is valid?"

Today, we call this model the [Turing machine](https://en.wikipedia.org/wiki/Turing_machine).

Turing used it to show that **no mechanical procedure can decide every problem in logic**. In other words, no matter how sophisticated an algorithm may be, **some problems cannot be solved by computation**.

His work also introduced another important idea. Instead of building a separate machine for each calculation, the rules describing another machine could be encoded on the tape, allowing a single machine to perform many kinds of computation. Turing called this a "universal machine."

This idea appeared in his 1936 paper, ["On Computable Numbers, with an Application to the Entscheidungsproblem"](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf).

![A worker manually feeds a long paper tape marked with binary symbols through a machine.](images/pdf_tape_en.webp "size:80%")
> "If the rules are written on the tape, the machine can follow them?"

This was not a blueprint for a physical computer. Turing's machine was an abstract mathematical model intended to explain computation.

Still, the idea that one machine could perform many kinds of computation by following stored instructions became an important theoretical precursor to the general-purpose stored-program computer.

## War and the first computers

Around World War II, these mathematical ideas began to take physical form. Teams in the United States, Britain, and elsewhere developed electronic computers, while several groups helped advance practical architectures that stored programs in memory.

:::panel rounded="true"
During World War II, Turing helped design an improved British Bombe that was used to decipher messages encrypted by the German Enigma machine, making an important contribution to Allied cryptanalysis[&lbrack;2&rbrack;][2].

![A woman operates rows of rotating drums on a large British Bombe machine.](images/pdf_bombe_en.webp "A British-built Bombe used during World War II")
:::

Many computing machines built during the war were designed for specific tasks. As the war was nearing its end, however, the United States was developing [ENIAC](https://en.wikipedia.org/wiki/ENIAC), a general-purpose electronic computer. J. Presper Eckert, John Mauchly, and their team at the University of Pennsylvania began building it in 1943 and completed it in 1946. The U.S. Army initially used ENIAC to calculate artillery firing tables.

![J. Presper Eckert and John Mauchly stand side by side; Mauchly folds his arms.](images/pdf_engineers_en.webp "size:70%")

Programming ENIAC was very different from programming a modern computer. Instead of loading a program from memory, operators configured switches and connected cables on its plugboards. Running a different program required them to reconfigure the machine.

![A programmer reconnects cables on ENIAC's plugboards while a colleague checks notes.](images/pdf_wiring_en.webp)
> "Is this really programming?" \
> "It's a start."

ENIAC weighed about 30 tons, contained roughly 18,000 vacuum tubes, and consumed around 150 kilowatts of power[&lbrack;3&rbrack;][3].

![A vacuum tube has metal electrodes inside a glass envelope and connector pins below its base.](images/pdf_tube.webp "A vacuum tube used in ENIAC size:40%")

## EDVAC and the stored-program design

The ENIAC team next began designing EDVAC for the U.S. Army's Ballistic Research Laboratory, making it one of the earliest stored-program computer projects. John von Neumann joined the project as a consultant, and the widely circulated [First Draft of a Report on the EDVAC](http://www.virtualtravelog.net/wp/wp-content/media/2003-08-TheFirstDraft.pdf) appeared under his name. The design stored instructions and data in the same memory. EDVAC was delivered in 1949 but became fully operational later; meanwhile, the Manchester Baby had run a stored program in 1948.

![J. Presper Eckert and John Mauchly examine the EDVAC plans while John von Neumann takes notes nearby.](images/pdf_edvac_report_en.webp "J. Presper Eckert and John Mauchly led the team that designed and built EDVAC. So what exactly was John von Neumann's role? size:90%")

Storing instructions in memory meant that a new program could be loaded without rewiring the computer for every task. Hardware and software still depended on one another, but changing the computation no longer required redesigning its physical connections.

![A character labeled HW waves as a smaller character labeled SW runs away, representing hardware and software.](images/pdf_hardware_software_en.webp "size:80%")


:::panel rounded="true"
Most general-purpose computers still use variants of what became known as the [von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture).

```mermaid
%%{init: {"look": "handDrawn", "theme": "neutral", "themeVariables": {"fontSize": "18.67px"}}}%%
flowchart LR
	INPUT["Input Device"]

	subgraph COMPUTER["Computer"]
		direction TB

		subgraph CPU["Central Processing Unit"]
			direction TB
			CU["Control Unit"]
			ALU["Arithmetic/Logic Unit"]
		end

		MEMORY["Memory Unit"]
		CPU <--> MEMORY
	end

	OUTPUT["Output Device"]
	INPUT --> CPU
	CPU --> OUTPUT

	style COMPUTER fill:#d1d5db,stroke:#6b7280,stroke-width:2px,color:#111111
	style CPU fill:#ffffff,stroke:#262626,stroke-width:3px,color:#111111
	style CU fill:#e5e7eb,stroke:#262626,stroke-width:2px,color:#111111
	style ALU fill:#e5e7eb,stroke:#262626,stroke-width:2px,color:#111111
	style MEMORY fill:#ffffff,stroke:#262626,stroke-width:3px,color:#111111
	style INPUT fill:#ffffff,stroke:#262626,stroke-width:3px,color:#111111
	style OUTPUT fill:#ffffff,stroke:#262626,stroke-width:3px,color:#111111
```
(Adapted from [Wikipedia](https://en.wikipedia.org/wiki/Von_Neumann_architecture#/media/File:Von_Neumann_Architecture.svg))
:::

As the diagram shows, a basic von Neumann architecture consists of a central processing unit (CPU), memory, and input/output devices. The CPU contains an arithmetic logic unit (ALU), which performs arithmetic and logical operations; processor registers, which hold values needed immediately; and a control unit. The control unit includes registers such as the instruction register and program counter. Memory stores both instructions and data. During the fetch-decode-execute cycle, the CPU retrieves an instruction, interprets it, performs the operation, and stores any result[&lbrack;6&rbrack;][6].

## Britain's stored-program computers: ACE and EDSAC

Britain's National Physical Laboratory obtained von Neumann's EDVAC report in 1945.

![An NPL official reads a report at a desk piled with documents.](images/pdf_report_arrives_en.webp "size:90%")
> "The Americans have already drawn up plans for a stored-program computer!"

The laboratory then asked Turing to design a stored-program computer along the lines of EDVAC. Beginning in 1945, Turing worked on the [Automatic Computing Engine (ACE)](https://en.wikipedia.org/wiki/Automatic_Computing_Engine), giving him an opportunity to turn ideas from his theoretical work into a practical computer design.


![Alan Turing discusses computer plans with an NPL official across a desk.](images/pdf_npl_en.webp "size:80%")
> "We need a computer like EDVAC." \
> "I have a design of my own."

Although Turing's [ACE report](https://www.amazon.com/Turings-Report-1946-Other-Papers/dp/0262031140), presented in 1946, came after von Neumann's EDVAC report, it contained a detailed design for a stored-program computer. Turing kept the hardware to a minimum and proposed implementing even some arithmetic operations in software. In this respect, ACE anticipated ideas later associated with reduced instruction set computer (RISC) processors. Delays in funding and construction frustrated Turing, and in 1947 he returned to Cambridge on leave before the full ACE could be built[&lbrack;4&rbrack;][4].


![Alan Turing holds a rolled blueprint with a frustrated expression.](images/pdf_funding_en.webp "size:80%")
> "The design is ready. Why haven't they approved the funding?"

Maurice Wilkes, who led the EDSAC project at Cambridge, studied the EDVAC report.

![Maurice Wilkes reads an open report at a table.](images/pdf_wilkes_en.webp "size:80%")
> "So this is how we could build a digital computer."

:::panel rounded="true"
Elsewhere in Britain, Cambridge University's Mathematical Laboratory completed the [Electronic Delay Storage Automatic Calculator (EDSAC)](https://en.wikipedia.org/wiki/EDSAC) in 1949, drawing on the stored-program design described in the EDVAC report.
Meanwhile, Turing's ACE design continued to influence work at NPL, which built a smaller version called the [Pilot ACE](https://en.wikipedia.org/wiki/Pilot_ACE). It ran its first program in 1950.

![A researcher holding a folder stands beside the room-sized EDSAC computer.](images/pdf_edsac_en.webp "EDSAC size:80%")
:::

## Turing and von Neumann

Alan Turing's 1936 concept of a universal machine was an important theoretical precursor to the stored-program computer. In the United States, John von Neumann, J. Presper Eckert, John Mauchly, and others subsequently contributed to the development of the stored-program architecture through the EDVAC project, while British teams pursued their own implementations. Interestingly, Turing studied for his Ph.D. at Princeton University from 1936 to 1938, while von Neumann was a professor at the nearby Institute for Advanced Study. The two knew one another, and von Neumann, who was familiar with Turing's work on computability, later offered Turing a position. Some historians have therefore suggested that Turing's ideas may have influenced von Neumann's thinking. However, the extent of that influence is uncertain, and von Neumann's 1945 EDVAC report did not cite Turing's 1936 paper.

![John von Neumann and Alan Turing face one another in conversation.](images/pdf_conversation_en.webp "size:80%")
> "Alan, could you tell me more about your universal machine?" \
> "Of course."

They may have had a conversation like this, though no record of it survives.

## The commercial potential of computers

:::panel rounded="true"
During World War II, Britain, Germany, and the United States all developed pioneering computing machines, but the war shaped what happened to them afterward. In Britain, Colossus was built in secret to help break German ciphers. Most Colossus machines were dismantled after the war, and the project remained secret for decades. Germany also produced pioneering computers, including Konrad Zuse's machines, but wartime destruction and Germany's defeat disrupted further development.

![A researcher protests as an official directs a truck loaded with computing equipment away.](images/2_11.webp)
> "Could we use these machines for other purposes?" \
> "No. The project must remain secret."
:::

In the United States, immigrants including von Neumann made major contributions alongside engineers, mathematicians, programmers, universities, companies, and government laboratories. Strong government support and a growing commercial market then helped the United States develop the world's largest early computer industry.

:::panels columns="3" label="Alan Turing, John von Neumann, and Kurt Gödel"
![Portrait of Alan Turing.](images/alan_turing.webp "Alan Turing (1912-1954) earned a Ph.D. from Princeton University and developed a mathematical model of computation.")
![Portrait of John von Neumann.](images/john_von_neumann.webp "John von Neumann (1903-1957), a Hungarian immigrant, worked on the design of the stored-program computer.")
![Portrait of Kurt Gödel.](images/Kurt_Friedrich_G%C3%B6del.webp "Kurt Gödel (1906-1978) was born in Austria-Hungary and later became a U.S. citizen. His incompleteness theorems helped set the stage for the development of the Turing machine.")
:::


## References

1. [Turing_machine, Wikipedia](https://en.wikipedia.org/wiki/Turing_machine)
2. [Alan_Turing, Wikipedia](https://en.wikipedia.org/wiki/Alan_Turing)
3. [History_of_computing_hardware, Wikipedia](https://en.wikipedia.org/wiki/History_of_computing_hardware)
4. [The universal computer, p.167~168, CRC press, 2012](https://www.amazon.com/Universal-Computer-Road-Leibniz-Turing/dp/1466505192)
5. [Gödel's incompleteness theorems, Wikipedia](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems)
6. [Central processing unit, Wikipedia](https://en.wikipedia.org/wiki/Central_processing_unit)


[1]: https://en.wikipedia.org/wiki/Turing_machine "Turing Machine, Wikipedia"
[2]: https://en.wikipedia.org/wiki/Alan_Turing "Alan_Turing, Wikipedia"
[3]: https://en.wikipedia.org/wiki/History_of_computing_hardware "History_of_computing_hardware, Wikipedia"
[4]: https://www.amazon.com/Universal-Computer-Road-Leibniz-Turing/dp/1466505192 "The universal computer, p.167~168, CRC press, 2012"
[6]: https://en.wikipedia.org/wiki/Central_processing_unit "Central processing unit, Wikipedia"
