// 3
// Об’явіть enum Category для зберігання наступних категорій книг: JavaScript, CSS, HTML, TypeScript, Angular.
// Додайте категорію до об'єктів у функції getAllBooks().
import { Book } from "./task1";

export enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

export type BookWithCategory = Book & {category: Category[]}

export function getAllBooks(): BookWithCategory[] {
      const books: BookWithCategory[] = [
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: [Category.JavaScript] },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: [Category.JavaScript] },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: [Category.CSS] },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: [Category.JavaScript] }
    ];

    return books;
}

// console.log(getAllBooks());
