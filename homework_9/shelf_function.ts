import { ShelfType, Books, IBook, IMagazine, Magazines } from './types';
import { isTypeBook } from './utils';
import { magazines, inventory } from './data';

interface BaseShelf {
    printTitles(): void;
}

interface ShelfWithBook extends BaseShelf {
    find(id: number): IBook | null;
    find(author: string): IBook | null;
    getFirst(): IBook | null;
    add(item: IBook): void;
}

interface ShelfWithMagazine extends BaseShelf {
    getFirst(): IMagazine | null;
    add(item: IMagazine): void;
}

function Shelf2(type: ShelfType.Book): ShelfWithBook;
function Shelf2(type: ShelfType.Magazine): ShelfWithMagazine;
function Shelf2(type: ShelfType.Book | ShelfType.Magazine) {
    const bookItems: Books = [];
    const magazineItems: Magazines = [];

    if (isTypeBook(type)) {
        return {
            add(item: IBook): void {
                bookItems.push(item);
            },
            getFirst(): IBook | null {
                return bookItems[0] || null;
            },
            printTitles(): void {
                console.log(`Titles: ${bookItems.map(item => item.title).join(', ')}`);
            },
            find(prop: number | string): IBook | null {
                return typeof prop === 'number'
                    ? bookItems.find(item => item.id === prop) || null
                    : bookItems.find(item => item.author === prop) || null;
            },
        } as ShelfWithBook;
    } else {
        return {
            add(item: IMagazine): void {
                magazineItems.push(item);
            },
            getFirst(): IMagazine | null {
                return magazineItems[0] || null;
            },
            printTitles(): void {
                console.log(`Titles: ${magazineItems.map(item => item.title).join(', ')}`);
            },
        } as ShelfWithMagazine;
    }
}

// Створюємо екземпляри
const magazineShelf = Shelf2(ShelfType.Magazine); // тип ShelfWithBook
const bookShelf = Shelf2(ShelfType.Book); // тип ShelfWithMagazine

// Наповнюємо
magazines.forEach(element => {
    magazineShelf.add(element);
});

inventory.forEach(element => {
    bookShelf.add(element);
});

// Bивід типів працює:
const firstMagazine = magazineShelf.getFirst(); // IMagazine | null
const firstBook = bookShelf.getFirst(); // IBook | null
