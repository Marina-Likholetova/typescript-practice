import { Book } from './task1';
// 7
// Реалізуйте функцію calcTotalPages(), яка повинна підраховувати кількість сторінок книг у трьох бібліотеках міста, використовуючи такі дані:

// [
// { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
// { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
// { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
// ];
// Для підрахунків використовуйте тип bigint.
type Lib = {
    lib: string,
    books: number,
    avgPagesPerBook: number
}

function calcTotalPages(): bigint {
    const libs: Lib[] = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
 
    return libs.reduce((prev, curr) => prev + BigInt(curr.books * curr.avgPagesPerBook), 0n);
}

console.log(calcTotalPages());