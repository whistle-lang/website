---
id: installation
title: Installation
---

The first step to begin using _Whistle_ is to install the _Whistle_ cli which
works on windows, linux and mac. It is also possible to use _Whistle_ from code
in any enviornment that can run modern javascript.

Installation of the _Whistle_ cli currently only requires one prerequisite:
[Deno](https://deno.land/). Deno is a modern javascript runtime created by the
same guy that created Node.js that attempts to improve and develop it further
without having to work with the outdated codebase of Node.js.

Running the following command in the terminal will install the _Whistle_ cli
which provides an easy to use interface to interact with the tokenizer, parser
and compiler:

```bash
$ deno install -Af https://raw.github.com/whistle-lang/whistle/master/cli/whistle.ts
```
