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