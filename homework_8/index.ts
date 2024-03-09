//Створіть дженерик (загальну) функцію purge(), яка приймає один параметр – дженерик масив inventory та повертає дженерик масив того ж типу,
// що містить елементи початкового масиву без двох перших елементів.
const enum Category {
    Software = "Software",
}

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

function purge<T>(param: T[]): T[] {
    return param.slice(2);
}

// Об’явіть змінну inventory
const inventory: IBook[] = [
    {
        id: 10,
        title: 'The C Programming Language',
        author: 'K & R',
        available: true,
        category: Category.Software,
    },

    {
        id: 11,
        title: 'Code Complete',
        author: 'Steve McConnell',
        available: true,
        category: Category.Software,
    },

    {
        id: 12,
        title: '8-Bit Graphics with Cobol',
        author: 'A. B.',
        available: true,
        category: Category.Software,
    },

    {
        id: 13,
        title: 'Cool autoexec.bat Scripts!',
        author: 'C. D.',
        available: true,
        category: Category.Software,
    },
];

// Викличте функцію purge() та передайте їй ці дані. Виведіть результат у консоль.
console.log(purge(inventory));

// Викличте функцію purge() з числовим масивом і знову виведіть результат у консоль.
const numberArray = [1, 2, 3, 4, 5];
console.log(purge(numberArray));

// Об’явіть змінну purgeNumbers та присвойте їй функцію purge зі значенням параметру типу number.
const purgeNumbers = purge<number>;

// Викличте функцію purgeNumbers() та передайте їй числовий масив та масив рядків.
const stringArray = ['A', 'B', 'C'];

purgeNumbers(numberArray);
// purgeNumbers(stringArray); // Error

// Створіть інтерфейс Magazine, який містить дві рядкові властивості, title, publisher.
interface IMagazine {
    title: string;
    publisher: string;
}

//Створіть дженерик клас Shelf:
class Shelf<T> {
    // додайте приватну властивість items, яка є масивом елементів типу Т.
    private _items: T[] = [];

    // додайте метод add(), який приймає один параметр item типу T і додає його в масив. Нічого не повертає.
    add(item: T): void {
        this._items.push(item);
    }

    // додайте метод getFirst(), який нічого не приймає, і повертає перший елемент із items.
    getFirst(): T | null {
        return this._items[1] || null;
    }

    addAll(...items: T[]): void {
        this._items.push(...items);
    }
}

// Створіть екземпляр класу Shelf - bookShelf і збережіть усі книжки з inventory в bookShelf.
// Отримайте першу книжку і виведіть її назву в консоль.

const bookShelf: Shelf<IBook> = new Shelf();
bookShelf.addAll(...inventory);
console.log(bookShelf.getFirst());

// Об'явіть змінну magazines, яка містить наступні дані:
const magazines: IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];

// Створіть екземпляр класу Shelf - magazineShelf і збережіть усі журнали в magazineShelf. Отримайте перший журнал і виведіть його в консоль.
const magazineShelf: Shelf<IMagazine> = new Shelf();
magazineShelf.addAll(...magazines);
console.log(magazineShelf.getFirst());

// Cтворіть дженерик інтерфейс для функції зворотнього виклику CallbackFn<T>, яка приймає два параметри:
// ·    err: Error | null,
// ·    data: T | null
// і нічого не повертає.
// Використайте цей інтерфейс для функції, яка приймає своїм аргументом функцію зворотнього виклику.
interface ICallbackFn<T> {
    (err: Error | null, data: T | null): void;
}

function myCallBack<T>(err: Error | null, data: T | null) {
    if (err) {
        console.log(`Error: ${err.message}`);
    } else {
        console.log(`Data: ${JSON.stringify(data)}`);
    }
}

function myFunction(callbackFn: ICallbackFn<IMagazine>) {
    const err: Error | null = null;
    const data: IMagazine | null = magazineShelf.getFirst();

    callbackFn(err, data);
}

myFunction(myCallBack);
