# @lezer-unofficial/printer

This is a parse tree pretty printer for the [lezer](https://lezer.codemirror.net) incremental parser.

## Usage

1. Install this package.

    ```console
    npm i @lezer-unofficial/printer
    ```

1. Generate a parser for your `.grammar`. I'll use `@lezer/javascript`.

1. Parse the code.

    ```ts
    import { parser } from "@lezer/javascript"
    import { printTree } from "@lezer-unofficial/printer"
    import { readFileSync } from "fs"

    const source = `
    function norm(a: number, b: number): number {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    }`
    const tree = parser.parse(source)
    ```

1. Print the tree with a built-in method.

    ```ts
    console.log(tree.toString())
    ```

    Output:

    ```console
    Script(FunctionDeclaration(function,VariableDefinition,ParamList("(",VariableDefinition,TypeAnnotation(":",TypeName),",",VariableDefinition,TypeAnnotation(":",TypeName),")"),TypeAnnotation(":",TypeName),Block("{",ReturnStatement(return,CallExpression(MemberExpression(VariableName,".",PropertyName),ArgList("(",BinaryExpression(CallExpression(MemberExpression(VariableName,".",PropertyName),ArgList("(",VariableName,",",Number,")")),ArithOp,CallExpression(MemberExpression(VariableName,".",PropertyName),ArgList("(",VariableName,",",Number,")"))),")"))),"}")))
    ```

1. Print the tree with `printTree` from this package.

    ```ts
    console.log(printTree(tree, source))
    ```

    Output:

    ```console
    Script [1:0..5:0]
    ┗━  FunctionDeclaration [2:0..4:1]
        ┣━  function [2:0..2:8]: "function"
        ┣━  VariableDefinition [2:9..2:13]: "norm"
        ┣━  ParamList [2:13..2:35]
        ┃   ┣━  ( [2:13..2:14]: "("
        ┃   ┣━  VariableDefinition [2:14..2:15]: "a"
        ┃   ┣━  TypeAnnotation [2:15..2:23]
        ┃   ┃   ┣━  : [2:15..2:16]: ":"
        ┃   ┃   ┗━  TypeName [2:17..2:23]: "number"
        ┃   ┣━  , [2:23..2:24]: ","
        ┃   ┣━  VariableDefinition [2:25..2:26]: "b"
        ┃   ┣━  TypeAnnotation [2:26..2:34]
        ┃   ┃   ┣━  : [2:26..2:27]: ":"
        ┃   ┃   ┗━  TypeName [2:28..2:34]: "number"
        ┃   ┗━  ) [2:34..2:35]: ")"
        ┣━  TypeAnnotation [2:35..2:43]
        ┃   ┣━  : [2:35..2:36]: ":"
        ┃   ┗━  TypeName [2:37..2:43]: "number"
        ┗━  Block [2:44..4:1]
            ┣━  { [2:44..2:45]: "{"
            ┣━  ReturnStatement [3:1..3:50]
            ┃   ┣━  return [3:1..3:7]: "return"
            ┃   ┗━  CallExpression [3:8..3:50]
            ┃       ┣━  MemberExpression [3:8..3:17]
            ┃       ┃   ┣━  VariableName [3:8..3:12]: "Math"
            ┃       ┃   ┣━  . [3:12..3:13]: "."
            ┃       ┃   ┗━  PropertyName [3:13..3:17]: "sqrt"
            ┃       ┗━  ArgList [3:17..3:50]
            ┃           ┣━  ( [3:17..3:18]: "("
            ┃           ┣━  BinaryExpression [3:18..3:49]
            ┃           ┃   ┣━  CallExpression [3:18..3:32]
            ┃           ┃   ┃   ┣━  MemberExpression [3:18..3:26]
            ┃           ┃   ┃   ┃   ┣━  VariableName [3:18..3:22]: "Math"
            ┃           ┃   ┃   ┃   ┣━  . [3:22..3:23]: "."
            ┃           ┃   ┃   ┃   ┗━  PropertyName [3:23..3:26]: "pow"
            ┃           ┃   ┃   ┗━  ArgList [3:26..3:32]
            ┃           ┃   ┃       ┣━  ( [3:26..3:27]: "("
            ┃           ┃   ┃       ┣━  VariableName [3:27..3:28]: "a"
            ┃           ┃   ┃       ┣━  , [3:28..3:29]: ","
            ┃           ┃   ┃       ┣━  Number [3:30..3:31]: "2"
            ┃           ┃   ┃       ┗━  ) [3:31..3:32]: ")"
            ┃           ┃   ┣━  ArithOp [3:33..3:34]: "+"
            ┃           ┃   ┗━  CallExpression [3:35..3:49]
            ┃           ┃       ┣━  MemberExpression [3:35..3:43]
            ┃           ┃       ┃   ┣━  VariableName [3:35..3:39]: "Math"
            ┃           ┃       ┃   ┣━  . [3:39..3:40]: "."
            ┃           ┃       ┃   ┗━  PropertyName [3:40..3:43]: "pow"
            ┃           ┃       ┗━  ArgList [3:43..3:49]
            ┃           ┃           ┣━  ( [3:43..3:44]: "("
            ┃           ┃           ┣━  VariableName [3:44..3:45]: "b"
            ┃           ┃           ┣━  , [3:45..3:46]: ","
            ┃           ┃           ┣━  Number [3:47..3:48]: "2"
            ┃           ┃           ┗━  ) [3:48..3:49]: ")"
            ┃           ┗━  ) [3:49..3:50]: ")"
            ┗━  } [4:0..4:1]: "}"
    ```

## Background

There was a [question](https://discuss.codemirror.net/t/whats-the-best-to-test-and-debug-grammars/2542/4) on the `CodeMirror` forum about the best way to test and debug a grammar.

This [example](https://lezer.codemirror.net/examples/test/) shows how to test a grammar.

For debugging, a user suggested printing the parse tree and provided the [code](https://gist.github.com/msteen/e4828fbf25d6efef73576fc43ac479d2).

I decided to package it because:

- Marijn [isn't going](https://github.com/lezer-parser/lezer/issues/45) to work on a pretty-printer.
- I found myself copying the gist into my second project.

## Related works

- [hast-util-from-lezer](https://github.com/joeltg/hast-util-from-lezer) - Render styled Lezer syntax trees to hast.
