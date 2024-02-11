// 1
// Реалізуйте функцію getAllBooks(), яка повертає колекцію книжок. Об’явіть цю колекцію всередині функції.
// [
// { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true},
// { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
// { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true },
// { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true }
// ]

export type Book = {
    id: number,
    title: string,
    author: string,
    available: boolean
}

export function getAllBooks(): Book[] {
    const books = [
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true},
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true }
    ]
    return books;
}

console.log(getAllBooks());
