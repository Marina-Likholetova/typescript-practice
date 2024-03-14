import { ShelfType, IBook, IMagazine } from './types';
import { isItemBook, isBooks, assertsBooks, isMagazines, isItemMagazine } from './utils';
import { magazines } from './data';

class Shelf {
    private _items: IBook[] | IMagazine[] = [];

    constructor(_type: ShelfType.Book);
    constructor(_type: ShelfType.Magazine);
    constructor(readonly _type: ShelfType.Book | ShelfType.Magazine) {} // поле _type залишаю лише як допоміжне для месседжів у вийнятках

    add(item: IBook): void;
    add(item: IMagazine): void;
    add(item: IBook | IMagazine): void {
        if (isBooks(this._items) && isItemBook(item)) {
            this._items.push(item);
        } else if (isMagazines(this._items) && isItemMagazine(item)) {
            this._items.push(item);
        } else {
            throw new Error(`Type of the argument is not assignable to type ${this._type} `);
        }
    }

    getFirst(): IBook | null;
    getFirst(): IMagazine | null;
    getFirst(): (IBook | null) | (IMagazine | null) {
        const firstItem = this._items[0]; // IBook | IMagazine
        return isItemBook(firstItem)
            ? firstItem || null // IBook
            : firstItem || null; // IMagazine
    }

    printTitles(): void {
        console.log(`Titles: ${this._items.map(item => item.title).join(', ')}`);
    }

    find(id: number): IBook | null;
    find(author: string): IBook | null;
    find(prop: number | string): IBook | null {
        assertsBooks(this._items); // так як ми працюємо лише з полями які належать IBook то викликаю стверждувальну ф-цію і генеруємо вийняток у разі якщо наш Shelf це Magazines

        return typeof prop === 'number'
            ? this._items.find(item => item.id === prop) || null
            : this._items.find(item => item.author === prop) || null;
    }
}

// Створюємо екземпляр:
const magazineShelf = new Shelf(ShelfType.Magazine); 

// Наповнюємо
magazines.forEach(element => {
    magazineShelf.add(element);
});

// Bивід типів:
const firstMagazine = magazineShelf.getFirst(); // IBook | null - TS виводить просто першу сигнатуру хоча бажаний вивід IMagazine | null

