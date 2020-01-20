
const print = require('.')

print.green.bgBlack `Coucou [yellow: mon [:brave] Hercule], comment ça va ?`
print.error.red.bgBlack `Coucou [yellow][red.underline] mon [bold] brave Hercule[reset], comment ça va ?`
