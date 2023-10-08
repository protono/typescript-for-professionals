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
// if (rollDice() === 7) { throw new Error('Not possible') } // DiceValue and 7 have no overlap

// Narrowing the 'Object' Type
class Cat {
    meow() {
        console.log('Meow')
    }
}
class Dog {
    bark() {
        console.log('Woof')
    }
}
type Pet = Cat | Dog
function speak(pet: Pet) {
    // if dog bark, if cat meow
    typeof new Cat() === 'object' // we cannot use typeof to determine if a Pet is a Cat or a Dog
    // use instanceof instead
    if (pet instanceof Cat) { pet.meow() }
    if (pet instanceof Dog) { pet.bark() }
}

// When the objects are not instantited from a Class
type Square = {
    kind: 'square'
    size: number // represents height and width
}
type Rectangle = {
    kind: 'rectangle'
    width: number,
    height: number
}
type Shape = Square | Rectangle
function area(shape: Shape) {
    // if square, if rectangle
    // we cannot use instanceof here
    if ('size' in shape) { return shape.size * shape.size }
    if ('width' in shape) { return shape.width * shape.height }
}
// area({ size: 2 })
// area({ width: 3, height: 4 })

// Discriminated Unions
type Square2 = {
    kind: 'square'
    size: number // represents height and width
}
type Rectangle2 = {
    kind: 'rectangle'
    width: number,
    height: number
}
type Shape2 = Square2 | Rectangle2
function area2(shape: Shape2) {
    if (shape.kind === 'square') { return shape.size * shape.size }
    if (shape.kind === 'rectangle') { return shape.width * shape.height }
}

// Other example
type ValidationSuccess = { isValid: true, value: string }
type ValidationFailure = { isValid: false, reason: string }
type ValidationOutcome = ValidationSuccess | ValidationFailure
function logValidation(outcome: ValidationOutcome) {
    if (outcome.isValid) { console.log('Success, validated value: ', outcome.value) }
    if (!outcome.isValid) { console.log('Failure, error reason: ', outcome.reason) }
}