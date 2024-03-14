import { IBook, IMagazine, ShelfType, Books, Magazines } from '../types';

export function isItemBook(item: IBook | IMagazine): item is IBook {
    return 'id' in item;
}

export function isItemMagazine(item: IBook | IMagazine): item is IMagazine {
    return 'publisher' in item;
}

export function isTypeBook(type: ShelfType.Book | ShelfType.Magazine): type is ShelfType.Book {
    return type === ShelfType.Book;
}

export function isBooks(items: (IBook | IMagazine)[]): items is Books {
    return items.every(item => isItemBook(item));
}

export function isMagazines(items: (IBook | IMagazine)[]): items is Magazines {
    return items.every(item => isItemMagazine(item));
}

export function assertsBooks(items: Books | Magazines): asserts items is Books {
    if (!isBooks(items)) {
        throw new Error('The properties "id" and "author" do not exist on type IMagazine');
    }
}
