// 1
// Обявіть інтерфейс Book, який включає такі поля:
// id - число
// title - рядок
// author - рядок
// available - логічний
// category – категорія

interface IBook {
    id: number,
    title: string,
    author: string,
    available: boolean,
    category: Category,
}

enum Category {
    JavaScript = "JavaScript",
    CSS = "CSS",
    HTML = "HTML",
    TypeScript = "TypeScript",
    Angular = "Angular"
}

// 2
// Створіть функцію printBook(), яка повинна приймати один параметр - книгу та виводити у консоль фразу book.title + by + book.author.
// Використайте інтерфейс Book для типу параметра.

function printBook(book: IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

// 3
// Обявіть змінну myBook і присвойте їй наступний об'єкт

const myBook: IBook = {
	id: 5,
	title: 'Colors, Backgrounds, and Gradients',
	author: 'Eric A. Meyer',
	available: true,
    category: Category.CSS,
    pages: 200
	// year: 2015,
	// copies: 3
}

// Викличте функцію printBook() та передайте їй myBook. Жодних помилок при цьому не повинно з'являтися.

printBook(myBook);

// 4
// Додайте до інтерфейсу Book властивість pages: number.Ви отримаєте помилку у функції getAllBooks().
// Щоб помилка не виникала, зробіть властивість необов'язковою.

interface IBook {
    pages?: number
}

getAllBooks();

// 5
// Вкажіть явно для змінної myBook тип Book.Ви знову отримаєте помилку.
// Видаліть властивості year, copies.Додайте властивість pages: 200.

// 6
// Додайте в інтерфейс Book необов'язкову властивість markDamaged, яка є методом.
// Метод повинен приймати рядковий параметр reason і нічого не повертати.
// Додайте цей метод до myBook.Метод повинен виводити рядок`Damaged: ${reason}`.
// Викличте цей метод та передайте рядок 'missing back cover'.

interface IBook {
    markDamaged?(reason: string): void
}

myBook.markDamaged = (reason: string): void => {
    console.log(`Damaged: ${reason}`);
}

myBook.markDamaged('missing back cover');

// 7
// Об’явіть інтерфейс DamageLogger, який описуватиме тип функції, яка повинна приймати один рядковий параметр і нічого не повертати.

interface DamageLogger {
    (damage: string): void
}

// 8
// Внесіть зміни до інтерфейсу Book: використайте інтерфейс DamageLogger для поля markDamaged.

interface IBook {
    markDamaged?: DamageLogger
}

// 9
// Об’явіть інтерфейс Person, який містить дві рядкові властивості – name і email.

interface Person {
    name: string,
    email: string
}

// 10
// Об’явіть інтерфейс Author на основі інтерфейсу Person, який розширює вказаний інтерфейс числовою властивістю numBooksPublished.

interface Author extends Person {
    numBooksPublished: number
}

// 11
// Об’явіть інтерфейс Librarian на основі інтерфейсу Person, який розширює цей інтерфейс двома властивостями:
// Рядкова властивість department
// Функція assistCustomer, яка повинна приймати два рядкові параметри custName і bookTitle і нічого не повертати.

interface Librarian extends Person {
    department: string,
    assistCustomer(custName: string, bookTitle: string): void
}







function getAllBooks(): IBook[] {
      const books: IBook[] = [
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];

    return books;
}

