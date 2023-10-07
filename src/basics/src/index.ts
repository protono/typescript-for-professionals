/** Primitive Types */
let isOK: boolean = false
let num: number = 5.8
let hello: string = 'world'
let noValue: undefined = undefined
let doesNotExist: null = null
let wish: symbol = Symbol('star')
let bigNum: bigint = 24n

/** Instance Types */
let regexp: RegExp = new RegExp('ab+c')
let array: Array<number> = [1, 1, 2, 3, 5, 8]
let set: Set<number> = new Set([1, 2, 3, 5, 8])
/** A first in first out collection */
class Queue<T>{
    private data: Array<T> = []
    push(item: T): void { this.data.push(item) }
    pop(): T | undefined { return this.data.shift() }
}
let queue: Queue<number> = new Queue()

/** Arrays and Tuples */
let array2: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let array3: number[] = [1, 2, 3, 4, 5]
array2 = [1]
array3 = [1, 2, 3]
// array3='hello' // Error

// Tuple
let tuple: [number, number] = [0, 0]
tuple = [1, 1]
// tuple = [5] // Error
// tuple = [3, 5, 7] // Error
// tuple = ['hello', 'world'] // Error

/** Object Types andf Type Aliases */
type Point = { x: number, y: number }
let center: Point = {
    x: 0,
    y: 0,
}
let unit: Point = {
    x: 1,
    y: 1,
}

/** const Declarations */
const point: Point = { x: 0, y: 0 }
// point = { x: 1, y: 1}  // Error
// All other behaviors are still the same as 'let'
point.x = 1
point.y = 1

// Functions
function add(a: number, b: number): number {
    return a + b
}
function log(message: string): void {
    console.log('LOG:', message)
}

function sum(...values: number[]): number {
    return values.reduce((previous, current) => {
        return previous + current
    })
}
sum(1, 2)
sum(0, 0, 0)

// 1st-class Functions
type MyType = (a: number, b: number) => number
let myAdd: MyType
myAdd = function (a: number, b: number): number {
    return a + b
}

// Structural Typing
// same Type signature
type User = { id: string }
type Product = { id: string }
let user: User = { id: 'user-qieu76' }
let product: Product = { id: 'product-907843' }
user = product
product = user
// different Type signature
type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }
let p2d: Point2D = { x: 0, y: 0 }
let p3d: Point3D = { x: 0, y: 0, z: 0 }
/** Extra info is OK */
p2d = p3d
function takesPoint2D(point: Point2D) {/** */ }
takesPoint2D(p3d) // also called ducktyping
/** Error: missing info */
// p3d = p2d
// function takesPoint3D(point: Point3D) {/** */ }
// takesPoint3D(p2d)