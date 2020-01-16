#### Enjoyable library for colorful printing in the console

`cute-print` is an alternative to well-known libraries like [chalk](https://www.npmjs.com/package/chalk) which focus on less typing, more readability and confort of use.

Note that colors will not display on windows console. If you work on windows, you should really consider using an external terminal tool like [cmder](https://cmder.net/) or [hyper](https://hyper.is/).

Also see [cute-dump](https://www.npmjs.com/package/cute-dump) if you need to pretty-dump an object.

## Usage

Import `print` :
```js
import print from 'cute-print'
// or
const print = require('cute-print')
```

Print a colored value :
```js
print `Hello [red: world]!`
print `Hello [red.bgWhite: world]!`

let who = 'world'
print `Hello [green.bold:${who}]!`

// the default style is 'bold'. Both are identical :
print `Hello [:${who}]!`
print `Hello [bold:${who}]!`
```

You can nest colors - although it becomes easily complex : (you should consider using the next syntax)
```js
print `Hello [red: world and [bold:universe]]!`
```

You can use a tag without the `:` - that will affect the string up to the end.
```js
print `Hello [red] world and [bold] universe!`
```

You can use `[reset]` to reset the style :
```js
print `Hello [red.bold] world and [reset] universe!`
```

You can also use a default styling for the whole string :
```js
print.red `Hello red world!`
print.red.bgWhite `Hello red world on white background!`
```

Printing on the `error` or `warning` streams :
```js
print.warn `You are a cute dangerous guy`
print.error `Something wrong happened`
print.error.red `Something wrong happened`
```

## Comparison with chalk

Remember that every library has its pros and cons - and everyone has its own preferences.

- `chalk` has support for *true colors*
- `chalk` can be used to manipulate any strings where `cute-print` purpose is only to print in the console
- `cute-print` has no dependencies
- `cute-print` is written in Typescript and so can be used in any Typescript project with zero effort
- `cute-print` has a cleaner syntax :

> The exemples are actually from my own code. I had a lot of logs to do and the syntax started to be painful so I decided to create this utilitary library.

```js
// chalk : 74 characters (~ +50%)
console.log(chalk.green('\n-' + chalk.bold(' The mole starts to sniff!')))
// cute-print : 50 characters
print.green `\n- [bold] The mole starts to sniff!`
```

```js
// chalk : 58 characters (~ +25%)
console.log(chalk.blueBright('Entities :'), total - empty)
// cute-print : 46 characters
print.brightBlue `Entities : ${total - empty}`
```

## Tag reference
You can mix any tag anytime by using a dot `.` as separator.

| Color   | Bright color  | Background color |
|---------|---------------|------------------|
| black   | brightBlack   | bgBlack          |
| red     | brightRed     | bgRed            |
| green   | brightGreen   | bgGreen          |
| yellow  | brightYellow  | bgYellow         |
| blue    | brightBlue    | bgBlue           |
| magenta | brightMagenta | bgMagenta        |
| cyan    | brightCyan    | bgCyan           |
| white   | brightWhite   | bgWhite          |

All tags marked with an asterisk `*` are not supported in many consoles.

| Style     | Effect                                |
|-----------|---------------------------------------|
| reset     | Reset all style and color             |
| bold      | Increase intensity                    |
| dim       | Decrease intensity                    |
| italic*   |                   |
| underline |                                       |
| blink*    |                                       |
| fastblink*|                   |
| reverse   | Swap foreground and background colors |
| hidden*   | Hide the given text                   |
| stroke*   | Strike text                           |
| default   |                                       |
