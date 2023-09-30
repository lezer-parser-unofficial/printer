# printer

This is a parse tree pretty printer for the [lezer](https://github.com/lezer-parser/lr) incremental parser.

## Usage

If you use `npm`, add this package to `devDependencies` in `package.json`.

```json
"devDependencies": {
    "printer": "deemp/printer"
}
```

After you've [generated](https://github.com/lezer-parser/generator) a parser for your `.grammar` and prepared a `doc` string containing the code to parse, you can print a parse tree for this code.

```ts
import { parser } from "./parser"
import { printTree } from "printer"
import { readFileSync } from "fs"

const doc = readFileSync("path_to_file_with_code").toString()
writeFileSync("path_to_file_with_tree", printTree(parser.parse(doc), doc))
```

## Background

There was a [question](https://discuss.codemirror.net/t/whats-the-best-to-test-and-debug-grammars/2542/4) on the `CodeMirror` forum about the best way to test and debug a grammar.

This [example](https://lezer.codemirror.net/examples/test/) shows how to test a grammar.

For debugging, a user suggested printing the parse tree and provided the [code](https://gist.github.com/msteen/e4828fbf25d6efef73576fc43ac479d2).

I decided to package it because:

- Marijn [isn't going](https://github.com/lezer-parser/lezer/issues/45) to work on a pretty-printer.
- I found myself copying the gist into my second project.
