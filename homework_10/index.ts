// Вам потрібно створити тип `DeepReadonly` який буде робити доступними тільки для читання навіть  властивості вкладених обʼєктів.
// Вам потрібно створити тип `DeepRequireReadonly` який буде робити доступними тільки для читання навіть  властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
// Вам потрібно сворити тип `UpperCaseKeys`, який буде приводити всі ключі до верхнього регістру.
// Створіть тип `ObjectToPropertyDescriptor`, який перетворює звичайний обʼєкт на обʼєкт де кожне `value` є дескриптором.
// Підказка:

// Використовуйте рекурсію
// Використовуйте вбудований тип PropertyDescriptor

type DeepReadonly<T> = {
    +readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepRequireReadonly<T> = {
    +readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

type UpperCaseKeys<T> = {
    [K in keyof T as Capitalize<K & string>]: T[K] extends object ? UpperCaseKeys<T[K]> : T[K];
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: T[K] extends object ? ObjectToPropertyDescriptor<T[K]> : PropertyDescriptor;
};




type IPersonUpperCase = UpperCaseKeys<IPerson>; // Вивід типів показує у верхн. регістрі тільки поля першого рівня вкладеності Name i Ocupation
type IPersonWirhDescriptor = ObjectToPropertyDescriptor<IPerson>; // хоча всі перевірки на об'єкті виконуються і відповідні помилки виводяться

interface IPerson {
    name: string;
    occupation: {
        position: {
            name: string;
            level: string;
        };
        company: {
            name: string;
            info: {
                adress: string;
                contact: number;
            };
        };
    };
}


