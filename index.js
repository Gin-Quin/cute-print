"use strict";Object.defineProperty(exports, "__esModule", {value: true});
const colors = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	italic: "\x1b[3m",
	underline: "\x1b[4m",
	blink: "\x1b[5m",
	fastblink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",
	stroke: "\x1b[9m",
	default: "\x1b[10m",

	black: "\x1b[30m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m",

	brightBlack: "\x1b[90m",
	brightRed: "\x1b[91m",
	brightGreen: "\x1b[92m",
	brightYellow: "\x1b[93m",
	brightBlue: "\x1b[94m",
	brightMagenta: "\x1b[95m",
	brightCyan: "\x1b[96m",
	brightWhite: "\x1b[97m",

	bgBlack: "\x1b[40m",
	bgRed: "\x1b[41m",
	bgGreen: "\x1b[42m",
	bgYellow: "\x1b[43m",
	bgBlue: "\x1b[44m",
	bgMagenta: "\x1b[45m",
	bgCyan: "\x1b[46m",
	bgWhite: "\x1b[47m",

	bgBrightBlack: "\x1b[100m",
	bgBrightRed: "\x1b[101m",
	bgBrightGreen: "\x1b[102m",
	bgBrightYellow: "\x1b[103m",
	bgBrightBlue: "\x1b[104m",
	bgBrightMagenta: "\x1b[105m",
	bgBrightCyan: "\x1b[106m",
	bgBrightWhite: "\x1b[107m",
}
const colorKeys = Object.keys(colors).join('|')
const templateRegex = new RegExp(`\\[((?:${colorKeys})?(?:\\..*?)?)(?::|\\] ?)`, 'gi')


/** Return an ansi color from a list of color names separated by '.' **/
function getColor(scope, colorName) {
	let result = ''
	for (let color of colorName.split('.'))
		if (color)
			result += color == 'reset' ? colors.reset + scope : colors[color]
	return result
}

/** Transform the template strings to add color **/
function addColors(str, scope) {
	const lastIndexBefore = templateRegex.lastIndex
	templateRegex.lastIndex = 0
	let result = ''
	let lastIndex = 0

	for (let match = templateRegex.exec(str); match; match = templateRegex.exec(str)) {
		let [value, colorName] = match
		let {index} = match
		let color = getColor(scope, colorName || 'bold')
		let selfClosing = value[value.length-1] == ']' || value[value.length-2] == ']'

		result += str.slice(lastIndex, index) + color
		templateRegex.lastIndex = lastIndex = index + value.length

		if (selfClosing)
			continue

		// if not self-closing, we need to find the end of the closing bracket
		let stop = indexOfClosingBracket(str, index + value.length)
		let substr = str.substring(lastIndex, stop)
		substr = addColors(substr, scope + color)
		result += color
		result += substr
		result += colors.reset + scope
		templateRegex.lastIndex = lastIndex = stop + 1
	}

	result += str.slice(lastIndex)
	templateRegex.lastIndex = lastIndexBefore
	return result
}


/** Return the end of the next closing bracket. **/
function indexOfClosingBracket(str, x=0) {
	let c 
	let depth = 0

	while (c = str[x]) {
		if (c == '[')
			depth++
		else if (c == ']' && !depth--)
			return x
		x++
	}

	return x  // this library is permissive so we don't throw an error
}


/**  Main printing function **/
function printer(value = '') {
	const [print, scope] = this

	// if we have a template string, we transform it into a simple string
	if (typeof value != 'string') {
		// @ts-ignore
		let [raw, ...computed] = arguments
		value = raw[0] 
		for (let i=1; i < raw.length; i++)
			value += computed[i-1] + raw[i]
	}

	// add the colors
	value = addColors(value, scope)

	// print the value
	return print(scope + value + colors.reset)
}



/** Call this everytime you need to create a new printer **/
const get = (context, scope='') => ({
	get() {
		return newPrinter([context[0], context[1] + scope])
	}
})
const newPrinter = (context) => Object.defineProperties(printer.bind(context), {
	error: get([console.error, context[1]]),
	warn: get([console.error, context[1]]),

	bold: get(context, colors.bold),
	dim: get(context, colors.dim),
	italic: get(context, colors.italic),
	underline: get(context, colors.underline),
	blink: get(context, colors.blink),
	fastblink: get(context, colors.fastblink),
	reverse: get(context, colors.reverse),
	hidden: get(context, colors.hidden),
	default: get(context, colors.default),

	black: get(context, colors.black),
	red: get(context, colors.red),
	green: get(context, colors.green),
	yellow: get(context, colors.yellow),
	blue: get(context, colors.blue),
	magenta: get(context, colors.magenta),
	white: get(context, colors.white),
	cyan: get(context, colors.cyan),

	bgBlack: get(context, colors.bgBlack),
	bgRed: get(context, colors.bgRed),
	bgGreen: get(context, colors.bgGreen),
	bgYellow: get(context, colors.bgYellow),
	bgBlue: get(context, colors.bgBlue),
	bgMagenta: get(context, colors.bgMagenta),
	bgWhite: get(context, colors.bgWhite),
	bgCyan: get(context, colors.bgCyan),

	brightBlack: get(context, colors.black),
	brightRed: get(context, colors.red),
	brightGreen: get(context, colors.green),
	brightYellow: get(context, colors.yellow),
	brightBlue: get(context, colors.blue),
	brightMagenta: get(context, colors.magenta),
	brightWhite: get(context, colors.white),
	brightCyan: get(context, colors.cyan),

	bgBrightBlack: get(context, colors.bgBrightBlack),
	bgBrightRed: get(context, colors.bgBrightRed),
	bgBrightGreen: get(context, colors.bgBrightGreen),
	bgBrightYellow: get(context, colors.bgBrightYellow),
	bgBrightBlue: get(context, colors.bgBrightBlue),
	bgBrightMagenta: get(context, colors.bgBrightMagenta),
	bgBrightWhite: get(context, colors.bgBrightWhite),
	bgBrightCyan: get(context, colors.bgBrightCyan),
})


/** Export printers **/
const print = newPrinter([console.log, ''])
exports. default = print

// print.green.bgBlack `Coucou [yellow: mon [:brave] Hercule], comment ça va ?`
// print.error.red.bgBlack `Coucou [yellow][red.underline] mon [bold] brave Hercule[reset], comment ça va ?`
