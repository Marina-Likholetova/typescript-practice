// 2
// Реалізуйте функцію logFirstAvailable(), яка приймає масив книг як параметр і виводить у консоль:
// •	кількість книг у масиві
// •	назву першої доступної книги
// Запустіть функцію logFirstAvailable()
import { Book, getAllBooks } from "./task1";


function logFirstAvailable(books: Book[]): void {
    const firstAvailableBook = books.find(book => book.available)?.title || "No available books";

    console.log(`Quantity of books: ${books.length}`);
    console.log(`The title of the first availble book: ${firstAvailableBook}`);
}

logFirstAvailable(getAllBooks());