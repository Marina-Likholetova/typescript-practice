// 5
// Реалізуйте функцію logBookTitles(), яка повинна приймати масив рядків та виводити його в консоль.
// Викличте функції getBookTitlesByCategory() та logBookTitles().
import { Category } from "./task3";
import { getBookTitlesByCategory } from "./task4";

function logBookTitles(bookTitles: string[]): void {
    console.log(bookTitles);
}

logBookTitles(getBookTitlesByCategory(Category.JavaScript))
