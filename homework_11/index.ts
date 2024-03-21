// 1. Об'явіть аліас типу BookRequiredFields, використовуючи інтерфейс Book та утиліту Required.
enum Category {
    Software,
}

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

type BookRequiredFields = Required<IBook>;

// 2. Об'явіть змінну bookRequiredFields типу BookRequiredFields та присвойте їй відповідний об'єкт.

const bookRequiredFields: BookRequiredFields = {
    id: 10,
    title: 'The C Programming Language',
    author: 'K & R',
    available: true,
    category: Category.Software,
};

// 3. Об'явіть аліас типу UpdatedBook, використовуючи інтерфейс Book та утиліту Partial.

type UpdatedBook = Partial<IBook>;

// 4. Об'явіть змінну updatedBook типу UpdatedBook і присвойте їй відповідний об'єкт.

const updatedBook: UpdatedBook = {
    id: 10,
    title: 'The C Programming Language',
    author: 'K & R',
    available: true,
};

// 5. Об'явіть аліас типу AuthorWoEmail, використовуючи інтерфейс Author та утиліту Omit.

interface Author {
    name: string;
    surname: string;
    email: string;
}

type AuthorNoEmail = Omit<Author, 'email'>;

// 6. Об'явіть аліас СreateCustomerFunctionType для функціонального типу функції createCustomer(). Функція приймає рядок і число і повертає їх конкатенацію.

type СreateCustomerFunctionType = (n: number, s: string) => string;

const createCustomer: СreateCustomerFunctionType = (n, s) => n + s;

// 7. Об'явіть змінну params, використовуючи аліас типу СreateCustomerFunctionType і утиліту Parameters, викличте функцію createCustomer(), передавши змінну params.

let params: Parameters<СreateCustomerFunctionType> = [7, '8'];

console.log(createCustomer(...params));

// 8. Об'явіть аліас fn для функціонального типу функції, яка приймає три параметри з типами string, number, boolean і повертає тип symbol.

type Fn = (s: string, n: number, b: boolean) => symbol;

const fn: Fn = (string, number, boolean) => (boolean ? Symbol(string) : Symbol(number));

// 9. Об'явіть аліаси типів Param1<T>, Param2<T>, Param3<T>, які повертають тип першого, другого та третього параметрів функції відповідно.

type Param1<T> = T extends (s: infer U, n: number, b: boolean) => symbol ? U : never;
type Param2<T> = T extends (s: string, n: infer U, b: boolean) => symbol ? U : never;
type Param3<T> = T extends (s: string, n: number, b: infer U) => symbol ? U : never;

// 10. Об'явіть аліаси P1, P2, P3 та отримайте типи першого, другого та третього параметрів типу fn.

type P1 = Param1<Fn>;
type P2 = Param2<Fn>;
type P3 = Param3<Fn>;

// Наступні пункти не обов'язкові, але цікаві

// 11. Створіть утиліти RequiredProps<T> та OptionalProps<T>, які повертають union тип required та optional властивостей об'єкта.
// Використовуйте mapped type для перебору ключів T та conditional type для трансформації значень ключів типу T.
// Додайте загальне обмеження для T розширивши його від типу object у RequiredProps та OptionalProps.

type RequiredProps<T extends object> = keyof {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

type OptionalProps<T extends object> = keyof {
    [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};

// 12. Об'явіть аліас типу BookRequiredProps та BookOptionalProps, використовуючи інтерфейс Book та утиліти RequiredProps та OptionalProps. Спробуйте замість Book передати примітивний тип.

type BookRequiredProps = RequiredProps<IBook>; // keyof IBook
type BookOptionalProps = OptionalProps<IBook>; // never

interface MixedBook {
    id: number;
    title: string;
    author: string;
    available?: boolean;
    category?: Category;
}

type MixedBookRequiredProps = RequiredProps<MixedBook>; // "id" | "title" | "author"
type MixedBookOptionalProps = OptionalProps<MixedBook>; // "available" | "category"

// type BookRequiredProps = RequiredProps<string>; // Type 'string' does not satisfy the constraint 'object'
// type BookOptionalProps = OptionalProps<number>; // Type 'number' does not satisfy the constraint 'object'

// 13. Створіть утиліту RemoveProps <T extends object, TProps extends keyof T>, яка видаляє властивості TProps з переданого типу T.

type RemoveProps<T extends object, TProps extends keyof T> = {
    [K in keyof T as K extends TProps ? never : K]: T[K];
};

type RemoveProps2<T extends object, TProps extends keyof T> = {
    [K in keyof T as Exclude<K, TProps>]: T[K];
};

// 14. Об'явіть аліас типу BookRequiredPropsType та BookOptionalPropsType, використовуючи інтерфейс Book, аліаси типу BookRequiredProps та BookOptioalProps
// та утиліту RemoveProps Спробуйте замість Book передати Author.

type BookRequiredPropsType = RemoveProps<IBook, BookOptionalProps>;
type BookOptionalPropsType = RemoveProps<IBook, BookRequiredProps>;

type MixedBookRequiredPropsType = RemoveProps<MixedBook, MixedBookOptionalProps>;
type MixedBookOptionalPropsType = RemoveProps<MixedBook, MixedBookRequiredProps>;

// 15. Створіть функцію update(), яка приймає один параметр типу boolean. Якщо значення аргументу true, функція повинна повертати значення типу string.
// Якщо значення аргументу false, функція повинна повертати значення типу number.

function update<T extends boolean>(arg: T): UpdateReturnType<T> {
    return arg ? ('update' as UpdateReturnType<T>) : (0 as UpdateReturnType<T>);
}

type UpdateReturnType<T extends boolean> = T extends true ? string : number;

const stringReturnValue = update(true); // string
const numberReturnValue = update(false); // number

