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