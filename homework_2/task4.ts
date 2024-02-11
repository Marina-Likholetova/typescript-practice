// 4
// Реалізуйте функцію getBookTitlesByCategory(), яка на вхід повинна отримувати категорію
// та повертати масив найменувань книг, що належать зазначеній категорії.

import { Category, getAllBooks } from "./task3";

export function getBookTitlesByCategory(category: Category): string[] {
    const booksByCategory: string[] = getAllBooks().flatMap(book => book.category.includes(category) ? book.title : []);
    
    return booksByCategory;
}


