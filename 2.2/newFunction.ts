export function myFunction(myNum: number): string {
    if (myNum == 5) {
        return 'true'
    } else if (myNum < 5 && myNum >= 0) {
        return 'false'
    } else if (myNum > 5) {
        return 'big'
    } else if (myNum < 0) {
        return 'negative'
    }
}
console.log(myFunction(-2));
console.log(myFunction(50));
console.log(myFunction(4));
console.log(myFunction(5))