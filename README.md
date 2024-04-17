![](docs/images/fosscomics_home.jpg)

# F/OSS Comics

F/OSS Comics is a comic series dedicated to Free and Open Source Software. The comics aim to educate and entertain readers about the world of free and open source software.

Explore the comics at [fosscomics.com](https://fosscomics.com) or directly read them in this repository:

- [1. Charles Babbage and Ada Lovelace](content/posts/1.%20Charles%20Babbage%20and%20Ada%20Lovelace/index.md)
- [2. Alan Turing and Von Neumann](content/posts/2.%20Alan%20Turing%20and%20Von%20Neumann/index.md)
- [3. The Era of Commercial Computers](content/posts/3.%20The%20Era%20of%20Commercial%20Computers/index.md)
- [4. How Did People Write Code in the Early Days of Computing](content/posts/4. How Did People Write Code in the Early Days of Computing/index.md)
- [5. The Beginning of Software Engineering](content/posts/5. The Beginning of Software Engineering/index.md)
- [6. The Origin of the Hacker Culture](content/posts/6. The Origin of the Hacker Culture/index.md)
- [7. ITS and Hacker Culture](content/posts/7. ITS and Hacker Culture/index.md)
- [8. The Origins of Unix and the C Language](content/posts/8. The Origins of Unix and the C Language/index.md)

## About the Repository

This repository hosts the source code used to generate the static website for F/OSS Comics.

The static webpage generator was adapted from [kartiknair's blog](https://github.com/kartiknair/blog) and is styled using the [Archie theme](https://github.com/athul/archie). I've customized the generator to better suit the needs of the F/OSS Comics series.

## How to Build and View the Comics
To build the static website for the comics, run:

```bash
npm run build
```

After building the site, you can start a local web server to view the comics:

```
npm start
```

Open your web browser and navigate to http://localhost:3000 to read the comics.

## Contributions

I welcome contributions and feedback on the comics and the website. If you have suggestions or want to contribute, please submit a pull request or join the discusstions.

## License

- The [Archie theme](https://github.com/athul/archie) is licensed under its original license([MIT](https://github.com/athul/archie?tab=MIT-1-ov-file#readme)).
- Node.js code in this project is licensed under the [BSD 3-Clause "New" or "Revised" License](https://opensource.org/licenses/BSD-3-Clause).
- All rights to the comics files (Markdown, images, and generated contents) are reserved. Contact me for specific usage permissions.
