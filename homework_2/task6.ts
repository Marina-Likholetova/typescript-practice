// 6
// Реалізуйте функцію getBookAuthorByIndex(), яка повинна приймати index книжки у масиві та повертати пару: назву книжки + автор.
// Використовуйте tuple для типу, що повертається.Викличте цю функцію.
// Внесіть зміни до типу, що повертається функцією getBookAuthorByIndex() – додайте мітки: title, author для типу tuple.
import { getAllBooks, BookWithCategory } from "./task3";

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const bookByIndex: BookWithCategory | undefined = getAllBooks()[index];

    return bookByIndex
        ? [bookByIndex.title, bookByIndex.author]
        : ["No title by this index", "No author by this index"]
    
}

