const enum Category {
    Software = 'Software',
}

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

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

interface IMagazine {
    title: string;
    publisher: string;
}

class Shelf<T> {
    private _items: T[] = [];

    add(item: T): void {
        this._items.push(item);
    }

    getFirst(): T | null {
        return this._items[0] || null;
    }

    addAll(...items: T[]): void {
        this._items.push(...items);
    }
}

const bookShelf: Shelf<IBook> = new Shelf();
bookShelf.addAll(...inventory);
console.log(bookShelf.getFirst());

const magazines: IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];

const magazineShelf: Shelf<IMagazine> = new Shelf();
magazineShelf.addAll(...magazines);
console.log(magazineShelf.getFirst());
