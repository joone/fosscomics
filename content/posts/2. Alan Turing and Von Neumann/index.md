---
title: 2. Alan Turing and Von Neumann
date: "2019-05-29"
image: feature.png
description: Alan Turing described an abstract machine that clarified what computation could mean. From wartime codebreaking and ENIAC's plugboards to the stored-program designs of EDVAC, ACE, and EDSAC, this episode traces how Turing, John von Neumann, and several engineering teams contributed to the architecture of modern computers.
tags: Alan Turing, Von Neumann, Kurt Gödel, EDVAC, EDSAC, Automatic Computing Engine
---

![Portraits of Alan Turing on the left and John von Neumann on the right.](images/feature.png "size:80%")

Who initially made the type of computer we use today? During and after World War II, teams in several countries worked to develop electronic computers. Years earlier, British mathematician Alan Turing had described a universal mathematical model in which one machine could carry out any computable procedure by reading an encoded description from its tape. This was an important theoretical precursor to the stored-program computer, although the architecture of practical stored-program machines was later developed through the work of several teams.

![Alan Turing walks with his hands behind his back, deep in thought.](images/2_1.png "size:80%")
> "I will find a way to prove Gödel's incompleteness theorems."

In 1928, [David Hilbert](https://en.wikipedia.org/wiki/David_Hilbert) and Wilhelm Ackermann posed the Entscheidungsproblem: could an algorithm determine whether any statement in first-order logic is valid? [Gödel's incompleteness theorems](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems), published in 1931, had already revealed limits in formal systems capable of expressing arithmetic. Turing approached the separate decision problem by defining a precise mathematical model of computation.

Turing submitted ["On Computable Numbers, with an Application to the Entscheidungsproblem"](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf) in 1936, and it was published in 1937. In it, he described an abstract machine that reads and writes symbols on a long tape according to a finite table of rules. This [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) provided a mathematical model of computation and showed that no universal procedure could solve the Entscheidungsproblem[&#91;1&#93;][1]. The symbols on its tape could encode both the data being processed and the instructions for processing it, anticipating the relationship between data and software in modern computers.

![A worker manually feeds a long paper tape marked with binary symbols through a machine.](images/2_2.png "size:80%")
> "Copying these symbols by hand is like copying the program."

During World War II, Turing helped design an improved British Bombe that was used to decipher messages encrypted by the German Enigma machine, making an important contribution to Allied cryptanalysis[&lbrack;2&rbrack;][2]. Many computing machines built during the war were designed for specific tasks. As the war was nearing its end, however, the United States was developing [ENIAC](https://en.wikipedia.org/wiki/ENIAC), a general-purpose electronic computer. J. Presper Eckert, John Mauchly, and their team at the University of Pennsylvania began building it in 1943 and completed it in 1946. The U.S. Army initially used ENIAC to calculate artillery firing tables.

Programming ENIAC was very different from programming a modern computer. Instead of loading a program from memory, operators configured switches and connected cables on its plugboards. Running a different program required them to reconfigure the machine. ENIAC weighed about 30 tons, contained roughly 18,000 vacuum tubes, and consumed around 150 kilowatts of power[&lbrack;3&rbrack;][3].

![Programmers reconnect cables on ENIAC's plugboards while a colleague checks notes.](images/2_3.png)
> "Is this really programming?" \
> "It's a start."

The ENIAC team next began designing EDVAC for the U.S. Army's Ballistic Research Laboratory, making it one of the earliest stored-program computer projects. John von Neumann joined the project as a consultant, and the widely circulated [First Draft of a Report on the EDVAC](http://www.virtualtravelog.net/wp/wp-content/media/2003-08-TheFirstDraft.pdf) appeared under his name. The design stored instructions and data in the same memory. EDVAC was delivered in 1949 but became fully operational later; meanwhile, the Manchester Baby had run a stored program in 1948.

![A researcher stands beside the cabinet-sized EDVAC computer.](images/2_4.png "size:90%")
> "Unlike ENIAC, EDVAC was designed to use binary arithmetic."

Most general-purpose computers still use variants of what became known as the [von Neumann architecture](https://en.wikipedia.org/wiki/Von_Neumann_architecture).


![A block diagram shows a CPU containing a control unit and arithmetic logic unit connected in both directions to memory.](images/image5.png "Von Neumann Architecture")
(From [wikipedia](https://en.wikipedia.org/wiki/Von_Neumann_architecture#/media/File:Von_Neumann_Architecture.svg))

As the diagram shows, a basic von Neumann architecture consists of a central processing unit (CPU), memory, and input/output devices. The CPU contains an arithmetic logic unit (ALU), which performs arithmetic and logical operations; processor registers, which hold values needed immediately; and a control unit. The control unit includes registers such as the instruction register and program counter. Memory stores both instructions and data. During the fetch-decode-execute cycle, the CPU retrieves an instruction, interprets it, performs the operation, and stores any result[&lbrack;6&rbrack;][6].

Britain's National Physical Laboratory obtained von Neumann's EDVAC report in 1945.

![A researcher holding von Neumann's design report speaks with Alan Turing beside a stored-program computer.](images/2_5.png "size:90%")
> "The Americans have already drawn up plans for a stored-program computer!"

The laboratory then asked Turing to design a stored-program computer along the lines of EDVAC. Beginning in 1945, Turing worked on the [Automatic Computing Engine (ACE)](https://en.wikipedia.org/wiki/Automatic_Computing_Engine), giving him an opportunity to turn ideas from his theoretical work into a practical computer design.


![Alan Turing discusses computer plans with an NPL official across a desk.](images/2_6.png "size:80%")
> "We need a computer like EDVAC." \
> "I have a design of my own."

Although Turing's [ACE report](https://www.amazon.com/Turings-Report-1946-Other-Papers/dp/0262031140), presented in 1946, came after von Neumann's EDVAC report, it contained a detailed design for a stored-program computer. Turing kept the hardware to a minimum and proposed implementing even some arithmetic operations in software. In this respect, ACE anticipated ideas later associated with reduced instruction set computer (RISC) processors. Delays in funding and construction frustrated Turing, and in 1947 he returned to Cambridge on leave before the full ACE could be built[&lbrack;4&rbrack;][4].


![Alan Turing holds a rolled blueprint with a frustrated expression.](images/2_7.png "size:80%")
> "The design is ready. Why haven't they approved the funding?"

Elsewhere in Britain, Cambridge University's Mathematical Laboratory completed the [Electronic Delay Storage Automatic Calculator (EDSAC)](https://en.wikipedia.org/wiki/EDSAC) in 1949, drawing on the stored-program design described in the EDVAC report.
Meanwhile, Turing's ACE design continued to influence work at NPL, which built a smaller version called the [Pilot ACE](https://en.wikipedia.org/wiki/Pilot_ACE). It ran its first program in 1950.

![A researcher holding a folder stands beside the room-sized EDSAC computer.](images/2_8.png "EDSAC size:80%")

Alan Turing's 1936 concept of a universal machine was an important theoretical precursor to the stored-program computer. In the United States, John von Neumann, J. Presper Eckert, John Mauchly, and others subsequently contributed to the development of the stored-program architecture through the EDVAC project, while British teams pursued their own implementations. Interestingly, Turing studied for his Ph.D. at Princeton University from 1936 to 1938, while von Neumann was a professor at the nearby Institute for Advanced Study. The two knew one another, and von Neumann, who was familiar with Turing's work on computability, later offered Turing a position. Some historians have therefore suggested that Turing's ideas may have influenced von Neumann's thinking. However, the extent of that influence is uncertain, and von Neumann's 1945 EDVAC report did not cite Turing's 1936 paper.

![John von Neumann and Alan Turing face one another in conversation.](images/2_9.png "size:80%")
> "Alan, could you tell me more about your universal machine?" \
> "Of course."

They may have had a conversation like this, though no record of it survives.

During World War II, Britain, Germany, and the United States all developed pioneering computing machines, but the war shaped what happened to them afterward. In Britain, Colossus was built in secret to help break German ciphers. Most Colossus machines were dismantled after the war, and the project remained secret for decades. Germany also produced pioneering computers, including Konrad Zuse's machines, but wartime destruction and Germany's defeat disrupted further development.

![A researcher protests as an official directs a truck loaded with computing equipment away.](images/2_10.png)
> "Could we use these machines for other purposes?" \
> "No. The project must remain secret."

In the United States, immigrants including von Neumann made major contributions alongside engineers, mathematicians, programmers, universities, companies, and government laboratories. Strong government support and a growing commercial market then helped the United States develop the world's largest early computer industry.

![Portraits of Alan Turing, John von Neumann, and Kurt Gödel from left to right. Turing earned a Ph.D. from Princeton University and developed a mathematical model of computation. Von Neumann, a Hungarian immigrant, worked on the design of the stored-program computer. Gödel was born in Austria-Hungary and later became a U.S. citizen; his incompleteness theorems helped set the stage for the development of the Turing machine.](images/2_11.png)


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
