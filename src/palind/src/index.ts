/**
 * @return true is the input string is a palindrome
 */
export function isPalindrome(str: string) {
    return str === str.split('').reverse().join('')
}