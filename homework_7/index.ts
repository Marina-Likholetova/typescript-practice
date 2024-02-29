// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання.
// Наприклад, тип значення для кожного ключа може бути число | рядок.

interface IWithUnion {
    [key: string]: string | number;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь - які аргументи.

interface IWithFunction {
    [key: string]: (...args: any[]) => void;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву.
// Ключі повинні бути числами, а значення - певного типу.

interface ILikeArray<T> {
    [index: number]: T;
    length: number; 
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою.
// Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface IWithAddition {
    name: string;
    id: string;
    [key: string]: string;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface IParent {
    [key: string]: number | string;
}

interface IChildren extends IParent {
    a: number;
    b: number;
}


// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям
// (наприклад, чи всі значення є числами).

enum MyParameters {
    a = "a",
    b = "b",
    r = "r",
    h = "h"
}

function isNumberProps(arg: IChildren): boolean {
    const paramsToCheck = Object.keys(arg).filter(key => key in MyParameters);    
    
    if (paramsToCheck.length === 0) {
        return false;
    }

    return paramsToCheck.every(param => typeof arg[param] === "number");
}

