// Find a Diophantine Solution to the equation:
//               3x+2y=14

const r = /^((?:111)+)((?:11)+)$/
const fourteen = '1'.repeat(14)

const [_, x, y] = fourteen.match(r)

console.log(x.length/3, y.length/2)
// 4 1
