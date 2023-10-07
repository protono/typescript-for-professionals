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