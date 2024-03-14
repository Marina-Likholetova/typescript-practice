import { IBook, Category, IMagazine } from '../types';

export const inventory: IBook[] = [
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

export const magazines: IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];
