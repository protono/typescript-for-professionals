class Person {
    private _age: number
    constructor(age: number) {
        this._age = age
    }
    growOld1() {
        this._age++
    }
    growOld2 = () => {
        this._age++
    }
    age() {
        return this._age
    }
}

// Lexical Context
const person = new Person(0)
person.growOld1() // works
/** does not work as calling growOld1() will not include the calling context needed to infer 'this' */
const growOld1 = person.growOld1
// growOld1()
/** solution is to transfer the lexical context using an arrow function */
const growOld2 = person.growOld2
growOld2()
console.log('age: ', person.age())

// readonly Modifiers
type Point = {
    x: number,
    readonly y: number
}
const point: Point = {
    x: 0,
    y: 0
}

// Variable Assignment
// point = { x: 1, y: 0 } // cannot assign because point is a constant

// Property Assignment, however
point.x = 1
// point.y = 1 // cannot assign because point.y is readonly

// Read Property
console.log(`(${point.x}, ${point.y})`)

class Animal {
    readonly name: string
    constructor(name: string) {
        this.name = name
    }
}
const sheep = new Animal('sheep')
// sheep.name = 'wolf' // modifying not allaowed because point.y is readonly
// it can be read though
console.log(sheep.name)

// Union Types
/**
 * @param input a commasnd or array of commands
 * @returns a signle trimmed string
 */
function formatCommandLine(input: string | string[]) {
    let line = ''
    if (typeof input === 'string') {
        line = input.trim()
    } else {
        line = input.map(x => x.trim()).join(' ')
    }
    return line
}
console.log(formatCommandLine('hello '))
console.log(formatCommandLine(['hello ', 'world ']))
// console.log(formatCommandLine(1337)) // number is not assignable to union

/**
 * Takes a string and add `padding` to the left.
 * If `padding` is a number, as many spaces is added to the left.
 * If `padding` is a string, it is appended to the left.
 */
type Padding = number | string
function padLeft(value: string, padding: Padding) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value
    }
    if (typeof padding === 'string') {
        return padding + value
    }

    throw new Error(`Expected number or string, got ${typeof padding}`)
}
console.log(padLeft('1', 5))
console.log(padLeft('2', '     '))

// console.log(padLeft('3', true)) // when padding: any

// Literal Types
type CardinalDirection = 'North' | 'East' | 'South' | 'West'
let direction: CardinalDirection
direction = 'North'
// direction = 'north' // not assignable
function move(distInMtrs: number, direction: CardinalDirection) {
    console.log(`Moving ${distInMtrs} towards the ${direction}.`)
}

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6
function rollDice(): DiceValue {
    return (
        Math.floor(Math.random() * 6) + 1
    ) as DiceValue
}
if (rollDice() === 7) { throw new Error('Not possible') }