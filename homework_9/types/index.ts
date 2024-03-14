export const enum Category {
    Software = 'Software',
}

export interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

export interface IMagazine {
    title: string;
    publisher: string;
}

export enum ShelfType {
    Book = 'book',
    Magazine = 'magazine',
}

export type Books = IBook[];

export type Magazines = IMagazine[];
